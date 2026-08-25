import { useContext } from "react";
import { languageContext } from "../../App";
import { getMarkdownSections } from "../../data/markdown";
import {
  LabMainTitle,
  LabSectionTitle,
  ProjectDesc,
  ProjectContainer,
} from "../styles/Projects.styled";

const Projects: React.FC = () => {
  const { locale } = useContext(languageContext);
  const sections = getMarkdownSections(locale, "projects");

  return (
    <div data-testid="projects">
      {sections.map((section, index) => (
        <ProjectContainer key={`${section.title}-${index}`}>
          {index === 0
            ? <LabMainTitle>{section.title}</LabMainTitle>
            : <LabSectionTitle>{section.title}</LabSectionTitle>}
          {section.paragraphs.map(paragraph => (
            <ProjectDesc key={paragraph}>{paragraph}</ProjectDesc>
          ))}
          {section.items.map(item => (
            <ProjectDesc key={item}>- {item}</ProjectDesc>
          ))}
        </ProjectContainer>
      ))}
    </div>
  );
};

export default Projects;
