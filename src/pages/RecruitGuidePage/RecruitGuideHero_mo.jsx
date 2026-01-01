import styled from "styled-components";
import {
    ApplyBlackButtonMobile,
    DetailLinkDarkButtonMobile,
} from "../../components/buttons/MainButtons_mo"; 

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
                        <ApplyBlackButtonMobile />
                        <DetailLinkDarkButtonMobile />
                    </ButtonGroup>

                    <SubText>
                        지원서를 제출하셨나요? <span>지원서 열람하기</span>
                    </SubText>
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
    gap: 0.5rem;
    width: 100%;
    align-items: center; 
    justify-content: center;
    margin-bottom: 0.75rem;

`;

const SubText = styled.p`
    color: var(--Atomic-Neutral-90, var(--Neutral-90, #C4C4C4));
    text-align: center;

    /* Footnote/regular */
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; /* 166.667% */

    span {
        color: var(--Atomic-Neutral-90, var(--Neutral-90, #C4C4C4));

        /* Footnote/regular */
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.25rem;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-skip-ink: none;
        text-decoration-thickness: auto;
        text-underline-offset: auto;
        text-underline-position: from-font;
    }
`;