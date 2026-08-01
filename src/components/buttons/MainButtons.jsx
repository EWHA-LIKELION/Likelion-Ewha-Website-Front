import styled, { css } from "styled-components";
import { asset } from "@/assets";

/* =========================
    Main Button (Responsive)

    사용 예시)
    <MainButton variant="primary">지원하기</MainButton>
    <MainButton variant="dark" size="wide" icon={<ArrowRightIcon />}>
      13기 모집 안내 바로가기
    </MainButton>
    <MainButton variant="disabled">제출하기</MainButton>

    개별 여백/너비만 다르면 styled(MainButton)으로 감싸 덮어쓰면 됩니다.
    링크 버튼이 필요하면 <MainButton as="a" href="...">,
    styled(MainButton) 안에서는 forwardedAs="a"를 씁니다.
========================= */

export const MainButton = ({
  variant = "primary",
  size = "default",
  icon,
  disabled,
  children,
  ...props
}) => (
  <StyledMainButton
    $variant={variant}
    $size={size}
    disabled={(disabled ?? variant === "disabled") || undefined}
    {...props}
  >
    <span>{children}</span>
    {icon}
  </StyledMainButton>
);

export default MainButton;

/* =========================
    styled-components
========================= */

/* ===== variant: 색상 ===== */
const VARIANT_STYLES = {
  /* 초록 배경 + 흰 글씨 */
  primary: css`
    background-color: #05da5b;
    color: #ffffff;
  `,
  /* 초록 배경 + 검은 글씨 */
  primaryBlack: css`
    background-color: #05da5b;
    color: #2a2a2a;
  `,
  /* 주황 배경 + 흰 글씨 */
  sub: css`
    background-color: var(--primary-sub, #ff9b38);
    color: #ffffff;
  `,
  /* 진회색 배경 + 흰 글씨 */
  dark: css`
    background-color: #474747;
    color: #ffffff;
  `,
  /* 회색 배경 + 흰 글씨 (비활성) */
  disabled: css`
    background-color: #a9a9a9;
    color: #ffffff;

    @media (max-width: 799px) {
      background-color: #9b9b9b;
    }
  `,
};

/* ===== size: 너비/여백 ===== */
const SIZE_STYLES = {
  default: css`
    width: 24.375rem;

    @media (max-width: 799px) {
      width: 12.5rem;
    }
  `,
  /* 모바일에서 조금 더 넓은 버튼 */
  wide: css`
    width: 24.375rem;

    @media (max-width: 799px) {
      width: 13.75rem;
      height: 2.625rem;
      padding: 0.625rem 1.5rem 0.625rem 1.75rem;
    }
  `,
  /* 너비 고정 없이 내용에 맞춰지는 버튼 */
  auto: css`
    padding: 0.875rem 2.25rem;

    @media (max-width: 799px) {
      padding: 0.625rem 1.75rem;
    }
  `,
  /* 좁은 버튼 */
  compact: css`
    width: 12.5rem;

    @media (max-width: 799px) {
      width: 7.5rem;
    }
  `,
};

const StyledMainButton = styled.button`
  display: flex;
  padding: 1.125rem 2.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 2.5rem;

  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;

  border: none;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;

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
    padding: 0.625rem 1.75rem;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    line-height: 1.375rem;
    gap: 0.25rem;
  }

  ${({ $variant }) => VARIANT_STYLES[$variant] ?? VARIANT_STYLES.primary}
  ${({ $size }) => SIZE_STYLES[$size] ?? SIZE_STYLES.default}
`;

/* ===== 아이콘 ===== */
export const ArrowRightIcon = (props) => (
  <ArrowIcon src={asset("/icons/arrow-right.svg")} alt="" {...props} />
);

const ArrowIcon = styled.img`
  @media (max-width: 799px) {
    content: url(${asset("/icons/arrow-right-2.svg")});
  }
`;
