import styled from "styled-components";

/* =========================
    Finished Main Buttons (Mobile)
========================= */

/* Primary */
export const SubmitButtonMobile = (props) => (
  <PrimaryButton {...props}>제출하기</PrimaryButton>
);

export const ApplyButtonMobile = (props) => (
  <PrimaryButton {...props}>지원하기</PrimaryButton>
);

export const ApplyBlackButtonMobile = (props) => (
  <PrimaryBlackButton {...props}>지원하기</PrimaryBlackButton>
);

/* Secondary */
export const DetailLinkButtonMobile = (props) => (
  <SecondaryButton {...props}>자세한 내용 노션 바로가기</SecondaryButton>
);

export const DetailLinkDarkButtonMobile = (props) => (
  <SecondaryDarkButton {...props}>
    자세한 내용 노션 바로가기
  </SecondaryDarkButton>
);

/* Disabled */
export const DisabledSubmitButtonMobile = (props) => (
  <DisabledButton disabled {...props}>
    제출하기
  </DisabledButton>
);

/* Default */
export const RecruitInfoButtonMobile = (props) => (
  <DefaultButton {...props}>
    <span>14기 모집 안내 바로가기</span>
    <img src="/icons/arrowRight2.svg" />
  </DefaultButton>
);

export const RecruitAlarmButtonMobile = (props) => (
  <DefaultButton {...props}>14기 모집 알림 받기</DefaultButton>
);

/* [추가 1] 합격자 조회 버튼 */
export const RecruitCheckButtonMobile = ({ children, ...props }) => (
  <DefaultButton {...props}>{children}</DefaultButton>
);

/* [추가 2] 모집 마감 버튼  */
export const RecruitDisabledButtonMobile = (props) => (
  <RecruitDisabledStyle disabled {...props}>
    14기 지원 마감
  </RecruitDisabledStyle>
);

/* =========================
    styled-components
========================= */

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 1.25rem;

  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem;

  cursor: pointer;
  white-space: nowrap;
`;

/* Primary */
const PrimaryButton = styled(BaseButton)`
  width: 12.5rem;
  padding: 0.625rem 1.75rem;
  background-color: #05da5b;
  color: #ffffff;
  border: none;
`;

const PrimaryBlackButton = styled(BaseButton)`
  width: 12.5rem;
  padding: 0.625rem 1.75rem;
  background-color: #05da5b;
  color: #2a2a2a;
  border: none;
`;

/* Secondary */
const SecondaryButton = styled(BaseButton)`
  width: 15.375rem;
  min-width: 12.4375rem;
  padding: 0.625rem 1.75rem;
  background-color: #ffffff;
  border: 1.5px solid #05da5b;
  color: #05da5b;
`;

/* Secondary Dark */
const SecondaryDarkButton = styled(BaseButton)`
  width: 15.375rem;
  height: 2.625rem;
  min-width: 12.4375rem;
  border: 1px solid var(--Primary-Main, #05da5b);
  background: rgba(30, 30, 30, 0.8);
  color: #05da5b;
`;

/* Default */
const DefaultButton = styled(BaseButton)`
  width: 13.75rem;
  height: 2.625rem;
  padding: 0.625rem 1.5rem 0.625rem 1.75rem;
  background-color: #474747;
  color: #ffffff;
  border: none;
  gap: 0.25rem;
  font-size: 0.875rem;
`;

/* Disabled */
const DisabledButton = styled(BaseButton)`
  width: 12.5rem;
  padding: 0.625rem 1.75rem;
  background-color: #9b9b9b;
  color: #ffffff;
  border: none;
`;

const RecruitDisabledStyle = styled(BaseButton)`
  width: 13.75rem; /* DefaultButton과 동일한 너비 */
  height: 2.625rem;
  padding: 0.625rem 1.5rem 0.625rem 1.75rem;

  background-color: #9b9b9b;
  color: #ffffff;
  border: none;
  cursor: default;
`;
