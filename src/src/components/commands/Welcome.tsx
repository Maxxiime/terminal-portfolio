import {
  HeroContainer,
  HeroMeta,
  InlineCommand,
} from "../styles/Welcome.styled";
import { profile } from "../../data/profile";
import { useContext } from "react";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";

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

  return (
    <HeroContainer data-testid="welcome">
      <HeroMeta className="info-section">
        <div>{copy.welcomeHeadline}</div>
        <div aria-hidden="true">&nbsp;</div>
        <div>{profile.name}</div>
        <div>{profile.title}</div>
        <div aria-hidden="true">&nbsp;</div>
        <div>{renderWelcomeHint(copy.welcomeHint)}</div>
        <div aria-hidden="true">&nbsp;</div>
      </HeroMeta>
    </HeroContainer>
  );
};

export default Welcome;
