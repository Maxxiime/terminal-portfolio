import styled from "styled-components";

export const HeroContainer = styled.div`
  display: block;
  width: 100%;
  min-width: 0;
  overflow: visible;
  overflow-x: clip;
  overflow-y: visible;

  @media (max-width: 932px) {
    margin-bottom: 0.75rem;
  }
`;

export const HeroMeta = styled.div`
  width: 100%;
  min-width: 0;

  @media (min-width: 1024px) {
    max-width: 56rem;
  }
`;

const asciiBase = `
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin-top: 0.35rem;
  margin-bottom: 0.8rem;
  overflow-x: hidden;
  white-space: pre;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PreName = styled.pre`
  ${asciiBase}
  font-size: clamp(0.74rem, 1.28vw, 0.98rem);
  line-height: 1.02;
  letter-spacing: 0.02em;

  @media (max-width: 550px) {
    display: none;
  }
`;

export const MobileAscii = styled.pre`
  ${asciiBase}
  display: none;
  font-size: clamp(0.88rem, 4.15vw, 1rem);
  line-height: 1;
  letter-spacing: 0.02em;

  @media (max-width: 550px) {
    display: block;
  }
`;

export const Seperator = styled.div`
  margin-top: 0.45rem;
  margin-bottom: 0.45rem;
`;

export const Cmd = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors?.secondary};
  text-decoration: none;
  line-height: 1.3rem;
  white-space: nowrap;
  border-bottom: 2px dashed ${({ theme }) => theme.colors?.secondary};

  &:hover {
    border-bottom-style: solid;
  }
`;

export const InlineCommand = styled.code`
  display: inline-block;
  color: ${({ theme }) => theme.colors?.secondary};
  background: ${({ theme }) => `${theme.colors?.secondary}14`};
  border-bottom: 1px solid ${({ theme }) => theme.colors?.secondary};
  border-radius: 0.18rem;
  padding: 0 0.22rem;
  margin: 0 0.08rem;
  font-family: inherit;
  font-size: 0.95em;
  line-height: 1.1;
  vertical-align: baseline;
  white-space: nowrap;

  @media (max-width: 550px) {
    padding: 0 0.16rem;
    margin: 0 0.04rem;
    font-size: 0.9em;
  }
`;
