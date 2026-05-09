import { useContext } from "react";
import { languageContext } from "../../App";
import { uiText, type Locale } from "../../i18n";
import { getExperiences } from "../../data/profile";
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

type ExperienceChoiceItem = {
  id: "1" | "2" | "3";
  summary: string;
  index: number;
};

const experienceChoiceMap: Record<Locale, ExperienceChoiceItem[]> = {
  fr: [
    { id: "1", summary: "Plateforme, Kubernetes, automatisation et opérations chez Eidos-Montréal.", index: 0 },
    { id: "2", summary: "Cloud privé à grande échelle, VMware et opérations production chez OVH.", index: 1 },
    { id: "3", summary: "Systèmes et réseau à grande échelle chez Orange.", index: 3 },
  ],
  en: [
    { id: "1", summary: "Platform, Kubernetes, automation and operations work at Eidos-Montréal.", index: 0 },
    { id: "2", summary: "Large-scale private cloud, VMware and production operations at OVH.", index: 1 },
    { id: "3", summary: "Large-scale systems and network operations at Orange.", index: 3 },
  ],
  es: [
    { id: "1", summary: "Plataforma, Kubernetes, automatización y operaciones en Eidos-Montréal.", index: 0 },
    { id: "2", summary: "Cloud privado a gran escala, VMware y operaciones de producción en OVH.", index: 1 },
    { id: "3", summary: "Operaciones de sistemas y red a gran escala en Orange.", index: 3 },
  ],
};

const Experience: React.FC = () => {
  const { locale } = useContext(languageContext);
  const { arg } = useContext(termContext);
  const copy = uiText[locale];
  const experiences = getExperiences(locale);
  const choices = experienceChoiceMap[locale];
  const selectedId = arg[0];

  if (arg.length > 1 || (selectedId && !choices.some(choice => choice.id === selectedId))) {
    return (
      <UsageDiv data-testid="experience-invalid-arg">
        {copy.usageLabel}: experience &#60;1|2|3&#62; <br />
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
        <ExperienceSummary>{selected.summary}</ExperienceSummary>
        {experience.bullets.map(bullet => (
          <ExperienceBullet key={bullet}>- {bullet}</ExperienceBullet>
        ))}
      </ExperienceCard>
      <ExperienceHint>{copy.experienceSwitchHint}</ExperienceHint>
    </ExperienceWrapper>
  );
};

export default Experience;
