import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { RecruitAPI } from "@/apis";
import { FALLBACK_SCHEDULE } from "@/config/siteConfig";

const RecruitBasicInfo = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(FALLBACK_SCHEDULE);

  // API로부터 모집 일정 가져오기
  useEffect(() => {
    const fetchRecruitSchedule = async () => {
      const currentYear = new Date().getFullYear();

      try {
        const data = await RecruitAPI.getRecruitmentSchedule(currentYear);

        if (data?.recruitment_schedule) {
          // API 성공 시 최신 데이터로 업데이트
          setSchedule(data.recruitment_schedule);
          console.log(`${currentYear}년 모집 일정 데이터 로드 성공`);
        }
      } catch (e) {
        console.log(`fallback 데이터 사용 중`);
      }
    };

    fetchRecruitSchedule();
  }, []);

  // 요일 반환 함수
  const getDayOfWeek = (date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[date.getDay()];
  };

  // 날짜 포맷팅 함수 (2027-01-11T09:00:00+09:00 -> "2026.02.09.(월)")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = getDayOfWeek(date);
    return `${year}.${month}.${day}.(${dayOfWeek})`;
  };

  // 시간 포맷팅 (2027-01-18T23:59:59+09:00 -> "00:00:00")
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      {/* 모집 일정 */}
      <ScheduleSection>
        <ScheduleInner>
          <ScheduleContentWrapper>
            <ScheduleTitle>
              <img src="/icons/ellipse.svg" alt="icon" />
              <span>모집 일정</span>
            </ScheduleTitle>

            <ScheduleCards>
              <ScheduleCard $variant={1}>
                <Step>01</Step>
                <CardTitle>서류 지원</CardTitle>
                <CardDesc>
                  {`${formatDate(schedule.application_start)} ${formatTime(schedule.application_start)}부터`}
                  <br />
                  {`${formatDate(schedule.application_end)} ${formatTime(schedule.application_end)}까지`}
                </CardDesc>
              </ScheduleCard>

              <ScheduleCard $variant={2}>
                <Step>02</Step>
                <CardTitle>1차 합격자 발표</CardTitle>
                <CardDesc>{formatDate(schedule.first_result_start)}</CardDesc>
              </ScheduleCard>

              <ScheduleCard $variant={3}>
                <Step>03</Step>
                <CardTitle>면접</CardTitle>
                <CardDesc>
                  {`${formatDate(schedule.interview_start)}-${formatDate(schedule.interview_end)}`}
                </CardDesc>
              </ScheduleCard>

              <ScheduleCard $variant={4}>
                <Step>04</Step>
                <CardTitle>최종 합격자 발표</CardTitle>
                <CardDesc>{formatDate(schedule.final_result_start)}</CardDesc>
              </ScheduleCard>
            </ScheduleCards>
          </ScheduleContentWrapper>
        </ScheduleInner>
      </ScheduleSection>

      {/* 모집 대상 */}
      <TargetSection>
        <TargetInner>
          <TargetTitle>
            <img src="/icons/ellipse.svg" alt="icon" />
            <span>모집 대상</span>
          </TargetTitle>

          <TargetMainDesc>
            이화여자대학교 학부생(재학·휴학·과정수료·졸업유예)
          </TargetMainDesc>

          <TargetGrid>
            <TargetItem>
              <h3>학번 무관! 모든 이화여대 학생</h3>
              <p>
                {schedule.year}년 기준 이화여자대학교 학부
                재적생(재학·휴학·과정수료·졸업유예)은 모두 지원할 수 있습니다.
                편입 여부 상관없이 지원 가능합니다.
              </p>
              <span className="small-notice">
                * 졸업생, 타대생은 지원 불가합니다.
                <br />* {schedule.year}년 12월까지 학부 재적을 유지해야 합니다.
              </span>
            </TargetItem>

            <TargetItem>
              <h3>1학기 활동</h3>
              <p>다음 조건을 모두 충족해야 아기사자 수료증이 발급됩니다.</p>
              <span className="highlight-notice">
                * 2026.03.-2026.12. 1년 활동
                <br />
                * 중앙 아이디어톤(5월) 참여
                <br />
                * 중앙 해커톤(7-8월) 참여
                <br />
                * 연합/기업 해커톤 1회 이상 참여
                <br />* 대면 OT 참석
              </span>
            </TargetItem>

            <TargetItem>
              <h3>대면 세션 참여</h3>
              <p>매주 화·목 18:30-20:30 대면 세션에 필수로 참여해야 합니다.</p>
            </TargetItem>

            <TargetItem>
              <h3>활동 비용</h3>
              <p>
                회비는 1년에 3만원이며, 입금 후 그 어떤 사유로도 환불
                불가능합니다.
              </p>
            </TargetItem>
          </TargetGrid>
        </TargetInner>
      </TargetSection>

      {/* 모집 파트 */}
      <PartSection>
        <PartInner>
          <PartTitle>
            <img src="/icons/ellipse2.svg" alt="icon" />
            <span>모집 파트</span>
          </PartTitle>

          <PartCards>
            <PartCard>
              <h3>기획 디자인</h3>
              <span>PM · DESIGN</span>
              <LinkWrapper onClick={() => navigate("/?part=pm#curriculum")}>
                <a>파트 소개 바로가기</a>
                <img src="/icons/arrowRight3.svg" alt="icon" />
              </LinkWrapper>
            </PartCard>

            <PartCard>
              <h3>프론트엔드</h3>
              <span>FRONTEND</span>
              <LinkWrapper onClick={() => navigate("/?part=fe#curriculum")}>
                <a>파트 소개 바로가기</a>
                <img src="/icons/arrowRight3.svg" alt="icon" />
              </LinkWrapper>
            </PartCard>

            <PartCard>
              <h3>백엔드</h3>
              <span>BACKEND</span>
              <LinkWrapper onClick={() => navigate("/?part=be#curriculum")}>
                <a>파트 소개 바로가기</a>
                <img src="/icons/arrowRight3.svg" alt="icon" />
              </LinkWrapper>
            </PartCard>
          </PartCards>
        </PartInner>
      </PartSection>
    </>
  );
};

export default RecruitBasicInfo;

/* 모집 일정 섹션 */
const ScheduleSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #ffffff;
`;

const ScheduleInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5rem 2rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    padding: 1.88rem 1rem;
  }
`;

const ScheduleContentWrapper = styled.div`
  width: 100%;
  max-width: 60.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    align-items: center;
  }
`;

const ScheduleTitle = styled.h2`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 2rem;
  color: #2a2a2a;
  font-family: "Cafe24 PRO Slim";
  font-size: 2.25rem;
  font-weight: 700;

  img {
    width: 2rem;
    height: auto;
  }

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    font-size: 1.5rem;
    line-height: 2.25rem;
    margin-bottom: 1rem;
    gap: 0.5rem;

    img {
      width: 1.25rem;
    }
  }
`;

const ScheduleCards = styled.div`
  display: grid;
  gap: 1.25rem;
  width: 100%;
  justify-content: center;

  grid-template-columns: repeat(4, 14.25rem);

  transition: all 0.2s ease;

  @media (max-width: 1125px) and (min-width: 870px) {
    grid-template-columns: repeat(3, 14.25rem);

    & > div:nth-child(4) {
      grid-column: 2;
    }
  }

  @media (max-width: 869px) and (min-width: 800px) {
    grid-template-columns: repeat(2, 14.25rem);

    & > div:nth-child(4) {
      grid-column: auto;
    }
  }

  @media (max-width: 799px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  @media (max-width: 799px) and (min-width: 458px) {
    grid-template-columns: repeat(2, minmax(0, 18.375rem));
  }
`;

const ScheduleCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 14.25rem;
  padding: 1.25rem 2rem 1.5rem 2rem;
  border-radius: 1.25rem;
  box-sizing: border-box;
  background: ${({ $variant }) =>
    $variant === 2
      ? "#FEE6C6"
      : $variant === 3
        ? "#FFD49C"
        : $variant === 4
          ? "#FFC06E"
          : "#FEF4E6"};

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    width: 100%;
    height: 10.25rem;
    padding: 1.5rem 1.25rem;
    border-radius: 1rem;
    gap: 0.25rem;
    margin: 0 auto;
    background: ${({ $variant }) =>
      $variant === 2
        ? "#FDEFD6"
        : $variant === 3
          ? "#FBD9A6"
          : $variant === 4
            ? "#F7BC72"
            : "#FEF6E7"};
  }
`;

const Step = styled.span`
  color: #ff7b2e;
  font-family: "Cafe24 PRO Slim";
  font-size: 2.375rem;
  font-weight: 700;
  line-height: 3.125rem;
  margin-bottom: 3.25rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    font-size: 1.5rem;
    line-height: 2.25rem;
    margin-bottom: 0.75rem;
  }
`;

const CardTitle = styled.h3`
  margin-bottom: 0.37rem;
  color: #2a2a2a;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    margin-bottom: 0;
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const CardDesc = styled.p`
  color: #474747;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.25rem;
  white-space: nowrap;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    color: #2a2a2a;
    white-space: normal;
  }
`;

/* 모집 대상 스타일 */
const TargetSection = styled.section`
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  padding: 1.25rem 0rem 7.5rem 0rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    padding: 1.88rem 1rem 3.75rem 1rem;
  }
`;

const TargetInner = styled.div`
  max-width: 60.75rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    max-width: 30rem;
  }
`;

const TargetTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  color: var(--Atomic-Neutral-20, var(--Neutral-20, #2a2a2a));
  font-family: "Cafe24 PRO Slim";
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.125rem;

  img {
    width: 2rem;
  }

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    font-size: 1.5rem;
    line-height: 2.25rem;
    margin-bottom: 1rem;
    gap: 0.5rem;

    img {
      width: 1.25rem;
    }
  }
`;

const TargetMainDesc = styled.p`
  margin-bottom: 6.25rem;
  color: var(--Atomic-Neutral-30, var(--Neutral-30, #474747));
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    margin-bottom: 1.5rem;
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2a2a2a));
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
`;

const TargetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 3.75rem;
  row-gap: 2.5rem;
  width: 100%;
  max-width: 50rem;
  text-align: left;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const TargetItem = styled.div`
  text-align: left;

  h3 {
    color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #ff7b2e));
    font-family: "Cafe24 PRO Slim";
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.625rem;
    margin-bottom: 1.25rem;
    font-family: "Cafe24 PRO Slim";
  }

  p {
    margin-bottom: 0.5rem;
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2a2a2a));
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
  }

  .small-notice {
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9b9b9b));
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem;
    display: block;
  }

  .highlight-notice {
    color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #ff7b2e));
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem;
    display: block;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.5rem;
      margin-bottom: 0.1rem;
    }

    .small-notice {
      font-size: 0.75rem;
      line-height: 1.25rem;
    }

    .highlight-notice {
      font-size: 0.75rem;
      line-height: 1.25rem;
      padding: 0.1rem 0;
      font-weight: 500;
    }
  }
`;

/* 모집 파트 */
const PartSection = styled.section`
  width: 100%;
  background: #b9fcc1;
  display: flex;
  justify-content: center;
`;

const PartInner = styled.div`
  max-width: 90rem;
  width: 100%;
  padding: 3.75rem 13.75rem 5rem 13.75rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    padding: 1.88rem 1.25rem;
  }
`;

const PartTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  color: var(--Atomic-Neutral-20, var(--Neutral-20, #2a2a2a));
  font-family: "Cafe24 PRO Slim";
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.125rem;

  img {
    width: 2rem;
  }

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    font-size: 1.5rem;
    line-height: 2.25rem;
    margin-bottom: 1.25rem;
    gap: 0.4rem;

    img {
      width: 1.25rem;
    }
  }
`;

const PartCards = styled.div`
  display: grid;
  gap: 1.25rem;
  width: 100%;
  justify-content: center;

  transition: all 0.2s ease;

  @media (min-width: 800px) and (max-width: 1075px) {
    grid-template-columns: 19.375rem;

    & > div {
      width: 19.375rem;
      height: 9.5rem;
    }
  }

  @media (min-width: 1076px) and (max-width: 1416px) {
    grid-template-columns: repeat(2, 19.375rem);
    width: fit-content;
    margin: 0 auto;

    & > div:nth-child(3) {
      grid-column: span 2;
      justify-self: center;
      width: 19.375rem;
    }
  }

  @media (min-width: 1417px) {
    grid-template-columns: repeat(3, 19.375rem);
    width: fit-content;

    & > div:nth-child(3) {
      grid-column: auto;
      justify-self: stretch;
    }
  }

  @media (max-width: 799px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    justify-items: center;
  }

  @media (max-width: 799px) and (min-width: 525px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 31rem;
    margin: 0 auto;

    & > *:nth-child(3) {
      grid-column: span 2;
      justify-self: center;
    }
  }
`;

const PartCard = styled.div`
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.75);
  padding: 1.93rem 0rem 1.93rem 0rem;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  h3 {
    color: #2a2a2a;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.12rem;
  }

  span {
    display: block;
    color: #737373;
    font-family: Pretendard;
    font-size: 0.875rem;
    margin-bottom: 0.49rem;
  }

  a {
    color: #00bf40;
    font-family: Pretendard;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    width: 15rem;
    height: 7rem;
    border-radius: 0.75rem;
    padding: 1rem;
    justify-content: center;

    h3 {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    span {
      font-size: 0.75rem;
      line-height: 1.25rem;
      margin-bottom: 0.75rem;
    }

    a {
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  cursor: pointer;

  a {
    color: var(--Atomic-Green-50, var(--Green-50, #00bf40));
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
  }

  img {
    width: 0.625rem;
    height: 0.58756rem;
    display: block;
  }

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    gap: 0.25rem;

    a {
      font-size: 0.875rem;
      line-height: 1.375rem;
    }

    img {
      width: 0.53188rem;
      height: 0.5rem;
    }
  }
`;
