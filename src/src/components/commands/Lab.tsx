import {
  ProjectsIntro,
  ProjectDesc,
  LabIntro,
  LabMainTitle,
  LabSectionTitle,
} from "../styles/Projects.styled";
import { getLabProfile } from "../../data/profile";
import { useContext } from "react";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";

const Lab: React.FC = () => {
  const { locale } = useContext(languageContext);
  const lab = getLabProfile(locale);
  const copy = uiText[locale];

  return (
    <div data-testid="lab">
      <ProjectsIntro>
        <LabMainTitle>{lab.title}</LabMainTitle>
        <div>{lab.period}</div>
      </ProjectsIntro>
      <LabIntro>{lab.intro}</LabIntro>
      <LabSectionTitle>{copy.labInfrastructureHeading}</LabSectionTitle>
      {lab.infrastructure.map(item => (
        <ProjectDesc key={item.name}>
          - {item.name} — {item.spec}
        </ProjectDesc>
      ))}
      {lab.categories.map(section => (
        <div key={section.title}>
          <LabSectionTitle>{section.title}</LabSectionTitle>
          {section.items.map(item => (
            <ProjectDesc key={item}>- {item}</ProjectDesc>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Lab;
