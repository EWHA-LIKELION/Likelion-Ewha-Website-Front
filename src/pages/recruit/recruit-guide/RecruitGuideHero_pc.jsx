import styled from "styled-components";
import RecruitStatusButton from "../../../components/buttons/RecruitStatusButton";

const RecruitGuideHeroPc = () => {
    return (
        <Section>
            <Inner>
                <Content>
                    <Title>RECRUIT</Title>
                    <Description>
                        멋쟁이사자처럼 이화여대와 함께할 14기 아기사자를 모집합니다
                    </Description>

                    <ButtonGroup>
                        <RecruitStatusButton isMobile={false} pageType="recruit" />
                    </ButtonGroup>
                </Content>
            </Inner>
        </Section>
    );
};

export default RecruitGuideHeroPc;


const Section = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
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
`;

const Content = styled.div`
    max-width: 1440px;
    padding: 0 80px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
    color: #ffffff;
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
`;

const Description = styled.p`
    width: 38rem;
    min-width: 25rem;
    color: var(--Atomic-Cool-Neutral-98, var(--Cool-Neutral-98, #F4F4F5));
    text-align: center;

    /* Point (Kor)/H2 */
    font-family: "Cafe24 PRO Slim";
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.625rem; 

    margin-top: 1.5rem;
    margin-bottom: 5rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
`;
