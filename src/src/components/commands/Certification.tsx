import { ContactBrandIcon } from "../styles/Education.styled";
import { DetailDesc, DetailList, DetailTitle, HelpWrapper } from "../styles/Help.styled";
import { getCertificationItems } from "../../data/profile";
import { getMarkdownSections } from "../../data/markdown";
import { useContext } from "react";
import { languageContext } from "../../App";

const Certification: React.FC = () => {
  const { locale } = useContext(languageContext);
  const fallbackItems = getCertificationItems(locale);
  const markdownItems = getMarkdownSections(locale, "certification")
    .filter(section => section.level === 2 && section.title)
    .map((section, index) => ({
      title: section.title,
      issuer: section.paragraphs[0] || "",
      issued: section.paragraphs[1] || "",
      iconUrl: fallbackItems[index]?.iconUrl || "/brands/terminal-prompt.svg",
    }));
  const certificationItems = markdownItems.length ? markdownItems : fallbackItems;

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
