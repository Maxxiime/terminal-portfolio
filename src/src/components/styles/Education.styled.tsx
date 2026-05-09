import styled from "styled-components";

export const EduIntro = styled.div`
  margin-bottom: 0.75rem;
`;

export const EduList = styled.div`
  margin-bottom: 1rem;

  .title {
    color: ${({ theme }) => theme.colors?.primary};
    font-weight: 700;
    margin-bottom: 0.275rem;
  }

  .desc {
    color: ${({ theme }) => theme.colors?.text[200]};
    line-height: 1.25rem;
  }

  .detail {
    margin-top: 0.65rem;
  }

  .subtitle {
    color: ${({ theme }) => theme.colors?.secondary};
    font-weight: 400;
    margin-bottom: 0.25rem;
  }
`;


export const ContactBrandIcon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: -2px;
  margin-right: 0.45rem;
  display: inline-block;
`;
