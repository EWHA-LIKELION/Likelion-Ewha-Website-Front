import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DropDown3 from "../../components/dropdown/Dropdown3"
import RecruitGuideHeroMo from "./RecruitGuideHero_mo";
import faq from "../../data/faq.json";

import {
    ApplyButtonMobile,
} from "../../components/buttons/MainButtons_mo";


const RecruitGuidePageMo = () => {
    const navigate = useNavigate();

    return (
        <>
        <Container>
            {/* 히어로 섹션 */}
            <RecruitGuideHeroMo />

            <SectionWrapper>

            {/* 모집 일정 영역 */}
            <ScheduleSectionWrapper>
                <Section>
                    <SectionInner>
                        <Icon src="/icons/ellipse4.svg" alt="" />
                        <SectionTitle>모집 일정</SectionTitle>

                        <ScheduleGrid>
                            <ScheduleCard $color="#FEF6E7">
                                <Num>01</Num>
                                <Name>서류 접수</Name>
                                <Date>0000년 00월 00일 ~ 00일<br/>(제출 마감일 23시 59분까지 제출)</Date>
                            </ScheduleCard>

                            <ScheduleCard $color="#FDEFD6">
                                <Num>02</Num>
                                <Name>1차 결과 발표</Name>
                                <Date>0000년 00월 00일</Date>
                            </ScheduleCard>

                            <ScheduleCard $color="#FBD9A6">
                                <Num>03</Num>
                                <Name>면접</Name>
                                <Date>0000년 00월 00일 ~ 00일</Date>
                            </ScheduleCard>

                            <ScheduleCard $color="#F7BC72">
                                <Num>04</Num>
                                <Name>최종 결과 발표</Name>
                                <Date>0000년 00월 00일</Date>
                            </ScheduleCard>
                        </ScheduleGrid>
                    </SectionInner>
                </Section>
            </ScheduleSectionWrapper>


            {/* 모집 대상 영역 */}
            <TargetSectionWrapper>
                <Section>
                    <TargetInner>
                        <CenteredArea>
                            <Icon src="/icons/ellipse4.svg" alt="" />
                            <SectionTitle>모집 대상</SectionTitle>

                            <TargetMainDesc>
                                0000년도 기준 이화여자대학교 재학생 및 휴학생, 자대 편입생
                            </TargetMainDesc>

                            <TargetSubDesc>
                                *지원 시 선수강 강의를 수강 완료한 화면 캡쳐본을 제출할 경우 가산점이 부여됩니다.
                            </TargetSubDesc>
                        </CenteredArea>

                        <TargetGrid>
                            <TargetItem>
                                <h3>학번 무관! 모든 이화여대 학생</h3>
                                <p>0000년 기준 모든 이화여자대학교 재학생 및 휴학생, 자대<br/>편입생은 지원 가능합니다.</p>
                                <span className="small-notice">
                                    * 기졸업자(0000년 0월 졸업 예정자), 타대생은 지원 불가<br/>
                                    * 0000년 여름 졸업자의 경우 2학기에도 활동을 지속한다는 조건<br/>하에 지원 가능
                                </span>
                            </TargetItem>

                            <TargetItem>
                                <h3>활동 비용</h3>
                                <p>동아리 물품 구비 및 운영을 위해 최종 합격자는 회비 3만원<br/>을 제출하여야 합니다.</p>
                                <span className="small-notice">* 인원 수에 따라 조정 가능성 있음</span>
                            </TargetItem>

                            <TargetItem>
                                <h3>1년 활동</h3>
                                <p>아래의 요건을 모두 충족하여 1년 활동을 완료할 경우 수료<br/>증이 발급됩니다.</p>
                                <span className="highlight-notice">
                                    4월 말~5월 중 진행되는 아이디어톤 필수 참여<br/>
                                    8월 중 오프라인으로 무박 2일간 진행되는 중앙 해커톤 필수 참여
                                </span>
                                <span className="small-notice">* 자세한 일정 추후 공지 예정</span>
                            </TargetItem>

                            <TargetItem>
                                <h3>오프라인 세션 참여</h3>
                                <p>매주 화/목 오후 6시 30분에 진행되는 세션에 필수로 참여<br/>하실 수 있어야 합니다.
                                따라서 오프라인으로 참여하실 수 <br/>있는 인원을 우선적으로 모집하고 있습니다.</p>
                            </TargetItem>

                            
                        </TargetGrid>
                    </TargetInner>
                </Section>
            </TargetSectionWrapper>


            {/* 모집 파트 */}
            <PartSection>
                <PartInner>
                    <PartTitle>
                    <img src="/icons/ellipse5.svg" alt="icon" />
                    <span>모집 파트</span>
                    </PartTitle>

                    <PartCards>
                    <PartCard>
                        <h3>기획 디자인</h3>
                        <span>PM · DESIGN</span>
                        <LinkWrapper onClick={() => navigate('/?part=pm#curriculum')}>
                            <a>파트 소개 바로가기</a>
                            <img src="/icons/arrowRight5.svg" alt="icon" />
                        </LinkWrapper>
                        
                    </PartCard>

                    <PartCard>
                        <h3>프론트엔드</h3>
                        <span>FRONTEND</span>
                        <LinkWrapper onClick={() => navigate('/?part=fe#curriculum')}>
                            <a>파트 소개 바로가기</a>
                            <img src="/icons/arrowRight5.svg" alt="icon" />
                        </LinkWrapper>
                    </PartCard>

                    <PartCard>
                        <h3>백엔드</h3>
                        <span>BACKEND</span>
                        <LinkWrapper onClick={() => navigate('/?part=be#curriculum')}>
                            <a>파트 소개 바로가기</a>
                            <img src="/icons/arrowRight5.svg" alt="icon" />
                        </LinkWrapper>
                    </PartCard>
                    </PartCards>
                </PartInner>
            </PartSection>

            {/* 활동 계획 */}
            <ActivitySection>
                <ActivityInner>
                    <ActivityHeader>
                        <ActivityTitleArea>
                            <img src="/icons/ellipse4.svg" alt="icon" />
                            <h2>활동 계획</h2>
                            <p>* 계획은 13기 기준이며, 14기 활동 계획은 변경될 수 있습니다.</p>
                        </ActivityTitleArea>
                        <ActivityLegend>
                            <LegendItem color="#98FBA4">공통 세션</LegendItem>
                            <LegendItem color="#FFBD96">외부 연합 행사</LegendItem>
                        </ActivityLegend>
                    </ActivityHeader>

                    <ActivityGrid>
                        <TermHeader>1학기</TermHeader>
                        <TermHeader>여름방학</TermHeader>
                        <TermHeader>2학기</TermHeader>

                        <WideActivityBox color="#EFFFF0" border="#05DA5B">파트별 세션 및 스터디</WideActivityBox>
                        
                        <ActivityColumn>
                            <ActivityBox color="#EFFFF0" border="#05DA5B">공통 세션</ActivityBox>
                            <ActivityBox color="#FFF8ED" border="#FF7B2E">중앙 아이디어톤 (4월 말~5월)</ActivityBox>
                        </ActivityColumn>

                        <ActivityColumn>
                            <ActivityBox color="#FFF8ED" border="#FF7B2E">여기톤 (7월, 6개 여대 연합 해커톤)</ActivityBox>
                            <ActivityBox color="#FFF8ED" border="#FF7B2E">중앙 해커톤 (8월, 전국 53개 대학 연합)</ActivityBox>
                        </ActivityColumn>

                        <ActivityColumn>
                            <ActivityBox color="#EFFFF0" border="#05DA5B">대동제 리디자인</ActivityBox>
                            <ActivityBox color="#EFFFF0" border="#05DA5B">팀 프로젝트</ActivityBox>
                            <ActivityBox color="#FFF8ED" border="#FF7B2E">신촌톤 (9월, 신촌 4개 대학 연합 해커톤)</ActivityBox>
                            <ActivityBox color="#FFF8ED" border="#FF7B2E">신촌 대학 연합 SW 창업 경진 대회 (11월)</ActivityBox>
                            <ActivityBox color="#EFFFF0" border="#05DA5B">기수 졸업 프로젝트</ActivityBox>
                        </ActivityColumn>
                    </ActivityGrid>
                </ActivityInner>
            </ActivitySection>

            {/* 선수강 강의 안내 */}
            <PreLectureSection>
                <PreLectureInner>
                    <PreLectureTitle>
                    <img src="/icons/ellipse.svg" alt="icon" />
                    <h2>선수강 강의 안내</h2>
                    </PreLectureTitle>

                    <PreLectureNotice>
                    * 지원 전 강의 수강은 필수가 아니며, 지원서 내에 수강 내역 캡쳐본을<br/>제출할 경우 가산점으로만 활용됩니다.
                    </PreLectureNotice>

                    <PreLectureList>
                    <PreLectureItem>
                        <div className="text">
                        <h3>Codecademy: Learn HTML</h3>
                        <ul>
                            <li>파트 1. Elements and Structure 중<br/>‘Lesson: Introduction to HTML’ & ‘Lesson: HTML Document Standards’</li>
                        </ul>
                        </div>
                        <a className="link-btn" href="https://www.codecademy.com/learn/learn-html">사이트 바로가기</a>
                    </PreLectureItem>

                    <PreLectureItem>
                        <div className="text">
                        <h3>Programmers: 파이썬 입문</h3>
                        <ul>
                            <li>파트 1. 시작하기 (파이썬 설치~에디터 설치 제외)</li>
                            <li>파트 2. 변수와 계산 (REPL, Shell 사용법 제외)</li>
                        </ul>
                        </div>
                        <a className="link-btn" href="https://school.programmers.co.kr/learn/courses/2">사이트 바로가기</a>
                    </PreLectureItem>
                    </PreLectureList>
                </PreLectureInner>
            </PreLectureSection>



            {/* 자주 묻는 질문들 */}
            <FAQSection>
                <FAQInner>
                    <FAQTitleArea>
                    <Icon src="/icons/ellipse4.svg" alt="icon" />
                    <h2>자주 묻는 질문들</h2>
                    </FAQTitleArea>

                    <FAQList>
                    {faq.map((item) => (
                        <DropDown3
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        styleType={1}
                        />
                    ))}
                    </FAQList>
                </FAQInner>
            </FAQSection>



            {/* 하단 지원하기 배너 */}
            <BottomBanner>
                <Icon src="/icons/ellipse4.svg" alt="" />
                <BannerText>빛나는 내일, 이대 멋사와 함께하세요!</BannerText>
                <ButtonGroup>
                    <ApplyButtonMobile />
                </ButtonGroup>
                <SubText>
                지원서를 제출하셨나요? <span>지원서 열람하기</span>
                </SubText>
            </BottomBanner>
            </SectionWrapper>
        </Container>

    </>
    );
};

export default RecruitGuidePageMo;

// --- 스타일 정의 ---

const Container = styled.div`
    width: 100%;
    background-color: #ffffff;
`;


const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


/* 모집 일정 영역 */

const ScheduleSectionWrapper = styled.div`
    width: 100%;
    padding: 1.88rem 1rem 1.88rem 1rem;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
`;

const SectionInner = styled.div`
    width: 100%;
    max-width: 800px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;

const Icon = styled.img`
    width: 1.25rem;
    height: 1.34369rem;
    margin-bottom: 0.5rem;
`;


const ScheduleGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr; 
    gap: 0.75rem;
    width: 100%;
    max-width: none; 

    @media (min-width: 458px) {
        max-width: none; 
        grid-template-columns: repeat(2, minmax(0, 18.375rem));
        justify-content: center;
    }

    @media (min-width: 801px) {
        grid-template-columns: repeat(4, minmax(0, 18.375rem));
    }
`;

const ScheduleCard = styled.div`
    background-color: ${({ $color }) => $color};
    border-radius: 1rem;
    padding: 1.5rem 1.25rem; 
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    height: 10.25rem;        
    width: 100%;           
    box-sizing: border-box;
    margin: 0 auto;
`;

const Num = styled.span`
    color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #FF7B2E));
    font-family: "Cafe24 PRO Slim";
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2.25rem;
    margin-bottom: 0.75rem;
`;

const Name = styled.h3`
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    font-family: Pretendard;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5rem;
`;

const Date = styled.p`
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    font-family: Pretendard;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.25rem;
`;



/* 모집 대상 영역 */

const TargetSectionWrapper = styled.div`
    width: 100%;
`;

/*
const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
`; */

const TargetInner = styled(SectionInner)`
    max-width: 30rem;
    align-items: center;
    padding: 1.88rem 1rem 3.75rem 1rem;
    margin: 0 auto;
    justify-content: center;
`;

const SectionTitle = styled.h2`
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    font-family: "Cafe24 PRO Slim";
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2.25rem;
    margin-bottom: 1rem;
    text-align: center;
`;


const CenteredArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    text-align: center;   
`;

const TargetMainDesc = styled.p`
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.375rem; 
    width: 100%;
`;

const TargetSubDesc = styled.p`
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.125rem; 
    margin-bottom: 1.5rem; 
    width: 100%;
    margin-top: 0.5rem;

`;


const TargetGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    align-items: center;
`;

const TargetItem = styled.div`
    h3 {
        color: #FF7B2E;
        font-family: "Cafe24 PRO Slim";
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    p {
        color: #2A2A2A;
        font-family: "Pretendard";
        font-size: 0.875rem;
        line-height: 1.5rem;
        margin-bottom: 0.1rem;
    }

    .small-notice {
        color: #9B9B9B;
        font-size: 0.75rem;
        line-height: 1.25rem;
        display: block;
    }

    .highlight-notice {
        color: #FF7B2E;
        font-size: 0.75rem;
        line-height: 1.25rem;
        display: block;
        padding: 0.1rem 0;
        font-weight: 500;
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
    padding: 1.88rem 1.25rem; 
`;

const PartTitle = styled.h2`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    img { width: 1.25rem; }

    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    font-family: "Cafe24 PRO Slim";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.25rem; 
    margin-bottom: 1.25rem;
`;

const LinkWrapper = styled.div`
    display: flex;
    align-items: center; 
    gap: 0.25rem;      
    cursor: pointer;

    img {
        width: 0.53188rem;
        height: 0.5rem;
    }

`;


const PartCards = styled.div`
    display: grid;
    grid-template-columns: 1fr; 
    gap: 0.75rem;
    justify-items: center; 
    width: 100%;
    margin: 0 auto;

    @media (min-width: 525px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 31rem; 

        & > *:nth-child(3) {
        grid-column: span 2; 
        justify-self: center; 
        }
    }

    @media (min-width: 1076px) {
        grid-template-columns: repeat(3, 1fr);
        max-width: 47rem; 
        
        & > *:nth-child(3) {
        grid-column: auto;
        }
    }
`;



const PartCard = styled.div`
    width: 15rem;
    height: 7rem;
    
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;     
    text-align: center;
    box-sizing: border-box;
    padding: 1rem;

    h3 {
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem;
        margin-bottom: 0.12rem; 
    }

    span {
        display: block; 
        color: var(--Atomic-Neutral-50, var(--Neutral-50, #737373));
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem; 
        margin-bottom: 0.75rem; 
    }
    
    a {
        color: var(--Atomic-Green-50, var(--Green-50, #00BF40));
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.375rem; 
    }
`;


/* 활동 계획 */
const ActivitySection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    background: #ffffff;
    padding: 2.5rem 1rem 1.88rem 1rem;
`;

const ActivityInner = styled.div`
    width: 100%;
    max-width: 60.75rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ActivityHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end; 
    margin-bottom: 1.21rem;
    width: 100%;
`;

const ActivityTitleArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.47rem;
    img { width: 1.25rem; }
    h2 { color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: "Cafe24 PRO Slim";
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.25rem;}
    p { color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.125rem;}
`;

const ActivityLegend = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    color: var(--Atomic-Cool-Neutral-70, var(--Cool-Neutral-70, #989BA2));
    font-family: Pretendard;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; 

    /* 동그란 아이콘 구현 */
    &::before {
        content: '';
        display: block;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        /* 각 아이템의 props로 전달된 color 사용 */
        background-color: ${props => props.color}; 
        margin-right: 0.25rem;
        margin-left: 1rem;
    }
`;

const ActivityGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 0.5rem; 
    row-gap: 0.5rem;
    width: 100%;
    max-width: 60.75rem; 
    align-self: center;
`;

const TermHeader = styled.div`
    background: #2A2A2A;
    color: white;
    text-align: center;
    padding: 0.25rem 0.5rem;
    border-radius: var(--unit-4, 0.25rem);
    background: var(--Neutral-20, #2A2A2A);
    color: var(--Static-White, #FFF);
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem; 
`;

const WideActivityBox = styled.div`
    grid-column: span 3;
    background: ${props => props.color};
    border: 1px solid ${props => props.border};
    border-radius: 0.25rem;
    padding: 0.5rem;
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; 
`;

const ActivityColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    grid-auto-rows: 1fr;
`;

const ActivityBox = styled.div`
    background: ${props => props.color}; 
    border: 1px solid ${props => props.border};
    padding: 0.5rem 0.5rem;
    text-align: center;
    border-radius: 0.25rem;
    min-height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; 
`;


/* 선수강 강의 안내 */
const PreLectureSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    background: #ffffff;
    padding: 2.5rem 1rem 1.88rem 1rem;
`;

const PreLectureInner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const PreLectureTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.47rem;
    margin-bottom: 0.47rem;

    h2 {
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: "Cafe24 PRO Slim";
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.25rem; 
    }

    img {
        width: 1.25rem;
        height: 1.34369rem;
    }
`;

const PreLectureNotice = styled.p`
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.125rem; 
    margin-bottom: 1.21rem;
`;

const PreLectureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const PreLectureItem = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: stretch;
    gap: 1.25rem;

    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    border: 1px solid var(--Primary-sub, #FF9B38);
    background: var(--Orange-95, #FEF4E6);



    h3 {
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.375rem; 
        margin-bottom: 0.19rem;
    }

    ul {
        padding-left: 1.2rem;
    }

    li {
        color: var(--Atomic-Neutral-50, var(--Neutral-50, #737373));
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.125rem; 
    }

    .link-btn {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
        width: 100%;              
        display: flex;
        height: 2.625rem;
        min-width: 15rem;
        padding: 0.625rem 1.75rem;
        justify-content: center;
        align-items: center;
        flex: 1 0 0;
        border-radius: 1.25rem;
        background: var(--Primary-sub, #FF9B38);
        color: var(--Static-White, #FFF);
        text-align: center;
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.375rem; /* 157.143% */
    }

    @media (min-width: 34.875rem) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;


        .link-btn {
            all: unset;
            box-sizing: border-box;
            cursor: pointer;

            width: 16rem;          
            height: 2.625rem;      

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 0 1.75rem;
            border-radius: 1.25rem;
            background: var(--Primary-sub, #FF9B38);

            color: #fff;
            font-family: Pretendard;
            font-size: 0.875rem;
            font-weight: 700;
            white-space: nowrap;

            flex: none;           
        }

    }
`;



/* 자주 묻는 질문들 */
const FAQSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
    padding: 1rem 1rem 1rem 1rem;
`;

const FAQInner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const FAQTitleArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.47rem;
    margin-bottom: 1.25rem;
    width: 100%;

    h2 {
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: "Cafe24 PRO Slim";
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.25rem; 
    }

    img{
        width: 1.25rem;
        height: 1.34369rem;
    }
`;

const FAQList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;

    & > div {
        width: 100% !important;
        max-width: none !important;
    }
`;


/* 하단 지원하기 배너 */
const BottomBanner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.88rem 1rem 3.75rem 1rem;
`;

const BannerText = styled.p`
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    font-family: "Cafe24 PRO Slim";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.25rem;
    margin-bottom: 1.25rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.5rem;
    width: 100%;
    margin-bottom: 0.75rem;
    justify-content: center;
`;

const SubText = styled.p`
    color: var(--Atomic-Neutral-50, var(--Neutral-50, #737373));
        text-align: center;
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem; 
    span {
        color: var(--Atomic-Neutral-50, var(--Neutral-50, #737373));
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.25rem;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-skip-ink: none;
        text-decoration-thickness: auto;
        text-underline-offset: auto;
        text-underline-position: from-font;
        text-decoration: underline;
        cursor: pointer;
    }
`;