import React from "react";
import styled from "styled-components";
import cloverIcon from "../../../public/icons/clover.svg";

const IntroSection2 = () => {
  return (
    <SectionWrapper>
      {/* === [Part 1] 주황색 영역: LIKELION.UNIV === */}
      <OrangeArea>
        <InnerContainer>
          <div className="title-box">
            <h2 className="title">LIKELION.UNIV</h2>
            <p className="subtitle">멋쟁이사자처럼 대학</p>
          </div>

          <div className="desc-box">
            멋쟁이사자처럼 대학은 2025년 기준, 전국 53개 대학교에서 13년째
            운영되고 있는
            <b>국내 최대 규모의 연합 IT 동아리</b>입니다. 각 대학의 커리큘럼은
            교내 오프라인 교육 세션과 스터디, LIKELION의 VOD 등으로 구성되어
            있으며, 이를 통해 <b>웹 기획·디자인, 프론트엔드, 백엔드 개발</b>을
            기초부터 체계적으로 배울 수 있습니다. 또한 매년 여름 열리는 중앙
            해커톤을 비롯해 다양한 대학 연합 행사에 참여하며, 협업과 네트워킹의
            기회를 얻고 자신의 아이디어를 직접 실현할 수 있습니다.
          </div>
        </InnerContainer>
      </OrangeArea>

      {/* === [Part 2] 연두색 영역: LIKELION AT EWHA === */}
      <GreenArea>
        <InnerContainer $column>
          <FlowerIcon src={cloverIcon} alt="clover" />
          <h2 className="center-title">LIKELION AT EWHA</h2>
          <p className="center-subtitle">멋쟁이사자처럼 이화여대</p>

          <p className="center-desc">
            이화여자대학교 멋쟁이사자처럼은 <b>2016년 3월부터 지금까지</b>{" "}
            대표적인 웹사이트 제작과 기수별 졸업 프로젝트 등 다양한 교내 활동을
            꾸준히 이어오고 있습니다. 12기에는 전국 대학생 1,500여 명이 참여한
            중앙 해커톤에서 <b>대상</b>을 수상했으며, 이외에도 여러 연합
            행사에서 지속적으로 우수한 성과를 거두고 있습니다. 또한, 그동안
            배출된 알럼나이들은 다양한 산업 현장에서 활약하며 이화여대
            멋쟁이사자처럼의 역량과 가치를 이어가고 있습니다.
          </p>

          {/* 통계 박스 */}
          <StatsGrid>
            <StatItem>
              <h3>
                10<span>YEARS</span>
              </h3>
              <p>이대 멋사가 탄생한지</p>
            </StatItem>
            <StatItem>
              <h3>
                26<span>+</span>
              </h3>
              <p>프로젝트 수</p>
            </StatItem>
            <StatItem>
              <h3>
                120<span>+</span>
              </h3>
              <p>누적 수료 인원</p>
            </StatItem>
            <StatItem>
              <h3>
                8.31<span>: 1</span>
              </h3>
              <p>최근 경쟁률</p>
            </StatItem>
          </StatsGrid>
        </InnerContainer>
      </GreenArea>
    </SectionWrapper>
  );
};

export default IntroSection2;

const SectionWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1200px; /* PC 최대 너비 */
  margin: 0 auto;
  padding: 0 8rem;
  display: flex;

  /* props.$column이 있으면 세로 정렬(연두색), 없으면 가로 정렬(주황색) */
  flex-direction: ${({ $column }) => ($column ? "column" : "row")};
  justify-content: ${({ $column }) => ($column ? "center" : "center")};
  align-items: ${({ $column }) => ($column ? "center" : "flex-start")};
  gap: ${({ $column }) => ($column ? "0" : "2.5rem")};

  @media (max-width: 768px) {
    flex-direction: column; /* 모바일은 무조건 세로 정렬 */
    text-align: center;
    align-items: center;
    padding: 0 1.5rem;
  }
`;

/* --- 주황색 영역 --- */
const OrangeArea = styled.div`
  background: #ffce8a;
  padding: 80px 0;

  .title-box {
    flex: 0 0 auto;
    .title {
      color: var(--Atomic-Neutral-20, var(--Neutral-20, #2a2a2a));
      font-family: Bayon;
      font-size: 3rem;
      font-style: normal;
      font-weight: 400;
      line-height: 3.61769rem; /* 120.59% */
    }
    .subtitle {
      font-family: "Cafe24 PRO Slim";
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2.25rem; /* 150% */
    }
  }

  .desc-box {
    width: 30.6875rem;
    flex: 0 0 auto;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
    word-break: keep-all;
    b {
      font-weight: 700;
    }
  }

  @media (max-width: 900px) {
    .desc-box {
      width: 100%;
      flex: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;
    .title-box {
      margin-bottom: 20px;
    }
  }
`;

/* --- 연두색 영역 --- */
const GreenArea = styled.div`
  background: #98fba4;
  padding: 80px 0 100px;
  text-align: center;

  .center-title {
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2a2a2a));
    font-family: Bayon;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    line-height: 3.61769rem; /* 120.59% */
  }
  .center-subtitle {
    font-family: "Cafe24 PRO Slim";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.25rem; /* 150% */
    margin-bottom: 1.5rem;
  }
  .center-desc {
    max-width: 800px;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
    word-break: keep-all;
    margin-bottom: 2rem;
    b {
      font-weight: 700;
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const FlowerIcon = styled.img`
  width: 2rem;
  height: 2.14988rem;
  aspect-ratio: 32/34.4;
  fill: var(--Neutral-20, #2a2a2a);
  margin-bottom: 10px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 */
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    /* 2. 모바일: 무조건 2개씩 2줄 (2x2) 유지 */
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const StatItem = styled.div`
  border-radius: 0.3125rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.25rem 1.25rem;
  width: 100%; /* 박스 꽉 차게 */

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2a2a2a));
    font-family: "DM Sans", sans-serif;
    font-size: 2.75rem; /* PC */
    font-style: normal;
    font-weight: 700;
    line-height: 3.125rem; /* PC */
    margin-bottom: 0.5rem; /* 간격 추가 */

    span {
      color: var(--Atomic-Neutral-80, var(--Neutral-80, #b0b0b0));
    }
  }

  p {
    font-family: "Cafe24 PRO Slim";
    color: var(--Atomic-Neutral-80, var(--Neutral-80, #b0b0b0));
    font-size: 1.25rem; /* PC */
    font-style: normal;
    font-weight: 700;
    line-height: 1.875rem; /* PC */
  }

  @media (max-width: 500px) {
    /* 모바일에서는 패딩을 줄여주는 게 좋습니다 (선택사항) */
    padding: 1.5rem 0;

    h3 {
      font-size: 1.5625rem; /* 주석값 적용 */
      line-height: 2.25rem; /* 주석값 적용 */
    }

    p {
      font-size: 0.875rem; /* 주석값 적용 */
      line-height: 1.37569rem; /* 주석값 적용 */
    }
  }
`;
