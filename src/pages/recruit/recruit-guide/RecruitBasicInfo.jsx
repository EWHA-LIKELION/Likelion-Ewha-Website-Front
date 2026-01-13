import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RecruitBasicInfo = () => {
    const navigate = useNavigate();

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
                                <CardTitle>서류 접수</CardTitle>
                                <CardDesc>
                                    0000년 00월 00일 ~ 00일<br />
                                    (제출 마감일 23시 59분까지 제출)
                                </CardDesc>
                            </ScheduleCard>

                            <ScheduleCard $variant={2}>
                                <Step>02</Step>
                                <CardTitle>1차 결과 발표</CardTitle>
                                <CardDesc>0000년 00월 00일</CardDesc>
                            </ScheduleCard>

                            <ScheduleCard $variant={3}>
                                <Step>03</Step>
                                <CardTitle>면접</CardTitle>
                                <CardDesc>0000년 00월 00일 ~ 00일</CardDesc>
                            </ScheduleCard>

                            <ScheduleCard $variant={4}>
                                <Step>04</Step>
                                <CardTitle>최종 결과 발표</CardTitle>
                                <CardDesc>0000년 00월 00일</CardDesc>
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
                        0000년도 기준 이화여자대학교 재학생 및 휴학생, 자대 편입생
                    </TargetMainDesc>
                    <TargetSubDesc>
                        *지원 시 선수강 강의를 수강 완료한 화면 캡쳐본을 제출할 경우 가산점이 부여됩니다.
                    </TargetSubDesc>

                    <TargetGrid>
                        <TargetItem>
                            <h3>학번 무관! 모든 이화여대 학생</h3>
                            <p>0000년 기준 모든 이화여자대학교 재학생 및 휴학생, 자대<br />편입생은 지원 가능합니다.</p>
                            <span className="small-notice">
                                * 기졸업자(0000년 2월 졸업 예정자), 타대생은 지원 불가<br />
                                * 0000년 여름 졸업자의 경우 2학기에도 활동을 지속한다는 조건<br />하에 지원 가능
                            </span>
                        </TargetItem>

                        <TargetItem>
                            <h3>1학기 활동</h3>
                            <p>아래의 요건을 모두 충족하여 1년 활동을 완료할 경우 수료<br />증이 발급됩니다.</p>
                            <span className="highlight-notice">
                                4월 말~5월 중 진행되는 아이디어톤 필수 참여<br />
                                8월 중 오프라인으로 무박 2일간 진행되는 중앙 해커톤 필수 참여
                            </span>
                            <span className="small-notice">* 자세한 일정 추후 공지 예정</span>
                        </TargetItem>

                        <TargetItem>
                            <h3>오프라인 세션 참여</h3>
                            <p>매주 화/목 오후 6시 30분에 진행되는 세션에 필수로 참여<br />하실 수 있어야 합니다.
                            <br />따라서 오프라인으로 참여하실 수 있는 인원을 우선적으로<br />모집하고 있습니다.</p>
                        </TargetItem>

                        <TargetItem>
                            <h3>활동 비용</h3>
                            <p>동아리 물품 구비 및 운영을 위해 최종 합격자는 회비 3만원<br />을 제출하여야합니다.</p>
                            <span className="small-notice">* 인원 수에 따라 조정 가능성 있음</span>
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
                            <LinkWrapper onClick={() => navigate('/?part=pm#curriculum')}>
                                <a>파트 소개 바로가기</a>
                                <img src="/icons/arrowRight3.svg" alt="icon" />
                            </LinkWrapper>
                        </PartCard>

                        <PartCard>
                            <h3>프론트엔드</h3>
                            <span>FRONTEND</span>
                            <LinkWrapper onClick={() => navigate('/?part=fe#curriculum')}>
                                <a>파트 소개 바로가기</a>
                                <img src="/icons/arrowRight3.svg" alt="icon" />
                            </LinkWrapper>
                        </PartCard>

                        <PartCard>
                            <h3>백엔드</h3>
                            <span>BACKEND</span>
                            <LinkWrapper onClick={() => navigate('/?part=be#curriculum')}>
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
        $variant === 2 ? "#FEE6C6" :
        $variant === 3 ? "#FFD49C" :
        $variant === 4 ? "#FFC06E" : "#FEF4E6"};

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        width: 100%;
        height: 10.25rem;
        padding: 1.5rem 1.25rem;
        border-radius: 1rem;
        gap: 0.25rem;
        margin: 0 auto;
        background: ${({ $variant }) =>
            $variant === 2 ? "#FDEFD6" :
            $variant === 3 ? "#FBD9A6" :
            $variant === 4 ? "#F7BC72" : "#FEF6E7"};
    }
`;

const Step = styled.span`
    color: #FF7B2E;
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
    color: #2A2A2A;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.75rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
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

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        color: #2A2A2A;
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
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
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
    color: var(--Atomic-Neutral-30, var(--Neutral-30, #474747));
    text-align: center;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-size: 0.875rem;
        line-height: 1.375rem;
    }
`;

const TargetSubDesc = styled.p`
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem;
    margin-bottom: 6.25rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        font-size: 0.75rem;
        line-height: 1.125rem;
        margin-bottom: 1.5rem;
        margin-top: 0.5rem;
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
        color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #FF7B2E));
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
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem;
    }

    .small-notice {
        color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.375rem;
        display: block;
    }

    .highlight-notice {
        color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #FF7B2E));
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
    background: #B9FCC1;
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
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
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
        color: #2A2A2A;
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
        color: #00BF40;
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
        color: var(--Atomic-Green-50, var(--Green-50, #00BF40));
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
