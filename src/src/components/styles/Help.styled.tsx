import styled from "styled-components";

export const HelpWrapper = styled.div`
  margin-top: 0.125rem;
  margin-bottom: 0.25rem;
`;

export const CmdList = styled.div`
  display: grid;
  grid-template-columns: 1.5rem 9.5rem 1rem minmax(0, 1fr);
  column-gap: 0.5rem;
  align-items: start;
  margin-bottom: 0.1rem;
  line-height: 1.25rem;

  @media (max-width: 700px) {
    grid-template-columns: 1.35rem 7.1rem 0.8rem minmax(0, 1fr);
    column-gap: 0.35rem;
    line-height: 1.2rem;
  }
`;

export const CmdIcon = styled.span`
  width: 1.25rem;
  text-align: center;
`;

export const Cmd = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  display: block;
  white-space: nowrap;
`;

export const CmdSep = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
  display: block;
  text-align: center;
`;

export const CmdDesc = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
  min-width: 0;
  word-break: break-word;
`;

export const KeyContainer = styled.div`
  font-size: 0.875rem;
  margin-top: 0.6rem;

  @media (max-width: 550px) {
    display: none;
  }
`;

export const ShortcutLine = styled.div`
  display: grid;
  grid-template-columns: 7rem 1rem minmax(0, 1fr);
  column-gap: 0.4rem;
  align-items: start;
  margin-top: 0.125rem;
  line-height: 1.2rem;

  @media (max-width: 700px) {
    grid-template-columns: 6.25rem 1rem minmax(0, 1fr);
    column-gap: 0.3rem;
  }
`;

export const ShortcutKey = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  white-space: nowrap;
`;

export const ShortcutSep = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
  text-align: center;
`;

export const ShortcutDesc = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
  min-width: 0;
  word-break: break-word;
`;

export const DetailList = styled.div`
  margin-bottom: 0.55rem;
`;

export const DetailTitle = styled.div`
  color: ${({ theme }) => theme.colors?.primary};
  line-height: 1.2rem;
`;

export const DetailDesc = styled.div`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.2rem;
  padding-left: 1.65rem;
  word-break: break-word;
`;
