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
    .map((section, index) => {
      const iconLine = section.paragraphs.find(paragraph => /^icon\s*:/i.test(paragraph));
      const text = section.paragraphs.filter(paragraph => paragraph !== iconLine);
      const iconValue = iconLine?.replace(/^icon\s*:/i, "").trim();
      const iconUrl = iconValue
        ? iconValue.startsWith("/") ? iconValue : `/brands/${iconValue}`
        : fallbackItems[index]?.iconUrl || "/brands/terminal-prompt.svg";

      return {
        title: section.title,
        issuer: text[0] || "",
        issued: text[1] || "",
        iconUrl,
      };
    });
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
