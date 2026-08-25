import {
  HeroContainer,
  HeroMeta,
  InlineCommand,
} from "../styles/Welcome.styled";
import { profile } from "../../data/profile";
import { useContext } from "react";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";
import { getMarkdownSections } from "../../data/markdown";

const renderWelcomeHint = (hint: string) => {
  const parts = hint.split(/(help|question)/g);
  return parts.map((part, index) =>
    part === "help" || part === "question" ? (
      <InlineCommand key={`${part}-${index}`}>{part}</InlineCommand>
    ) : (
      <span key={`text-${index}`}>{part}</span>
    )
  );
};

const Welcome: React.FC = () => {
  const { locale } = useContext(languageContext);
  const copy = uiText[locale];
  const markdownSections = locale === "fr" ? getMarkdownSections(locale, "welcome") : [];
  const markdownProfile = markdownSections.find(section => section.title === profile.name);
  const welcomeHeadline = markdownSections[0]?.title || copy.welcomeHeadline;
  const markdownTagline = markdownProfile?.paragraphs[0] || profile.title;
  const markdownHint = markdownProfile?.paragraphs[1] || copy.welcomeHint;

  return (
    <HeroContainer data-testid="welcome">
      <HeroMeta className="info-section">
        <div>{welcomeHeadline}</div>
        <div aria-hidden="true">&nbsp;</div>
        <div>{profile.name}</div>
        <div>{markdownTagline}</div>
        <div aria-hidden="true">&nbsp;</div>
        <div>{renderWelcomeHint(markdownHint)}</div>
        <div aria-hidden="true">&nbsp;</div>
      </HeroMeta>
    </HeroContainer>
  );
};

export default Welcome;
