import styled from "styled-components";
import RecruitStatusButton from "../../../components/buttons/RecruitStatusButton";

const RecruitHero = () => {
    return (
        <Section>
            <Inner>
                <Content>
                    <Title>RECRUIT</Title>
                    <ButtonGroup>
                        <RecruitStatusButton pageType="recruit" />
                    </ButtonGroup>
                </Content>
            </Inner>
        </Section>
    );
};

export default RecruitHero;

const Section = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    
    @media (max-width: 799px) {
        background-color: #000;
    }
`;

const Inner = styled.div`
    width: 100%;
    height: 42.5rem; 

    display: flex;
    justify-content: center;

    padding: 7.62rem 0; 

    background:
        linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.65) 0%,
        rgba(0, 0, 0, 0.55) 45%,
        rgba(0, 0, 0, 0.15) 70%,
        rgba(0, 0, 0, 0) 100%
        ),
        url("/images/RecruitPcHero.png") center / cover no-repeat;
    
    @media (max-width: 799px) {
        height: auto;
        padding: 2.5rem 0;
        background: url("/images/RecruitMoHero.png") center / cover no-repeat;
    }
`;

const Content = styled.div`
    max-width: 1440px;
    padding: 0 80px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
    color: #ffffff;
    
    @media (max-width: 799px) {
        width: 100%;
        padding: 0;
    }
`;

const Title = styled.h1`
    display: flex;
    width: 35.125rem;
    height: 8.75rem;
    min-width: 25rem;
    flex-direction: column;
    justify-content: center;
    color: #FFF;
    text-align: center;
    font-family: Bayon;
    font-size: 8.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0; /* 0% */
    
    @media (max-width: 799px) {
        width: auto;
        height: auto;
        min-width: 0;
        font-size: 2.5rem;
        line-height: 2.5rem;
        margin-bottom: 0.12rem;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
    
    @media (max-width: 799px) {
        gap: 0.5rem;
    }
`;
