import { useEffect, useState } from "react";
import themes from "../components/styles/themes";

export const useTheme = () => {
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    setThemeLoaded(true);
  }, []);

  return { theme: themes.dark, themeLoaded };
};
