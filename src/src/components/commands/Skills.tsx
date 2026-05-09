import {
  DetailDesc,
  DetailList,
  DetailTitle,
  HelpWrapper,
} from "../styles/Help.styled";
import { getSkillGroups } from "../../data/profile";
import { useContext } from "react";
import { languageContext } from "../../App";

const Skills: React.FC = () => {
  const { locale } = useContext(languageContext);
  const skillGroups = getSkillGroups(locale);

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
