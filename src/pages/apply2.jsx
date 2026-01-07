import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Input from "../components/Input";
import Dropdown2 from "../components/dropdown/Dropdown2";
import Dropdown3 from "../components/dropdown/Dropdown3";
import { api, ApplicationsAPI } from "@/apis";

import {
  SelectPositiveButton,
  SelectNegativeButton,
  UnselectPositiveButton,
  UnselectNegativeButton,
  SelectedRadio as PcSelectedRadio,
  UnselectedRadio as PcUnselectedRadio,
} from "../components/buttons/SelectionButtons_pc";
import {
  SelectPositiveButtonMobile,
  SelectNegativeButtonMobile,
  UnselectPositiveButtonMobile,
  UnselectNegativeButtonMobile,
  SelectedRadio as MoSelectedRadio,
  UnselectedRadio as MoUnselectedRadio,
} from "../components/buttons/SelectionButtons_mo";
import { TimeAbled, TimeSelected } from "../components/buttons/TimeButtons_pc";
import { TimeAbledMobile, TimeSelectedMobile } from "../components/buttons/TimeButtons_mo";
import { Modal } from "../components/Modal.jsx";

const PRIVACY_AGREE_TEXT = `개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용`;

const MAX_CHARS = 500;
const MIN_TEXTAREA_HEIGHT = 266;
const FILE_LIMIT = 3;
const SUBMIT_BOTTOM_GAP = 160;

const isFilled = (v) => v.trim().length > 0;

function useisMO(maxWidth = 799) {
  const [isMO, setisMO] = useState(() => window.innerWidth <= maxWidth);
  useEffect(() => {
    const handler = () => setisMO(window.innerWidth <= maxWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [maxWidth]);
  return isMO;
}

function useIsMobile(maxWidth = 799) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const onChange = (e) => setIsMobile(e.matches);

    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [maxWidth]);

  return isMobile;
}

const PART_OPTIONS = [
  { value: "PM_DESIGN", label: "기획•디자인" },
  { value: "FRONTEND", label: "프론트엔드" },
  { value: "BACKEND", label: "백엔드" },
];

function formatBirthday(year, month, day) {
  if (!year || !month || !day) return null;
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function convertTo24Hour(time, isPM) {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr || "00";

  if (isPM) {
    if (hour !== 12) hour += 12;
  } else {
    if (hour === 12) hour = 0;
  }

  return `${String(hour).padStart(2, "0")}:${minute}`;
}

function formatInterviewTimes(interviewAvailableTimes, interviewDates) {
  const result = [];

  for (const dateInfo of interviewDates) {
    const { date, pm } = dateInfo;
    const selectedTimes = interviewAvailableTimes[date] || [];

    for (const time of selectedTimes) {
      const isPM = pm.includes(time);
      const time24 = convertTo24Hour(time, isPM);
      const isoString = `${date}T${time24}:00+09:00`;
      result.push(isoString);
    }
  }

  return result;
}

function ensureModalRoot() {
  if (typeof document === "undefined") return null;
  let root = document.getElementById("modal-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "modal-root";
    document.body.appendChild(root);
  }
  return root;
}

function MoModal({ open, onClose, children }) {
  const root = useMemo(() => ensureModalRoot(), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !root) return null;

  return createPortal(
    <MoOverlay onMouseDown={onClose}>
      <MoDialog onMouseDown={(e) => e.stopPropagation()}>{children}</MoDialog>
    </MoOverlay>,
    root
  );
}

function ApplicationCodeModal({ isOpen, onClose, navigate, initialCode = "" }) {
  const [code, setCode] = useState("");
    useEffect(() => {
    if (!isOpen) return;
    setCode(initialCode || "");
  }, [isOpen, initialCode]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMode, setErrorMode] = useState(false);

  const isCodeValid = code.trim().length > 0;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setCode("");
    setErrorMode(false);
    onClose();
  };

  const handleConfirm = async () => {
    if (!isCodeValid || isLoading) return;
    setIsLoading(true);
    try {
      await api.post("/recruitments/application/my/", {
        application_code: code.trim(),
      });
      handleClose();
      navigate("recruitapply/preview", { state: { applicationCode: code.trim() } });
    } catch (error) {
      setErrorMode(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (errorMode) {
    return (
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalCard>
          <ModalErrorContent>
            <ModalErrorTitle>사용자 정보가 없습니다.</ModalErrorTitle>
            <ModalErrorDesc>입력하신 코드를 다시 확인해주세요.</ModalErrorDesc>
          </ModalErrorContent>
          <ModalConfirmButton onClick={handleClose} $active>
            닫기
          </ModalConfirmButton>
        </ModalCard>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalCard>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>지원 코드 입력</ModalTitle>
            <ModalCloseBtn onClick={handleClose} aria-label="닫기">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </ModalCloseBtn>
          </ModalHeader>
          <ModalDesc>
            지원서를 열람하기 위해서
            <br />
            지원서 작성시에 발급받은 지원 코드가 필요해요.
          </ModalDesc>
        </ModalContent>
        <ModalInputSection>
          <ModalInput
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="코드를 입력해주세요."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm();
            }}
          />
          <ModalButtonWrapper>
            <ModalConfirmButton onClick={handleConfirm} $active={isCodeValid} disabled={!isCodeValid || isLoading}>
              {isLoading ? "확인 중..." : "확인"}
            </ModalConfirmButton>
            <ModalHelperText>
              지원 코드를 잊어버리셨나요?{" "}
              <ModalHelperLink href="https://pf.kakao.com/_htxexfd" target="_blank">
                카카오톡 문의하기
              </ModalHelperLink>
            </ModalHelperText>
          </ModalButtonWrapper>
        </ModalInputSection>
      </ModalCard>
    </ModalOverlay>
  );
}

export default function ApplyIntegrated() {
  const isMO = useisMO(799);
  const isMobile = useIsMobile(799);
  const navigate = useNavigate();
  const location = useLocation();

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const [part, setPart] = useState(() => location.state?.part || "");

  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [grade, setGrade] = useState("");
  const [interviewMethod, setInterviewMethod] = useState("");
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const yearOptions = Array.from({ length: 2010 - 1990 + 1 }, (_, i) => 1990 + i);
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const dateOptions = Array.from({ length: 31 }, (_, i) => i + 1);

  const INTERVIEW_DATES = [
    {
      date: "2026-03-06",
      label: "3월 6일",
      am: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
      pm: ["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30"],
    },
    {
      date: "2026-03-07",
      label: "3월 7일",
      am: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
      pm: ["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30"],
    },
    {
      date: "2026-03-08",
      label: "3월 8일",
      am: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
      pm: ["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30"],
    },
  ];

  const [interviewAvailableTimes, setInterviewAvailableTimes] = useState({});
  const [videoAgree, setVideoAgree] = useState(false);

  function toggleTime(date, time) {
    setInterviewAvailableTimes((prev) => {
      const arr = prev[date] || [];
      if (arr.includes(time)) {
        return { ...prev, [date]: arr.filter((t) => t !== time) };
      }
      return { ...prev, [date]: [...arr, time] };
    });
  }

  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");

  const [precourseFiles, setPrecourseFiles] = useState([]);
  const [portfolioFiles, setPortfolioFiles] = useState([]);

  const precourseRef = useRef(null);
  const portfolioRef = useRef(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [applicationCode, setApplicationCode] = useState("");

  const over1 = q1.length > MAX_CHARS;
  const over2 = q2.length > MAX_CHARS;
  const over3 = q3.length > MAX_CHARS;
  const over4 = q4.length > MAX_CHARS;

  const onChangeAutoResize = (setter) => (e) => {
    const el = e.target;
    setter(el.value);

    if (el && el.tagName === "TEXTAREA") {
      el.style.height = "auto";
      const next = Math.max(MIN_TEXTAREA_HEIGHT, el.scrollHeight);
      el.style.height = `${next}px`;
      const box = el.parentElement;
      if (box) box.style.height = "auto";
    }
  };

  const onChange = (setter) => (e) => setter(e.target.value);

  const onPickFiles = (bucketSetter) => (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    bucketSetter((prev) => [...prev, ...picked].slice(0, FILE_LIMIT));
    e.target.value = "";
  };

  const removeFileAt = (bucketSetter, idx) => {
    bucketSetter((prev) => prev.filter((_, i) => i !== idx));
  };

  const isNameValid = name.trim().length > 0;
  const isBirthValid = !!(birthYear && birthMonth && birthDay);
  const isDepartmentValid = department.trim().length > 0;
  const isStudentNumberValid = studentNumber.trim().length > 0;
  const isGradeValid = grade.trim().length > 0;
  const isPhoneNumberValid = /^01[0]-\d{4}-\d{4}$/.test(phoneNumber);
  const isInterviewMethodValid = !!interviewMethod;
  const isPrivacyValid = !!privacyAgree;
  const isTimeValid = Object.values(interviewAvailableTimes).some((arr) => Array.isArray(arr) && arr.length > 0);
  const isVideoValid = !!videoAgree;

  const canSubmit =
    isFilled(q1) &&
    isFilled(q2) &&
    isFilled(q3) &&
    isFilled(q4) &&
    !over1 &&
    !over2 &&
    !over3 &&
    !over4 &&
    !!part &&
    isNameValid &&
    isBirthValid &&
    isDepartmentValid &&
    isStudentNumberValid &&
    isGradeValid &&
    isPhoneNumberValid &&
    isInterviewMethodValid &&
    isPrivacyValid &&
    isTimeValid &&
    isVideoValid;

  const onClickSubmit = () => {
    if (!canSubmit || isSubmitting) return;
    setSubmitError("");
    setConfirmOpen(true);
  };

  const handleCopyCode = async () => {
    if (!applicationCode) return;
    try {
      await navigator.clipboard?.writeText(applicationCode);
    } catch (e) {}
  };

  const onConfirmSubmit = async () => {
    if (isSubmitting) return;

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    if (!baseURL) {
      setSubmitError("API 주소(VITE_API_BASE_URL)가 설정되지 않았습니다. .env / Vercel 환경변수를 확인해주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();

      const birthday = formatBirthday(birthYear, birthMonth, birthDay) || "";
      const interviewTimesISO = formatInterviewTimes(interviewAvailableTimes, INTERVIEW_DATES);

      formData.append("name", name.trim());
      formData.append("phone_number", phoneNumber.trim());
      formData.append("birthday", birthday);
      formData.append("department", department.trim());
      formData.append("student_number", studentNumber.trim());
      formData.append("grade", grade.trim());
      formData.append("interview_method", interviewMethod);
      formData.append("part", part);

      interviewTimesISO.forEach((t) => formData.append("interview_available_times", t));

      formData.append("personal_statement_1", q1.trim());
      formData.append("personal_statement_2", q2.trim());
      formData.append("personal_statement_3", q3.trim());
      formData.append("personal_statement_4", q4.trim());

      const q5Trim = q5.trim();
      if (q5Trim.length > 0) formData.append("personal_statement_5", q5Trim);

      precourseFiles.forEach((file) => formData.append("completed_prerequisites", file));
      portfolioFiles.forEach((file) => formData.append("portfolios", file));

      const data = await ApplicationsAPI.createApplication(formData);
      const codeFromServer = data?.application_code || "";

      setApplicationCode(codeFromServer);

      setConfirmOpen(false);
      setResultOpen(true);
    } catch (err) {
      const status = err?.response?.status;

      if (status === 409) setSubmitError("이미 제출한 지원서가 있습니다. (409)");
      else if (status === 400) setSubmitError("입력값이 올바르지 않습니다. 필수 항목/글자수/선택지를 확인해주세요. (400)");
      else setSubmitError("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <A1Page>
        <ApplicationCodeModal   isOpen={isCodeModalOpen}  onClose={() => setIsCodeModalOpen(false)}   navigate={navigate} initialCode={applicationCode}/>


        <A1Frame>
          <TitleWrapper>
            <PageName>지원서 작성</PageName>
            <PartName>{PART_OPTIONS.find((p) => p.value === part)?.label}</PartName>
          </TitleWrapper>

          {!part && (
            <PartPickWrap>
              <PartPickTitle>지원 파트를 선택해주세요.</PartPickTitle>
              <PartButtons>
                {PART_OPTIONS.map((p) => (
                  <PartBtn
                    key={p.value}
                    type="button"
                    $active={part === p.value}
                    onClick={() => setPart(p.value)}
                  >
                    {p.label}
                  </PartBtn>
                ))}
              </PartButtons>
            </PartPickWrap>
          )}

          <Section>
            <SectionTitle>1. 지원자 정보</SectionTitle>

            <A1Card>
              <A1CardInner>
                <ItemContainer>
                  <LabelWrapper>
                    <LabelText>이름</LabelText>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>
                  <InputWrapper>
                    <Input
                      variant="form"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      error={!isNameValid && name.length > 0}
                      errorMessage="이름을 작성해주세요."
                      placeholder={"이름을 작성해주세요."}
                      $state={
                        !isNameValid && name.length > 0
                          ? "error"
                          : name.length > 0
                          ? "focused"
                          : "default"
                      }
                    />
                    <ErrorText $visible={!isNameValid && name.length > 0}>
                      {!isNameValid && name.length > 0 ? "이름을 작성해주세요." : "\u00A0"}
                    </ErrorText>
                  </InputWrapper>
                </ItemContainer>

                <ItemContainer>
                  <LabelWrapper>
                    <LabelText>전화번호</LabelText>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>
                  <ExampleContent>예시) 010-0000-0000</ExampleContent>
                  <InputWrapper>
                    <Input
                      variant="form"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      error={!isPhoneNumberValid && phoneNumber.length > 0}
                      placeholder={"전화번호를 작성해주세요."}
                      $state={
                        !isPhoneNumberValid && phoneNumber.length > 0
                          ? "error"
                          : phoneNumber.length > 0
                          ? "focused"
                          : "default"
                      }
                    />
                    <ErrorText $visible={!isPhoneNumberValid && phoneNumber.length > 0}>
                      {!isPhoneNumberValid && phoneNumber.length > 0
                        ? "전화번호를 작성해주세요."
                        : "\u00A0"}
                    </ErrorText>
                  </InputWrapper>
                </ItemContainer>

                <ItemContainer>
                  <LabelWrapper>
                    <LabelText>생년월일</LabelText>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>
                  <DropdownContainer>
                    <DropdownWrapper>
                      <Dropdown2
                        options={yearOptions}
                        value={birthYear}
                        onChange={setBirthYear}
                        onSelect={setBirthYear}
                        placeholder={"0000년"}
                        unit="년"
                        error={!isBirthValid && (birthYear || birthMonth || birthDay)}
                      />
                      <Dropdown2
                        options={monthOptions}
                        value={birthMonth}
                        onChange={setBirthMonth}
                        onSelect={setBirthMonth}
                        placeholder={"00월"}
                        unit=" 월"
                        error={!isBirthValid && (birthYear || birthMonth || birthDay)}
                      />
                      <Dropdown2
                        options={dateOptions}
                        value={birthDay}
                        onChange={setBirthDay}
                        onSelect={setBirthDay}
                        placeholder={"00일"}
                        unit=" 일"
                        error={!isBirthValid && (birthYear || birthMonth || birthDay)}
                      />
                    </DropdownWrapper>
                    <ErrorText $visible={!isBirthValid && (birthYear || birthMonth || birthDay)}>
                      {!isBirthValid && (birthYear || birthMonth || birthDay)
                        ? "생년월일을 선택하세요."
                        : "\u00A0"}
                    </ErrorText>
                  </DropdownContainer>
                </ItemContainer>

                <ItemContainer>
                  <LabelWrapper>
                    <LabelText>학과</LabelText>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>
                  <ExampleContent>
                    복수전공일 경우 본전공/복수전공(혹은 부전공)과 같이 작성해주세요.
                    (예시) 경영학부/컴퓨터공학전공
                  </ExampleContent>
                  <InputWrapper>
                    <Input
                      variant="form"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                      error={!isDepartmentValid && department.length > 0}
                      errorMessage="학과를 작성해주세요."
                      placeholder={"학과를 작성해주세요."}
                      $state={
                        !isDepartmentValid && department.length > 0
                          ? "error"
                          : department.length > 0
                          ? "focused"
                          : "default"
                      }
                    />
                    <ErrorText $visible={!isDepartmentValid && department.length > 0}>
                      {!isDepartmentValid && department.length > 0 ? "학과를 작성해주세요." : "\u00A0"}
                    </ErrorText>
                  </InputWrapper>
                </ItemContainer>

                <ItemContainer>
                  <LabelWrapper>
                    <LabelText>학번</LabelText>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>
                  <ExampleContent>(예시) 2276111</ExampleContent>
                  <InputWrapper>
                    <Input
                      variant="form"
                      value={studentNumber}
                      onChange={(e) => setStudentNumber(e.target.value)}
                      error={!isStudentNumberValid && studentNumber.length > 0}
                      errorMessage="학번을 작성해주세요."
                      placeholder={"학번을 작성해주세요."}
                      $state={
                        !isStudentNumberValid && studentNumber.length > 0
                          ? "error"
                          : studentNumber.length > 0
                          ? "focused"
                          : "default"
                      }
                    />
                    <ErrorText $visible={!isStudentNumberValid && studentNumber.length > 0}>
                      {!isStudentNumberValid && studentNumber.length > 0 ? "학번을 작성해주세요." : "\u00A0"}
                    </ErrorText>
                  </InputWrapper>
                </ItemContainer>

                <ItemContainer>
                  <LabelWrapper>
                    <LabelText>학년</LabelText>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>
                  <ExampleContent>(예시) 4학년(7학기)</ExampleContent>
                  <InputWrapper>
                    <Input
                      variant="form"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      error={!isGradeValid && grade.length > 0}
                      errorMessage="학년을 작성해주세요."
                      placeholder={"학년을 작성해주세요."}
                      $state={
                        !isGradeValid && grade.length > 0
                          ? "error"
                          : grade.length > 0
                          ? "focused"
                          : "default"
                      }
                    />
                    <ErrorText $visible={!isGradeValid && grade.length > 0}>
                      {!isGradeValid && grade.length > 0 ? "학년을 작성해주세요." : "\u00A0"}
                    </ErrorText>
                  </InputWrapper>
                </ItemContainer>

                <ItemContainer>
                  <LabelWrapper>
                    <LabelText>면접 참여 방식</LabelText>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>
                  <ExampleContent>
                    2차 면접은 0/0~0/0 오프라인, 0/0 온라인으로 진행되며, 오프라인 면접 장소는 이화여자대학교 학생문화관입니다.
                    지원자 분이 가진 열정과 역량을 더욱 잘 파악할 수 있도록 최대한 오프라인으로 참여하시는 것을 권장합니다.
                    다만 개인 사정으로 인해 대면으로 학교에 방문하기 어려운 분에 한하여 온라인으로 참여하실 수 있습니다.
                  </ExampleContent>

                  {isMO ? (
                    <ButtonRowMobile>
                      {interviewMethod === "OFFLINE" ? (
                        <SelectPositiveButtonMobile onClick={() => setInterviewMethod("OFFLINE")} />
                      ) : (
                        <UnselectPositiveButtonMobile onClick={() => setInterviewMethod("OFFLINE")} />
                      )}
                      {interviewMethod === "ONLINE" ? (
                        <SelectNegativeButtonMobile onClick={() => setInterviewMethod("ONLINE")} />
                      ) : (
                        <UnselectNegativeButtonMobile onClick={() => setInterviewMethod("ONLINE")} />
                      )}
                    </ButtonRowMobile>
                  ) : (
                    <ButtonRowPC>
                      {interviewMethod === "OFFLINE" ? (
                        <SelectPositiveButton onClick={() => setInterviewMethod("OFFLINE")} />
                      ) : (
                        <UnselectPositiveButton onClick={() => setInterviewMethod("OFFLINE")} />
                      )}
                      {interviewMethod === "ONLINE" ? (
                        <SelectNegativeButton onClick={() => setInterviewMethod("ONLINE")} />
                      ) : (
                        <UnselectNegativeButton onClick={() => setInterviewMethod("ONLINE")} />
                      )}
                    </ButtonRowPC>
                  )}

                  <ErrorText $visible={!isInterviewMethodValid && interviewMethod !== ""}>
                    {!isInterviewMethodValid && interviewMethod !== "" ? "면접 참여 방식을 선택해주세요." : "\u00A0"}
                  </ErrorText>
                </ItemContainer>

                <ItemContainer>
                  <LabelWrapper>
                    <LabelText>개인정보 수집 및 이용 동의</LabelText>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>

                  <Dropdown3
                    question="개인정보 수집 및 이용 동의서"
                    answer={PRIVACY_AGREE_TEXT}
                    styleType={2}
                    isOpen={privacyOpen}
                    setIsOpen={setPrivacyOpen}
                  />

                  <RadioRow>
                    {isMO ? (
                      <RadioLabel onClick={() => setPrivacyAgree((prev) => !prev)}>
                        {privacyAgree ? <MoSelectedRadio /> : <MoUnselectedRadio />}
                        <AsteriskText>(필수)</AsteriskText>
                        <RadioText>개인정보 수집 및 이용에 동의합니다.</RadioText>
                      </RadioLabel>
                    ) : (
                      <RadioLabel onClick={() => setPrivacyAgree((prev) => !prev)}>
                        {privacyAgree ? <PcSelectedRadio /> : <PcUnselectedRadio />}
                        <AsteriskText>(필수)</AsteriskText>
                        <RadioText>개인정보 수집 및 이용에 동의합니다.</RadioText>
                      </RadioLabel>
                    )}
                  </RadioRow>

                  <ErrorText $visible={!isPrivacyValid && privacyAgree !== false}>
                    {!isPrivacyValid && privacyAgree !== false ? "개인정보 수집 및 이용에 동의해주세요." : "\u00A0"}
                  </ErrorText>
                </ItemContainer>
              </A1CardInner>
            </A1Card>
          </Section>

          <Section>
            <SectionTitle>2. 면접 일정</SectionTitle>
            <A1Card>
              <A1CardInner>
                <ItemContainer>
                  <LabelWrapper>
                    <LongDesc>가능한 요일에 한해 최소 1개 이상의 시간을 선택해주세요.</LongDesc>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>

                  <TimeSection>
                    {INTERVIEW_DATES.map(({ date, label, am, pm }) => (
                      <DateBlock key={date}>
                        <DateLabel>{label}</DateLabel>
                        <TimeCol>
                          <TimeLabel>오전</TimeLabel>
                          <TimeRow>
                            {am.map((time) => {
                              const selected = (interviewAvailableTimes[date] || []).includes(time);
                              return (
                                <span
                                  key={time}
                                  style={{ display: "inline-block", cursor: "pointer" }}
                                  onClick={() => toggleTime(date, time)}
                                >
                                  {isMO ? (
                                    selected ? (
                                      <TimeSelectedMobile time={time} />
                                    ) : (
                                      <TimeAbledMobile time={time} />
                                    )
                                  ) : selected ? (
                                    <TimeSelected time={time} />
                                  ) : (
                                    <TimeAbled time={time} />
                                  )}
                                </span>
                              );
                            })}
                          </TimeRow>

                          <TimeLabel>오후</TimeLabel>
                          <TimeRow>
                            {pm.map((time) => {
                              const selected = (interviewAvailableTimes[date] || []).includes(time);
                              return (
                                <span
                                  key={time}
                                  style={{ display: "inline-block", cursor: "pointer" }}
                                  onClick={() => toggleTime(date, time)}
                                >
                                  {isMO ? (
                                    selected ? (
                                      <TimeSelectedMobile time={time} />
                                    ) : (
                                      <TimeAbledMobile time={time} />
                                    )
                                  ) : selected ? (
                                    <TimeSelected time={time} />
                                  ) : (
                                    <TimeAbled time={time} />
                                  )}
                                </span>
                              );
                            })}
                          </TimeRow>
                        </TimeCol>
                      </DateBlock>
                    ))}

                    <ErrorText $visible={!isTimeValid}>
                      {!isTimeValid ? "선택된 시간이 없습니다." : "\u00A0"}
                    </ErrorText>
                  </TimeSection>
                </ItemContainer>

                <ItemContainer>
                  <LabelWrapper>
                    <LabelText>면접 영상 녹화 동의</LabelText>
                    <AsteriskMark>*</AsteriskMark>
                  </LabelWrapper>
                  <ExampleContent>
                    면접 진행시 면접 내용이 녹음 및 녹화됩니다. 녹화 영상은 본인 확인 및 평가를 위한 목적으로만 사용되며, 모집 이후 전면 폐기됩니다.
                  </ExampleContent>

                  <RadioRow>
                    {isMO ? (
                      <RadioLabel onClick={() => setVideoAgree((prev) => !prev)}>
                        {videoAgree ? <MoSelectedRadio /> : <MoUnselectedRadio />}
                        <AsteriskText>(필수)</AsteriskText>
                        <RadioText>면접 영상 녹화에 동의합니다.</RadioText>
                      </RadioLabel>
                    ) : (
                      <RadioLabel onClick={() => setVideoAgree((prev) => !prev)}>
                        {videoAgree ? <PcSelectedRadio /> : <PcUnselectedRadio />}
                        <AsteriskText>(필수)</AsteriskText>
                        <RadioText>면접 영상 녹화에 동의합니다.</RadioText>
                      </RadioLabel>
                    )}

                    <ErrorText $visible={!isVideoValid && videoAgree !== false}>
                      {!isVideoValid && videoAgree !== false ? "면접 영상 녹화에 동의해주세요." : "\u00A0"}
                    </ErrorText>
                  </RadioRow>
                </ItemContainer>
              </A1CardInner>
            </A1Card>
          </Section>
        </A1Frame>
      </A1Page>

      <A2Page>
        <Frame>

          <Sections>
            <Section2>
              <SectionTitle2 className="h4-bold">3. 자기소개서</SectionTitle2>

              <Card2>
                <CardInner2>
                  <EssayItem>
                    <QHead>
                      <QTitleRow>
                        <QTitle className="h5-bold">
                          1. 다양한 IT 동아리 중에서 멋쟁이사자처럼을 선택하여 지원하게 된 이유를 작성해주세요.
                          <Req>*</Req>
                        </QTitle>
                      </QTitleRow>
                      <QDesc className="footnote-regular">공백 포함 500자 이내로 작성해주세요.</QDesc>
                    </QHead>

                    <InputWrap>
                      <InputForceTextarea>
                        <Input
                          variant="form"
                          multiline
                          placeholder="내용을 작성해주세요."
                          value={q1}
                          onChange={onChangeAutoResize(setQ1)}
                          error={over1}
                        />
                      </InputForceTextarea>

                      <MetaRow>
                        {over1 ? (
                          <OverText className="footnote-regular">공백 포함 500자를 초과하였습니다.</OverText>
                        ) : (
                          <span />
                        )}
                        <Counter className="footnote-regular">
                          {Math.min(q1.length, MAX_CHARS)}/{MAX_CHARS}
                        </Counter>
                      </MetaRow>
                    </InputWrap>
                  </EssayItem>

                  <EssayItem>
                    <QHead>
                      <QTitleRow>
                        <QTitle className="h5-bold">
                          2. 선택한 파트를 희망하는 이유와 관련 경험을 해본 적이 있는지, 그리고 해당 파트를 통해 어떤 성장을 희망하시는지 작성해주세요.
                          <Req>*</Req>
                        </QTitle>
                      </QTitleRow>
                      <QDesc className="footnote-regular">공백 포함 500자 이내로 작성해주세요.</QDesc>
                    </QHead>

                    <InputWrap>
                      <InputForceTextarea>
                        <Input
                          variant="form"
                          multiline
                          placeholder="내용을 작성해주세요."
                          value={q2}
                          onChange={onChangeAutoResize(setQ2)}
                          error={over2}
                        />
                      </InputForceTextarea>

                      <MetaRow>
                        {over2 ? (
                          <OverText className="footnote-regular">공백 포함 500자를 초과하였습니다.</OverText>
                        ) : (
                          <span />
                        )}
                        <Counter className="footnote-regular">
                          {Math.min(q2.length, MAX_CHARS)}/{MAX_CHARS}
                        </Counter>
                      </MetaRow>
                    </InputWrap>
                  </EssayItem>

                  <EssayItem>
                    <QHead>
                      <QTitleRow>
                        <QTitle className="h5-bold">
                          3. 멋쟁이사자처럼 대학은 협업과 팀워크를 중요시하는 공동체입니다. 지원자 본인이 협업과 팀워크를 진행해보았던 경험과, 그 경험을 멋쟁이사자처럼 대학에서 어떻게 적용할 수 있을지 작성해주세요.
                          <Req>*</Req>
                        </QTitle>
                      </QTitleRow>
                      <QDesc className="footnote-regular">공백 포함 500자 이내로 작성해주세요.</QDesc>
                    </QHead>

                    <InputWrap>
                      <InputForceTextarea>
                        <Input
                          variant="form"
                          multiline
                          placeholder="내용을 작성해주세요."
                          value={q3}
                          onChange={onChangeAutoResize(setQ3)}
                          error={over3}
                        />
                      </InputForceTextarea>

                      <MetaRow>
                        {over3 ? (
                          <OverText className="footnote-regular">공백 포함 500자를 초과하였습니다.</OverText>
                        ) : (
                          <span />
                        )}
                        <Counter className="footnote-regular">
                          {Math.min(q3.length, MAX_CHARS)}/{MAX_CHARS}
                        </Counter>
                      </MetaRow>
                    </InputWrap>
                  </EssayItem>

                  <EssayItem>
                    <QHead>
                      <QTitleRow>
                        <QTitle className="h5-bold">
                          4. 멋쟁이사자처럼 대학은 최소 주 2회 모임 &amp; 10시간 이상의 시간 투자를 권장합니다. 활동 기간 동안 매주 어느 정도의 시간을 얼마나 열정적으로 할애할 수 있는지 작성해주세요.
                          <Req>*</Req>
                        </QTitle>
                      </QTitleRow>
                      <QDesc className="footnote-regular">공백 포함 500자 이내로 작성해주세요.</QDesc>
                    </QHead>

                    <InputWrap>
                      <InputForceTextarea>
                        <Input
                          variant="form"
                          multiline
                          placeholder="내용을 작성해주세요."
                          value={q4}
                          onChange={onChangeAutoResize(setQ4)}
                          error={over4}
                        />
                      </InputForceTextarea>

                      <MetaRow>
                        {over4 ? (
                          <OverText className="footnote-regular">공백 포함 500자를 초과하였습니다.</OverText>
                        ) : (
                          <span />
                        )}
                        <Counter className="footnote-regular">
                          {Math.min(q4.length, MAX_CHARS)}/{MAX_CHARS}
                        </Counter>
                      </MetaRow>
                    </InputWrap>
                  </EssayItem>

                  <EssayItem5>
                    <QTitleRow>
                      <QTitle className="h5-bold">
                        5. 다룰 수 있는 프로그램과 언어, 활용 능력을 간단히 작성해주세요. (선택)
                      </QTitle>
                    </QTitleRow>

                    <LongDesc2 className="footnote-regular">
                      해당 문항은 지원자 분의 기본적인 역량을 파악하기 위한 것으로, 필수로 작성하지 않아도 됩니다.
                      {"\n"}
                      다룰 수 있는 프로그램/언어를 작성하지 않아도 평가에 불리하게 작용되지 않습니다.
                      {"\n\n"}
                      활용 능력 작성 기준은 다음과 같습니다.
                      {"\n"}
                      상: 프로젝트 개발 경험 있음
                      {"\n"}
                      중: 기본적인 문법을 알고 있음
                      {"\n"}
                      하: 기본적인 문법을 배운 적이 있으나 잘 모름
                      {"\n\n"}
                      (예시) python(상), html/css(하), photoshop(중), premier(상)
                    </LongDesc2>

                    <InputWrap>
                      <InputForceSingle>
                        <Input
                          variant="form"
                          placeholder="내용을 작성해주세요."
                          value={q5}
                          onChange={onChange(setQ5)}
                        />
                      </InputForceSingle>
                    </InputWrap>
                  </EssayItem5>
                </CardInner2>
              </Card2>
            </Section2>

            <Section2>
              <SectionTitle2 className="h4-bold">4. 기타</SectionTitle2>

              <Card2>
                <CardInner2>
                  <EtcGroup>
                    <EtcItem>
                      <EtcTop>
                        <EtcText>
                          <EtcTitle className="h5-bold">1. 선수강 강의 이수 내역</EtcTitle>
                          <EtcDesc className="footnote-regular">
                            파일은 최대 {FILE_LIMIT}개까지 업로드할 수 있으며, 파일당 20MB 이내로 업로드해 주세요.
                          </EtcDesc>
                        </EtcText>

                        <AddFileButton type="button" onClick={() => precourseRef.current?.click()}>
                          파일 추가
                        </AddFileButton>
                        <HiddenFileInput
                          ref={precourseRef}
                          type="file"
                          multiple
                          accept="image/png,image/jpeg,image/jpg,image/gif"
                          onChange={onPickFiles(setPrecourseFiles)}
                        />
                      </EtcTop>

                      {precourseFiles.length > 0 && (
                        <FileList>
                          {precourseFiles.map((f, idx) => (
                            <FileRow key={`pre-${idx}`}>
                              <FileName className="body-regular">{f.name}</FileName>
                              <TrashButton type="button" onClick={() => removeFileAt(setPrecourseFiles, idx)}>
                                <img src="/icons/trash.svg" alt="" />
                              </TrashButton>
                            </FileRow>
                          ))}
                        </FileList>
                      )}
                    </EtcItem>

                    <EtcItem>
                      <EtcTop>
                        <EtcText>
                          <EtcTitle className="h5-bold">2. 포트폴리오</EtcTitle>
                          <EtcDesc className="footnote-regular">
                            파일은 최대 {FILE_LIMIT}개까지 업로드할 수 있으며, 파일당 100MB 이내로 업로드해 주세요.
                            {"\n"}* 필수는 아니지만, 기획/디자인 파트를 선택하신 분들은 포트폴리오를 제출하시는 것을 권장합니다.
                          </EtcDesc>
                        </EtcText>

                        <AddFileButton type="button" onClick={() => portfolioRef.current?.click()}>
                          파일 추가
                        </AddFileButton>
                        <HiddenFileInput
                          ref={portfolioRef}
                          type="file"
                          multiple
                          accept="image/png,image/jpeg,image/jpg,image/gif,application/pdf"
                          onChange={onPickFiles(setPortfolioFiles)}
                        />
                      </EtcTop>

                      {portfolioFiles.length > 0 && (
                        <FileList>
                          {portfolioFiles.map((f, idx) => (
                            <FileRow key={`port-${idx}`}>
                              <FileName className="body-regular">{f.name}</FileName>
                              <TrashButton type="button" onClick={() => removeFileAt(setPortfolioFiles, idx)}>
                                <img src="/icons/trash.svg" alt="" />
                              </TrashButton>
                            </FileRow>
                          ))}
                        </FileList>
                      )}
                    </EtcItem>
                  </EtcGroup>
                </CardInner2>
              </Card2>
            </Section2>

            <SubmitRow $bottomGap={SUBMIT_BOTTOM_GAP}>
              <SubmitStack>
                <SubmitButton
                  type="button"
                  disabled={!canSubmit || isSubmitting}
                  onClick={onClickSubmit}
                >
                  {isSubmitting ? "제출 중..." : "제출하기"}
                </SubmitButton>
                {!!submitError && <SubmitError className="footnote-regular">{submitError}</SubmitError>}
              </SubmitStack>
            </SubmitRow>
          </Sections>
        </Frame>

        {!isMobile && (
          <Modal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            size="md"
            showClose={false}
            type="confirm"
            align="center"
            icon={{ src: "/icons/ellipse7.svg", alt: "" }}
            title="제출 완료하시겠습니까?"
            description={"지금 제출하시면 더이상 수정할 수 없습니다."}
            actions={[
              { label: "취소", variant: "default", onClick: () => setConfirmOpen(false) },
              {
                label: isSubmitting ? "제출 중..." : "확인",
                variant: "primary",
                closeOnClick: false,
                onClick: onConfirmSubmit,
              },
            ]}
          />
        )}

        {!isMobile && (
          <Modal
            open={resultOpen}
            onClose={() => setResultOpen(false)}
            size="md"
            showClose={false}
            type="result"
            align="center"
            icon={{ src: "/icons/ellipse7.svg", alt: "" }}
            title="제출이 완료되었습니다"
            description={
              applicationCode
                ? "이화여대 멋쟁이사자처럼에 지원해주셔서 감사합니다!\n아래의 지원 코드를 통해 제출한 지원서를 열람할 수 있습니다."
                : "제출은 완료되었습니다.\n다만 서버 응답에 지원 코드(application_code)가 포함되어 있지 않아, 현재 화면에서 코드를 표시할 수 없습니다.\n운영진/백엔드에게 응답 스펙을 확인해주세요."
            }
            code={{
              label: "",
              value: applicationCode || "지원 코드가 응답되지 않았습니다.",
              copyable: !!applicationCode,
              onCopy: handleCopyCode,
            }}
            note={
              applicationCode ? (
                <span style={{ display: "block", marginTop: 4, textDecoration: "none" }}>
                  * 발급받은 코드는 <strong>다시 확인할 수 없으니</strong> 유의해주세요.
                </span>
              ) : null
            }
            actions={[
              {
                label: "지원서 열람하기",
                variant: "default",
                closeOnClick: false,
                onClick: () => {
                  setResultOpen(false);
                  setIsCodeModalOpen(true);
                },
              },
              { label: "홈으로", variant: "primary", closeOnClick: false, onClick: () => navigate("/") },
            ]}
          />
        )}

        <MoModal open={isMobile && confirmOpen} onClose={() => setConfirmOpen(false)}>
          <MoDialogInner $variant="confirm">
            <MoTop>
              <MoIconRow>
                <MoIcon src="/icons/ellipse7.svg" alt="" />
              </MoIconRow>

              <MoTextBlock>
                <MoTitle>제출 완료하시겠습니까?</MoTitle>
                <MoDesc>지금 제출하시면 더이상 수정할 수 없습니다.</MoDesc>
                {!!submitError && <MoError>{submitError}</MoError>}
              </MoTextBlock>
            </MoTop>

            <MoActions>
              <MoBtn type="button" $variant="ghost" onClick={() => setConfirmOpen(false)} disabled={isSubmitting}>
                취소
              </MoBtn>
              <MoBtn type="button" $variant="primary" onClick={onConfirmSubmit} disabled={isSubmitting}>
                {isSubmitting ? "제출 중..." : "확인"}
              </MoBtn>
            </MoActions>
          </MoDialogInner>
        </MoModal>

        <MoModal open={isMobile && resultOpen} onClose={() => setResultOpen(false)}>
          <MoDialogInner $variant="result">
            <MoTop>
              <MoIconRow>
                <MoIcon src="/icons/ellipse7.svg" alt="" />
              </MoIconRow>

              <MoTextBlock>
                <MoTitle>제출 완료되었습니다.</MoTitle>
                <MoDesc>
                  {applicationCode ? (
                    <>
                      이화여대 멋쟁이사자처럼에 지원해주셔서 감사합니다!
                      <br />
                      아래의 지원 코드를 통해 제출한 지원서를 열람할 수 있습니다.
                    </>
                  ) : (
                    <>
                      제출은 완료되었습니다.
                      <br />
                      다만 서버 응답에 지원 코드가 포함되어 있지 않아
                      <br />
                      이 화면에서 코드를 표시할 수 없습니다.
                    </>
                  )}
                </MoDesc>
              </MoTextBlock>
            </MoTop>

            <MoBottom>
              <MoCodeWrap>
                <MoCodeBox>
                  <MoCodeText>{applicationCode || "지원 코드가 응답되지 않았습니다."}</MoCodeText>
                  <MoCopyBtn
                    type="button"
                    aria-label="copy"
                    onClick={handleCopyCode}
                    disabled={!applicationCode}
                    style={{
                      opacity: applicationCode ? 1 : 0.4,
                      cursor: applicationCode ? "pointer" : "default",
                    }}
                  >
                    <img src="/icons/copyInput.svg" alt="" />
                  </MoCopyBtn>
                </MoCodeBox>

                {applicationCode && (
                  <MoNote>
                    * 발급받은 코드는 <strong>다시 확인할 수 없으니</strong> 유의해주세요.
                  </MoNote>
                )}
              </MoCodeWrap>

              <MoActions>
                <MoBtn
                  type="button"
                  $variant="ghost"
                  onClick={() => {
                    setResultOpen(false);
                    setIsCodeModalOpen(true);
                  }} 

                >
                  지원서 열람하기
                </MoBtn>
                <MoBtn type="button" $variant="primary" onClick={() => navigate("/")}>
                  홈으로
                </MoBtn>
              </MoActions>
            </MoBottom>
          </MoDialogInner>
        </MoModal>
      </A2Page>
    </>
  );
}

const A1Page = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  min-width: 400px;
  padding: 0 80px; 
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  padding: 5rem;

  @media (max-width: 799px) {
    min-width: 0;
    padding: 0 16px;
  }
`;
const A1Frame = styled.div`
  display: flex;
  width: 100%;
  min-width: 220px;
  max-width: 971px;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  align-self: stretch;
  margin: 0 auto;
`;
const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 639px;
  margin: 0 auto;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
`;
const SectionTitle = styled.div`
  color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  margin-bottom: 1rem;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;

  @media (max-width: 799px) {
  }
`;
const PageName = styled.div`
  color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
  font-family: "Cafe24 PRO Slim";
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.625rem;
  @media (max-width: 799px) {
  }
`;
const PartName = styled.div`
  color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
  @media (max-width: 799px) {
  }
`;

const A1Card = styled.div`
  display: flex;
  width: 100%;
  padding: 2.5rem 3.25rem 2.5rem 3.25rem;
  align-items: center;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid var(--neutral-95, #dcdcdc);
  background: var(--static-white, #fff);

  @media (max-width: 799px) {
    padding: 1.05rem 1rem 1.05rem 1rem;
    max-width: 550px
    margin: 0auto;
  }
`;
const A1CardInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 100%;

  @media (max-width: 799px) {
    margin-bottom: 0rem;
  }
`;
const LabelText = styled.span`
  color: var(--Atomic-Neutral-30, var(--Neutral-30, #474747));
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;

  align-items: center;
  margin-bottom: 0.25rem;

  @media (max-width: 799px) {
    font-size: 0.875rem;
    font-style: normal;
    line-height: 1.375rem;
  }
`;
const InputWrapper = styled.div`
  margin: 0;
  width: 100%;
  margin-bottom: 1rem;

  @media (max-width: 799px) {
    margin-bottom: 0rem;
  }
`;
const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const AsteriskMark = styled.span`
  display: flex;
  margin-left: 0.1rem;

  color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #FF7B2E));
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
`;
const AsteriskText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #FF7B2E));
  text-align: center;

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;

  @media (max-width: 799px) {
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
  }
`;
const ExampleContent = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;

  margin: 0 0.1rem 0.25rem 0.2rem;

  color: var(--Atomic-Neutral-50, var(--Neutral-50, #737373));
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem;
`;
const DropdownContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 0.25rem 1rem 1.5rem 0;

  @media (max-width: 799px) {
    margin-bottom: 1rem;
    max-width: 16.31rem;

    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
  }
`;
const DropdownWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 0 0;

  color: var(--Atomic-Neutral-30, var(--Neutral-30, #474747));

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;

  @media (max-width: 799px) {
    max-width: 16.31rem;

    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
  }
`;
const ButtonRowPC = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 24px;
  margin: 0.75rem 0 2rem 0;

  & > button {
    flex: 1;
    width: 0;
  }
`;
const ButtonRowMobile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 4px;

  & > button {
    flex: 1;
    width: 0;
  }
`;
const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 799px) {
    margin-bottom: 1.25rem;
  }
`;
const DateBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;
const DateLabel = styled.div`
  min-width: 70px;
  margin-top: 0.25rem;
  color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #FF7B2E));

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem;

  @media (max-width: 799px) {
    margin-top: 0.25rem;
  }
`;
const TimeCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const TimeLabel = styled.div`
  color: var(--Atomic-Neutral-50, var(--Neutral-50, #737373));

  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25;

  @media (max-width: 799px) {
    margin-top: 0.12rem;
  }
`;
const TimeRow = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.43rem;
`;
const RadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.75rem;
  font-family: Pretendard, sans-serif;
  user-select: none;
`;
const RadioText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: var(--Atomic-Neutral-30, var(--Neutral-30, #474747));

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;

  @media (max-width: 799px) {
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
  }
`;
const ErrorText = styled.div`
  margin-top: 2px;
  min-height: 1.25rem;
  color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #FF7B2E));
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  transition: visibility 0.2s;
`;
const LongDesc = styled.span`
  margin-bottom: 1rem;

  color: var(--Atomic-Neutral-30, var(--Neutral-30, #474747));
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;

  align-self: stretch;
  white-space: pre-wrap;

  @media (max-width: 799px) {
    font-size: 0.875rem;
    font-style: normal;
    line-height: 1.375rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const ModalCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 2.5rem;
  gap: 2.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(24, 24, 27, 0.1);
  box-sizing: border-box;

  @media (max-width: 799px) {
    min-width: 15rem;
    padding: 1.5rem;
    gap: 2rem;
  }
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const ModalTitle = styled.h2`
  margin: 0;
  flex: 1;
  color: #2a2a2a;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;

  @media (max-width: 799px) {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`;
const ModalCloseBtn = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;
const ModalDesc = styled.p`
  margin: 0;
  color: #737373;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;

  @media (max-width: 799px) {
    font-size: 0.8125rem;
    line-height: 1.25rem;
  }
`;
const ModalInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const ModalInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 9px 20px;
  background: #f4f4f5;
  border: none;
  border-radius: 50px;
  outline: none;

  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: #2a2a2a;

  &::placeholder {
    color: #9b9b9b;
  }

  &:focus {
    background: #efefef;
  }

  @media (max-width: 799px) {
    height: 36px;
    padding: 8px 16px;
    font-size: 0.8125rem;
  }
`;
const ModalButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ModalConfirmButton = styled.button`
  width: 100%;
  padding: 10px 40px;
  border: none;
  border-radius: 999px;
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
  background: ${({ $active }) => ($active ? "#05DA5B" : "#9B9B9B")};
  color: #fff;

  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? "#04c752" : "#9B9B9B")};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 799px) {
    padding: 8px 32px;
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
`;
const ModalHelperText = styled.p`
  margin: 0;
  text-align: center;
  color: #9b9b9b;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.25rem;
`;
const ModalHelperLink = styled.a`
  color: #9b9b9b;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #737373;
  }
`;
const ModalErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
`;
const ModalErrorTitle = styled.h2`
  margin: 0;
  color: #2a2a2a;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;

  @media (max-width: 799px) {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`;
const ModalErrorDesc = styled.p`
  margin: 0;
  color: #737373;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;

  @media (max-width: 799px) {
    font-size: 0.8125rem;
    line-height: 1.25rem;
  }
`;

const A2Page = styled.div`
  display: flex;
  width: 100%;
  min-width: 400px;
  padding: 0 80px;
  flex-direction: column;
  align-items: center;
  gap: 44px;
  align-self: stretch;

  @media (max-width: 799px) {
    min-width: 0;
    padding: 0 16px;
  }
`;
const Frame = styled.div`
  display: flex;
  width: 100%;
  min-width: 220px;
  max-width: 971px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  gap: 52px;
  align-self: stretch;
`;
const TitleBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const Title = styled.div`
  color: var(--neutral-20, #2a2a2a);
`;
const Subtitle = styled.div`
  color: var(--neutral-50, #737373);
`;
const Sections = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 72px;
  align-self: stretch;
`;
const Section2 = styled.section`
  display: flex;
  width: 100%;
  max-width: 639px;
  margin: 0 auto;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: center;
`;
const SectionTitle2 = styled.div`
  color: var(--neutral-20, #2a2a2a);
  align-self: stretch;
`;
const Card2 = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 52px;
  align-items: center;
  align-self: stretch;
  border-radius: 16px;
  border: 1px solid var(--neutral-95, #dcdcdc);
  background: var(--static-white, #fff);

  @media (max-width: 799px) {
    padding: 24px 16px;
  }
`;
const CardInner2 = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  flex: 1 0 0;
`;
const EssayItem = styled.div`
  display: flex;
  width: 100%;
  min-width: 220px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;
const EssayItem5 = styled.div`
  display: flex;
  width: 100%;
  min-width: 220px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const QHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const QTitleRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 4px;
  align-self: stretch;
`;
const QTitle = styled.div`
  flex: 1 0 0;
  color: var(--neutral-30, #474747);
`;
const Req = styled.span`
  color: var(--orange-60, #ff7b2e);
`;
const QDesc = styled.div`
  width: 100%;
  padding-left: 20px;
  color: var(--neutral-50, #737373);
  text-align: left;
`;
const LongDesc2 = styled.div`
  color: var(--neutral-50, #737373);
  align-self: stretch;
  white-space: pre-wrap;
`;
const InputWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;
const MetaRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;
const OverText = styled.div`
  flex: 1 0 0;
  color: var(--orange-60, #ff7b2e);
`;
const Counter = styled.div`
  color: var(--neutral-50, #737373);
  text-align: right;
  flex: 0 0 auto;
`;
const InputForceTextarea = styled.div`
  width: 100%;

  & > div {
    width: 100% !important;
  }

  & > div > div {
    width: 100% !important;
    height: auto !important;
    padding: 12px 20px !important;
    align-items: flex-start !important;
  }

  textarea {
    min-height: ${MIN_TEXTAREA_HEIGHT}px !important;
    height: auto !important;
    overflow: hidden !important;

    border: none !important;
    outline: none !important;
    resize: none !important;

    color: var(--neutral-20, #2a2a2a) !important;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 22px !important;
  }

  textarea::placeholder {
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9b9b9b)) !important;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 22px !important;
  }
`;
const InputForceSingle = styled.div`
  width: 100%;

  & > div {
    width: 100% !important;
  }

  & > div > div {
    width: 100% !important;
  }

  input {
    color: var(--neutral-20, #2a2a2a) !important;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 22px !important;
  }

  input::placeholder {
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9b9b9b)) !important;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 22px !important;
  }
`;
const EtcGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  flex: 1 0 0;
`;
const EtcItem = styled.div`
  display: flex;
  width: 100%;
  min-width: 220px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const EtcTop = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  gap: 16px;
`;
const EtcText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
`;
const EtcTitle = styled.div`
  color: var(--neutral-30, #474747);
`;
const EtcDesc = styled.div`
  color: var(--neutral-50, #737373);
  white-space: pre-wrap;
`;
const AddFileButton = styled.button`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: var(--neutral-30, #474747);
  color: var(--static-white, #fff);
  border: none;
  cursor: pointer;

  font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  flex: 0 0 auto;

  @media (max-width: 799px) {
    padding: 6px 16px;
    border-radius: 24px;
  }
`;
const HiddenFileInput = styled.input`
  display: none;
`;
const FileList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  align-self: stretch;
`;
const FileRow = styled.div`
  display: flex;
  width: 535px;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 50px;
  background: var(--cool-neutral-98, #f4f4f5);

  @media (max-width: 799px) {
    width: 100%;
  }
`;
const FileName = styled.div`
  color: var(--neutral-70, #9b9b9b);
`;
const TrashButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;

  img {
    width: 22px;
    height: 22px;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;
const SubmitRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ $bottomGap }) => $bottomGap}px;
`;
const SubmitStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;
const SubmitError = styled.div`
  color: var(--orange-60, #ff7b2e);
  text-align: center;
  white-space: pre-wrap;
`;
const SubmitButton = styled.button`
  width: 390px;
  height: 52px;
  border: none;
  cursor: pointer;

  border-radius: 40px;
  background: var(--Primary-Main, #05da5b);
  color: var(--Common-100, #fff);

  font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;

  &:disabled {
    cursor: default;
    background: var(--Neutral-95, #dcdcdc);
    color: var(--Neutral-70, #9b9b9b);
  }

  @media (max-width: 799px) {
    width: 100%;
  }
`;
const MoOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
const MoDialog = styled.div`
  width: 288px;
  max-width: calc(100vw - 32px);
`;
const MoDialogInner = styled.div`
  width: 100%;
  height: ${({ $variant }) => ($variant === "result" ? "381.8px" : "219.7px")};

  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  border-radius: 12px;
  background: var(--Common-100, #fff);
  box-shadow: 0 8px 16px 0 rgba(24, 24, 27, 0.1);

  box-sizing: border-box;
`;
const MoTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;
const MoIconRow = styled.div`
  display: flex;
  width: 259px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;
const MoIcon = styled.img`
  width: 24px;
  height: 25.799px;
  flex-shrink: 0;
  aspect-ratio: 24 / 25.799;
`;
const MoTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;
const MoTitle = styled.div`
  height: 28px;
  width: 100%;

  color: var(--Neutral-20, #2a2a2a);
  text-align: center;

  font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`;
const MoDesc = styled.div`
  width: 100%;

  color: var(--Neutral-50, #737373);
  text-align: center;

  font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;
const MoError = styled.div`
  width: 100%;
  color: var(--orange-60, #ff7b2e);
  text-align: center;

  font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  white-space: pre-wrap;
`;
const MoBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;
const MoCodeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
`;
const MoCodeBox = styled.div`
  display: flex;
  max-width: 400px;
  padding: 9px 20px;
  justify-content: center;
  align-items: center;
  width: 100%;

  border-radius: 50px;
  background: var(--Cool-Neutral-98, #f4f4f5);

  box-sizing: border-box;
`;
const MoCodeText = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;

  color: var(--Neutral-50, #737373);
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
`;
const MoCopyBtn = styled.button`
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;

  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
  }
`;
const MoNote = styled.div`
  width: 100%;
  margin-top: 4px;

  color: var(--Red-Orange-60, #ff7b2e);
  text-align: center;

  font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  text-decoration: none;

  strong {
    font-weight: 700;
  }
`;
const MoActions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;
const MoBtn = styled.button`
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;

  border-radius: ${({ $variant }) => ($variant === "primary" ? "999px" : "40px")};
  border: ${({ $variant }) => ($variant === "primary" ? "none" : "1.5px solid var(--Neutral-95, #DCDCDC)")};
  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--Primary-Main, #05DA5B)" : "var(--Common-100, #FFF)"};

  cursor: pointer;

  color: ${({ $variant }) => ($variant === "primary" ? "var(--Common-100, #FFF)" : "var(--Neutral-70, #9B9B9B)")};
  text-align: center;

  font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;

  white-space: nowrap;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;
const PartPickWrap = styled.div`
  width: 100%;
  max-width: 971px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
`;

const PartPickTitle = styled.div`
  color: var(--Neutral-30, #474747);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
`;

const PartButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const PartBtn = styled.button`
  border: 1px solid var(--Neutral-95, #dcdcdc);
  background: ${({ $active }) => ($active ? "var(--Primary-Main, #05DA5B)" : "var(--Common-100, #fff)")};
  color: ${({ $active }) => ($active ? "var(--Common-100, #fff)" : "var(--Neutral-50, #737373)")};
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
`;