import React from "react";
import styled from "styled-components";
import IntroSection from "./IntroSection";
import IntroSection2 from "./IntroSection2";
import EndSection from "./EndSection";
import HomeMid from "./HomeMid";

const Home = () => {
  return (
    <PageContainer>
      <IntroSection />
      <IntroSection2 />
      <HomeMid/>
      <EndSection />
    </PageContainer>
  );
};

export default Home;

// --- 스타일 ---

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
