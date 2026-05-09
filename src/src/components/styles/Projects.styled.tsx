import styled from "styled-components";

export const ProjectContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.875rem;
`;

export const ProjectsIntro = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.5rem;
`;

export const ProjectTitle = styled.div`
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

export const LabMainTitle = styled(ProjectTitle)`
  color: ${({ theme }) => theme.colors?.primary};
`;

export const LabSectionTitle = styled(ProjectTitle)`
  color: ${({ theme }) => theme.colors?.secondary};
`;

export const ProjectDesc = styled.div`
  color: ${({ theme }) => theme.colors?.text[200]};
  text-align: left;
  line-height: 1.5rem;
  width: 100%;
  max-width: none;
  overflow-wrap: break-word;
  word-break: normal;
`;

export const LabIntro = styled(ProjectDesc)`
  margin-bottom: 0.4rem;
`;
