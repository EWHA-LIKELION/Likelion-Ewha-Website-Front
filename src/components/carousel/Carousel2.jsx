import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { projects as projectsData } from "@/data";
import ProjectCard2 from "../card/ProjectCard2";

/* ===== 설정값 ===== */
const CLONE_COUNT = 4;

// PC/모바일 설정값
const PC_VALUES = {
  ITEM_WIDTH: 19.375,
  ITEM_GAP: 1.25,
  CENTER_SCALE: 1.15,
  FOCUS_SCALE: 1.04,
  CENTER_GAP_ILLUSION: 2,
  ARROW_GAP: -0.1,
};
const MOBILE_VALUES = {
  ITEM_WIDTH: 8.75,
  ITEM_GAP: 0.5,
  CENTER_SCALE: 1.08,
  FOCUS_SCALE: 1.03,
  CENTER_GAP_ILLUSION: 0.7,
  ARROW_GAP: -0.05,
};
/* ================= */

const Carousel2 = () => {
  const [current, setCurrent] = useState(CLONE_COUNT);
  const currentRef = useRef(CLONE_COUNT);
  const [transition, setTransition] = useState(true);
  const [needRecover, setNeedRecover] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 799);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 799);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 현재 환경에 맞는 값 선택
  const values = isMobile ? MOBILE_VALUES : PC_VALUES;
  const { ITEM_WIDTH, ITEM_GAP, CENTER_SCALE, FOCUS_SCALE, CENTER_GAP_ILLUSION, ARROW_GAP } = values;

  const projectArr = Array.isArray(projectsData)
    ? projectsData
    : projectsData.projects;

  const realLength = projectArr.length;

  const items = [
    ...projectArr.slice(-CLONE_COUNT),
    ...projectArr,
    ...projectArr.slice(0, CLONE_COUNT),
  ];

  const handlePrev = () => setCurrent((p) => p - 1);
  const handleNext = () => setCurrent((p) => p + 1);

  // current가 바뀔 때마다 currentRef 동기화
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "transform") return;


    // 항상 최신 current 값 사용
    const cur = currentRef.current;

    // 왼쪽 복제 → 실제 마지막
    if (cur <= CLONE_COUNT - 1) {
      setTransition(false);
      setNeedRecover(true);
      setCurrent(realLength + CLONE_COUNT - 1);
      currentRef.current = realLength + CLONE_COUNT - 1;
    }

    // 오른쪽 복제 → 실제 첫 번째
    if (cur >= realLength + CLONE_COUNT) {
      setTransition(false);
      setNeedRecover(true);
      setCurrent(CLONE_COUNT);
      currentRef.current = CLONE_COUNT;
    }
  };

  useEffect(() => {
    if (needRecover) {
      requestAnimationFrame(() => {
        setTransition(true);
        setNeedRecover(false);
      });
    }
  }, [needRecover]);

  return (
    <CarouselWrapper>
      <Viewport>
        {/* 왼쪽 화살표 */}
        <ArrowButton $left onClick={handlePrev} $itemWidth={ITEM_WIDTH} $centerScale={CENTER_SCALE} $arrowGap={ARROW_GAP}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16.5 3L7.5 12L16.5 21" stroke="#9B9B9B" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </ArrowButton>

        {/* 캐러셀 */}
        <CarouselList
          $current={current}
          $transition={transition}
          $itemWidth={ITEM_WIDTH}
          $itemGap={ITEM_GAP}
          $centerGapIllusion={CENTER_GAP_ILLUSION}
          onTransitionEnd={handleTransitionEnd}
        >
          {items.map((item, idx) => {
            const isCenter = idx === current;
            return (
              <CarouselItem key={idx} $itemWidth={ITEM_WIDTH}>
                <GapIllusion $isCenter={isCenter} $centerGapIllusion={CENTER_GAP_ILLUSION}>
                  <ScaleWrapper
                    $isCenter={isCenter}
                    $isDimmed={!isCenter}
                    $centerScale={CENTER_SCALE}
                    $focusScale={FOCUS_SCALE}
                  >
                    <ProjectCard2
                      project={item.title}
                      description={item.description}
                      tags={[item.generation, item.category]}
                      imageSrc={item.thumbnail || undefined}
                    />
                  </ScaleWrapper>
                </GapIllusion>
              </CarouselItem>
            );
          })}
        </CarouselList>

        {/* 오른쪽 화살표 */}
        <ArrowButton $right onClick={handleNext} $itemWidth={ITEM_WIDTH} $centerScale={CENTER_SCALE} $arrowGap={ARROW_GAP}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7.5 21L16.5 12L7.5 3" stroke="#9B9B9B" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </ArrowButton>
      </Viewport>
    </CarouselWrapper>
  );
};

export default Carousel2;

/* ================= styled ================= */

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Viewport = styled.div`
  position: relative;
  width: 100%;
  padding: 5.05rem 0;
  overflow: hidden;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    padding: 2.3rem 0;
  }
`;

const CarouselList = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ $itemGap }) => $itemGap}rem;

  transition: all 0.2s ease;

  transform: ${({ $current, $itemWidth, $itemGap, $centerGapIllusion }) =>
    `translateX(
      calc(
        50% - ${
          $current * ($itemWidth + $itemGap) +
          $itemWidth / 2 +
          $centerGapIllusion
        }rem
      )
    )`};

  transition: ${({ $transition }) =>
    $transition
      ? "transform 0.3s cubic-bezier(0.4,0,0.2,1)"
      : "none"};
`;

const CarouselItem = styled.div`
  flex: 0 0 ${({ $itemWidth }) => $itemWidth}rem;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s ease;
`;

/* 🔥 가운데 카드 양옆 착시 (진짜 해결 포인트) */
const GapIllusion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s ease;

  ${({ $isCenter, $centerGapIllusion }) =>
    $isCenter &&
    css`
      margin: 0 ${$centerGapIllusion}rem;
    `}
`;

/* scale + 포커스 애니메이션 */
const ScaleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
  will-change: transform;

  transition: all 0.2s ease;

  ${({ $isCenter, $centerScale, $focusScale }) =>
    $isCenter &&
    css`
      transform: scale(${$centerScale});
      z-index: 2;
      cursor: pointer;

      &:hover {
        transform: scale(${$centerScale * $focusScale});
      }

      &:active {
        transform: scale(${$centerScale * ($focusScale - 0.02)});
      }
    `}

  ${({ $isDimmed }) =>
    $isDimmed &&
    css`
      opacity: 0.8;
      pointer-events: none;
    `}
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;

  width: 3.125rem;
  height: 3.125rem;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translate(-50%, -50%);
  background: white;
  border: 1px solid var(--neutral-90);
  border-radius: 50%;
  cursor: pointer;

  transition: all 0.2s ease;

  &:hover{
    filter: brightness(0.9);
  }

  ${({ $left, $itemWidth, $centerScale, $arrowGap }) =>
    $left &&
    `
      transform: translate(
        calc(-50% - ${$itemWidth * $centerScale / 2 + $arrowGap}rem),
        -50%
      );
    `}

  ${({ $right, $itemWidth, $centerScale, $arrowGap }) =>
    $right &&
    `
      transform: translate(
        calc(-50% + ${$itemWidth * $centerScale / 2 + $arrowGap}rem),
        -50%
      );
    `}

  @media (max-width: 799px) {
    width: 1.875rem;
    height: 1.875rem;

    svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
`;
