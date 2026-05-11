import { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { termContext, terminalActionsContext } from "../Terminal";
import { getPortfolioKnowledgeBase, profile } from "../../data/profile";
import { Wrapper } from "../styles/Output.styled";
import { languageContext } from "../../App";
import { answerLanguageNames, uiText } from "../../i18n";
import LinkifiedText from "../LinkifiedText";

const UsageHint = styled.span`
  color: ${({ theme }) => theme.colors?.secondary};
`;

const ExampleList = styled.div`
  margin-top: 0.4rem;
`;

const ExampleItem = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors?.primary};
  margin-top: 0.25rem;
  display: flex;
  width: fit-content;
  align-items: baseline;
  gap: 0.35rem;

  &::before {
    content: "↗";
    font-size: 0.72em;
    opacity: 0.7;
    flex-shrink: 0;
  }

  &:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

type QaState =
  | { status: "idle" | "loading"; answer: string }
  | { status: "done"; answer: string }
  | { status: "error"; answer: string };

const answerCache = new Map<string, string>();
const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const getCompactPortfolioContext = (locale: "fr" | "en" | "es") =>
  getPortfolioKnowledgeBase(locale)
    .replace(/\n{3,}/g, "\n\n");

type QuestionProviderConfig = {
  endpoint: string;
  models: string[];
  timeoutMs: number;
};

const QUESTION_PROVIDER: QuestionProviderConfig = {
  endpoint: "/api/question",
  models: ["openrouter/free"],
  timeoutMs: 45000,
};

const buildPrompt = (
  question: string,
  locale: "fr" | "en" | "es",
  model = QUESTION_PROVIDER.models[0]
) => ({
  model,
  messages: [
    {
      role: "system",
      content: `You answer questions about Maxime Lemenand's CV and terminal portfolio. Use only the provided portfolio context. Do not invent missing details. Keep the answer direct, natural and concise. Always refer to Maxime Lemenand in the third person by name — never use "tu", "vous", "you" or any second-person form. Always answer in ${answerLanguageNames[locale]}.`,
    },
    {
      role: "user",
      content: `Portfolio context:
${getCompactPortfolioContext(locale)}

Question: ${question}

Answer in 2 to 5 concise sentences in ${answerLanguageNames[locale]}.`,
    },
  ],
  temperature: 0.25,
  // eslint-disable-next-line camelcase
  max_tokens: 450,
  stream: false,
});

const extractErrorMessage = (raw: string, locale: "fr" | "en" | "es") => {
  const copy = uiText[locale];
  const friendlyMessage = (message: string, code?: number) => {
    const normalized = message.toLowerCase();

    if (
      code === 429 ||
      normalized.includes("rate limit") ||
      normalized.includes("temporarily rate limited")
    ) {
      return copy.questionRateLimited;
    }

    if (
      code === 401 ||
      code === 403 ||
      normalized.includes("invalid api key") ||
      normalized.includes("unauthorized") ||
      normalized.includes("forbidden")
    ) {
      return copy.questionInvalidApiKey;
    }

    if (
      normalized.includes("network unreachable") ||
      normalized.includes("dns") ||
      normalized.includes("enotfound") ||
      normalized.includes("eai_again") ||
      normalized.includes("fetch failed") ||
      normalized.includes("failed to fetch")
    ) {
      return copy.questionConnectivityIssue;
    }

    if (
      normalized.includes("overloaded") ||
      normalized.includes("temporarily unavailable") ||
      normalized.includes("provider returned error")
    ) {
      return copy.questionModelOverloaded;
    }

    if (normalized.includes("timeout") || normalized.includes("aborted")) {
      return copy.questionTimeout;
    }

    return "";
  };

  try {
    const parsed = JSON.parse(raw);
    const message = String(parsed?.error?.message || parsed?.message || "");
    const code =
      Number(
        parsed?.error?.code || parsed?.code || parsed?.error?.status || 0
      ) || undefined;
    return (
      friendlyMessage(message, code) ||
      message ||
      copy.questionServiceUnavailable
    );
  } catch {
    const cleaned = raw
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return (
      friendlyMessage(cleaned) || cleaned || copy.questionServiceUnavailable
    );
  }
};

const Question: React.FC = () => {
  const { arg } = useContext(termContext);
  const { locale } = useContext(languageContext);
  const copy = uiText[locale];
  const { typeAndExecute } = useContext(terminalActionsContext);
  const question = useMemo(() => arg.join(" ").trim(), [arg]);
  const cacheKey = `${locale}::${question}`;
  const [frameIndex, setFrameIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [state, setState] = useState<QaState>(() => {
    const cached = answerCache.get(cacheKey);
    return cached
      ? { status: "done", answer: cached }
      : { status: "idle", answer: "" };
  });

  useEffect(() => {
    const cached = answerCache.get(cacheKey);
    if (cached) {
      setState({ status: "done", answer: cached });
      return;
    }

    if (!question) return;

    const requestId = crypto.randomUUID();
    let cancelled = false;
    setState({ status: "loading", answer: "" });

    const askQuestionProvider = async ({
      endpoint,
      models,
      timeoutMs,
    }: QuestionProviderConfig) => {
      let lastError: unknown;

      for (const model of models) {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

        try {
          const payload = buildPrompt(question, locale, model);
          const payloadText = JSON.stringify(payload);
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Request-Id": requestId,
              "X-Request-Source": "Question.tsx",
              "X-Request-Model": model,
              "X-Request-Payload-Bytes": String(payloadText.length),
            },
            body: payloadText,
            signal: controller.signal,
          });

          const raw = await response.text();

          if (!response.ok) {
            throw new Error(extractErrorMessage(raw, locale));
          }

          const data = raw ? JSON.parse(raw) : {};
          const answer = data?.choices?.[0]?.message?.content?.trim();

          if (answer) {
            return answer;
          }

          lastError = new Error(copy.questionFallback);
        } catch (error) {
          lastError =
            error instanceof DOMException && error.name === "AbortError"
              ? new Error(copy.questionTimeout)
              : error;
        } finally {
          window.clearTimeout(timeout);
        }
      }

      throw lastError instanceof Error
        ? lastError
        : new Error(copy.questionServiceUnavailable);
    };

    const askQuestion = async () => {
      try {
        const answer = await askQuestionProvider(QUESTION_PROVIDER);

        if (!cancelled) {
          answerCache.set(cacheKey, answer);
          setState({ status: "done", answer });
        }
      } catch (error) {
        if (!cancelled) {
          const message =
            error instanceof Error
              ? error.message
              : copy.questionServiceUnavailable;
          setState({ status: "error", answer: message });
        }
      }
    };

    askQuestion();

    return () => {
      cancelled = true;
    };
  }, [
    cacheKey,
    copy.questionFallback,
    copy.questionServiceUnavailable,
    copy.questionTimeout,
    locale,
    question,
  ]);

  useEffect(() => {
    if (state.status !== "loading") {
      setFrameIndex(0);
      setElapsedSeconds(0);
      return;
    }

    const spinnerInterval = window.setInterval(() => {
      setFrameIndex(current => (current + 1) % spinnerFrames.length);
    }, 90);

    const timerInterval = window.setInterval(() => {
      setElapsedSeconds(current => current + 1);
    }, 1000);

    return () => {
      window.clearInterval(spinnerInterval);
      window.clearInterval(timerInterval);
    };
  }, [state.status]);

  if (!question) {
    return (
      <Wrapper data-testid="question">
        <div>
          {copy.questionUsage.split(/(<[^>]+>)/).map((part, i) =>
            part.startsWith("<") && part.endsWith(">") ? (
              <UsageHint key={i}>{part}</UsageHint>
            ) : (
              part
            )
          )}
        </div>
        <ExampleList>
          <div>{copy.questionExamplesTitle}</div>
          {copy.questionExamples(profile.firstName).map((ex: string) => (
            <ExampleItem key={ex} onClick={() => typeAndExecute(ex)}>
              {ex}
            </ExampleItem>
          ))}
        </ExampleList>
      </Wrapper>
    );
  }

  if (state.status === "loading" || state.status === "idle") {
    return (
      <Wrapper data-testid="question">
        <div>
          [{spinnerFrames[frameIndex]}] {copy.questionLoadingTitle}
        </div>
        <div>├─ {copy.questionLoadingRead}</div>
        <div>
          └─ {copy.questionElapsed}: {elapsedSeconds}s
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper data-testid="question">
      <LinkifiedText>{state.answer}</LinkifiedText>
    </Wrapper>
  );
};

export default Question;
