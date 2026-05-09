import styled from "styled-components";

export const ExperienceWrapper = styled.div`
  margin-top: 0.25rem;
`;

export const ExperienceChoice = styled.div`
  display: grid;
  grid-template-columns: 1.4rem minmax(0, 1fr);
  column-gap: 0.55rem;
  align-items: start;
  margin-bottom: 0.7rem;
`;

export const ExperienceChoiceId = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
`;

export const ExperienceChoiceContent = styled.div`
  min-width: 0;
`;

export const ExperienceChoiceTitle = styled.div`
  color: ${({ theme }) => theme.colors?.primary};
  line-height: 1.3rem;
`;

export const ExperienceChoiceMeta = styled.div`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.3rem;
  word-break: break-word;
`;

export const ExperienceCard = styled.div`
  margin-bottom: 0.75rem;
`;

export const ExperienceHeader = styled.div`
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
  line-height: 1.35rem;
  margin-bottom: 0.2rem;
`;

export const ExperienceMeta = styled.div`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.35rem;
  word-break: break-word;
`;

export const ExperienceSummary = styled.div`
  color: ${({ theme }) => theme.colors?.secondary};
  line-height: 1.45rem;
  margin: 0.55rem 0 0.7rem;
  max-width: 100%;
  word-break: break-word;
`;

export const ExperienceBullet = styled.div`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.45rem;
  max-width: 100%;
  word-break: break-word;
  padding-left: 1rem;
  text-indent: -1rem;
`;

export const ExperienceHint = styled.div`
  margin-top: 0.85rem;
  line-height: 1.35rem;
  color: ${({ theme }) => theme.colors?.secondary};
  font-weight: 700;
`;
