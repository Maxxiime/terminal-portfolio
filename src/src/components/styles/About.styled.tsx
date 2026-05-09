import styled from "styled-components";

export const AboutWrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const AboutHeader = styled.div`
  margin-bottom: 0.8rem;
  padding-left: 0.15rem;
  border-left: 2px solid ${({ theme }) => theme.colors?.primary};
`;

export const AboutName = styled.div`
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
  line-height: 1.35rem;
`;

export const AboutTitle = styled.div`
  color: ${({ theme }) => theme.colors?.secondary};
  line-height: 1.35rem;
  word-break: break-word;
`;

export const AboutLocation = styled.div`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.35rem;
`;

export const AboutSection = styled.div`
  display: grid;
  grid-template-columns: 1.4rem minmax(0, 1fr);
  column-gap: 0.4rem;
  align-items: start;
  margin-bottom: 0.45rem;
  line-height: 1.45rem;
`;

export const AboutMarker = styled.span<{ $accent?: boolean }>`
  color: ${({ theme, $accent }) => $accent ? theme.colors?.secondary : theme.colors?.primary};
  font-weight: 700;
`;

export const AboutText = styled.span`
  color: ${({ theme }) => theme.colors?.text[100]};
  word-break: break-word;
`;

export const HighlightSpan = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
`;

export const HighlightAlt = styled.span`
  color: ${({ theme }) => theme.colors?.secondary};
  font-weight: 700;
`;
