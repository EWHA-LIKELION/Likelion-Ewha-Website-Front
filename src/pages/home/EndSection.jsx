import styled, { keyframes } from "styled-components";
import Carousel1 from "../../components/carousel/Carousel1";
import ImageSlider from "../../components/carousel/ImageSlider";
import CloverIcon from "../../../public/icons/clover.svg";
import Clover1Icon from "../../../public/icons/clover1.svg";
import orangePattern from "../../../public/icons/orange1.svg";
import greenPattern from "../../../public/icons/green.svg";

import RecruitStatusButton from "../../components/buttons/RecruitStatusButton";

const EndSection = () => {
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
            <PcMoreButton onClick={goInstagram}>더보기</PcMoreButton>
          </div>

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
              <div className="top-row">
                <span>GRW</span>
                <img src={Clover1Icon} alt="flower" className="flower-o" />
                <span>L TO</span>
              </div>
              <span className="green-text">WORLD!</span>
            </div>
          </LogoWrapper>

          <PcButtonArea>
            <RecruitStatusButton isMobile={false} />
          </PcButtonArea>

          <MobileButtonArea>
            <RecruitStatusButton isMobile={true} />
          </MobileButtonArea>
        </FooterContent>
      </FooterSection>
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
  padding: 3.75rem 5rem;
  overflow: hidden;

  @media (min-width: 800px) and (max-width: 1019px) {
    padding: 3rem 1rem;
  }

  @media (max-width: 799px) {
    padding: 2rem 1rem;
  }
  @media (max-width: 375px) {
    padding: 2rem 0.5rem;
  }

  & > div {
    gap: 4rem;

    @media (min-width: 800px) and (max-width: 1019px) {
      gap: 0;
      flex-direction: column;
      max-width: 650px !important;
      margin: 0 auto;
      align-items: stretch;
    }

    @media (max-width: 799px) {
      flex-direction: column;
      gap: 2rem;
      text-align: center;
      align-items: center;
    }
  }

  .carousel-box {
    flex-shrink: 0;

    @media (min-width: 800px) and (max-width: 1019px) {
      width: 100% !important;
      display: flex;
      justify-content: center;
    }

    @media (max-width: 799px) {
      order: 2;
      width: 100%;
    }
  }

  .text-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: 800px) and (max-width: 1019px) {
      width: 100% !important;
      align-items: flex-start !important;
      text-align: left;
      padding: 0 !important;
    }

    @media (max-width: 799px) {
      order: 1;
      align-items: center;
    }

    .title {
      font-family: Bayon;
      font-size: 3rem;
      line-height: 2.875rem;
      font-weight: 400;
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
        display: none;
      }
    }
  }
`;

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

  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 799px) {
    padding: 0.625rem 1.75rem;
    font-size: 0.875rem;
    line-height: 1.375rem;
    margin-top: 0;
  }
`;

const PcMoreButton = styled(MoreButton)`
  @media (max-width: 799px) {
    display: none;
  }
`;

const MobileMoreButtonWrapper = styled.div`
  display: none;
  @media (max-width: 799px) {
    display: block;
    order: 3;
    margin-top: 0;
  }
`;

/* --- [2] Orange Area--- */
const OrangeArea = styled.div`
  background: #ffce8a;
  padding-top: 5rem;
  padding-bottom: 11rem;
  display: flex;
  flex-direction: column;

  .news-header {
    width: 100%;
    padding-left: max(0px, calc((100% - 960px) / 2));
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
  @media (min-width: 800px) and (max-width: 1099px) {
    .news-header {
      padding-left: 5rem;
    }
  }

  @media (max-width: 799px) {
    padding-top: 2rem;
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
        font-size: 1rem;
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

  @media (max-width: 799px) {
    margin-top: -3.75rem;
    padding-left: 0;
  }
`;

/* --- [3] Footer Section --- */
const FooterSection = styled.section`
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
    min-height: 22rem; /* RecruitPart 스타일 적용 */
    height: auto !important;
    padding: 4.5rem 1rem 4rem 1rem;
    align-items: center; /* IntroSection과 동일하게 center */
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.3em;

    flex-wrap: nowrap;
    white-space: nowrap;

    /* [1] 윗줄 그룹 (GRW + 꽃 + L TO) */
    .top-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
    }

    .flower-o {
      width: 6.54481rem;
      height: 7.03531rem;
      object-fit: contain;
      animation: ${rotate} 10s linear infinite;
      margin: 0 5px;
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
      flex-direction: row;
      font-size: 13vw;
      gap: 0.2em;

      .flower-o {
        width: 0.7em;
        height: 0.75em;
        margin: 0 0.1em;
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
