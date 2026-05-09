import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import Output from "./Output";
import TermInfo from "./TermInfo";
import BootSequence from "./BootSequence";
import {
  CmdNotFound,
  Empty,
  Form,
  Hints,
  Input,
  MobileBr,
  MobileSpan,
  Wrapper,
} from "./styles/Terminal.styled";
import { argTab } from "../utils/funcs";
import { languageContext } from "../App";
import {
  getCommandNotFoundMessage,
  pickCommandNotFoundIndex,
  uiText,
} from "../i18n";

type Command = {
  cmd: string;
  tab: number;
}[];

export const commands: Command = [
  { cmd: "about", tab: 8 },
  { cmd: "certification", tab: 1 },
  { cmd: "clear", tab: 8 },
  { cmd: "contact", tab: 3 },
  { cmd: "education", tab: 1 },
  { cmd: "experience", tab: 1 },
  { cmd: "exit", tab: 6 },
  { cmd: "gui", tab: 3 },
  { cmd: "help", tab: 9 },
  { cmd: "lab", tab: 8 },
  { cmd: "language", tab: 3 },
  { cmd: "question", tab: 1 },
  { cmd: "skills", tab: 7 },
  { cmd: "welcome", tab: 6 },
];

type CommandEntry = {
  id: string;
  value: string;
  notFoundIndex?: number;
};

type Term = {
  arg: string[];
  history: string[];
  rerender: boolean;
  index: number;
  clearHistory?: () => void;
};

export const termContext = createContext<Term>({
  arg: [],
  history: [],
  rerender: false,
  index: 0,
});

const EXPERIENCE_SHORTCUTS = ["1", "2", "3"] as const;
const CONTACT_SHORTCUTS = ["1", "2", "3", "4"] as const;
const LANGUAGE_SHORTCUTS = ["1", "2", "3"] as const;
const AUTO_SCROLL_THRESHOLD = 48;

const Terminal = () => {
  const { locale } = React.useContext(languageContext);
  const copy = uiText[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyIdRef = useRef(0);
  const isTest = import.meta.env.MODE === "test";
  const autoWelcomeRan = useRef(isTest);
  const autoScrollEnabledRef = useRef(true);
  const scrollFrameRef = useRef<number | null>(null);
  const scrollFallbackRef = useRef<number | null>(null);
  const lastNotFoundIndexRef = useRef<number | null>(null);

  const createHistoryEntry = useCallback(
    (value: string, notFoundIndex?: number): CommandEntry => {
      const id = `${historyIdRef.current++}`;
      return { id, value, notFoundIndex };
    },
    []
  );

  const isNearBottom = useCallback(() => {
    const scrollingElement =
      document.scrollingElement || document.documentElement;
    const pageHeight = Math.max(
      scrollingElement.scrollHeight,
      document.body?.scrollHeight || 0
    );
    const viewportBottom = window.scrollY + window.innerHeight;

    return pageHeight - viewportBottom <= AUTO_SCROLL_THRESHOLD;
  }, []);

  const scheduleScrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
      if (scrollFallbackRef.current !== null) {
        window.clearTimeout(scrollFallbackRef.current);
      }

      const scrollToBottom = (scrollBehavior: ScrollBehavior) => {
        const scrollingElement =
          document.scrollingElement || document.documentElement;
        const pageHeight = Math.max(
          scrollingElement.scrollHeight,
          document.body?.scrollHeight || 0
        );

        window.scrollTo({
          top: pageHeight,
          behavior: scrollBehavior,
        });
      };

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;

        if (!autoScrollEnabledRef.current) return;

        scrollToBottom(behavior);

        scrollFallbackRef.current = window.setTimeout(() => {
          scrollFallbackRef.current = null;

          if (!autoScrollEnabledRef.current) return;

          scrollToBottom("auto");
        }, 220);
      });
    },
    []
  );

  const [inputVal, setInputVal] = useState("");
  const [bootComplete, setBootComplete] = useState(isTest);
  const [cmdHistory, setCmdHistory] = useState<CommandEntry[]>(() =>
    isTest ? [createHistoryEntry("welcome")] : []
  );
  const [rerender, setRerender] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [pointer, setPointer] = useState(-1);

  const historyValues = useMemo(
    () => cmdHistory.map(({ value }) => value),
    [cmdHistory]
  );
  const navigableHistory = useMemo(() => historyValues, [historyValues]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof MutationObserver === "undefined") return;

    const syncAutoScrollState = () => {
      autoScrollEnabledRef.current = isNearBottom();
    };

    const observer = new MutationObserver(() => {
      if (autoScrollEnabledRef.current) {
        scheduleScrollToBottom();
      }
    });

    syncAutoScrollState();
    window.addEventListener("scroll", syncAutoScrollState, { passive: true });
    observer.observe(node, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncAutoScrollState);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      if (scrollFallbackRef.current !== null) {
        window.clearTimeout(scrollFallbackRef.current);
        scrollFallbackRef.current = null;
      }
    };
  }, [isNearBottom, scheduleScrollToBottom]);

  const resolveCommand = useCallback(
    (rawValue: string) => {
      const trimmedValue = rawValue.trim();
      const lastMeaningfulCommand = historyValues.find(
        entry => entry.trim() !== ""
      );
      const languageCommandActive =
        lastMeaningfulCommand === "language" ||
        /^language (?:[1-3]|fr|en|es)$/.test(lastMeaningfulCommand || "");
      const normalizedValue =
        EXPERIENCE_SHORTCUTS.includes(
          trimmedValue as (typeof EXPERIENCE_SHORTCUTS)[number]
        ) &&
        (lastMeaningfulCommand === "experience" ||
          /^experience [1-3]$/.test(lastMeaningfulCommand || ""))
          ? `experience ${trimmedValue}`
          : LANGUAGE_SHORTCUTS.includes(
              trimmedValue as (typeof LANGUAGE_SHORTCUTS)[number]
            ) && languageCommandActive
          ? `language ${trimmedValue}`
          : CONTACT_SHORTCUTS.includes(
              trimmedValue as (typeof CONTACT_SHORTCUTS)[number]
            ) &&
            (lastMeaningfulCommand === "contact" ||
              /^contact [1-4]$/.test(lastMeaningfulCommand || ""))
          ? `contact ${trimmedValue}`
          : trimmedValue;

      return { trimmedValue, normalizedValue };
    },
    [historyValues]
  );

  const executeCommand = useCallback(
    (rawValue: string) => {
      const { trimmedValue, normalizedValue } = resolveCommand(rawValue);

      if (!trimmedValue) {
        setCmdHistory(prev => [createHistoryEntry(rawValue), ...prev]);
      } else {
        const commandName = _.split(normalizedValue, " ")[0];
        const isKnownCommand = Boolean(_.find(commands, { cmd: commandName }));
        const notFoundIndex =
          !isKnownCommand && commandName
            ? pickCommandNotFoundIndex(locale, lastNotFoundIndexRef.current)
            : undefined;

        if (notFoundIndex !== undefined) {
          lastNotFoundIndexRef.current = notFoundIndex;
        }

        setCmdHistory(prev => [
          createHistoryEntry(normalizedValue, notFoundIndex),
          ...prev,
        ]);
      }

      setInputVal("");
      setRerender(true);
      setHints([]);
      setPointer(-1);
      autoScrollEnabledRef.current = true;
      scheduleScrollToBottom();
    },
    [createHistoryEntry, locale, resolveCommand, scheduleScrollToBottom]
  );

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  useEffect(() => {
    lastNotFoundIndexRef.current = null;
  }, [locale]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRerender(false);
    setInputVal(e.target.value);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  useEffect(() => {
    if (!bootComplete || autoWelcomeRan.current) return;

    autoWelcomeRan.current = true;
    executeCommand("welcome");
  }, [bootComplete, executeCommand]);

  const clearHistory = () => {
    setCmdHistory([]);
    setHints([]);
    setPointer(-1);
  };

  const handleDivClick = () => {
    if (!bootComplete) return;
    inputRef.current && inputRef.current.focus();
  };

  useEffect(() => {
    document.addEventListener("click", handleDivClick);
    return () => {
      document.removeEventListener("click", handleDivClick);
    };
  }, [bootComplete]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setRerender(false);
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";

    if (e.key === "Tab" || ctrlI) {
      e.preventDefault();
      if (!inputVal) return;

      let hintsCmds: string[] = [];
      commands.forEach(({ cmd }) => {
        if (_.startsWith(cmd, inputVal)) {
          hintsCmds = [...hintsCmds, cmd];
        }
      });

      const returnedHints = argTab(inputVal, setInputVal, setHints, hintsCmds);
      hintsCmds = returnedHints ? [...hintsCmds, ...returnedHints] : hintsCmds;

      if (hintsCmds.length > 1) {
        setHints(hintsCmds);
      } else if (hintsCmds.length === 1) {
        const currentCmd = _.split(inputVal, " ");
        setInputVal(
          currentCmd.length !== 1
            ? `${currentCmd[0]} ${currentCmd[1]} ${hintsCmds[0]}`
            : hintsCmds[0]
        );

        setHints([]);
      }
    }

    if (ctrlL) {
      clearHistory();
    }

    if (e.key === "ArrowUp") {
      if (pointer >= navigableHistory.length) return;
      if (pointer + 1 === navigableHistory.length) return;

      setInputVal(navigableHistory[pointer + 1]);
      setPointer(prevState => prevState + 1);
      inputRef?.current?.blur();
    }

    if (e.key === "ArrowDown") {
      if (pointer < 0) return;
      if (pointer === 0) {
        setInputVal("");
        setPointer(-1);
        return;
      }

      setInputVal(navigableHistory[pointer - 1]);
      setPointer(prevState => prevState - 1);
      inputRef?.current?.blur();
    }
  };

  useEffect(() => {
    if (!bootComplete) return;

    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 1);
    return () => clearTimeout(timer);
  }, [bootComplete, inputVal, pointer]);

  return (
    <Wrapper data-testid="terminal-wrapper" ref={containerRef}>
      <BootSequence
        animate={!bootComplete}
        compact
        onComplete={handleBootComplete}
      />

      {[...cmdHistory]
        .reverse()
        .map(({ id, value, notFoundIndex }, renderedIndex) => {
          const index = cmdHistory.length - 1 - renderedIndex;
          const commandArray = _.split(_.trim(value), " ");
          const validCommand = _.find(commands, { cmd: commandArray[0] });
          const contextValue = {
            arg: _.drop(commandArray),
            history: historyValues,
            rerender,
            index,
            clearHistory,
          };
          return (
            <div key={id}>
              <div>
                <TermInfo />
                <MobileBr />
                <MobileSpan>&#62;</MobileSpan>
                <span data-testid="input-command">{value}</span>
              </div>
              {validCommand ? (
                <termContext.Provider value={contextValue}>
                  <Output index={index} cmd={commandArray[0]} />
                </termContext.Provider>
              ) : value === "" ? (
                <Empty />
              ) : (
                <CmdNotFound data-testid={`not-found-${index}`}>
                  {typeof notFoundIndex === "number"
                    ? getCommandNotFoundMessage(locale, notFoundIndex)
                    : copy.commandNotFound}
                </CmdNotFound>
              )}
            </div>
          );
        })}

      {hints.length > 1 && (
        <div>
          {hints.map(hCmd => (
            <Hints key={hCmd}>{hCmd}</Hints>
          ))}
        </div>
      )}
      {bootComplete && (
        <Form onSubmit={handleSubmit}>
          <label htmlFor="terminal-input">
            <TermInfo /> <MobileBr />
            <MobileSpan>&#62;</MobileSpan>
          </label>
          <Input
            title="terminal-input"
            type="text"
            id="terminal-input"
            autoComplete="off"
            spellCheck="false"
            autoFocus
            autoCapitalize="off"
            ref={inputRef}
            value={inputVal}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
        </Form>
      )}
    </Wrapper>
  );
};

export default Terminal;
