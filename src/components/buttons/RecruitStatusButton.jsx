import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal";
import { RecruitAPI } from "@/apis";
import {
  RecruitAlarmButton,
  RecruitInfoButton,
  RecruitCheckButton,
  RecruitDisabledButton,
  ApplyButton,
  ApplyBlackButton,
} from "./MainButtons_pc";
import {
  RecruitAlarmButtonMobile,
  RecruitInfoButtonMobile,
  RecruitCheckButtonMobile,
  RecruitDisabledButtonMobile,
  ApplyButtonMobile,
  ApplyBlackButtonMobile,
} from "./MainButtons_mo";

// 모집 상태 계산 함수
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

const RecruitStatusButton = ({ isMobile, pageType = "home", recruitStyle = "1" }) => {
  // 1. 상태 및 로직 관리
  // 상태: "BEFORE" | "RECRUITING" | "CLOSED" | "FIRST_RESULT" | "FINAL_RESULT"
  const [recruitStatus, setRecruitStatus] = useState(null);

  const navigate = useNavigate();

  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  // API로부터 모집 일정 가져오기
  useEffect(() => {
    const fetchRecruitSchedule = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const data = await RecruitAPI.getRecruitmentSchedule(currentYear);

        const schedule = data.recruitment_schedule;
        const status = getRecruitStatus(schedule);

        setRecruitStatus(status);
      } catch (e) {
        console.error("모집 일정 조회 실패", e);
        setRecruitStatus("BEFORE"); // 실패 시 기본값
      }
    };

    fetchRecruitSchedule();
  }, []);

  // --- 핸들러 함수들 ---
  const goRecruitPage = () => {
    navigate("/recruit");
  };

  const goApplyForm = () => {
    navigate("/recruit/apply/form");
  };

  const goResultPage = () => {
    navigate("/recruit/result");
  };

  const openCodeModal = (e) => {
    e.preventDefault();
    setCodeValue("");
    setIsCodeModalOpen(true);
  };

  const openAlarmModal = () => {
    setIsAlarmModalOpen(true);
  };

  const goKakaoChannel = () => {
    window.open("https://pf.kakao.com/_htxexfd/friend", "_blank");
  };

  const handleCheckCode = () => {
    if (codeValue.trim() === "") return;

    // [테스트 로직] 실패 가정
    const isUserFound = false;

    if (!isUserFound) {
      setIsCodeModalOpen(false);
      setIsErrorModalOpen(true);
    } else {
      alert("확인되었습니다!");
      setIsCodeModalOpen(false);
    }
  };

  // --- 텍스트/버튼 결정 헬퍼 ---
  const getModalText = () => {
    switch (recruitStatus) {
      case "FIRST_RESULT":
      case "FINAL_RESULT":
        return {
          title: "지원 코드 입력",
          description:
            "합격 여부를 확인하기 위해\n지원서 작성시에 발급받은 지원 코드가 필요해요.",
        };
      default:
        return {
          title: "지원 코드 입력",
          description:
            "지원서를 열람하기 위해서\n지원서 작성시에 발급받은 지원 코드가 필요해요.",
        };
    }
  };
  const modalContent = getModalText();

  // 버튼 렌더링
  const renderButton = () => {
    switch (recruitStatus) {
      case "RECRUITING": {
        // home 페이지: 모집 정보 보기 -> /recruit
        // recruit 페이지: 지원하기 -> /recruit/apply/form
        if (pageType === "recruit") {
          if (recruitStyle === "1") {
            return isMobile ? (
              <ApplyButtonMobile onClick={goApplyForm} />
            ) : (
              <ApplyButton onClick={goApplyForm} />
            );
          } else {
            return isMobile ? (
              <ApplyBlackButtonMobile onClick={goApplyForm} />
            ) : (
              <ApplyBlackButton onClick={goApplyForm} />
            );
          }
        } else {
          return isMobile ? (
            <RecruitInfoButtonMobile onClick={goRecruitPage} />
          ) : (
            <RecruitInfoButton onClick={goRecruitPage} />
          );
        }
      }

      case "CLOSED":
        return isMobile ? (
          <RecruitDisabledButtonMobile />
        ) : (
          <RecruitDisabledButton />
        );

      case "FIRST_RESULT":
      case "FINAL_RESULT": {
        const btnText =
          recruitStatus === "FIRST_RESULT"
            ? "1차 합격자 조회"
            : "최종 합격자 조회";
        return isMobile ? (
          <RecruitCheckButtonMobile onClick={goResultPage}>
            {btnText}
          </RecruitCheckButtonMobile>
        ) : (
          <RecruitCheckButton onClick={goResultPage}>
            {btnText}
          </RecruitCheckButton>
        );
      }
      case "BEFORE":
      default:
        return isMobile ? (
          <RecruitAlarmButtonMobile onClick={openAlarmModal} />
        ) : (
          <RecruitAlarmButton onClick={openAlarmModal} />
        );
    }
  };

  return (
    <Wrapper>
      {/* 1. 버튼 영역 */}
      <ButtonContainer>{renderButton()}</ButtonContainer>

      {/* 2. 하단 텍스트 링크 (상태에 따라 표시) */}
      {recruitStatus !== "BEFORE" && (
        <SubLink href="#" onClick={openCodeModal} $pageType={pageType} $recruitStyle={recruitStyle}>
          지원서를 제출하셨나요? <u>지원서 열람하기</u>
        </SubLink>
      )}

      {/* 알림 모달 */}
      <Modal
        open={isAlarmModalOpen}
        onClose={() => setIsAlarmModalOpen(false)}
        type="info"
        title="14기 모집 사전 알림 등록"
        description={
          "이화여대 멋쟁이사자처럼 카카오톡 채널을 친구 추가하시면,\n모집 시작 시 바로 알려드릴게요."
        }
        align="left"
        actions={[
          {
            label: "카카오톡 바로가기",
            variant: "primary",
            fullWidth: true,
            onClick: goKakaoChannel,
          },
        ]}
      />

      {/* 코드 입력 모달 */}
      <Modal
        open={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        type="form"
        title={modalContent.title}
        description={modalContent.description}
        align="left"
        input={{
          value: codeValue,
          onChange: (e) => setCodeValue(e.target.value),
          placeholder: "코드를 입력해주세요.",
        }}
        actions={[
          {
            label: "확인",
            variant: "primary",
            fullWidth: true,
            disabled: codeValue.length === 0,
            onClick: handleCheckCode,
          },
        ]}
        helper={{
          text: "지원 코드를 잊어버리셨나요? ",
          actionText: "카카오톡 문의하기",
          onAction: goKakaoChannel,
        }}
      />

      {/* 에러 모달 */}
      <Modal
        open={isErrorModalOpen}
        showClose={false}
        type="info"
        title="사용자 정보가 없습니다."
        description="입력하신 코드를 다시 확인해주세요."
        align="center"
        actions={[
          {
            label: "닫기",
            variant: "primary",
            fullWidth: true,
            onClick: () => setIsErrorModalOpen(false),
          },
        ]}
      />
    </Wrapper>
  );
};

export default RecruitStatusButton;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  /* 기존 PcButtonArea / MobileButtonArea 역할 */
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%;
`;

const SubLink = styled.a`
  color: ${({ $pageType, $recruitStyle }) => {
    if ($pageType === "recruit") {
      return $recruitStyle === "1" ? "var(--neutral-95)" : "var(--neutral-40)";
    }
    return "var(--neutral-40)";
  }};
  font-size: ${({ $pageType }) => ($pageType === "recruit" ? "1rem" : "0.9rem")};
  text-decoration: none;
  cursor: pointer;
  font-family: Pretendard;

  u {
    margin-left: 6px;
    color: ${({ $pageType, $recruitStyle }) => {
      if ($pageType === "recruit") {
        return $recruitStyle === "1" ? "#E2E2E2" : "#555";
      }
      return "#555";
    }};
    font-weight: ${({ $pageType, $recruitStyle }) => {
      if ($pageType === "recruit") {
        return $recruitStyle === "1" ? "700" : "600";
      }
      return "600";
    }};
    text-underline-offset: 3px;
  }
  &:hover u {
    color: ${({ $pageType, $recruitStyle }) => {
      if ($pageType === "recruit") {
        return $recruitStyle === "1" ? "#FFF" : "#000";
      }
      return "#000";
    }};
  }
  @media (max-width: 799px) {
    font-size: ${({ $pageType }) =>
      $pageType === "recruit" ? "0.75rem" : "0.8rem"};
  }
`;
