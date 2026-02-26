import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import RecruitHero from "./RecruitHero";
import RecruitBasicInfo from "./RecruitBasicInfo";
import RecruitDetailInfo from "./RecruitDetailInfo";

const RecruitGuide = () => {
  return (
    <>
      <Helmet>
        <title>리크루팅 | 이화여대 멋쟁이사자처럼</title>
        <meta
          name="description"
          content="이화여대 멋쟁이사자처럼 신입 부원 모집 안내. 기획/디자인, 프론트엔드, 백엔드 파트 지원 방법과 일정, FAQ를 확인하세요. 함께 성장할 아기사자를 기다립니다!"
        />
        <meta
          property="og:title"
          content="리크루팅 | 이화여대 멋쟁이사자처럼"
        />
        <meta
          property="og:description"
          content="이화여대 멋쟁이사자처럼 신입 부원 모집 안내. 기획/디자인, 프론트엔드, 백엔드 파트 지원 방법과 일정을 확인하세요."
        />
        <meta
          property="og:url"
          content="https://likelion.ewha.university/recruit"
        />
        <link rel="canonical" href="https://likelion.ewha.university/recruit" />
      </Helmet>
      <PageWrapper>
        <RecruitHero />
        <RecruitBasicInfo />
        <RecruitDetailInfo />
      </PageWrapper>
    </>
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
