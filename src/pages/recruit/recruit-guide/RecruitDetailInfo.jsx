import styled from "styled-components";
import DropDown3 from "../../../components/dropdown/Dropdown3";
import RecruitStatusButton from "../../../components/buttons/RecruitStatusButton";
import { getFaqData } from "@/data";
import { CURRENT_GENERATION } from "@/config/siteConfig";

const RecruitDetailInfo = () => {
    const faqData = getFaqData();
    
    return (
        <>
            {/* 활동 계획 */}
            <ActivitySection>
                <ActivityInner>
                    <ActivityHeader>
                        <ActivityTitleArea>
                            <img src="/icons/ellipse.svg" alt="icon" />
                            <h2>활동 계획</h2>
                            <p>* 계획은 {CURRENT_GENERATION-1}기 기준이며, {CURRENT_GENERATION}기 활동 계획은 변경될 수 있습니다.</p>
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

                        <WideActivityBox color="#EFFFF0" $border="#05DA5B">파트별 세션 및 스터디</WideActivityBox>

                        <ActivityColumn>
                            <ActivityBox color="#EFFFF0" $border="#05DA5B">공통 세션</ActivityBox>
                            <ActivityBox color="#FFF8ED" $border="#FF7B2E">중앙 아이디어톤 (4월 말~5월)</ActivityBox>
                        </ActivityColumn>

                        <ActivityColumn>
                            <ActivityBox color="#FFF8ED" $border="#FF7B2E">여기톤 (7월, 6개 여대 연합 해커톤)</ActivityBox>
                            <ActivityBox color="#FFF8ED" $border="#FF7B2E">중앙 해커톤 (8월, 전국 53개 대학 연합)</ActivityBox>
                        </ActivityColumn>

                        <ActivityColumn>
                            <ActivityBox color="#EFFFF0" $border="#05DA5B">대동제 리디자인</ActivityBox>
                            <ActivityBox color="#EFFFF0" $border="#05DA5B">팀 프로젝트</ActivityBox>
                            <ActivityBox color="#FFF8ED" $border="#FF7B2E">신촌톤 (9월, 신촌 4개 대학 연합 해커톤)</ActivityBox>
                            <ActivityBox color="#FFF8ED" $border="#FF7B2E">신촌 대학 연합 SW 창업 경진 대회 (11월)</ActivityBox>
                            <ActivityBox color="#EFFFF0" $border="#05DA5B">기수 졸업 프로젝트</ActivityBox>
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
                                    <li>파트 1. Elements and Structure 중 'Lesson: Introduction to HTML' & 'Lesson: HTML Document Standards'</li>
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

            {/* 자주 묻는 질문 */}
            <FAQSection>
                <FAQInner>
                    <FAQTitleArea>
                        <img src="/icons/ellipse4.svg" alt="icon" />
                        <h2>자주 묻는 질문들</h2>
                    </FAQTitleArea>

                    <FAQList>
                        {faqData.map((item) => (
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
                        <RecruitStatusButton pageType="recruit" recruitStyle="2" />
                    </BannerButtons>
                </BannerContent>
            </FooterBannerSection>
        </>
    );
};

export default RecruitDetailInfo;

/* 활동 계획 */
const ActivitySection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    background: #ffffff;
    padding: 5rem 5rem 5rem 5rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        padding: 2.5rem 1rem 1.88rem 1rem;
    }
`;

const ActivityInner = styled.div`
    width: 100%;
    max-width: 60.75rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        align-items: center;
    }
`;

const ActivityHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
    width: 100%;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        margin-bottom: 1.21rem;
    }
`;

const ActivityTitleArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;

    img {
        width: 2rem;
    }

    h2 {
        font-family: "Cafe24 PRO Slim";
        font-size: 2.25rem;
        font-weight: 700;
        color: #2a2a2a;
    }

    p {
        font-size: 0.875rem;
        color: #b0b0b0;
    }

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        gap: 0.47rem;

        img {
            width: 1.25rem;
        }

        h2 {
            font-size: 1.5rem;
            line-height: 2.25rem;
        }

        p {
            font-size: 0.75rem;
            line-height: 1.125rem;
            color: #9B9B9B;
        }
    }
`;

const ActivityLegend = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.56rem;
    align-items: flex-start;

    @media (max-width: 799px) {
        gap: 0;
    }
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--Atomic-Cool-Neutral-50, var(--Cool-Neutral-50, #70737C));
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;

    &::before {
        content: '';
        display: block;
        width: 1.285rem;
        height: 1.285rem;
        border-radius: 50%;
        background-color: ${props => props.color};
    }

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        gap: 0.25rem;
        font-size: 0.625rem;
        line-height: 1.25rem;
        color: var(--Atomic-Cool-Neutral-70, var(--Cool-Neutral-70, #989BA2));
        white-space: nowrap;

        &::before {
            width: 0.625rem;
            height: 0.625rem;
            margin-right: 0.25rem;
            margin-left: 1rem;
        }
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

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        column-gap: 0.5rem;
        row-gap: 0.5rem;
    }
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
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        padding: 0.25rem 0.5rem;
        border-radius: var(--unit-4, 0.25rem);
        font-size: 0.875rem;
        line-height: 1.375rem;
    }
`;

const WideActivityBox = styled.div`
    margin-top: 0.5rem;
    grid-column: span 3;
    background: ${props => props.color};
    border: 1px solid ${props => props.$border};
    padding: 0.88rem 1.25rem;
    text-align: center;
    border-radius: 0.5rem;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        margin-top: 0;
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        line-height: 1.25rem;
    }
`;

const ActivityColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    grid-auto-rows: 1fr;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        gap: 0.5rem;
    }
`;

const ActivityBox = styled.div`
    background: ${props => props.color};
    border: 1px solid ${props => props.$border};
    padding: 0.88rem 1.25rem;
    text-align: center;
    border-radius: 0.5rem;
    min-height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        line-height: 1.25rem;
    }
`;

/* 선수강 강의 안내 */
const PreLectureSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    background: #ffffff;
    padding: 5rem 5rem 5rem 5rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        padding: 2.5rem 1rem 1.88rem 1rem;
    }
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

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        gap: 0.47rem;
        margin-bottom: 0.47rem;

        h2 {
            font-size: 1.5rem;
            line-height: 2.25rem;
        }

        img {
            width: 1.25rem;
            height: 1.34369rem;
        }
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

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        font-size: 0.75rem;
        line-height: 1.125rem;
        margin-bottom: 1.21rem;
    }
`;

const PreLectureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        gap: 0.5rem;
    }
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

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        flex-direction: column;
        align-items: stretch;
        padding: 1rem 1.25rem;
        border-radius: 0.75rem;
        gap: 1.25rem;

        .text {
            max-width: 100%;
        }

        h3 {
            font-size: 0.875rem;
            line-height: 1.375rem;
            margin-bottom: 0.19rem;
        }

        li {
            font-size: 0.75rem;
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
            font-weight: 700;
            line-height: 1.375rem;
        }
    }

    @media (max-width: 799px) and (min-width: 34.875rem) {
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

const FooterBannerSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 6.25rem 5rem 10rem 5rem;
    background-color: #ffffff;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        padding: 1.88rem 1rem 3.75rem 1rem;
    }
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

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        img {
            width: 1.25rem;
        }

        h2 {
            font-size: 1.5rem;
            line-height: 2.25rem;
            margin-bottom: 1.25rem;
        }
    }
`;

const BannerButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: 100%;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        gap: 0.5rem;
    }
`;

const FAQSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    padding: 0rem 5rem 0rem 5rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        padding: 1rem 1rem 1rem 1rem;
    }
`;

const FAQInner = styled.div`
    width: 100%;
    max-width: 60.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        align-items: flex-start;
    }
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

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        gap: 0.47rem;
        margin-bottom: 1.25rem;

        img {
            width: 1.25rem;
            height: 1.34369rem;
        }

        h2 {
            font-size: 1.5rem;
            line-height: 2.25rem;
        }
    }
`;

const FAQList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;

    transition: all 0.2s ease;

    @media (max-width: 799px) {
        gap: 0.5rem;

        & > div {
            width: 100% !important;
            max-width: none !important;
        }
    }
`;
