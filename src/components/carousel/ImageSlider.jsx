import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Modal } from "../Modal";
import IMAGES from "../../data/news.json";

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragDistance = useRef(0);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    dragDistance.current = 0;
  };

  const handleMouseUpOrLeave = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
    dragDistance.current += Math.abs(walk);
  };

  const handleImageClick = (src) => {
    if (dragDistance.current > 5) return;
    setSelectedImg(src);
  };

  const closeModal = () => {
    setSelectedImg(null);
  };

  return (
    <>
      <SliderContainer
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        $isDragging={isDown}
      >
        {IMAGES.map((item) => (
          <ImageCard key={item.id} onClick={() => handleImageClick(item.src)}>
            <img src={item.src} alt={`slide-${item.id}`} />
          </ImageCard>
        ))}
      </SliderContainer>

      <Modal
        open={Boolean(selectedImg)}
        onClose={closeModal}
        type="image"
        image={{
          src: selectedImg,
          alt: "확대 이미지",
        }}
      />
    </>
  );
};

export default ImageSlider;

// --- 스타일 정의 ---

const SliderContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  margin-top: -20px;
  margin-bottom: -20px;

  overflow-x: auto;

  /* 드래그 커서 설정 */
  cursor: ${(props) => (props.$isDragging ? "grabbing" : "grab")};

  scroll-snap-type: ${(props) => (props.$isDragging ? "none" : "x mandatory")};
  scroll-behavior: ${(props) => (props.$isDragging ? "auto" : "smooth")};

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  user-select: none;
`;

const ImageCard = styled.div`
  /* PC 사이즈 */
  width: 15rem;
  height: 15rem;

  flex-shrink: 0;
  border-radius: 1rem;
  overflow: hidden;

  scroll-snap-align: start;
  background: var(--Neutral-95, #dcdcdc);

  /* 호버 효과 */
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
    pointer-events: none;
  }
`;
