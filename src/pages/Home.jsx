import React from "react";
import styled from "styled-components";

// 1. 기존 후기 캐러셀 (경로 유지)
import Carousel from "../components/carousel/Carousel1";

// 2. ⭐ 방금 만든 이미지 슬라이더 불러오기 (파일 위치에 맞춰 경로 수정하세요!)
import ImageSlider from "../components/carousel/ImageSlider";

const Home = () => {
  return (
    <PageContainer>
      {/* --- 섹션 1: 후기 캐러셀 --- */}
      <h1>환영합니다!</h1>
      <p>아래는 우리 팀원들의 후기입니다.</p>

      <CarouselSection>
        <Carousel />
      </CarouselSection>

      {/* --- 섹션 2: 활동 사진 슬라이더 (추가됨) --- */}
      <GallerySection>
        <h2>활동 사진</h2>
        <p>우리 팀의 즐거운 순간들을 확인해보세요.</p>

        {/* ⭐ ImageSlider 사용 */}
        <ImageSlider />
      </GallerySection>
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
  padding: 50px 0;

  /* 전체 페이지 배경색이 필요하다면 여기에 추가 */
  /* background-color: #f9f9f9; */
`;

const CarouselSection = styled.div`
  margin-top: 30px;
  margin-bottom: 80px; /* 아래 섹션과 간격 띄우기 */

  /* 반응형 폭 제한 (선택사항) */
  width: 100%;
  display: flex;
  justify-content: center;
`;

// 새로 추가한 갤러리 영역 스타일
const GallerySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* 제목 가운데 정렬 */
  gap: 20px;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 10px;
  }
`;
