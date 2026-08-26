import { useContext } from "react";
import styled from "styled-components";
import { terminalActionsContext } from "../Terminal";
import { languageContext } from "../../App";
import { uiText } from "../../i18n";

const Disconnected = styled.div`
  margin: 0.65rem 0 1rem;
  color: ${({ theme }) => theme.colors?.text[200]};
`;

const RestartButton = styled.button`
  display: block;
  margin-top: 0.65rem;
  padding: 0.4rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors?.primary};
  background: transparent;
  color: ${({ theme }) => theme.colors?.primary};
  font: inherit;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors?.primary};
    color: ${({ theme }) => theme.colors?.body};
  }
`;

const Exit: React.FC = () => {
  const { locale } = useContext(languageContext);
  const { restartTerminal } = useContext(terminalActionsContext);
  const copy = uiText[locale];

  return (
    <Disconnected data-testid="terminal-disconnected">
      <div>{copy.exitDisconnected}</div>
      <RestartButton type="button" onClick={restartTerminal}>
        {copy.exitRestart}
      </RestartButton>
    </Disconnected>
  );
};

export default Exit;
