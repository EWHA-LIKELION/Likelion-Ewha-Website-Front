import styled, { css } from "styled-components";

/* =========================
    Admin Button

    EtcButton과 색상 체계는 같고, 여백만 큰 admin 전용 버튼

    사용 예시)
    <AdminButton variant="green">저장</AdminButton>
    <AdminButton variant="outline">취소</AdminButton>
========================= */

export const AdminButton = ({ variant = "green", children, ...props }) => (
  <StyledAdminButton className="h5-bold" $variant={variant} {...props}>
    {children}
  </StyledAdminButton>
);

export default AdminButton;

/* =========================
    styled-components
========================= */

/* ===== variant: 색상 ===== */
const VARIANT_STYLES = {
  /* 진한 초록 */
  green: css`
    background-color: #05da5b;
    color: #ffffff;
    border: none;
  `,
  /* 회색 아웃라인 */
  outline: css`
    color: #5c5c5c;
    border: 1.5px solid var(--Neutral-95, #dcdcdc);
    background: var(--Neutral-_100, #fff);
  `,
};

const StyledAdminButton = styled.button`
  padding: 0.75rem 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 2.5rem;

  cursor: pointer;

  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    user-select: none;

    border: none;
    color: white;
    background: var(--cool-neutral-96);
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  ${({ $variant }) => VARIANT_STYLES[$variant] ?? VARIANT_STYLES.green}
`;
