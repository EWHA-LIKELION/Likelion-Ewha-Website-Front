import styled from "styled-components";

export const SelectPositiveButton = (props) => (
    <SelectedButton {...props}>대면</SelectedButton>
);

export const SelectNegativeButton = (props) => (
    <SelectedButton {...props}>비대면</SelectedButton>
);

export const UnselectPositiveButton = (props) => (
    <UnselectedButton {...props}>대면</UnselectedButton>
);

export const UnselectNegativeButton = (props) => (
    <UnselectedButton {...props}>비대면</UnselectedButton>
);

export const SelectedRadio = () => (
    <RadioSelected>
        <RadioInner />
    </RadioSelected>
);

export const UnselectedRadio = () => <RadioUnselected />;


const BaseSelectButton = styled.button`
    width: 16.09375rem;
    height: 2.625rem;
    padding: 0.625rem 2.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 2.5rem;

    color: var(--Static-White, #FFF);
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.375rem;

    cursor: pointer;
`;

/* ===== Selected ===== */
const SelectedButton = styled(BaseSelectButton)`
    background-color: #FF9B38;
    color: #ffffff;
    border: none;
`;

/* ===== Unselected ===== */
const UnselectedButton = styled(BaseSelectButton)`
    background-color: #FFF;
    color: #737373;
    border: 1.5px solid var(--Neutral-95, #DCDCDC);
`;

/* ===== Radio ===== */
const RadioWrapper = styled.div`
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--unit-64, 4rem);
    border: 1px solid var(--Neutral-95, #DCDCDC);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RadioSelected = styled(RadioWrapper)`
    border: 1.5px solid #DCDCDC;
`;

const RadioInner = styled.div`
    width: 0.75rem;
    height: 0.75rem;
    aspect-ratio: 1/1;
    border-radius: var(--unit-64, 4rem);
    background: var(--Primary-sub, #FF9B38);
`;

const RadioUnselected = styled(RadioWrapper)`
    border: 1.5px solid #DCDCDC;
`;
