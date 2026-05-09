import styled, { css, keyframes } from "styled-components";

const blink = keyframes`
  0%, 45% { opacity: 1; }
  46%, 100% { opacity: 0; }
`;

export const BootScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const BootContainer = styled.div<{ $compact?: boolean }>`
  width: 100%;
  max-width: 56rem;
  min-height: ${({ $compact }) => ($compact ? "8.85rem" : "auto")};
  box-sizing: border-box;
  overflow: visible;
  overflow-x: clip;
  overflow-y: visible;
  padding: ${({ $compact }) => ($compact ? "0 0 0.95rem 0" : "1.25rem")};
  padding-top: ${({ $compact }) => ($compact ? "0.2rem" : "0.9rem")};
`;

const variantStyles = {
  boot: css`
    color: ${({ theme }) => theme.colors?.text[100]};
  `,
  hint: css`
    color: ${({ theme }) => theme.colors?.secondary};
  `,
  ok: css`
    color: ${({ theme }) => theme.colors?.primary};
  `,
};

export const BootLine = styled.div<{ $variant: keyof typeof variantStyles }>`
  display: flex;
  align-items: center;
  gap: 0;
  width: 100%;
  min-width: 0;
  margin-bottom: 0.42rem;
  white-space: normal;
  word-break: break-word;
  line-height: 1.35;
  animation: fadeIn 180ms ease-out;

  ${({ $variant }) => variantStyles[$variant]}

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const BootLinePrefix = styled.span`
  flex: 0 0 auto;
`;

export const BootCursor = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  animation: ${blink} 0.8s step-end infinite;
`;
