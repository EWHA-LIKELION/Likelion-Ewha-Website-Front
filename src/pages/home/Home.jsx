import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import IntroSection from "./IntroSection";
import IntroSection2 from "./IntroSection2";
import EndSection from "./EndSection";
import HomeMid from "./HomeMid";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#curriculum") {
      document.getElementById("curriculum")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>이화여대 멋쟁이사자처럼</title>
        <meta
          name="description"
          content="이화여대 멋쟁이사자처럼 공식 홈페이지. 이화여자대학교의 IT 창업 동아리로 개발, 기획, 디자인을 배우며 함께 성장합니다."
        />
        <meta property="og:title" content="이화여대 멋쟁이사자처럼" />
        <meta
          property="og:description"
          content="이화여대 멋쟁이사자처럼 공식 홈페이지. 이화여자대학교의 IT 창업 동아리로 개발, 기획, 디자인을 배우며 함께 성장합니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://likelion.ewha.university/" />
        <link rel="canonical" href="https://likelion.ewha.university/" />

        {/* 구조화된 데이터 - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "이화여대 멋쟁이사자처럼",
            alternateName: "Ewha LIKELION",
            url: "https://likelion.ewha.university",
            logo: "https://likelion.ewha.university/icons/favicon.svg",
            description:
              "이화여자대학교의 IT 창업 동아리로 개발, 기획, 디자인을 배우며 함께 성장합니다.",
            foundingDate: "2013",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Recruitment",
              url: "https://likelion.ewha.university/recruit",
            },
            memberOf: {
              "@type": "Organization",
              name: "멋쟁이사자처럼",
            },
            location: {
              "@type": "Place",
              name: "이화여자대학교",
            },
          })}
        </script>

        {/* 구조화된 데이터 - WebSite */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "이화여대 멋쟁이사자처럼",
            url: "https://likelion.ewha.university",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://likelion.ewha.university/project?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>
      <PageContainer>
        <IntroSection />
        <IntroSection2 />
        <HomeMid />
        <EndSection />
      </PageContainer>
    </>
  );
};

export default Home;

// --- 스타일 ---

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;
