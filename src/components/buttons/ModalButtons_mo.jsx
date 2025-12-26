import styled from "styled-components";

/* =========================
    Finished Modal Buttons (Mobile)
========================= */

/* Primary */
export const ModalConfirmButtonMobile = (props) => (
    <PrimaryButton {...props}>확인</PrimaryButton>
);

export const ModalConfirmWhiteButtonMobile = (props) => (
    <PrimaryWhiteButton {...props}>확인</PrimaryWhiteButton>
);

export const ModalConfirmSmallButtonMobile = (props) => (
    <PrimarySmallButton {...props}>확인</PrimarySmallButton>
);

/* Secondary */
export const ModalCancelSmallButtonMobile = (props) => (
    <SecondarySmallButton {...props}>취소</SecondarySmallButton>
);

/* Disabled */
export const ModalDisabledConfirmButtonMobile = (props) => (
    <DisabledButton disabled {...props}>확인</DisabledButton>
);

/* =========================
    styled-components
========================= */

const BaseButton = styled.button`
    height: 2.75rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 62.4375rem;

    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; 

    white-space: nowrap;
`;

/* Primary (large) */
const PrimaryButton = styled(BaseButton)`
    width: 20rem;
    padding: 0.625rem 2.5rem;
    background-color: #05da5b;
    color: #ffffff;
    border: none;
`;

/* Primary (white) */
const PrimaryWhiteButton = styled(BaseButton)`
    width: 20rem;
    padding: 0.625rem 2.5rem;
    border-radius: 2.5rem;
    border: 1.5px solid var(--Neutral-95, #DCDCDC);
    background: var(--Common-100, #FFF);
    color: #9b9b9b;
`;

/* Primary (small) */
const PrimarySmallButton = styled(BaseButton)`
    width: 9.625rem;
    background-color: #05da5b;
    color: #ffffff;
    border: none;
`;

/* Secondary (small) */
const SecondarySmallButton = styled(BaseButton)`
    width: 9.625rem;
    padding: 0.625rem 2.5rem;
    background-color: #ffffff;
    color: #9b9b9b;
    border-radius: 2.5rem;
    border: 1.5px solid var(--Neutral-95, #DCDCDC);
    background: var(--Common-100, #FFF);
`;

/* Disabled */
const DisabledButton = styled(BaseButton)`
    width: 20rem;
    padding: 0.625rem 2.5rem;
    background-color: #9b9b9b;
    color: #ffffff;
    border: none;
`;
