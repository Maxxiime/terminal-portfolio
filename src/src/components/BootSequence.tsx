import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { languageContext } from "../App";
import { uiText } from "../i18n";
import {
  BootContainer,
  BootCursor,
  BootLine,
  BootLinePrefix,
  BootScreen,
} from "./styles/BootSequence.styled";

type BootSequenceProps = {
  animate?: boolean;
  compact?: boolean;
  onComplete?: () => void;
};

type BootPhase = "typing" | "loading" | "complete";

const START_DELAY_MS = 30;
const TYPE_MS = 12;
const DOT_MS = 80;
const LINE_PAUSE_MS = 30;
const EXIT_DELAY_MS = 50;
const DOT_STATES = [".", "..", "..."] as const;
const DONE_SUFFIX = "... OK";

const BootSequence: React.FC<BootSequenceProps> = ({
  animate = false,
  compact = false,
  onComplete,
}) => {
  const { locale } = useContext(languageContext);

  const hintMessage = useMemo(() => {
    const hints = uiText[locale].bootHints;
    return hints[Math.floor(Math.random() * hints.length)];
  }, [locale]);

  const lines = useMemo(
    () =>
      uiText[locale].bootSequence.map(line =>
        line.variant === "hint" ? { ...line, message: hintMessage } : line
      ),
    [locale, hintMessage]
  );

  const [lineIndex, setLineIndex] = useState(animate ? 0 : lines.length);
  const [charIndex, setCharIndex] = useState(
    animate ? 0 : Number.MAX_SAFE_INTEGER
  );
  const [dotIndex, setDotIndex] = useState(0);
  const [phase, setPhase] = useState<BootPhase>(
    animate ? "typing" : "complete"
  );
  const didNotifyComplete = useRef(false);

  useEffect(() => {
    didNotifyComplete.current = false;

    if (!animate) {
      setLineIndex(lines.length);
      setCharIndex(Number.MAX_SAFE_INTEGER);
      setDotIndex(DOT_STATES.length - 1);
      setPhase("complete");
      return;
    }

    setLineIndex(0);
    setCharIndex(0);
    setDotIndex(0);
    setPhase("typing");
  }, [animate, lines]);

  useEffect(() => {
    if (!animate || phase === "complete") return;

    const currentLine = lines[lineIndex];
    if (!currentLine) return;

    const isFinalLine = currentLine.variant === "ok";
    const messageLength = currentLine.message.length;

    if (phase === "typing") {
      if (charIndex < messageLength) {
        const delay =
          lineIndex === 0 && charIndex === 0 ? START_DELAY_MS : TYPE_MS;
        const typingTimer = window.setTimeout(() => {
          setCharIndex(value => value + 1);
        }, delay);
        return () => window.clearTimeout(typingTimer);
      }

      if (isFinalLine) {
        const completeTimer = window.setTimeout(() => {
          setPhase("complete");
        }, EXIT_DELAY_MS);
        return () => window.clearTimeout(completeTimer);
      }

      setDotIndex(0);
      setPhase("loading");
      return;
    }

    const dotTimer = window.setTimeout(
      () => {
        if (dotIndex < DOT_STATES.length - 1) {
          setDotIndex(value => value + 1);
          return;
        }

        setLineIndex(value => value + 1);
        setCharIndex(0);
        setDotIndex(0);
        setPhase("typing");
      },
      dotIndex === DOT_STATES.length - 1 ? LINE_PAUSE_MS : DOT_MS
    );

    return () => window.clearTimeout(dotTimer);
  }, [animate, charIndex, dotIndex, lineIndex, lines, phase]);

  useEffect(() => {
    if (!animate || phase !== "complete" || didNotifyComplete.current) return;

    didNotifyComplete.current = true;
    const firstFrame = window.requestAnimationFrame(() => {
      onComplete?.();
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
    };
  }, [animate, onComplete, phase]);

  const isAnimating = animate && phase !== "complete";
  const visibleLines = lines.slice(0, Math.min(lineIndex + 1, lines.length));

  const content = (
    <BootContainer data-testid="boot-sequence" $compact={compact}>
      {visibleLines.map((line, index) => {
        const isActive = isAnimating && index === lineIndex;
        const isPastLine = index < lineIndex;
        const isLoadingLine = line.variant !== "ok";
        const typedMessage = isActive
          ? line.message.slice(0, Math.min(charIndex, line.message.length))
          : line.message;
        const suffix =
          isActive && phase === "loading"
            ? DOT_STATES[dotIndex]
            : isPastLine && isLoadingLine
            ? DONE_SUFFIX
            : "";

        return (
          <BootLine key={`${line.prefix}-${index}`} $variant={line.variant}>
            <BootLinePrefix>{line.prefix}&nbsp;</BootLinePrefix>
            <span>
              {typedMessage}
              {suffix}
            </span>
            {isActive && <BootCursor aria-hidden="true">▌</BootCursor>}
          </BootLine>
        );
      })}
    </BootContainer>
  );

  return compact ? content : <BootScreen>{content}</BootScreen>;
};

export default BootSequence;
