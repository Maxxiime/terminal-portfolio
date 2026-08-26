import { EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";
import { getEducationItems } from "../../data/profile";
import { getMarkdownSections } from "../../data/markdown";
import { useContext } from "react";
import { languageContext } from "../../App";

const Education: React.FC = () => {
  const { locale } = useContext(languageContext);
  const fallbackItems = getEducationItems(locale);
  type EducationItem = (typeof fallbackItems)[number];
  const markdownItems: EducationItem[] = [];
  for (const section of getMarkdownSections(locale, "education")) {
    if (section.level === 2 && section.title) {
      markdownItems.push({
        school: section.title,
        program: section.paragraphs[0] || "",
        period: section.paragraphs[1] || "",
        details: [],
      });
    } else if (section.level === 3 && markdownItems.length) {
      const current = markdownItems[markdownItems.length - 1];
      current.details ||= [];
      current.details.push({ title: section.title, bullets: section.items });
    }
  }
  const educationItems = markdownItems.length ? markdownItems : fallbackItems;

  return (
    <Wrapper data-testid="education">
      {educationItems.map(({ school, program, period, details }) => (
        <EduList key={`${school}-${program}`}>
          <div className="title">{school}</div>
          <div className="desc">{program}</div>
          <div className="desc">{period}</div>
          {details?.map(detail => (
            <div className="detail" key={detail.title}>
              <div className="subtitle">{detail.title}</div>
              {detail.bullets.map(bullet => (
                <div className="desc" key={bullet}>- {bullet}</div>
              ))}
            </div>
          ))}
        </EduList>
      ))}
    </Wrapper>
  );
};

export default Education;
