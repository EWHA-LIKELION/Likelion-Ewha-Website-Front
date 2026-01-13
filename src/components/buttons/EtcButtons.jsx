import styled from "styled-components";


/* Edit / Delete */
export const EditButton = (props) => (
    <LightGreenButton {...props}>수정</LightGreenButton>
);

export const DeleteButton = (props) => (
    <LightGreenButton {...props}>삭제</LightGreenButton>
);

/* Cancel */
export const CancelButton = (props) => (
    <OutlineGrayButton {...props}>취소</OutlineGrayButton>
);

/* Save */
export const SaveButton = (props) => (
    <PrimaryGreenButton {...props}>저장</PrimaryGreenButton>
);

/* Delete2 */
export const DeleteOutlineButton = (props) => (
    <OutlineGrayButton {...props}>삭제</OutlineGrayButton>
);

/* Register */
export const RegisterButton = (props) => (
    <PrimaryGreenButton {...props}>등록</PrimaryGreenButton>
);

/* Start / End */
export const StartButton = (props) => (
    <LightGreenButton {...props}>시작</LightGreenButton>
);

export const EndButton = (props) => (
    <LightGreenButton {...props}>마감</LightGreenButton>
);

/* =========================
    styled-components
========================= */

const BaseButton = styled.button`
    min-width: 6.75rem;
    height: 2.75rem;
    padding: 1.25rem 2.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 62.4375rem;

    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;

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
`;

/* 연한 초록 */
const LightGreenButton = styled(BaseButton)`
    background-color: #D6FDDB;
    color: #00BF40;
    border: none;
`;

/* 진한 초록 */
const PrimaryGreenButton = styled(BaseButton)`
    background-color: #05DA5B;
    color: #FFFFFF;
    border: none;
`;

/* 회색 아웃라인 */
const OutlineGrayButton = styled(BaseButton)`
    color: #737373;
    border-radius: 62.4375rem;
    border: 1.5px solid var(--Neutral-95, #DCDCDC);
    background: var(--Neutral-_100, #FFF);
`;
