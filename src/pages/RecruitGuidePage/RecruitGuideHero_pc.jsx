import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ApplyButton,
    RecruitDisabledButton,
    RecruitCheckButton,
    RecruitAlarmButton,
} from "../../components/buttons/MainButtons_pc";

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

const RecruitGuideHeroPc = () => {
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
                case "RECRUITING":
                return (
                    <ApplyButton
                    onClick={() => navigate("/recruit/apply/form")}
                    />
                );
    
                case "CLOSED":
                return <RecruitDisabledButton />;
    
                case "FIRST_RESULT":
                return (
                    <RecruitCheckButton onClick={() => navigate("/recruit/result")}>
                    1차 합격자 조회
                    </RecruitCheckButton>
                );
    
                case "FINAL_RESULT":
                return (
                    <RecruitCheckButton onClick={() => navigate("/recruit/result")}>
                    최종 합격자 조회
                    </RecruitCheckButton>
                );
    
                default:
                return <RecruitAlarmButton onClick={() => setIsModalOpen(true)}/>;
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

export default RecruitGuideHeroPc;


const Section = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Inner = styled.div`
    width: 100%;
    height: 42.5rem; 

    display: flex;
    justify-content: center;

    padding: 7.62rem 0; 

    background:
        linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.65) 0%,
        rgba(0, 0, 0, 0.55) 45%,
        rgba(0, 0, 0, 0.15) 70%,
        rgba(0, 0, 0, 0) 100%
        ),
        url("/images/RecruitPcHero.png") center / cover no-repeat;
`;

const Content = styled.div`
    max-width: 1440px;
    padding: 0 80px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
    color: #ffffff;
`;

const Title = styled.h1`
    display: flex;
    width: 35.125rem;
    height: 8.75rem;
    min-width: 25rem;
    flex-direction: column;
    justify-content: center;
    color: #FFF;
    text-align: center;
    font-family: Bayon;
    font-size: 8.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0; /* 0% */
`;

const Description = styled.p`
    width: 38rem;
    min-width: 25rem;
    color: var(--Atomic-Cool-Neutral-98, var(--Cool-Neutral-98, #F4F4F5));
    text-align: center;

    /* Point (Kor)/H2 */
    font-family: "Cafe24 PRO Slim";
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.625rem; 

    margin-top: 1.5rem;
    margin-bottom: 5rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
`;

const SubText = styled.p`
    color: #E2E2E2;
    text-align: center;

    /* H5/regular */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; 

    span {
        color: #E2E2E2;
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
