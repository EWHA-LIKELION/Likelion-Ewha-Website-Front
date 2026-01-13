import styled from "styled-components";

/* =========================
    Time Buttons (Responsive)
    - time 값만 props로 받음
========================= */

export const TimeDisabled = ({ time }) => (
    <DisabledButton>{time}</DisabledButton>
);

export const TimeAbled = ({ time }) => (
    <AbledButton>{time}</AbledButton>
);

export const TimeSelectedAdmin = ({ time }) => (
    <SelectedAdminButton>{time}</SelectedAdminButton>
);

export const TimeSelected = ({ time }) => (
    <SelectedButton>{time}</SelectedButton>
);

/* =========================
    styled-components
========================= */

const BaseTimeButton = styled.div`
    width: 3.25rem;
    height: 1.75rem;
    padding: 0.25rem 0.625rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.375rem;

    overflow: hidden;
    color: var(--Static-White, #FFF);
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
`;

/* Disabled */
const DisabledButton = styled(BaseTimeButton)`
    background-color: #ffffff;
    color: #C4C4C4;
    border: 1px solid var(--Atomic-Neutral-99, #F1F1F1);
    font-weight: 400;
`;

/* Abled */
const AbledButton = styled(BaseTimeButton)`
    background-color: #ffffff;
    color: #737373;
    border: 1px solid var(--Atomic-Neutral-99, #F1F1F1);
    font-weight: 400;
`;

/* Selected (Admin) */
const SelectedAdminButton = styled(BaseTimeButton)`
    background-color: #05da5b;
    color: #ffffff;
`;

/* Selected */
const SelectedButton = styled(BaseTimeButton)`
    background-color: #ff9b38;
    color: #ffffff;
`;
