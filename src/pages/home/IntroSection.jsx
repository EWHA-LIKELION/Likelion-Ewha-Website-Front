import React from "react";
import styled, { keyframes } from "styled-components";
import orangePattern from "../../../public/icons/orange.svg";
import greenPattern from "../../../public/icons/green.svg";
import Clover1Icon from "../../../public/icons/clover1.svg";
import RecruitStatusButton from "../../components/buttons/RecruitStatusButton";

const IntroSection = () => {
  return (
    <Section>
      <PatternTop src={orangePattern} alt="" aria-hidden="true" />
      <PatternBottom src={greenPattern} alt="" aria-hidden="true" />

      <Content>
        <SubText>
          국내 최대 규모의 연합 IT 동아리 멋쟁이사자처럼 X 이화여자대학교
        </SubText>

        {/* 로고 영역 */}
        <LogoWrapper>
          <div className="big-title">
            <div className="top-row">
              <span>LIKELI</span>
              <img src={Clover1Icon} alt="logo-icon" className="flower-o" />
              <span>N</span>
            </div>
            <span className="green-text">EWHA</span>
          </div>
        </LogoWrapper>

        {/* [변경] PC 버튼 영역: 통합 컴포넌트 하나만 넣으면 끝! */}
        <PcButtonArea>
          <RecruitStatusButton isMobile={false} />
        </PcButtonArea>

        {/* [변경] Mobile 버튼 영역: 통합 컴포넌트 하나만 넣으면 끝! */}
        <MobileButtonArea>
          <RecruitStatusButton isMobile={true} />
        </MobileButtonArea>

        {/* 하단 텍스트(지원서 열람 등)와 모달(Modal)들도 
            RecruitStatusButton 안에 다 들어있어서 여기엔 필요 없습니다. */}
      </Content>
    </Section>
  );
};

export default IntroSection;

/* --- 스타일 컴포넌트 (기존 유지) --- */

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Section = styled.section`
  position: relative;
  width: 100%;
  background: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;

  align-items: center;
  min-height: 39.1875rem;
  padding: 5rem 18.5625rem;

  @media (max-width: 799px) {
    min-height: 22rem;
    height: auto !important;
    padding: 4.5rem 1rem 4rem 1rem;
    align-items: center;
    min-width: 0;
  }
`;

const PatternTop = styled.img`
  position: absolute;
  z-index: 0;
  display: block;
  left: 2.89888rem;
  top: 0;
  transition: all 0.2s ease;

  @media (max-width: 799px) {
    transform: scale(0.5);
    transform-origin: left top;
  }
`;

const PatternBottom = styled.img`
  position: absolute;
  z-index: 0;
  display: block;
  right: 0;
  top: 17rem;
  transition: all 0.2s ease;

  @media (max-width: 799px) {
    transform: scale(0.5);
    transform-origin: right top;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const SubText = styled.p`
  color: var(--Atomic-Cool-Neutral-70, #989ba2);
  text-align: center;
  font-family: "Cafe24 PRO Slim";
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2.25rem;
  margin-bottom: 0.5rem;
  word-break: keep-all;

  @media (max-width: 799px) {
    font-size: 0.625rem;
    margin-bottom: 12px;
    line-height: normal;
  }
`;

const LogoWrapper = styled.div`
  width: auto;
  max-width: 100%;
  margin-bottom: 0;

  .big-title {
    font-family: "Bayon", sans-serif;
    font-size: 9.704rem;
    color: #1a1a1a;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.2em;

    .top-row {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .flower-o {
      width: 6.54481rem;
      height: 7.03531rem;
      margin: 0 5px;
      object-fit: contain;
      animation: ${rotate} 10s linear infinite;
    }

    .green-text {
      color: #6ede65;
    }
  }
  @media (max-width: 1300px) {
    .big-title {
      flex-direction: column;
      gap: 0;
      line-height: 1.1;

      .flower-o {
        width: 0.7em;
        height: 0.75em;
      }
    }
  }

  @media (max-width: 799px) {
    .big-title {
      gap: 0.2em;
      flex-direction: row;
      font-size: 13vw;
    }
  }
`;

const PcButtonArea = styled.div`
  display: block;
  margin-top: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 799px) {
    display: none !important;
  }
`;

const MobileButtonArea = styled.div`
  display: none;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;
  justify-content: center;

  @media (max-width: 799px) {
    display: flex !important;
  }
`;
