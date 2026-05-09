import { useContext, useEffect } from "react";
import { termContext } from "../Terminal";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";
import { getContactItems } from "../../data/profile";
import { ContactBrandIcon } from "../styles/Education.styled";
import { DetailDesc, DetailList, DetailTitle, HelpWrapper } from "../styles/Help.styled";
import { ExperienceHint } from "../styles/Experience.styled";
import { UsageDiv } from "../styles/Output.styled";
import LinkifiedText from "../LinkifiedText";

const Contact: React.FC = () => {
  const { locale } = useContext(languageContext);
  const { arg, rerender, index } = useContext(termContext);
  const copy = uiText[locale];
  const contactItems = getContactItems(locale);
  const selectedId = arg[0];

  if (arg.length > 1 || (selectedId && !contactItems.some(item => String(item.id) === selectedId))) {
    return (
      <UsageDiv data-testid="contact-invalid-arg">
        {copy.usageLabel}: contact &#60;1|2|3|4&#62; <br />
        {copy.exampleLabel}: contact 1
      </UsageDiv>
    );
  }

  const selected = selectedId ? contactItems.find(item => String(item.id) === selectedId) : null;

  useEffect(() => {
    if (rerender && index === 0 && selected?.url) {
      window.open(selected.url, "_blank");
    }
  }, [rerender, selected]);

  if (!selected) {
    return (
      <HelpWrapper data-testid="contact">
        {contactItems.map(item => (
          <DetailList key={item.label}>
            <DetailTitle>
              {item.id}. {item.iconUrl ? <ContactBrandIcon src={item.iconUrl} alt={item.label} /> : item.icon ? `${item.icon} ` : ""}{item.label}
            </DetailTitle>
            <DetailDesc><LinkifiedText>{item.value}</LinkifiedText></DetailDesc>
          </DetailList>
        ))}
        <ExperienceHint>{copy.contactReplyHint}</ExperienceHint>
      </HelpWrapper>
    );
  }

  return (
    <HelpWrapper data-testid="contact-detail">
      <DetailList>
        <DetailTitle>
          {selected.id}. {selected.iconUrl ? <ContactBrandIcon src={selected.iconUrl} alt={selected.label} /> : selected.icon ? `${selected.icon} ` : ""}{selected.label}
        </DetailTitle>
        <DetailDesc>{selected.value}</DetailDesc>
      </DetailList>
      <ExperienceHint>{copy.contactSwitchHint}</ExperienceHint>
    </HelpWrapper>
  );
};

export default Contact;
