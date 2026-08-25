import {
  AboutHeader,
  AboutMarker,
  AboutName,
  AboutSection,
  AboutText,
  AboutTitle,
  AboutWrapper,
} from "../styles/About.styled";
import { getAboutSections, getProfile } from "../../data/profile";
import { getMarkdownSections } from "../../data/markdown";
import { useContext } from "react";
import { languageContext } from "../../App";

const About: React.FC = () => {
  const { locale } = useContext(languageContext);
  const profile = getProfile(locale);
  const markdownSections = getMarkdownSections(locale, "about");
  const markdownHeader = markdownSections.find(section => section.title);
  const name = markdownHeader?.title || profile.name;
  const title = markdownHeader?.paragraphs[0] || profile.title;
  const aboutSections = markdownSections.length
    ? markdownSections.flatMap(section => section === markdownHeader ? section.paragraphs.slice(1) : section.paragraphs)
    : getAboutSections(locale);

  return (
    <AboutWrapper data-testid="about">
      <AboutHeader>
        <AboutName>{name}</AboutName>
        <AboutTitle>{title}</AboutTitle>
      </AboutHeader>

      {aboutSections.map((section, index) => (
        <AboutSection key={section}>
          <AboutMarker $accent={index % 2 === 1}>▸</AboutMarker>
          <AboutText>{section}</AboutText>
        </AboutSection>
      ))}
    </AboutWrapper>
  );
};

export default About;
