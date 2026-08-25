import { ProjectsIntro, ProjectDesc } from "../styles/Projects.styled";
import { getAiHighlights } from "../../data/profile";
import { getMarkdownSections } from "../../data/markdown";
import { useContext } from "react";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";

const Ai: React.FC = () => {
  const { locale } = useContext(languageContext);
  const markdownHighlights = getMarkdownSections(locale, "ai").flatMap(section => section.items);
  const aiHighlights = markdownHighlights.length ? markdownHighlights : getAiHighlights(locale);
  const copy = uiText[locale];

  return (
    <div data-testid="ai">
      <ProjectsIntro>{copy.aiHeading}</ProjectsIntro>
      {aiHighlights.map(line => (
        <ProjectDesc key={line}>- {line}</ProjectDesc>
      ))}
    </div>
  );
};

export default Ai;
