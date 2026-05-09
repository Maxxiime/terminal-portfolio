import { ContactBrandIcon } from "../styles/Education.styled";
import { DetailDesc, DetailList, DetailTitle, HelpWrapper } from "../styles/Help.styled";
import { getCertificationItems } from "../../data/profile";
import { useContext } from "react";
import { languageContext } from "../../App";

const Certification: React.FC = () => {
  const { locale } = useContext(languageContext);
  const certificationItems = getCertificationItems(locale);

  return (
    <HelpWrapper data-testid="certification">
      {certificationItems.map(item => (
        <DetailList key={`${item.title}-${item.issuer}`}>
          <DetailTitle>
            <ContactBrandIcon src={item.iconUrl} alt={item.issuer} />
            {item.title}
          </DetailTitle>
          <DetailDesc>
            {item.issuer}
            <br />
            {item.issued}
          </DetailDesc>
        </DetailList>
      ))}
    </HelpWrapper>
  );
};

export default Certification;
