import { useContext } from "react";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";
import { getExperiences } from "../../data/profile";
import { getMarkdownSections } from "../../data/markdown";
import { termContext } from "../Terminal";
import { UsageDiv } from "../styles/Output.styled";
import {
  ExperienceBullet,
  ExperienceCard,
  ExperienceChoice,
  ExperienceChoiceContent,
  ExperienceChoiceId,
  ExperienceChoiceMeta,
  ExperienceChoiceTitle,
  ExperienceHeader,
  ExperienceHint,
  ExperienceMeta,
  ExperienceSummary,
  ExperienceWrapper,
} from "../styles/Experience.styled";

const Experience: React.FC = () => {
  const { locale } = useContext(languageContext);
  const { arg } = useContext(termContext);
  const copy = uiText[locale];
  const fallbackExperiences = getExperiences(locale).map(experience => ({
    ...experience,
    summary: "",
  }));
  const markdownExperiences = getMarkdownSections(locale, "experience")
    .filter(section => section.level === 2 && section.title)
    .map(section => {
      const titleSeparator = section.title.indexOf(" — ");
      const metadata = section.paragraphs[0] || "";
      const metadataSeparator = metadata.indexOf(" · ");
      return {
        company: titleSeparator >= 0 ? section.title.slice(0, titleSeparator) : section.title,
        role: titleSeparator >= 0 ? section.title.slice(titleSeparator + 3) : "",
        period: metadataSeparator >= 0 ? metadata.slice(0, metadataSeparator) : metadata,
        location: metadataSeparator >= 0 ? metadata.slice(metadataSeparator + 3) : "",
        summary: section.paragraphs[1] || section.items[0] || "",
        bullets: section.items,
      };
    });
  const experiences = markdownExperiences.length ? markdownExperiences : fallbackExperiences;
  const choices = experiences.map((experience, index) => ({
    id: String(index + 1),
    summary: experience.summary || experience.bullets[0] || "",
    index,
  }));
  const selectedId = arg[0];

  if (arg.length > 1 || (selectedId && !choices.some(choice => choice.id === selectedId))) {
    return (
      <UsageDiv data-testid="experience-invalid-arg">
        {copy.usageLabel}: experience &#60;1-{experiences.length}&#62; <br />
        {copy.exampleLabel}: experience 1
      </UsageDiv>
    );
  }

  if (!selectedId) {
    return (
      <ExperienceWrapper data-testid="experience">
        {choices.map(choice => {
          const experience = experiences[choice.index];
          return (
            <ExperienceChoice key={choice.id}>
              <ExperienceChoiceId>{choice.id}.</ExperienceChoiceId>
              <ExperienceChoiceContent>
                <ExperienceChoiceTitle>{experience.company} — {experience.role}</ExperienceChoiceTitle>
                <ExperienceChoiceMeta>{experience.period} · {experience.location}</ExperienceChoiceMeta>
                <ExperienceChoiceMeta>{choice.summary}</ExperienceChoiceMeta>
              </ExperienceChoiceContent>
            </ExperienceChoice>
          );
        })}
        <ExperienceHint>{copy.experienceReplyHint}</ExperienceHint>
      </ExperienceWrapper>
    );
  }

  const selected = choices.find(choice => choice.id === selectedId);
  const experience = selected ? experiences[selected.index] : null;

  if (!selected || !experience) {
    return null;
  }

  return (
    <ExperienceWrapper data-testid="experience-detail">
      <ExperienceCard>
        <ExperienceHeader>{selected.id}. {experience.company} — {experience.role}</ExperienceHeader>
        <ExperienceMeta>{experience.period} · {experience.location}</ExperienceMeta>
        {experience.summary && <ExperienceSummary>{experience.summary}</ExperienceSummary>}
        {experience.bullets.map(bullet => (
          <ExperienceBullet key={bullet}>- {bullet}</ExperienceBullet>
        ))}
      </ExperienceCard>
      <ExperienceHint>{copy.experienceSwitchHint}</ExperienceHint>
    </ExperienceWrapper>
  );
};

export default Experience;
