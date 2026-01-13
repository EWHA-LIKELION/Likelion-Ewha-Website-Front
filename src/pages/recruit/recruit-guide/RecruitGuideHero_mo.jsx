import styled from "styled-components";
import RecruitStatusButton from "../../../components/buttons/RecruitStatusButton";

const RecruitGuideHeroMo = () => {
    return (
        <Section>
            <Inner>
                <Content>
                    <Title>RECRUIT</Title>
                    <Description>
                        멋쟁이사자처럼 이화여대와 함께할 14기 아기사자를 모집합니다
                    </Description>

                    <ButtonGroup>
                        <RecruitStatusButton isMobile={true} pageType="recruit" />
                    </ButtonGroup>
                </Content>
            </Inner>
        </Section>
    );
};

export default RecruitGuideHeroMo;

const Section = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #000; 
`;

const Inner = styled.div`
    width: 100%;
    padding: 2.5rem 0rem 2.5rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;

    background: 
        url("/images/RecruitMoHero.png") center / cover no-repeat;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #ffffff;
`;

const Title = styled.h1`
    color: #FFF;
    text-align: center;
    font-family: Bayon;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem;
    margin-bottom: 0.12rem;
`;

const Description = styled.p`
    color: var(--Static-White, #FFF);
    text-align: center;

    /* Point (Kor)/Body */
    font-family: "Cafe24 PRO Slim";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.375rem; 
    margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
`;