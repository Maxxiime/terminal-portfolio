import { useContext, useEffect } from "react";
import { termContext } from "../Terminal";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";

const Exit: React.FC = () => {
  const { rerender } = useContext(termContext);
  const { locale } = useContext(languageContext);
  const copy = uiText[locale];

  useEffect(() => {
    if (!rerender) return;

    window.open("", "_self");
    window.close();

    window.setTimeout(() => {
      if (!document.hidden) {
        window.location.replace("about:blank");
      }
    }, 150);
  }, [rerender]);

  return <span>{copy.exitFallback}</span>;
};

export default Exit;
