import { User, WebsiteName, Wrapper } from "./styles/TerminalInfo.styled";
import { profile } from "../data/profile";

const TermInfo = () => {
  return (
    <Wrapper>
      <User>{profile.whoami}</User>@<WebsiteName>{profile.terminalHost}</WebsiteName>:~$
    </Wrapper>
  );
};

export default TermInfo;
