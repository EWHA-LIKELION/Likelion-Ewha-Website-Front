import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Modal } from "../Modal"; // ⚠️ 경로 확인 필수 (예: ../components/Modal)
import ContainerImg from "../../../public/icons/Container.svg";

const IMAGES = [
  { id: 1, src: "/images/news/image1.png" },
  { id: 2, src: "/images/news/image2.png" },
  { id: 3, src: "/images/news/image3.png" },
  { id: 4, src: "/images/news/image4.png" },
  { id: 5, src: "/images/news/image5.png" },
  { id: 6, src: "/images/news/image6.png" },
  { id: 7, src: "/images/news/image7.png" },
  { id: 8, src: "/images/news/image8.png" },
  { id: 9, src: "/images/news/image9.png" },
  { id: 10, src: "/images/news/image10.png" },
  { id: 11, src: "/images/news/image11.jpg" }, // ⚠️ image11만 jpg입니다!
  { id: 12, src: "/images/news/image12.png" },
];
const ImageSlider = () => {
  const sliderRef = useRef(null);

  // 드래그 상태 관리
  const [isDown, setIsDown] = useState(false); // 마우스를 누르고 있는지
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 드래그 판별용
  const dragDistance = useRef(0);

  // 모달 상태
  const [selectedImg, setSelectedImg] = useState(null);

  // 1. 마우스 누름 (시작)
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    dragDistance.current = 0; // 누를 때 이동거리 초기화
  };

  // 2. 마우스 뗌 or 벗어남 (종료)
  const handleMouseUpOrLeave = () => {
    setIsDown(false);
  };

  // 3. 마우스 움직임 (스크롤 & 거리 계산)
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 스크롤 속도
    sliderRef.current.scrollLeft = scrollLeft - walk;

    //  움직인 거리 누적 계산 (절대값)
    dragDistance.current += Math.abs(walk);
  };

  //  4. 이미지 클릭 핸들러 (드래그인지 클릭인지 판별)
  const handleImageClick = (src) => {
    // 움직인 거리가 5px 미만이면 "클릭"으로 인정
    // 5px 이상이면 "드래그"로 간주하고 모달 안 염
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
        $isDragging={isDown} // 스타일링용
      >
        {IMAGES.map((item) => (
          <ImageCard key={item.id} onClick={() => handleImageClick(item.src)}>
            {/* 3. 회색 박스(placeholder)는 지우고 실제 이미지 태그 사용 */}
            <img src={item.src} alt={`slide-${item.id}`} />
          </ImageCard>
        ))}
      </SliderContainer>

      {/* 미디어 모달 */}
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

// --- 스타일 정의 (기존과 동일) ---

const SliderContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 0 20px;
  width: 100%;

  overflow-x: auto;

  /* 마우스 누르고 있을 때만 grabbing(주먹) */
  cursor: ${(props) => (props.$isDragging ? "grabbing" : "grab")};

  /* 드래그 중엔 스냅 끄기 -  부드러움 */
  scroll-snap-type: ${(props) => (props.$isDragging ? "none" : "x mandatory")};
  scroll-behavior: ${(props) => (props.$isDragging ? "auto" : "smooth")};

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  user-select: none; /* 텍스트 선택 방지 */
`;

const ImageCard = styled.div`
  /*  PC */
  width: 15rem;
  height: 15rem;

  flex-shrink: 0;
  border-radius: 1rem;
  overflow: hidden;
  scroll-snap-align: start;
  background: var(--Neutral-95, #dcdcdc);

  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }

  /*  모바일 */
  @media (max-width: 768px) {
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

  .placeholder {
    width: 100%;
    height: 100%;
    background: var(--Neutral-95, #dcdcdc);
    position: relative;
  }
`;
