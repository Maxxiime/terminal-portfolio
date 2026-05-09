import { useContext } from "react";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";
import { commands } from "../Terminal";
import {
  Cmd,
  CmdDesc,
  CmdIcon,
  CmdList,
  CmdSep,
  HelpWrapper,
  KeyContainer,
  ShortcutDesc,
  ShortcutKey,
  ShortcutLine,
  ShortcutSep,
} from "../styles/Help.styled";

const commandIcons: Record<string, string> = {
  about: "👤",
  certification: "🏅",
  clear: "🧹",
  contact: "📬",
  exit: "🚪",
  education: "🎓",
  experience: "🧰",
  gui: "📄",
  help: "🆘",
  lab: "🧪",
  language: "🌐",
  question: "❓",
  skills: "🛠️",
  welcome: "👋",
};

const Help: React.FC = () => {
  const { locale } = useContext(languageContext);
  const copy = uiText[locale];

  return (
    <HelpWrapper data-testid="help">
      {commands.map(({ cmd }) => (
        <CmdList key={cmd}>
          <CmdIcon>{commandIcons[cmd] || "•"}</CmdIcon>
          <Cmd>{cmd}</Cmd>
          <CmdSep>-</CmdSep>
          <CmdDesc>
            {
              copy.commandDescriptions[
                cmd as keyof typeof copy.commandDescriptions
              ]
            }
          </CmdDesc>
        </CmdList>
      ))}
      <KeyContainer>
        <ShortcutLine>
          <ShortcutKey>{copy.helpShortcutTab}</ShortcutKey>
          <ShortcutSep>=&gt;</ShortcutSep>
          <ShortcutDesc>{copy.helpAutocomplete}</ShortcutDesc>
        </ShortcutLine>
        <ShortcutLine>
          <ShortcutKey>{copy.helpShortcutPrevious}</ShortcutKey>
          <ShortcutSep>=&gt;</ShortcutSep>
          <ShortcutDesc>{copy.helpPrevious}</ShortcutDesc>
        </ShortcutLine>
      </KeyContainer>
    </HelpWrapper>
  );
};

export default Help;
