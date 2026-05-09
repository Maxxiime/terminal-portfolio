import { useContext, useLayoutEffect } from "react";
import { languageContext } from "../../App";
import { localeLabels, uiText, type Locale } from "../../i18n";
import { termContext } from "../Terminal";
import {
  DetailDesc,
  DetailList,
  DetailTitle,
  HelpWrapper,
} from "../styles/Help.styled";
import { ExperienceHint } from "../styles/Experience.styled";
import { UsageDiv } from "../styles/Output.styled";

type LanguageChoice = {
  id: "1" | "2" | "3";
  locale: Locale;
};

const languageChoices: LanguageChoice[] = [
  { id: "1", locale: "fr" },
  { id: "2", locale: "en" },
  { id: "3", locale: "es" },
];

const resolveLanguageChoice = (value?: string) =>
  languageChoices.find(
    choice => choice.id === value || choice.locale === value
  );

const Language: React.FC = () => {
  const { locale, setLocale } = useContext(languageContext);
  const { arg, rerender, index } = useContext(termContext);
  const selectedToken = arg[0];
  const selectedChoice = resolveLanguageChoice(selectedToken);
  const copy = uiText[locale];

  useLayoutEffect(() => {
    if (rerender && index === 0 && selectedChoice) {
      setLocale(selectedChoice.locale);
    }
  }, [index, rerender, selectedChoice, setLocale]);

  if (arg.length > 1 || (selectedToken && !selectedChoice)) {
    return (
      <UsageDiv data-testid="language-invalid-arg">
        {copy.languageReplyHint}
      </UsageDiv>
    );
  }

  return (
    <HelpWrapper data-testid="language">
      {languageChoices.map(choice => {
        const isCurrent = choice.locale === locale;

        return (
          <DetailList key={choice.id}>
            <DetailTitle>
              {choice.id}. {choice.locale} — {localeLabels[choice.locale]}
            </DetailTitle>
            {isCurrent ? <DetailDesc>{copy.languageCurrent}</DetailDesc> : null}
          </DetailList>
        );
      })}
      <ExperienceHint>{copy.languageReplyHint}</ExperienceHint>
    </HelpWrapper>
  );
};

export default Language;
