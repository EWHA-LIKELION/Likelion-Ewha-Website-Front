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

export const DetailLinkButton = (props) => (
    <SecondaryButton {...props}>
        자세한 내용 노션 바로가기
    </SecondaryButton>
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
    <DefaultButton {...props}>
        14기 모집 알림 받기
    </DefaultButton>
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

    &:disabled {
        cursor: not-allowed;
    }
`;

/* ===== Primary (white text) ===== */
const PrimaryWhiteButton = styled(BaseButton)`
    background-color: #05DA5B;
    color: #ffffff;
`;

/* ===== Primary (black text) ===== */
const PrimaryBlackButton = styled(BaseButton)`
    background-color: #05DA5B;
    color: #000000;

`;

/* ===== Secondary ===== */
const SecondaryButton = styled(BaseButton)`
    background-color: #ffffff;
    border: 1.5px solid var(--Primary-Main, #05DA5B);
    color: #05DA5B;
`;

/* ===== Secondary Dark ===== */
const SecondaryDarkButton = styled(BaseButton)`
    border-radius: 2.5rem;
    border: 1.5px solid var(--Primary-Main, #05DA5B);
    background: rgba(30, 30, 30, 0.80);
    color: #05DA5B;
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