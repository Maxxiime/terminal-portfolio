import _ from "lodash";
export const generateTabs = (num = 0): string => {
  let tabs = "  ";
  for (let i = 0; i < num; i++) {
    tabs += " ";
  }
  return tabs;
};

export const isArgInvalid = (
  arg: string[],
  action: string,
  options: string[]
) => arg[0] !== action || !_.includes(options, arg[1]) || arg.length > 2;

export const getCurrentCmdArry = (history: string[]) =>
  _.split(history[0].trim(), " ");

export const argTab = (
  inputVal: string,
  setInputVal: (value: React.SetStateAction<string>) => void,
  setHints: (value: React.SetStateAction<string[]>) => void,
  hintsCmds: string[]
): string[] | undefined => {
  void inputVal;
  void setInputVal;
  void setHints;
  void hintsCmds;
  return undefined;
};
