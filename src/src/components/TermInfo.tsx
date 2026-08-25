import { User, WebsiteName, Wrapper } from "./styles/TerminalInfo.styled";
import { profile } from "../data/profile";
import { getPortfolioConfig } from "../data/portfolio-config";

const TermInfo = () => {
  return (
    <Wrapper>
      <User>{profile.whoami}</User>@<WebsiteName>{getPortfolioConfig().person.terminalHost}</WebsiteName>:~$
    </Wrapper>
  );
};

export default TermInfo;
