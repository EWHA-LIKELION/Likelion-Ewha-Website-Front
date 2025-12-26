import styled from "styled-components";

/* ===== Primary ===== */
export const ModalPrimaryConfirmButton = (props) => (
    <ModalPrimaryButton {...props}>확인</ModalPrimaryButton>
);

export const ModalPrimaryConfirmSmallButton = (props) => (
    <ModalPrimarySmallButton {...props}>확인</ModalPrimarySmallButton>
);

/* ===== Secondary ===== */
export const ModalSecondaryConfirmButton = (props) => (
    <ModalSecondaryButton {...props}>확인</ModalSecondaryButton>
);

export const ModalSecondaryCancelButton = (props) => (
    <ModalSecondarySmallButton {...props}>취소</ModalSecondarySmallButton>
);

/* ===== Disabled ===== */
export const ModalDisabledConfirmButton = (props) => (
    <ModalDisabledButton disabled {...props}>
        확인
    </ModalDisabledButton>
);


const BaseModalButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0.875rem 2.5rem;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem;

    border-radius: 62.4375rem;

    &:disabled {
        cursor: not-allowed;
    }
`;

/* ===== Primary (large) ===== */
const ModalPrimaryButton = styled(BaseModalButton)`
    width: 24.6875rem;
    background-color: #05DA5B;
    color: #ffffff;
    border-color: transparent;
`;

/* ===== Primary (small) ===== */
const ModalPrimarySmallButton = styled(BaseModalButton)`
    width: 11.71875rem;
    background-color: #05DA5B;
    color: #ffffff;
    border-color: transparent;
`;

/* ===== Secondary (large) ===== */
const ModalSecondaryButton = styled(BaseModalButton)`
    width: 24.6875rem;
    background-color: #FFF;
    border: 1.5px solid var(--Primary-Main, #DCDCDC);
    color: #9B9B9B;
    
`;

/* ===== Secondary (small) ===== */
const ModalSecondarySmallButton = styled(BaseModalButton)`
    width: 11.71875rem;
    background-color: #FFF;
    border: 1.5px solid var(--Neutral-95, #DCDCDC);
    color: #9B9B9B;
`;


/* ===== Disabled ===== */
const ModalDisabledButton = styled(BaseModalButton)`
    width: 24.6875rem;
    background-color: #9B9B9B;
    color: #FFF;
    border-color: transparent;
`;
