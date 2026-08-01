import styled, { css } from "styled-components";

/* =========================
    Selection Button

    사용 예시)
    <SelectionButton
      variant={value === "OFFLINE" ? "selected" : "unselected"}
      onClick={() => setValue("OFFLINE")}
    >
      대면
    </SelectionButton>
========================= */

export const SelectionButton = ({
  variant = "unselected",
  children,
  ...props
}) => (
  <StyledSelectionButton $variant={variant} {...props}>
    {children}
  </StyledSelectionButton>
);

export default SelectionButton;

/* =========================
    Radio
========================= */

export const SelectedRadio = () => (
  <RadioWrapper>
    <RadioInner />
  </RadioWrapper>
);

export const UnselectedRadio = () => <RadioWrapper />;

/* =========================
    styled-components
========================= */

/* ===== variant: 선택 상태별 색상 ===== */
const VARIANT_STYLES = {
  /* 선택됨: 주황 배경 + 흰 글씨 */
  selected: css`
    background-color: var(--primary-sub, #ff9b38);
    color: #ffffff;
    border: none;
  `,
  /* 선택 안 됨: 흰 배경 + 회색 아웃라인 */
  unselected: css`
    background-color: #ffffff;
    color: #737373;
    border: 1.5px solid var(--Neutral-95, #dcdcdc);
    font-weight: 400;
  `,
};

const StyledSelectionButton = styled.button`
  width: 16.09375rem;
  height: 2.625rem;
  padding: 0.625rem 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 2.5rem;

  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem;

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

  @media (max-width: 799px) {
    width: 9.625rem;
    height: 2.25rem;
  }

  ${({ $variant }) => VARIANT_STYLES[$variant] ?? VARIANT_STYLES.unselected}
`;

/* ===== Radio ===== */
const RadioWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--unit-64, 4rem);
  border: 1.5px solid var(--Neutral-95, #dcdcdc);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioInner = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  aspect-ratio: 1/1;
  border-radius: var(--unit-64, 4rem);
  background: var(--Primary-sub, #ff9b38);
`;
