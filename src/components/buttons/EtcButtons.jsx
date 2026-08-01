import styled, { css } from "styled-components";

/* =========================
    Etc Button

    사용 예시)
    <EtcButton variant="lightGreen">수정</EtcButton>
    <EtcButton variant="green">저장</EtcButton>
    <EtcButton variant="outline">취소</EtcButton>
========================= */

export const EtcButton = ({ variant = "lightGreen", children, ...props }) => (
  <StyledEtcButton $variant={variant} {...props}>
    {children}
  </StyledEtcButton>
);

export default EtcButton;

/* =========================
    styled-components
========================= */

/* ===== variant: 색상 ===== */
const VARIANT_STYLES = {
  /* 연한 초록 */
  lightGreen: css`
    background-color: #d6fddb;
    color: #00bf40;
    border: none;
  `,
  /* 진한 초록 */
  green: css`
    background-color: #05da5b;
    color: #ffffff;
    border: none;
  `,
  /* 회색 아웃라인 */
  outline: css`
    color: #737373;
    border: 1.5px solid var(--Neutral-95, #dcdcdc);
    background: var(--Neutral-_100, #fff);
  `,
};

const StyledEtcButton = styled.button`
  min-width: 6.75rem;
  height: 2.75rem;
  padding: 1.25rem 2.5rem;
  gap: 0.625rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 62.4375rem;

  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;

  cursor: pointer;

  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    user-select: none;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  ${({ $variant }) => VARIANT_STYLES[$variant] ?? VARIANT_STYLES.lightGreen}
`;
