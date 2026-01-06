import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal";
import {
  RecruitAlarmButton,
  RecruitInfoButton,
  RecruitCheckButton,
  RecruitDisabledButton,
} from "./MainButtons_pc";
import {
  RecruitAlarmButtonMobile,
  RecruitInfoButtonMobile,
  RecruitCheckButtonMobile,
  RecruitDisabledButtonMobile,
} from "./MainButtons_mo";

const RecruitStatusButton = ({ isMobile }) => {
  // 1. 상태 및 로직 관리
  // 상태: "DEFAULT" | "RECRUITING" | "CLOSED" | "FIRST_RESULT" | "FINAL_RESULT"
  const RECRUIT_STATUS = "DEFAULT";

  const navigate = useNavigate();

  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  // --- 핸들러 함수들 ---
  const goRecruitPage = () => {
    navigate("/recruit");
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
    window.open("https://pf.kakao.com/_htxexfd", "_blank");
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
    switch (RECRUIT_STATUS) {
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
    switch (RECRUIT_STATUS) {
      case "RECRUITING":
        return isMobile ? (
          <RecruitInfoButtonMobile onClick={goRecruitPage} />
        ) : (
          <RecruitInfoButton onClick={goRecruitPage} />
        );

      case "CLOSED":
        return isMobile ? (
          <RecruitDisabledButtonMobile />
        ) : (
          <RecruitDisabledButton />
        );

      case "FIRST_RESULT":
      case "FINAL_RESULT": {
        const btnText =
          RECRUIT_STATUS === "FIRST_RESULT"
            ? "1차 합격자 조회"
            : "최종 합격자 조회";
        return isMobile ? (
          <RecruitCheckButtonMobile onClick={openCodeModal}>
            {btnText}
          </RecruitCheckButtonMobile>
        ) : (
          <RecruitCheckButton onClick={openCodeModal}>
            {btnText}
          </RecruitCheckButton>
        );
      }
      case "DEFAULT":
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
      {RECRUIT_STATUS !== "DEFAULT" ? (
        <SubLink href="#" onClick={openCodeModal}>
          지원서를 제출하셨나요? <u>지원서 열람하기</u>
        </SubLink>
      ) : (
        <EndText>13기 모집이 종료되었습니다.</EndText>
      )}

      {/* 알림 모달 */}
      <Modal
        open={isAlarmModalOpen}
        onClose={() => setIsAlarmModalOpen(false)}
        type="info"
        title="14기 모집 사전 알림 등록"
        description={
          "이화여대 멋쟁이사자처럼 카카오톡 채널을 통해\n모집이 시작되면 가장 먼저 알려드릴게요."
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
  color: #888888;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  font-family: Pretendard;

  u {
    margin-left: 6px;
    color: #555;
    font-weight: 600;
    text-underline-offset: 3px;
  }
  &:hover u {
    color: #000;
  }
  @media (max-width: 799px) {
    font-size: 0.8rem;
  }
`;

const EndText = styled.p`
  color: #888888;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.25rem;
  font-family: Pretendard;

  @media (max-width: 799px) {
    font-size: 0.8rem;
  }
`;
