import {
  DetailDesc,
  DetailList,
  DetailTitle,
  HelpWrapper,
} from "../styles/Help.styled";
import { getSkillGroups } from "../../data/profile";
import { getMarkdownSections } from "../../data/markdown";
import { useContext } from "react";
import { languageContext } from "../../App";

const Skills: React.FC = () => {
  const { locale } = useContext(languageContext);
  const markdownGroups = locale === "fr" ? getMarkdownSections(locale, "skills") : [];
  const skillGroups = markdownGroups.length
    ? markdownGroups.filter(group => group.title && group.items.length).map(group => ({ name: group.title, items: group.items }))
    : getSkillGroups(locale);

  return (
    <HelpWrapper data-testid="skills">
      {skillGroups.map(group => (
        <DetailList key={group.name}>
          <DetailTitle>{group.name}</DetailTitle>
          <DetailDesc>└─ {group.items.join(" • ")}</DetailDesc>
        </DetailList>
      ))}
    </HelpWrapper>
  );
};

export default Skills;
