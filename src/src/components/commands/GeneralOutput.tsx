import { Wrapper } from "../styles/Output.styled";
import LinkifiedText from "../LinkifiedText";

type Props = {
  children: string;
};

const GeneralOutput: React.FC<Props> = ({ children }) => (
  <Wrapper>
    <LinkifiedText>{children}</LinkifiedText>
  </Wrapper>
);
export default GeneralOutput;
