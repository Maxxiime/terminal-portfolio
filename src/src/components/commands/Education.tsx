import { EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";
import { getEducationItems } from "../../data/profile";
import { useContext } from "react";
import { languageContext } from "../../App";

const Education: React.FC = () => {
  const { locale } = useContext(languageContext);
  const educationItems = getEducationItems(locale);

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
