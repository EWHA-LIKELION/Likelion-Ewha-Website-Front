import styled from "styled-components";

/* =========================
    Main Buttons (Responsive)
========================= */

/* Primary */
export const SubmitButton = (props) => (
  <PrimaryButton {...props}>제출하기</PrimaryButton>
);

export const ApplyButton = (props) => (
  <PrimaryButton {...props}>지원하기</PrimaryButton>
);

export const ApplyBlackButton = (props) => (
  <PrimaryBlackButton {...props}>지원하기</PrimaryBlackButton>
);

/* Disabled */
export const DisabledSubmitButton = (props) => (
  <DisabledButton disabled {...props}>
    제출하기
  </DisabledButton>
);

/* Default */
export const RecruitInfoButton = (props) => (
  <DefaultButton {...props}>
    <span>14기 모집 안내 바로가기</span>
    <ArrowIcon src="/icons/arrowRight.svg" />
  </DefaultButton>
);

export const RecruitAlarmButton = (props) => (
  <DefaultButton {...props}>14기 모집 알림 받기</DefaultButton>
);

/* Recruit Check Button */
export const RecruitCheckButton = ({ children, ...props }) => (
  <DefaultButton {...props}>{children}</DefaultButton>
);

/* Recruit Disabled Button */
export const RecruitDisabledButton = (props) => (
  <RecruitDisabledStyle disabled {...props}>
    14기 지원 마감
  </RecruitDisabledStyle>
);

export const HomeButton = (props) => (
  <PrimaryButton {...props}>메인으로</PrimaryButton>
);

/* =========================
    styled-components
========================= */

const BaseButton = styled.button`
  display: flex;
  width: 24.375rem;
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
    width: 12.5rem;
    padding: 0.625rem 1.75rem;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    line-height: 1.375rem;
    gap: 0.25rem;
  }
`;

/* ===== Primary (white text) ===== */
const PrimaryButton = styled(BaseButton)`
  background-color: #05da5b;
  color: #ffffff;
`;

/* ===== Primary (black text) ===== */
const PrimaryBlackButton = styled(BaseButton)`
  background-color: #05da5b;
  color: #2a2a2a;

  @media (max-width: 799px) {
    color: #2a2a2a;
  }
`;

/* ===== Disabled ===== */
const DisabledButton = styled(BaseButton)`
  background-color: #a9a9a9;
  color: #ffffff;

  @media (max-width: 799px) {
    background-color: #9b9b9b;
  }
`;

/* ===== Default ===== */
const DefaultButton = styled(BaseButton)`
  background-color: #474747;
  color: #ffffff;

  @media (max-width: 799px) {
    width: 13.75rem;
    height: 2.625rem;
    padding: 0.625rem 1.5rem 0.625rem 1.75rem;
  }
`;

const RecruitDisabledStyle = styled(BaseButton)`
  background-color: #a9a9a9;
  color: #ffffff;

  @media (max-width: 799px) {
    width: 13.75rem;
    height: 2.625rem;
    padding: 0.625rem 1.5rem 0.625rem 1.75rem;
    background-color: #9b9b9b;
  }
`;

const ArrowIcon = styled.img`
  @media (max-width: 799px) {
    content: url('/icons/arrowRight2.svg');
  }
`;
