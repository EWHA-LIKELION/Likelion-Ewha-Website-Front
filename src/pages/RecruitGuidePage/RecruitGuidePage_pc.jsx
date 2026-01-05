import RecruitGuideHeroPc from "./RecruitGuideHero_pc";
import DropDown3 from "../../components/dropdown/Dropdown3"
import {
    ApplyWhiteButton,
    DetailLinkButton,
} from "../../components/buttons/MainButtons_pc";
import styled from "styled-components";
import faq from "../../data/faq.json";


const RecruitGuidePagePc = () => {
    return (
        <PageWrapper>
            {/* Hero */}
            <RecruitGuideHeroPc />

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
                        <a href="#">자세한 내용 노션 바로가기</a>
                    </TargetSubDesc>

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
                            <h3>1학기 활동</h3>
                            <p>아래의 요건을 모두 충족하여 1년 활동을 완료할 경우 수료<br/>증이발급됩니다.</p>
                            <span className="highlight-notice">
                                4월 말~5월 중 진행되는 아이디어톤 필수 참여<br/>
                                8월 중 오프라인으로 무박 2일간 진행되는 중앙 해커톤 필수 참여
                            </span>
                            <span className="small-notice">* 자세한 일정 추후 공지 예정</span>
                        </TargetItem>

                        <TargetItem>
                            <h3>오프라인 세션 참여</h3>
                            <p>매주 화/목 오후 6시 30분에 진행되는 세션에 필수로 참여<br/>하실 수 있어야 합니다.
                            <br/>따라서 오프라인으로 참여하실 수 있는 인원을 우선적으로<br/>모집하고 있습니다.</p>
                        </TargetItem>

                        <TargetItem>
                            <h3>활동 비용</h3>
                            <p>동아리 물품 구비 및 운영을 위해 최종 합격자는 회비 3만원<br/>을 제출하여야합니다.</p>
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
                    <LinkWrapper href="#"> 
                        <a>파트 소개 바로가기</a>
                        <img src="/icons/arrowRight3.svg" alt="icon" />
                    </LinkWrapper>
                    
                </PartCard>

                <PartCard>
                    <h3>프론트엔드</h3>
                    <span>FRONTEND</span>
                    <LinkWrapper href="#"> 
                        <a>파트 소개 바로가기</a>
                        <img src="/icons/arrowRight3.svg" alt="icon" />
                    </LinkWrapper>
                </PartCard>

                <PartCard>
                    <h3>백엔드</h3>
                    <span>BACKEND</span>
                    <LinkWrapper href="#"> 
                        <a>파트 소개 바로가기</a>
                        <img src="/icons/arrowRight3.svg" alt="icon" />
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
                            <img src="/icons/ellipse.svg" alt="icon" />
                            <h2>활동 계획</h2>
                            <p>* 계획은 13기 기준이며, 14기 활동 계획은 변경될 수 있습니다.</p>
                        </ActivityTitleArea>
                        <ActivityLegend>
                            <LegendItem color="#98FBA4">교내 활동</LegendItem>
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
                    * 지원 전 강의 수강은 필수가 아니며, 지원서 내에 수강 내역 캡쳐본을 제출할 경우 가산점으로만 활용됩니다.
                    </PreLectureNotice>

                    <PreLectureList>
                    <PreLectureItem>
                        <div className="text">
                        <h3>Codecademy: Learn HTML</h3>
                        <ul>
                            <li>파트 1. Elements and Structure 중 ‘Lesson: Introduction to HTML’ & ‘Lesson: HTML Document Standards’</li>
                        </ul>
                        </div>
                        <a className="link-btn" href="https://example.com">사이트 바로가기</a>
                    </PreLectureItem>

                    <PreLectureItem>
                        <div className="text">
                        <h3>Programmers: 파이썬 입문</h3>
                        <ul>
                            <li>파트 1. 시작하기 (파이썬 설치~에디터 설치 제외)</li>
                            <li>파트 2. 변수와 계산 (REPL, Shell 사용법 제외)</li>
                        </ul>
                        </div>
                        <a className="link-btn" href="https://example.com">사이트 바로가기</a>
                    </PreLectureItem>
                    </PreLectureList>
                </PreLectureInner>
            </PreLectureSection>


            {/* 자주 묻는 질문 */}
            <FAQSection>
                <FAQInner>
                    <FAQTitleArea>
                    <img src="/icons/ellipse4.svg" alt="icon" />
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

                {/* 하단 지원 유도 섹션 */}
                <FooterBannerSection>
                    <BannerContent>
                        <img src="/icons/ellipse.svg" alt="별 아이콘" />
                        <h2>빛나는 내일, 이대 멋사와 함께하세요!</h2>
                        <BannerButtons>
                            <ApplyWhiteButton/>
                            <DetailLinkButton/>
                        </BannerButtons>
                        <CheckLinkText>
                            지원서를 제출하셨나요?<span onClick={() => {/* 열람 로직 */}}>지원서 열람하기</span>
                        </CheckLinkText>
                    </BannerContent>
                </FooterBannerSection>
        </PageWrapper>

    );
};

export default RecruitGuidePagePc;

const PageWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-x: hidden;

    @media (max-width: 1440px) and (min-width: 800px) {
        font-size: 0.6944vw; 
    }
`;

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
`;

const ScheduleContentWrapper = styled.div`
    width: 100%;
    max-width: 60.75rem; 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ScheduleTitle = styled.h2`
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
`;

const ScheduleCards = styled.div`
    display: grid;
    gap: 1.25rem;
    width: 100%;
    justify-content: center;

    /* 1. 1126px 이상: 4개가 한 줄 */
    grid-template-columns: repeat(4, 14.25rem);

    /* 2. 870px ~ 1125px: 위 3개, 아래 중간에 1개 */
    @media (max-width: 1125px) and (min-width: 870px) {
        grid-template-columns: repeat(3, 14.25rem);
        
        & > div:nth-child(4) {
            grid-column: 2; 
        }
    }

    /* 3. 869px 이하: 2x2 */
    @media (max-width: 869px) {
        grid-template-columns: repeat(2, 14.25rem);
        
        & > div:nth-child(4) {
            grid-column: auto;
        }
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
`;

const Step = styled.span`
    color: #FF7B2E;
    font-family: "Cafe24 PRO Slim";
    font-size: 2.375rem;
    font-weight: 700;
    line-height: 3.125rem; 
    margin-bottom: 3.25rem;
`;

const CardTitle = styled.h3`
    color: #2A2A2A;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.75rem;
`;

const CardDesc = styled.p`
    color: #474747;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.25rem; 
`;

/* 모집 대상 스타일 */
const TargetSection = styled.section`
    width: 100%;
    background: #ffffff;
    display: flex;
    justify-content: center;
    padding: 1.25rem 0rem 7.5rem 0rem ;
`;

const TargetInner = styled.div`
    max-width: 60.75rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
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
        line-height: 3.125rem; /* 138.889% */
    img { width: 2rem; }
`;

const TargetMainDesc = styled.p`
    color: var(--Atomic-Neutral-30, var(--Neutral-30, #474747));
    text-align: center;

    /* H4/bold */
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem; /* 140% */
    margin-bottom: 0.5rem;
`;

const TargetSubDesc = styled.p`
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));
    text-align: center;

    /* Body/regular */
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem; /* 157.143% */
    margin-bottom: 6.25rem;

    a { 
        color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));

        /* Body/regular */
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.375rem;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-skip-ink: none;
        text-decoration-thickness: auto;
        text-underline-offset: auto;
        text-underline-position: from-font;
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
        /* Body/regular */
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.375rem;
        display: block; 
    }
    .highlight-notice { 
        color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #FF7B2E));
        /* Body/regular */
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.375rem; 
        display: block; 
        padding-top: 0.5rem;
        padding-bottom: 0.5rem; 
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
`;

const PartTitle = styled.h2`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 2rem;
    img { width: 2rem; }

    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: "Cafe24 PRO Slim";
        font-size: 2.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 3.125rem;
`;

/* 모집 파트 카드 컨테이너 */
const PartCards = styled.div`
    display: grid;
    gap: 1.25rem;
    width: 100%;
    
    justify-content: center; 

    /* 1. 800px ~ 1075px: 카드 크기 고정 및 세로 1줄 */
    @media (min-width: 800px) and (max-width: 1075px) {
        grid-template-columns: 19.375rem;
        & > div {
        width: 19.375rem;
        height: 9.5rem;
        }
    }

    /* 2. 1076px ~ 1416px: 위 2개 / 아래 1개 가운데 정렬 */
    @media (min-width: 1076px) {
        grid-template-columns: repeat(2, 19.375rem);
        
        width: fit-content;
        margin: 0 auto;

        /* 세 번째 카드(백엔드) 처리 */
        & > div:nth-child(3) {
        grid-column: span 2;  
        justify-self: center; 
        width: 19.375rem;     
        }
    }

    /* 3. 1417px 이상: 3개 한 줄 */
    @media (min-width: 1417px) {
        grid-template-columns: repeat(3, 19.375rem);
        width: fit-content;

        & > div:nth-child(3) {
        grid-column: auto;
        justify-self: stretch;
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
`;

const LinkWrapper = styled.a`
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
`;

/* 활동 계획 */
const ActivitySection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    background: #ffffff;
    padding: 5rem 5rem 5rem 5rem;
`;

const ActivityInner = styled.div`
    width: 100%;
    max-width: 60.75rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    
`;

const ActivityHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end; 
    margin-bottom: 2rem;
    width: 100%;
`;

const ActivityTitleArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    img { width: 2rem; }
    h2 { font-family: "Cafe24 PRO Slim"; font-size: 2.25rem; font-weight: 700; color: #2a2a2a; }
    p { font-size: 0.875rem; color: #b0b0b0; }
`;

const ActivityLegend = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.56rem;
    align-items: flex-start;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--Atomic-Cool-Neutral-50, var(--Cool-Neutral-50, #70737C));

    /* H5/regular */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; 

    /* 동그란 아이콘 구현 */
    &::before {
        content: '';
        display: block;
        width: 1.285rem;
        height: 1.285rem;
        border-radius: 50%;
        /* 각 아이템의 props로 전달된 color 사용 */
        background-color: ${props => props.color}; 
    }
`;

const ActivityGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.25rem; 
    row-gap: 0.75rem;
    width: 100%;
    max-width: 60.75rem; 
    align-self: center;
`;

const TermHeader = styled.div`
    background: #2A2A2A;
    color: white;
    text-align: center;
    padding: 1rem 1.25rem;
    border-radius: var(--unit-12, 0.75rem);
    background: var(--Neutral-20, #2A2A2A);
    color: var(--Static-White, #FFF);
    text-align: center;
    /* H4/bold */
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem; 
`;

const WideActivityBox = styled.div`
    margin-top: 0.5rem;
    grid-column: span 3;
    background: ${props => props.color};
    border: 1px solid ${props => props.border};
    padding: 0.88rem 1.25rem;
    text-align: center;
    border-radius: 0.5rem;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
`;

const ActivityColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    grid-auto-rows: 1fr;
`;

const ActivityBox = styled.div`
    background: ${props => props.color}; 
    border: 1px solid ${props => props.border};
    padding: 0.88rem 1.25rem;
    text-align: center;
    border-radius: 0.5rem;
    min-height: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    text-align: center;

    /* H5/regular */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
`;

/* 선수강 강의 안내 */
const PreLectureSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    background: #ffffff;
    padding: 5rem 5rem 5rem 5rem;
`;

const PreLectureInner = styled.div`
    width: 100%;
    max-width: 60.68rem;
    display: flex;
    flex-direction: column;
`;

const PreLectureTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    h2 {
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: "Cafe24 PRO Slim";
        font-size: 2.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 3.125rem;
    }

    img {
        width: 2rem;
        height: 2.14988rem;
    }
`;

const PreLectureNotice = styled.p`
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem;
    margin-bottom: 2rem;
`;

const PreLectureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const PreLectureItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-radius: var(--unit-16, 1rem);
    border: 1px solid var(--Primary-sub, #FF9B38);
    background: var(--Orange-95, #FEF4E6);
    gap: 0.75rem;

  .text {
    max-width: 70%;
  }

    h3 {
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: Pretendard;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.75rem; 

    }

    ul {
        padding-left: 1.2rem;
    }

    li {
        color: var(--Atomic-Neutral-50, var(--Neutral-50, #737373));
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem;
    }

    .link-btn {
        width: 12.375rem;
        padding: 1.125rem 2.25rem;
        border-radius: 2.5rem;
        background: var(--Primary-sub, #FF9B38);
        color: #ffffff;
        color: var(--Static-White, #FFF);
        text-align: center;
        font-family: Pretendard;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.75rem; 
        text-decoration: none;
        white-space: nowrap;
    }
`;


const FooterBannerSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 6.25rem 5rem 10rem 5rem; 
    background-color: #ffffff;
`;

const BannerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    img {
        width: 2rem;
        margin-bottom: 0.5rem;
    }

    h2 {
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: "Cafe24 PRO Slim";
        font-size: 2.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 3.125rem; 
        margin-bottom: 2.5rem;
    }
`;

const BannerButtons = styled.div`
    display: flex;
    gap: 1.25rem;
    margin-bottom: 1rem;
`;

const CheckLinkText = styled.p`
    color: var(--Atomic-Neutral-40, var(--Neutral-40, #5C5C5C));
    text-align: center;

    /* H5/regular */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; 
    
    span {
        text-decoration: underline;
        cursor: pointer;
        margin-left: 0.5rem;
        color: var(--Atomic-Neutral-40, var(--Neutral-40, #5C5C5C));

        /* H5/regular */
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-skip-ink: none;
        text-decoration-thickness: auto;
        text-underline-offset: auto;
        text-underline-position: from-font;
    }
`;

const FAQSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    padding: 0rem 5rem 0rem 5rem;
`;

const FAQInner = styled.div`
    width: 100%;
    max-width: 60.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FAQTitleArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    gap: 0.75rem;
    margin-bottom: 2rem;
    width: 100%;          
    
    img { 
        width: 2rem; 
    }
    
    h2 { 
        color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
        font-family: "Cafe24 PRO Slim";
        font-size: 2.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 3.125rem;    
        }
`;

const FAQList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
`;