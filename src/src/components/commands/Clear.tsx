import { useContext, useEffect } from "react";
import { UsageDiv } from "../styles/Output.styled";
import { termContext } from "../Terminal";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";

const Clear: React.FC = () => {
  const { arg, clearHistory } = useContext(termContext);
  const { locale } = useContext(languageContext);
  const copy = uiText[locale];

  useEffect(() => {
    if (arg.length < 1) clearHistory?.();
  }, []);

  return arg.length > 0 ? <UsageDiv>{copy.usageLabel}: clear</UsageDiv> : <></>;
};

export default Clear;
