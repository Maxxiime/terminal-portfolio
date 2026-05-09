import styled from "styled-components";

const TerminalLink = styled.a`
  color: ${({ theme }) => theme.colors?.text[200]};
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: ${({ theme }) => theme.colors?.text[300]};
  cursor: pointer;
  word-break: break-all;

  &:hover {
    color: ${({ theme }) => theme.colors?.primary};
    text-decoration-color: ${({ theme }) => theme.colors?.primary};
  }

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors?.primary};
    outline-offset: 2px;
  }
`;

const ExternalIcon = styled.span`
  font-size: 0.7em;
  margin-left: 0.15em;
  vertical-align: super;
  user-select: none;
`;

const URL_REGEX = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g;

type Props = {
  children: string;
};

const LinkifiedText: React.FC<Props> = ({ children }) => {
  const parts = children.split(URL_REGEX);

  if (parts.length === 1) return <>{children}</>;

  return (
    <>
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <TerminalLink
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
            <ExternalIcon aria-hidden="true">↗</ExternalIcon>
          </TerminalLink>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default LinkifiedText;
