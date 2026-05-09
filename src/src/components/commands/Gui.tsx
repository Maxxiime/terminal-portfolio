import { useContext, useEffect, useRef } from "react";
import { termContext } from "../Terminal";
import { profile } from "../../data/profile";
import Usage from "../Usage";

const Gui: React.FC = () => {
  const { arg } = useContext(termContext);
  const openedRef = useRef(false);

  useEffect(() => {
    if (arg.length !== 0 || openedRef.current) return;

    openedRef.current = true;
    window.open(profile.cvUrl, "_blank", "noopener,noreferrer");
  }, [arg]);

  if (arg.length === 0) {
    return <span />;
  }

  return <Usage cmd="gui" />;
};

export default Gui;
