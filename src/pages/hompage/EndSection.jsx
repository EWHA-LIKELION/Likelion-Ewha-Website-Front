import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Carousel1 from "../../components/carousel/Carousel1";
import ImageSlider from "../../components/carousel/ImageSlider";
import CloverIcon from "../../../public/icons/clover.svg";
import Clover1Icon from "../../../public/icons/clover1.svg";
import orangePattern from "../../../public/icons/orange.svg";
import greenPattern from "../../../public/icons/green.svg";

import {
  RecruitAlarmButton,
  RecruitInfoButton,
} from "../../components/buttons/MainButtons_pc";

import {
  RecruitAlarmButtonMobile,
  RecruitInfoButtonMobile,
} from "../../components/buttons/MainButtons_mo";

import { Modal } from "../../components/Modal";

const EndSection = () => {
  // --------------------------------------------------------
  // 1. 상태 관리
  // --------------------------------------------------------
  const isRecruiting = false; // false(마감/알림) / true(모집중)

  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  const goRecruitPage = () => {
    window.open("https://apply.likelion.org", "_blank");
  };

  const openCodeModal = (e) => {
    e.preventDefault();
    setCodeValue("");
    setIsCodeModalOpen(true);
  };

  const openAlarmModal = () => {
    setIsAlarmModalOpen(true);
  };

  const handleCheckCode = () => {
    if (codeValue.trim() === "") return;
    alert(`입력한 코드: ${codeValue}\n확인되었습니다! (API 연결 추후에 필요)`);
    setIsCodeModalOpen(false);
  };

  const goKakaoChannel = () => {
    window.open("https://pf.kakao.com/_htxexfd", "_blank");
  };

  const goInstagram = () => {
    window.open("https://www.instagram.com/likelion_ewha/", "_blank");
  };

  return (
    <SectionWrapper>
      {/* === [Part 1] 초록색 영역: REVIEW === */}
      <GreenArea>
        <InnerContainer>
          <div className="carousel-box">
            <Carousel1 />
          </div>

          <div className="text-box">
            <IconBox>
              <img src={CloverIcon} alt="icon" />
            </IconBox>
            <h2 className="title">REVIEW</h2>
            <p className="subtitle">
              이대 멋사를 수료한 벗들의 <br />
              솔직한 활동 후기
            </p>
            {/* PC용 더보기 버튼 (모바일에서 숨김) */}
            <PcMoreButton onClick={goInstagram}>더보기</PcMoreButton>
          </div>

          {/* 3. 모바일용 더보기 버튼 (PC:숨김 / MO:맨아래) */}
          <MobileMoreButtonWrapper>
            <MoreButton onClick={goInstagram}>더보기</MoreButton>
          </MobileMoreButtonWrapper>
        </InnerContainer>
      </GreenArea>

      {/* === [Part 2] 주황색 영역: NEWS === */}
      <OrangeArea>
        <InnerContainer $column>
          <div className="news-header">
            <IconBox>
              <img src={CloverIcon} alt="icon" />
            </IconBox>
            <div className="text-group">
              <h2 className="title">NEWS</h2>
              <p className="subtitle">
                LIKELION EWHA의 다양한 이야기가 더 궁금하다면?
              </p>
            </div>
          </div>
        </InnerContainer>
      </OrangeArea>

      <SliderWrapper>
        <ImageSlider />
      </SliderWrapper>

      {/* === [Part 3] 흰색 영역: Footer === */}
      <FooterSection>
        <PatternTop src={orangePattern} alt="" aria-hidden="true" />
        <PatternBottom src={greenPattern} alt="" aria-hidden="true" />

        <FooterContent>
          <LogoWrapper>
            <div className="big-title">
              <span>GRW</span>
              <img src={Clover1Icon} alt="flower" className="flower-o" />
              <span>
                L TO <span className="green-text">WORLD!</span>
              </span>
            </div>
          </LogoWrapper>

          {/* PC 버튼 */}
          <PcButtonArea>
            {isRecruiting ? (
              <RecruitInfoButton onClick={goRecruitPage} />
            ) : (
              <RecruitAlarmButton onClick={openAlarmModal} />
            )}
          </PcButtonArea>

          {/* Mobile 버튼 */}
          <MobileButtonArea>
            {isRecruiting ? (
              <RecruitInfoButtonMobile onClick={goRecruitPage} />
            ) : (
              <RecruitAlarmButtonMobile onClick={openAlarmModal} />
            )}
          </MobileButtonArea>

          {/* 하단 텍스트 */}
          {isRecruiting ? (
            <SubLink href="#" onClick={openCodeModal}>
              지원서를 제출하셨나요? <u>지원서 열람하기</u>
            </SubLink>
          ) : (
            <EndText>13기 모집이 종료되었습니다.</EndText>
          )}
        </FooterContent>
      </FooterSection>

      {/* 모달 컴포넌트들 */}
      <Modal
        open={isAlarmModalOpen}
        onClose={() => setIsAlarmModalOpen(false)}
        type="info"
        title="14기 모집 사전 알림 등록"
        description={
          "이화여대 멋쟁이사자처럼 카카오톡 채널을 통해\n모집이 시작되면 가장 먼저 알려드릴게요."
        }
        align="center"
        actions={[
          {
            label: "카카오톡 바로가기",
            variant: "primary",
            fullWidth: true,
            onClick: goKakaoChannel,
          },
        ]}
      />

      <Modal
        open={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        type="form"
        title="지원 코드 입력"
        description={
          "지원서를 열람하기 위해서\n지원서 작성시에 발급받은 지원 코드가 필요해요."
        }
        align="left"
        input={{
          value: codeValue,
          onChange: (e) => setCodeValue(e.target.value),
          placeholder: "코드를 입력해주세요.",
        }}
        actions={[
          {
            label: "확인",
            variant: "primary",
            fullWidth: true,
            disabled: codeValue.length === 0,
            onClick: handleCheckCode,
          },
        ]}
        helper={{
          text: "지원 코드를 잊어버리셨나요? ",
          actionText: "카카오톡 문의하기",
          onAction: goKakaoChannel,
        }}
      />
    </SectionWrapper>
  );
};

export default EndSection;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SectionWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: ${({ $column }) => ($column ? "column" : "row")};
  align-items: center;
  justify-content: center;
`;

const IconBox = styled.div`
  img {
    width: 2rem;
    height: 2rem;
    object-fit: contain;

    @media (max-width: 799px) {
      width: 1.25rem;
      height: 1.34369rem;
    }
  }
`;

/* --- [1] Green Area --- */
const GreenArea = styled.div`
  background: #98fba4;
  padding: 80px 0;
  overflow: hidden;

  & > div {
    gap: 4rem;
    @media (max-width: 799px) {
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
    }
  }

  /* 1. 캐러셀 */
  .carousel-box {
    flex-shrink: 0;
    @media (max-width: 799px) {
      order: 2; /* 텍스트(1) 다음 */
      margin-bottom: 0.5rem;
    }
  }

  /* 2. 텍스트 박스 */
  .text-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 799px) {
      order: 1; /* 제일 위로 */
      align-items: center;
    }

    .title {
      font-family: Bayon;
      font-size: 3rem;
      line-height: 2.875rem;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      font-family: "Cafe24 PRO Slim";
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2.25rem;
    }
    @media (max-width: 799px) {
      .title {
        font-size: 1.875rem;
        line-height: 2.5rem;
      }
      .subtitle {
        font-size: 1rem;
        line-height: 1.5rem;
      }
      .subtitle br {
        display: none; /* 줄바꿈 제거 */
      }
    }
  }
`;

/* 공통 더보기 버튼 스타일 */
const MoreButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.875rem 2.25rem;
  border-radius: 2.5rem;
  background: var(--Neutral-30, #474747);
  color: white;
  border: none;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  cursor: pointer;
  @media (max-width: 799px) {
    padding: 0.625rem 1.75rem;
    font-size: 0.875rem;
    line-height: 1.375rem;
    margin-top: 0;
  }
`;

/* PC용 버튼 (모바일 숨김) */
const PcMoreButton = styled(MoreButton)`
  @media (max-width: 799px) {
    display: none;
  }
`;

const MobileMoreButtonWrapper = styled.div`
  display: none;
  @media (max-width: 799px) {
    display: block;
    order: 3; /* 캐러셀(2) 다음 */
    margin-top: 0;
  }
`;

/* --- [2] Orange Area--- */
const OrangeArea = styled.div`
  background: #ffce8a;
  padding-top: 80px;
  padding-bottom: 11rem;
  display: flex;
  flex-direction: column;

  .news-header {
    width: 100%;
    padding-left: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title {
      font-family: Bayon;
      font-size: 3rem;
      font-style: normal;
      font-weight: 400;
      line-height: 2.875rem;
    }
    .subtitle {
      color: var(--Atomic-Neutral-50, var(--Neutral-50, #737373));
      font-family: "Cafe24 PRO Slim";
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2.25rem;
    }
  }

  @media (max-width: 799px) {
    padding-top: 60px;
    padding-bottom: 6rem;
    .news-header {
      padding-left: 0;
      align-items: center;
      text-align: center;

      .title {
        font-size: 1.875rem;
        line-height: 2.5rem;
      }
      .subtitle {
        font-size: 1rem; /* 1.5rem -> 1rem */
        line-height: 1.5rem;
      }
    }
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  margin-top: -7.5rem;
  position: relative;
  z-index: 10;
  padding-left: max(20px, calc((100% - 1000px) / 2 + 20px));
  overflow-x: visible;
  & > div {
    padding-left: 0 !important;
  }
  @media (max-width: 799px) {
    margin-top: -3.75rem;
    padding-left: 100px;
  }
`;

/* --- [3] Footer Section --- */
const FooterSection = styled.section`
  position: relative;
  width: 100%;
  background: #fff;
  overflow: visible;

  display: flex;
  justify-content: center;

  align-items: center;
  min-height: 39.1875rem;
  padding: 5rem 18.5625rem;

  @media (max-width: 799px) {
    min-height: unset !important;
    height: auto !important;
    padding: 4.5rem 1rem 4rem 1rem;
    align-items: flex-start;
    min-width: 0;
  }
`;

const PatternTop = styled.img`
  position: absolute;
  z-index: 0;
  display: block;
  width: 10.00025rem;
  height: 10.00025rem;
  left: 7.89888rem;
  top: -3.38275rem;

  @media (max-width: 799px) {
    width: 3.75rem;
    height: 3.75rem;
    left: 2.375rem;
    top: -1.5rem;
  }
`;

const PatternBottom = styled.img`
  position: absolute;
  z-index: 0;
  display: block;
  width: 14rem;
  right: 0;
  top: 20.1875rem;

  @media (max-width: 799px) {
    width: 5.25rem;
    top: 13.25rem;
    right: 0;
  }
`;

const FooterContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
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
    align-items: center;
    justify-content: center;

    flex-wrap: nowrap;
    white-space: nowrap;

    .flower-o {
      width: 6.54481rem;
      height: 7.03531rem;
      object-fit: contain;
      animation: ${rotate} 10s linear infinite;
    }
    .green-text {
      color: #6ede65;
    }
  }

  @media (max-width: 1200px) {
    .big-title {
      font-size: 13vw;
      .flower-o {
        width: 0.7em;
        height: 0.75em;
      }
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

const SubLink = styled.a`
  color: #888888;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  u {
    margin-left: 6px;
    color: #555;
    font-weight: 600;
    text-underline-offset: 3px;
  }
  &:hover u {
    color: #000;
  }
  @media (max-width: 799px) {
    font-size: 0.8rem;
  }
`;

const EndText = styled.p`
  color: #888888;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.25rem;
  @media (max-width: 799px) {
    font-size: 0.8rem;
  }
`;
