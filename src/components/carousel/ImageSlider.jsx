import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Modal } from "../Modal";
import IMAGES from "../../data/news.json";

const ImageSlider = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImg(src);
  };

  const closeModal = () => {
    setSelectedImg(null);
  };

  return (
    <Container>
      {/*
        첫 번째 그룹: 원본
        두 번째 그룹: 복제본 (무한 스크롤 연결용)
      */}
      <Track>
        {/* [1] 원본 리스트 */}
        {IMAGES.map((item, index) => (
          <ImageCard
            key={`original-${item.id}-${index}`}
            onClick={() => handleImageClick(item.src)}
          >
            <img src={item.src} alt={`slide-${item.id}`} />
          </ImageCard>
        ))}
        {IMAGES.map((item, index) => (
          <ImageCard
            key={`clone-${item.id}-${index}`}
            onClick={() => handleImageClick(item.src)}
            aria-hidden="true"
          >
            <img src={item.src} alt={`slide-${item.id}`} />
          </ImageCard>
        ))}
      </Track>
      <Modal
        open={Boolean(selectedImg)}
        onClose={closeModal}
        type="image"
        image={{
          src: selectedImg,
          alt: "확대 이미지",
        }}
      />
    </Container>
  );
};

export default ImageSlider;

/* --- 스타일 정의 --- */

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: -20px;
  margin-bottom: -20px;
`;

const Track = styled.div`
  display: flex;
  width: max-content; /* 자식 요소들을 한 줄로 길게 배치 */
  gap: 1.25rem; /* 이미지 사이 간격 (기존 gap 유지) */

  @media (max-width: 799px) {
    gap: 0.75rem;
  }

  animation: ${scrollAnimation} 30s linear infinite;

  /* 호버 시 멈춤 */
  &:hover {
    animation-play-state: paused;
  }
`;

const ImageCard = styled.div`
  /* PC 사이즈 */
  width: 15rem;
  height: 15rem;
  box-shadow: inset 0 0 0 1px #dbdbdb;

  flex-shrink: 0; /* 크기 줄어들지 않게 고정 */
  border-radius: 1rem;
  overflow: hidden;
  background: var(--Neutral-95, #dcdcdc);
  cursor: pointer;

  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 799px) {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: var(--unit-12, 0.75rem);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none; /* 이미지 자체 드래그 방지 */
  }
`;
