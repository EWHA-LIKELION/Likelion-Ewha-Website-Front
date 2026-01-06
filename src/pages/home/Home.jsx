import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import IntroSection from "./IntroSection";
import IntroSection2 from "./IntroSection2";
import EndSection from "./EndSection";
import HomeMid from "./HomeMid";

const Home = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash === '#curriculum') {
      document.getElementById('curriculum')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  }, [location]);

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
