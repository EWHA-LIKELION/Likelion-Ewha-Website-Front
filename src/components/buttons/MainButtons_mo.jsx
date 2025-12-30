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
    <SecondaryButton {...props}>
        자세한 내용 노션 바로가기
    </SecondaryButton>
);

export const DetailLinkDarkButtonMobile = (props) => (
    <SecondaryDarkButton {...props}>
        자세한 내용 노션 바로가기
    </SecondaryDarkButton>
);

/* Disabled */
export const DisabledSubmitButtonMobile = (props) => (
    <DisabledButton disabled {...props}>제출하기</DisabledButton>
);

/* Default */
export const RecruitInfoButtonMobile = (props) => (
    <DefaultButton {...props}>
        <span>14기 모집 안내 바로가기</span>
        <img src="/icons/arrowRight_2.svg" />
    </DefaultButton>
);

export const RecruitAlarmButtonMobile = (props) => (
    <DefaultButton {...props}>
        14기 모집 알림 받기
    </DefaultButton>
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
    background-color: #05DA5B;
    color: #ffffff;
    border: none;
`;

const PrimaryBlackButton = styled(BaseButton)`
    width: 12.5rem;
    padding: 0.625rem 1.75rem;
    background-color: #05DA5B;
    color: #2a2a2a;
    border: none;
`;

/* Secondary */
const SecondaryButton = styled(BaseButton)`
    width: 15.375rem;
    min-width: 12.4375rem;
    padding: 0.625rem 1.75rem;
    background-color: #ffffff;
    border: 1.5px solid #05DA5B;
    color: #05DA5B;
`;

/* Secondary Dark */
const SecondaryDarkButton = styled(BaseButton)`
    width: 15.375rem;
    height: 2.625rem;
    min-width: 12.4375rem;
    border: 1px solid var(--Primary-Main, #05DA5B);
    background: rgba(30, 30, 30, 0.80);
    color: #05DA5B;
`;

/* Default */
const DefaultButton = styled(BaseButton)`
    width: 12.34375rem;
    height: 2rem;
    padding: 0.5625rem 1.125rem;
    background-color: #474747;
    color: #ffffff;
    border: none;
    gap: 0.25rem;
    font-size: 0.625rem;
`;

/* Disabled */
const DisabledButton = styled(BaseButton)`
    width: 12.5rem;
    padding: 0.625rem 1.75rem;
    background-color: #9B9B9B;
    color: #ffffff;
    border: none;
`;
