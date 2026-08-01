import styled, { css } from "styled-components";

/* =========================
    Time Button (Responsive)

    사용 예시)
    <TimeButton variant={selected ? "selected" : "abled"}>{time}</TimeButton>
    <TimeButton variant="disabled">{time}</TimeButton>
========================= */

export const TimeButton = ({ variant = "abled", children, ...props }) => (
  <StyledTimeButton $variant={variant} {...props}>
    {children}
  </StyledTimeButton>
);

export default TimeButton;

/* =========================
    styled-components
========================= */

/* ===== variant: 상태별 색상 ===== */
const VARIANT_STYLES = {
  /* 선택 가능 */
  abled: css`
    background-color: #ffffff;
    color: #737373;
    border: 1px solid var(--Atomic-Neutral-99, #f1f1f1);
    font-weight: 400;
  `,
  /* 선택 불가 */
  disabled: css`
    background-color: #ffffff;
    color: #c4c4c4;
    border: 1px solid var(--Atomic-Neutral-99, #f1f1f1);
    font-weight: 400;
  `,
  /* 선택됨: 주황 */
  selected: css`
    background-color: #ff9b38;
    color: #ffffff;
  `,
  /* 선택됨(어드민): 초록 */
  selectedAdmin: css`
    background-color: #05da5b;
    color: #ffffff;
  `,
};

const StyledTimeButton = styled.div`
  width: 3.25rem;
  height: 1.75rem;
  padding: 0.25rem 0.625rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.375rem;

  overflow: hidden;
  color: var(--Static-White, #fff);
  text-overflow: ellipsis;

  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem;

  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    user-select: none;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  @media (max-width: 799px) {
    width: 3rem;
  }

  ${({ $variant }) => VARIANT_STYLES[$variant] ?? VARIANT_STYLES.abled}
`;
