import styled from "styled-components";
import RecruitHero from "./RecruitHero";
import RecruitBasicInfo from "./RecruitBasicInfo";
import RecruitDetailInfo from "./RecruitDetailInfo";

const RecruitGuide = () => {
    return (
        <PageWrapper>
            <RecruitHero />
            <RecruitBasicInfo />
            <RecruitDetailInfo />
        </PageWrapper>
    );
};

export default RecruitGuide;

const PageWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-x: hidden;

    transition: all 0.2s ease;

    @media (max-width: 1440px) and (min-width: 800px) {
        font-size: 0.6944vw; 
    }
`;
