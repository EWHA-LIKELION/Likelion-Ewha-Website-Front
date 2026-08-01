import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal";
import { RecruitAPI } from "@/apis";
import {
  CURRENT_GENERATION,
  NEXT_GENERATION,
  FALLBACK_SCHEDULE,
} from "@/config/siteConfig";
import { MainButton, ArrowRightIcon } from "./MainButtons";

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

const RecruitStatusButton = ({ pageType = "home", recruitStyle = "1" }) => {
  // 1. 상태 및 로직 관리
  // 상태: "DEFAULT" | "BEFORE" | "RECRUITING" | "CLOSED" | "FIRST_RESULT" | "FINAL_RESULT"
  const [recruitStatus, setRecruitStatus] = useState("DEFAULT");

  const navigate = useNavigate();

  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  //2026 임시 결과 안내 모달
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  // "RESULT" | "VIEW"
  const [codeModalType, setCodeModalType] = useState(null);

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
        // console.log("default 상태");
        // setRecruitStatus("DEFAULT");

        //2026년만 임시로 진행(fallback data로 status 계산)
        const status = getRecruitStatus(FALLBACK_SCHEDULE);
        setRecruitStatus(status);
      }
    };

    fetchRecruitSchedule();
  }, []);

  // --- 핸들러 함수들 ---
  const goRecruitPage = () => {
    navigate("/recruit");
  };

  const goApply = () => {
    navigate("/recruit/apply");
  };

  const openResultCodeModal = (e) => {
    e.preventDefault();
    setCodeValue("");
    setCodeModalType("RESULT");
    setIsCodeModalOpen(true);
  };

  const openViewCodeModal = (e) => {
    e.preventDefault();
    setCodeValue("");
    setCodeModalType("VIEW");
    setIsCodeModalOpen(true);
  };

  const openAlarmModal = () => {
    setIsAlarmModalOpen(true);
  };

  const goKakaoChannelFriend = () => {
    window.open("https://pf.kakao.com/_htxexfd/friend", "_blank");
  };

  const goKakaoChannel = () => {
    window.open("https://pf.kakao.com/_htxexfd", "_blank");
  };

  const handleCheckCode = () => {
    if (codeValue.trim() === "") return;

    // [테스트 로직] ‼️추후 삭제
    const isUserFound = false;

    // 공통 실패 처리
    if (!isUserFound) {
      setIsCodeModalOpen(false);
      setIsErrorModalOpen(true);
      return;
    }

    // --- 성공 시 분기 ---
    if (codeModalType === "RESULT") {
      // 합격 여부 조회 성공
      alert("합격 여부가 확인되었습니다!");
      // 👉 나중에: navigate("/recruit/result", { state: { code: codeValue } })
    }

    if (codeModalType === "VIEW") {
      // 지원서 열람 성공
      alert("지원서를 불러왔습니다!");
      // 👉 나중에: navigate("/recruit/application", { state: { code: codeValue } })
    }

    setIsCodeModalOpen(false);
  };

  // --- 텍스트/버튼 결정 헬퍼 ---
  const getCodeModalText = () => {
    if (codeModalType === "RESULT") {
      return {
        title: "지원 코드 입력",
        description:
          "합격 여부를 확인하기 위해\n지원서 작성 시 발급받은 지원 코드가 필요해요.",
      };
    }

    return {
      title: "지원 코드 입력",
      description:
        "지원서를 열람하기 위해\n지원서 작성 시 발급받은 지원 코드가 필요해요.",
    };
  };
  const codeModalContent = getCodeModalText();

  // 모집 상태에 따른 description 텍스트
  const getDescriptionText = () => {
    switch (recruitStatus) {
      // case "RECRUITING":
      //   return `이화여자대학교 멋쟁이사자처럼과 함께할 아기사자를 모집합니다`;
      // case "CLOSED":
      //   return `${CURRENT_GENERATION}기 지원이 마감되었습니다`;
      // case "FIRST_RESULT":
      //   return `${CURRENT_GENERATION}기 지원이 마감되었습니다`;
      // case "FINAL_RESULT":
      //   return `${CURRENT_GENERATION}기 지원이 마감되었습니다`;
      // case "BEFORE":
      //   return `${CURRENT_GENERATION - 1}기 아기사자 모집이 마감되었습니다`;
      // case "DEFAULT":
      // default:
      //   return `${CURRENT_GENERATION}기 아기사자 모집이 마감되었습니다`;

      default:
        return `이화여자대학교 멋쟁이사자처럼과 함께할 아기사자를 모집합니다`;
    }
  };

  // 모집 알림 버튼 (기수만 다름)
  const renderAlarmButton = (generation) => (
    <MainButton variant="dark" size="wide" onClick={openAlarmModal}>
      {generation ? `${generation}기 모집 알림 받기` : "모집 알림 받기"}
    </MainButton>
  );

  // 버튼 렌더링
  const renderButton = () => {
    switch (recruitStatus) {
      case "RECRUITING": {
        // home 페이지: 모집 정보 보기 -> /recruit
        // recruit 페이지: 지원하기 -> /recruit/apply/form
        const goExternalApply = () => {
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSecVR2jeLjkt-QZAORyYJE68Ifogk8ab-e7NLPcCguDtggsmQ/viewform",
            "_blank",
          );
        };

        if (pageType === "recruit") {
          // onClick={goApply}
          return (
            <MainButton
              variant={recruitStyle === "1" ? "primary" : "primaryBlack"}
              onClick={goExternalApply}
            >
              지원하기
            </MainButton>
          );
        } else {
          return (
            <MainButton
              variant="dark"
              size="wide"
              icon={<ArrowRightIcon />}
              onClick={goRecruitPage}
            >
              {CURRENT_GENERATION
                ? `${CURRENT_GENERATION}기 모집 안내 바로가기`
                : "모집 안내 바로가기"}
            </MainButton>
          );
        }
      }

      case "CLOSED":
        return (
          <MainButton variant="disabled" size="wide">
            {CURRENT_GENERATION
              ? `${CURRENT_GENERATION}기 지원 마감`
              : "지원 마감"}
          </MainButton>
        );

      case "FIRST_RESULT":
      case "FINAL_RESULT": {
        const btnText =
          recruitStatus === "FIRST_RESULT"
            ? // ? "1차 합격자 조회"
              // : "최종 합격자 조회";
              "1차 합격자 발표"
            : "최종 합격자 발표";
        return (
          // onClick={openResultCodeModal}
          <MainButton
            variant="dark"
            size="wide"
            onClick={() => setIsResultModalOpen(true)}
          >
            {btnText}
          </MainButton>
        );
      }
      case "BEFORE":
        return renderAlarmButton(CURRENT_GENERATION);
      case "DEFAULT":
      default:
        //아직 CURRENT_GENERATION 값이 갱신 되기 전 띄우는 버튼이기 때문에 +1 처리
        return renderAlarmButton(NEXT_GENERATION);
    }
  };

  return (
    <Wrapper>
      {/* recruit 페이지일 때 description 표시 */}
      {pageType === "recruit" && recruitStyle === "1" && (
        <Description>{getDescriptionText()}</Description>
      )}

      {/* 1. 버튼 영역 */}
      <ButtonContainer>{renderButton()}</ButtonContainer>

      {/* 2. 하단 텍스트 링크 (상태에 따라 표시) */}
      {/* {recruitStatus !== "BEFORE" && recruitStatus !== "DEFAULT" && (
        <SubLink
          href="#"
          onClick={openViewCodeModal}
          $pageType={pageType}
          $recruitStyle={recruitStyle}
        >
          지원서를 제출하셨나요? <u>지원서 열람하기</u>
        </SubLink>
      )} */}

      {/* 2026 임시 결과 안내 모달 */}
      <Modal
        open={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        type="info"
        title={`${recruitStatus === "FIRST_RESULT" ? "1차 합격자 발표" : "최종 합격자 발표"}`}
        description="합격 여부는 문자 메시지를 통해 안내드렸습니다. 메시지를 받지 못하신 경우, 카카오톡 채널로 문의해 주시기 바랍니다."
        align="left"
        actions={[
          {
            label: "카카오톡 바로가기",
            variant: "primary",
            fullWidth: true,
            onClick: goKakaoChannelFriend,
          },
        ]}
      />

      {/* 알림 모달 */}
      <Modal
        open={isAlarmModalOpen}
        onClose={() => setIsAlarmModalOpen(false)}
        type="info"
        title={
          CURRENT_GENERATION
            ? `${recruitStatus === "BEFORE" ? CURRENT_GENERATION : NEXT_GENERATION}기 모집 사전 알림 등록`
            : "모집 사전 알림 등록"
        }
        description={
          "이화여대 멋쟁이사자처럼 카카오톡 채널을 친구 추가하시면, 모집 시작 시 바로 알려드릴게요."
        }
        align="left"
        actions={[
          {
            label: "카카오톡 바로가기",
            variant: "primary",
            fullWidth: true,
            onClick: goKakaoChannelFriend,
          },
        ]}
      />

      {/* 코드 입력 모달 */}
      <Modal
        open={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        type="form"
        title={codeModalContent.title}
        description={codeModalContent.description}
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

const Description = styled.p`
  color: var(--Atomic-Cool-Neutral-98, var(--cool-neutral-98, #f4f4f5));
  text-align: center;
  font-family: "Cafe24 PRO Slim";
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.625rem;
  margin: 1.5rem 0 5rem 0;

  @media (max-width: 799px) {
    font-size: 0.875rem;
    line-height: 1.375rem;
    margin: 0.12rem 0 2rem 0;
    color: var(--static-white, #fff);
  }
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
  font-size: ${({ $pageType }) =>
    $pageType === "recruit" ? "1rem" : "0.9rem"};
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
