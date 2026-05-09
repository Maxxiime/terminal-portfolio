import { useContext } from "react";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";
import { Wrapper } from "../styles/Output.styled";

const Email: React.FC = () => {
  const { locale } = useContext(languageContext);
  const copy = uiText[locale];

  return (
    <Wrapper>
      <span>{copy.emailHint}</span>
    </Wrapper>
  );
};

export default Email;
