import React, { useState } from "react";
import styled from "styled-components";
import NexIcon from "../../../public/icons/next.svg";
import PrevIcon from "../../../public/icons/previous.svg";
import REVIEW_DATA from "../../data/reviews.json";

const Carousel1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEW_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === REVIEW_DATA.length - 1 ? 0 : prev + 1));
  };

  const currentData = REVIEW_DATA[currentIndex];

  return (
    <Container>
      <NavButton onClick={handlePrev} $isPrev>
        <img src={PrevIcon} alt="이전" />
      </NavButton>

      <CardWrapper>
        {/* DecoCard는 CSS에서 모바일일 때 display: none 처리됨 */}
        <DecoCard $index={2} />
        <DecoCard $index={1} />

        <MainCard>
          <ScrollContent>
            <CardHeader>{currentData.title}</CardHeader>
            <CardBody>{currentData.desc}</CardBody>
          </ScrollContent>

          <CardFooter>
            <strong>{currentData.name}</strong>
            <span>{currentData.role}</span>
          </CardFooter>
        </MainCard>
      </CardWrapper>

      <NavButton onClick={handleNext}>
        <img src={NexIcon} alt="다음" />
      </NavButton>
    </Container>
  );
};

export default Carousel1;

const Container = styled.div`
  position: relative;
  /* Desktop 기본값 */
  width: 38.171rem;
  height: 18.25863rem;
  margin: 50px auto;

  @media (max-width: 799px) {
    width: 25rem;
    height: 20.68rem;
    margin: 20px auto;
  }

  @media (max-width: 500px) {
    width: 19.97rem;
    height: 20.68rem;
    margin: 20px auto;
  }

  @media (max-width: 360px) {
    width: 100%;
    max-width: 19.97rem; /* 원하면 유지 */
    height: 22rem;
  }
`;

const NavButton = styled.button`
  /* Desktop 크기 */
  width: 3.24581rem;
  height: 3.175rem;
  border-radius: 50%;

  /* 버튼 스타일 초기화 및 배치 */
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ${(props) => (props.$isPrev ? `left: -25px;` : `right: -25px;`)}
  transition: 0.2s;

  /* 내부 이미지 꽉 채우기 */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (max-width: 799px) {
    width: 1.875rem;
    height: 1.875rem;

    /* 모바일에서는 버튼이 너무 밖으로 나가면 잘리므로 안쪽으로 당김 */
    ${(props) => (props.$isPrev ? `left: -13px;` : `right: -13px;`)}
  }
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BaseCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 1.04838rem;
  border: 0.699px solid var(--Line-Neutral, rgba(112, 115, 124, 0.16));
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const MainCard = styled(BaseCard)`
  z-index: 3;
  top: 0;
  left: 0;
  padding: 2.58rem 2.53rem 2.56rem 2.53rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 799px) {
    padding: 0.94rem 1.25rem;
    border-radius: 0.5rem;
  }
`;

const ScrollContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DecoCard = styled(BaseCard)`
  background-color: #f1f1f1;
  z-index: ${(props) => (props.$index === 2 ? 1 : 2)};

  transform: ${(props) =>
    props.$index === 1
      ? "translate(20px, -20px) scale(0.98)"
      : "translate(40px, -40px) scale(0.96)"};

  /* 1. 반응형에서는 DecoCard 숨기기 */
  @media (max-width: 799px) {
    display: none;
  }
`;

const CardHeader = styled.h2`
  color: var(--Atomic-Neutral-20, var(--Neutral-20, #2a2a2a));
  margin-bottom: 0.62rem;
  font-family: "Cafe24 PRO Slim";
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2.25rem;
  text-align: left;
  word-break: keep-all;
  white-space: pre-wrap;

  @media (max-width: 799px) {
    font-size: 1rem;
    line-height: 1.5rem;
    word-break: break-all;
    margin-bottom: 0.5rem;
  }
`;

const CardBody = styled.p`
  color: var(--Atomic-Neutral-80, var(--Neutral-80, #b0b0b0));
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.25rem;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-all; /* 본문도 안전하게 줄바꿈 */

  @media (max-width: 799px) {
    line-height: 1.125rem;
  }
`;

const CardFooter = styled.div`
  margin-top: 1.53rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  font-size: 0.875rem;
  line-height: 1.375rem;
  font-family: Pretendard;

  strong {
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2a2a2a));
    font-weight: 800;
  }

  span {
    color: var(--Atomic-Cool-Neutral-40, var(--Cool-Neutral-40, #5a5c63));
    font-weight: 400;
  }

  @media (max-width: 799px) {
    margin-top: 1.25rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
    text-align: left;
  }
`;
