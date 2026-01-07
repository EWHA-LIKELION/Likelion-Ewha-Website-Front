import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    ApplyBlackButtonMobile,
    RecruitAlarmButtonMobile,
    RecruitDisabledButtonMobile,
    RecruitCheckButtonMobile,
} from "../../components/buttons/MainButtons_mo"; 

import { Modal } from "../../components/Modal";

const getRecruitStatus = (schedule) => {
    const now = new Date();

    const applicationStart = new Date(schedule.application_start);
    const applicationEnd = new Date(schedule.application_end);
    const firstResultStart = new Date(schedule.first_result_start);
    const firstResultEnd = new Date(schedule.first_result_end);
    const finalResultStart = new Date(schedule.final_result_start);
    const finalResultEnd = new Date(schedule.final_result_end);

    if (now < applicationStart) return "BEFORE";

    if (now >= applicationStart && now <= applicationEnd) {
        return "RECRUITING";
    }

    if (now > applicationEnd && now < firstResultStart) {
        return "CLOSED";
    }

    if (now >= firstResultStart && now <= firstResultEnd) {
        return "FIRST_RESULT";
    }

    if (now >= finalResultStart && now <= finalResultEnd) {
        return "FINAL_RESULT";
    }

    return "CLOSED";
    };


const RecruitGuideHeroMo = () => {
    const navigate = useNavigate();
    const [recruitStatus, setRecruitStatus] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
        useEffect(() => {
        const fetchRecruitSchedule = async () => {
            try {
            const res = await fetch("/api/recruit/schedule");
            const result = await res.json();
    
            const schedule = result.data.recruitment_schedule;
    
            const status = getRecruitStatus(schedule);
            setRecruitStatus(status);
            } catch (e) {
            console.error("모집 일정 조회 실패", e);
            }
        };
    
        fetchRecruitSchedule();
        }, []);
    
    
    
        const renderRecruitButton = () => {
            switch (recruitStatus) {
                // case 1️⃣ 서류 지원 기간
                case "RECRUITING":
                return (
                    <ApplyBlackButtonMobile
                    onClick={() => navigate("/recruit/apply/form")}
                    />
                );
    
                // case 2️⃣ 모집 마감
                case "CLOSED":
                return <RecruitDisabledButtonMobile />;
    
                // case 3️⃣ 1차 결과 발표
                case "FIRST_RESULT":
                return (
                    <RecruitCheckButtonMobile
                    onClick={() => navigate("/recruit/result")}
                    >
                    1차 합격자 조회
                    </RecruitCheckButtonMobile>
                );
    
                // case 4️⃣ 최종 결과 발표
                case "FINAL_RESULT":
                return (
                    <RecruitCheckButtonMobile
                    onClick={() => navigate("/recruit/result")}
                    >
                    최종 합격자 조회
                    </RecruitCheckButtonMobile>
                );
    
                // case 5️⃣ 모집 전 (default)
                default:
                return <RecruitAlarmButtonMobile onClick={() => setIsModalOpen(true)}/>;
            }
        };
    

    return (
        <Section>
            <Inner>
                <Content>
                    <Title>RECRUIT</Title>
                    <Description>
                        멋쟁이사자처럼 이화여대와 함께할 14기 아기사자를 모집합니다
                    </Description>

                    <ButtonGroup>
                        {renderRecruitButton()}
                    </ButtonGroup>

                    <SubText>
                        지원서를 제출하셨나요? <span>지원서 열람하기</span>
                    </SubText>
                </Content>
            </Inner>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="14기 모집 사전 알림 등록"
                description="이화여대 멋쟁이사자처럼 카카오톡 채널을 통해 모집이 시작되면 가장 먼저 알려드릴게요."
                align="center"
                actions={[
                    {
                        label: "카카오톡 바로가기",
                        variant: "primary",
                        fullWidth: true,
                        onClick: () => {
                            window.open("https://pf.kakao.com/_htxexfd", "_blank"); // 실제 링크 입력
                        }
                    }
                ]}
            />
        </Section>
    );
};

export default RecruitGuideHeroMo;

const Section = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #000; 
`;

const Inner = styled.div`
    width: 100%;
    padding: 2.5rem 0rem 2.5rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;

    background: 
        url("/images/RecruitMoHero.png") center / cover no-repeat;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #ffffff;
`;

const Title = styled.h1`
    color: #FFF;
    text-align: center;
    font-family: Bayon;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem;
    margin-bottom: 0.12rem;
`;

const Description = styled.p`
    color: var(--Static-White, #FFF);
    text-align: center;

    /* Point (Kor)/Body */
    font-family: "Cafe24 PRO Slim";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.375rem; 
    margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.5rem;
    width: 100%;
    align-items: center; 
    justify-content: center;
    margin-bottom: 0.75rem;

`;

const SubText = styled.p`
    color: var(--Atomic-Neutral-90, var(--Neutral-90, #C4C4C4));
    text-align: center;

    /* Footnote/regular */
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; /* 166.667% */

    span {
        color: var(--Atomic-Neutral-90, var(--Neutral-90, #C4C4C4));

        /* Footnote/regular */
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
    }
`;