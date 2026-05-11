import About from "./commands/About";
import Certification from "./commands/Certification";
import Clear from "./commands/Clear";
import Contact from "./commands/Contact";
import Education from "./commands/Education";
import Experience from "./commands/Experience";
import Exit from "./commands/Exit";
import Gui from "./commands/Gui";
import Help from "./commands/Help";
import Welcome from "./commands/Welcome";
import Lab from "./commands/Lab";
import Language from "./commands/Language";
import Question from "./commands/Question";
import Skills from "./commands/Skills";
import { OutputContainer, UsageDiv } from "./styles/Output.styled";
import { termContext } from "./Terminal";
import { useContext } from "react";
import { languageContext } from "../App";
import { uiText } from "../i18n";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg } = useContext(termContext);
  const { locale } = useContext(languageContext);
  const copy = uiText[locale];

  const specialCmds = ["question", "language", "gui", "experience", "contact"];

  if (!specialCmds.includes(cmd) && arg.length > 0)
    return (
      <UsageDiv data-testid="usage-output">
        {copy.usageLabel}: {cmd}
      </UsageDiv>
    );

  return (
    <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
      {
        {
          about: <About />,
          certification: <Certification />,
          clear: <Clear />,
          contact: <Contact />,
          education: <Education />,
          experience: <Experience />,
          exit: <Exit />,
          gui: <Gui />,
          help: <Help />,
          lab: <Lab />,
          language: <Language />,
          question: <Question />,
          skills: <Skills />,
          welcome: <Welcome />,
        }[cmd]
      }
    </OutputContainer>
  );
};

export default Output;
