import { UsageDiv } from "./styles/Output.styled";
import { useContext } from "react";
import { languageContext } from "../App";
import { uiText } from "../i18n";

type Props = {
  cmd: "gui";
  marginY?: boolean;
};

const Usage: React.FC<Props> = ({ cmd, marginY = false }) => {
  const { locale } = useContext(languageContext);
  const copy = uiText[locale];

  return (
    <UsageDiv data-testid={`${cmd}-invalid-arg`} marginY={marginY}>
      {copy.usageLabel}: gui
    </UsageDiv>
  );
};

export default Usage;
