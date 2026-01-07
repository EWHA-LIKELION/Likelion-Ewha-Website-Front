import styled from "styled-components";

/* =========================
    Finished Buttons 
========================= */

export const SubmitButton = (props) => (
  <PrimaryWhiteButton {...props}>제출하기</PrimaryWhiteButton>
);

export const ApplyButton = (props) => (
  <PrimaryBlackButton {...props}>지원하기</PrimaryBlackButton>
);

export const ApplyWhiteButton = (props) => (
  <PrimaryWhiteButton {...props}>지원하기</PrimaryWhiteButton>
);

export const DetailLinkButton = (props) => (
  <SecondaryButton {...props}>자세한 내용 노션 바로가기</SecondaryButton>
);

export const DetailLinkDarkButton = (props) => (
  <SecondaryDarkButton {...props}>
    자세한 내용 노션 바로가기
  </SecondaryDarkButton>
);

export const DisabledSubmitButton = (props) => (
  <DisabledButton disabled {...props}>
    제출하기
  </DisabledButton>
);

export const RecruitInfoButton = (props) => (
  <DefaultButton {...props}>
    <span>14기 모집 안내 바로가기</span>
    <img src="/icons/arrowRight.svg" />
  </DefaultButton>
);

export const RecruitAlarmButton = (props) => (
  <DefaultButton {...props}>14기 모집 알림 받기</DefaultButton>
);

/*리쿠루팅 버튼 추가된 부분 여기에 추가했습니다 */
// [추가 1] 합격자 조회 버튼 (내용이 바뀔 수 있게 children으로 받음) - case4,5
export const RecruitCheckButton = ({ children, ...props }) => (
  <DefaultButton {...props}>{children}</DefaultButton>
);

// [추가 2] 모집 마감 버튼 (회색, 비활성화)- case3
export const RecruitDisabledButton = (props) => (
  <RecruitDisabledStyle disabled {...props}>
    14기 지원 마감
  </RecruitDisabledStyle>
);

export const HomeButton = (props) => (
    <PrimaryWhiteButton {...props}>메인으로</PrimaryWhiteButton>
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

<<<<<<< HEAD
  &:disabled {
    cursor: not-allowed;
  }
=======
    &:disabled {
        cursor: not-allowed;
    }

    &:hover {
        filter: brightness(0.97);
    }
>>>>>>> 17cd96b (💄 메인 버튼 추가 및 호버 효과 개선)
`;

/* ===== Primary (white text) ===== */
const PrimaryWhiteButton = styled(BaseButton)`
  background-color: #05da5b;
  color: #ffffff;
`;

/* ===== Primary (black text) ===== */
const PrimaryBlackButton = styled(BaseButton)`
  background-color: #05da5b;
  color: #000000;
`;

/* ===== Secondary ===== */
const SecondaryButton = styled(BaseButton)`
  background-color: #ffffff;
  border: 1.5px solid var(--Primary-Main, #05da5b);
  color: #05da5b;
`;

/* ===== Secondary Dark ===== */
const SecondaryDarkButton = styled(BaseButton)`
  border-radius: 2.5rem;
  border: 1.5px solid var(--Primary-Main, #05da5b);
  background: rgba(30, 30, 30, 0.8);
  color: #05da5b;
`;

/* ===== Disabled ===== */
const DisabledButton = styled(BaseButton)`
  background-color: #a9a9a9;
  color: #ffffff;
  cursor: not-allowed;
`;

/* ===== Default ===== */
const DefaultButton = styled(BaseButton)`
  background-color: #474747;
  color: #ffffff;
`;

const RecruitDisabledStyle = styled(BaseButton)`
  background-color: #a9a9a9;
  color: #ffffff;
  cursor: default;

  &:hover {
    background-color: #d9d9d9; /* 호버 시 색상 변화 없음 */
  }
`;
