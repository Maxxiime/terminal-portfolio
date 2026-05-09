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
import { useContext } from "react";
import { languageContext } from "../../App";

const About: React.FC = () => {
  const { locale } = useContext(languageContext);
  const profile = getProfile(locale);
  const aboutSections = getAboutSections(locale);

  return (
    <AboutWrapper data-testid="about">
      <AboutHeader>
        <AboutName>{profile.name}</AboutName>
        <AboutTitle>{profile.title}</AboutTitle>
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
