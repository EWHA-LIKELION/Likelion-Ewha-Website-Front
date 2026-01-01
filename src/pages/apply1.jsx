import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import Dropdown2 from "../components/dropdown/Dropdown2";
import Dropdown3 from "../components/dropdown/Dropdown3";
import api from "../apis/api";

const PRIVACY_AGREE_TEXT = `개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용 개인정보 수집 및 이용 관련 내용`;
import {
  SelectPositiveButton,
  SelectNegativeButton,
  UnselectPositiveButton,
  UnselectNegativeButton,
  SelectedRadio as PcSelectedRadio,
  UnselectedRadio as PcUnselectedRadio
} from "../components/buttons/SelectionButtons_pc";
import {
  SelectPositiveButtonMobile,
  SelectNegativeButtonMobile,
  UnselectPositiveButtonMobile,
  UnselectNegativeButtonMobile,
  SelectedRadio as MoSelectedRadio,
  UnselectedRadio as MoUnselectedRadio
} from "../components/buttons/SelectionButtons_mo";
import {
  TimeDisabled,
  TimeAbled,
  TimeSelected
} from "../components/buttons/TimeButtons_pc";
import {
  TimeDisabledMobile,
  TimeAbledMobile,
  TimeSelectedMobile
} from "../components/buttons/TimeButtons_mo";

function ApplicationCodeModal({ isOpen, onClose, onSuccess }) {
  const [code, setCode] = useState("");
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
      const response = await api.post("/recruitments/application/content/", {
        application_code: code.trim()
      });
      
      onSuccess?.(response.data);
      handleClose();
    } catch (error) {
      setErrorMode(true);
    } finally {
      setIsLoading(false);
    }
  };


  React.useEffect(() => {
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
                <path d="M1 1L13 13M13 1L1 13" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </ModalCloseBtn>
          </ModalHeader>
          <ModalDesc>
            지원서를 열람하기 위해서<br />
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
            <ModalConfirmButton
              onClick={handleConfirm}
              $active={isCodeValid}
              disabled={!isCodeValid || isLoading}
            >
              {isLoading ? "확인 중..." : "확인"}
            </ModalConfirmButton>
            <ModalHelperText>
              지원 코드를 잊어버리셨나요?{" "}
              <ModalHelperLink 
                href="카카오톡 링크 걸어주기(피그마에서 못 찾음..)" 
                target="_blank" 
              >
                카카오톡 문의하기
              </ModalHelperLink>
            </ModalHelperText>
          </ModalButtonWrapper>
        </ModalInputSection>
      </ModalCard>
    </ModalOverlay>
  );
}

// `apply1.jsx`
function useisMO(maxWidth = 799) {
  const [isMO, setisMO] = useState(() => window.innerWidth <= maxWidth);
  React.useEffect(() => {
    const handler = () => setisMO(window.innerWidth <= maxWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [maxWidth]);
  return isMO;
}

export default function Apply1() {
  const isMO = useisMO(799);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [applicationData, setApplicationData] = useState(null);

  const handleCodeModalSuccess = (data) => {
    setApplicationData(data);
    // 여기서 data를 활용하면 폼 자동 채우기 같은 거 처리 ㄱㄴ
    console.log("지원서 데이터:", data);
  };

  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [major, setMajor] = useState("");
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [privacyAgree, setPrivacyAgree] = useState(false);

  const yearOptions = Array.from({ length: 2010 - 1990 + 1 }, (_, i) => 1990 + i);
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const dateOptions = Array.from({ length: 31 }, (_, i) => i + 1);


//  면접일정 : 이것도 서버에서 받아오는 건지, 아니면 고정된 값(?)인지 여쭤볼 것
// 일단은 받아오는 형태로 작성해 둠
  const INTERVIEW_DATES = [
    {
      date: "2025-12-29",
      label: "12월 29일",
      am: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
      pm: [
        "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30",
        "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30",
        "8:00", "8:30", "9:00", "9:30"
      ]
    },
    {
      date: "2025-12-30",
      label: "12월 30일",
      am: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
      pm: [
        "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30",
        "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30"
      ]
    }
  ];

  const [selectedTimes, setSelectedTimes] = useState({});
  const [videoAgree, setVideoAgree] = useState(false);

  function toggleTime(date, time) {
    setSelectedTimes(prev => {
      const arr = prev[date] || [];
      if (arr.includes(time)) {
        return { ...prev, [date]: arr.filter(t => t !== time) };
      }
      return { ...prev, [date]: [...arr, time] };
    });
  }

  const isNameValid = name.trim().length > 0;
  const isBirthValid = birthYear && birthMonth && birthDate;
  const isMajorValid = major.trim().length > 0;
  const isStudentIdValid = studentId.trim().length > 0;
  const isGradeValid = grade.trim().length > 0;
  const isPhoneValid = /^01[0]-\d{4}-\d{4}$/.test(phone);
// 일단 010-XXXX-XXXX 형식으로만 검사하도록 했는데 설마...,, 외국인 번호나 뭐 다른 번호 같은 것도 고려해야 하는지...,,?
  const isInterviewTypeValid = !!interviewType;
  const isPrivacyValid = !!privacyAgree;
  const isTimeValid = Object.values(selectedTimes).some(arr => Array.isArray(arr) && arr.length > 0);
  const isVideoValid = !!videoAgree;

return (
<Page>
  <ApplicationCodeModal
    isOpen={isCodeModalOpen}
    onClose={() => setIsCodeModalOpen(false)}
    onSuccess={handleCodeModalSuccess}
  />
  <CodeLookupButton onClick={() => setIsCodeModalOpen(true)}>
    모달 테스트용
  </CodeLookupButton>

    <Frame>
    <TitleWrapper>
      <PageName>지원서 작성</PageName>
      <PartName>파트명</PartName>
    </TitleWrapper>
    <Section>
        <SectionTitle>1. 지원자 정보</SectionTitle>

        <Card>
        <CardInner>

          <ItemContainer>
            <LabelWrapper>
                <LabelText>이름</LabelText>
                <AsteriskMark>*</AsteriskMark>
            </LabelWrapper>
            <InputWrapper>
              <Input
                variant="form" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
                error={!isNameValid && name.length > 0}
                errorMessage="이름을 작성해주세요."
                placeholder={"이름을 작성해주세요."}
                $state={!isNameValid && name.length > 0 ? 'error' : name.length > 0 ? 'focused' : 'default'}
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
                // label="전화번호"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                error={!isPhoneValid && phone.length > 0}
                errorMessage="전화번호를 작성해주세요."
                placeholder={"전화번호를 작성해주세요."}
                $state={!isPhoneValid && phone.length > 0 ? 'error' : phone.length > 0 ? 'focused' : 'default'}
              />
              <ErrorText $visible={!isPhoneValid && phone.length > 0}>
                {!isPhoneValid && phone.length > 0 ? "전화번호를 작성해주세요." : "\u00A0"}
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
                  error={!isBirthValid && (birthYear || birthMonth || birthDate)}
                />
                <Dropdown2
                  options={monthOptions}
                  value={birthMonth}
                  onChange={setBirthMonth}
                  onSelect={setBirthMonth}
                  placeholder={"00월"}
                  unit=" 월"
                  error={!isBirthValid && (birthYear || birthMonth || birthDate)}
                />
                <Dropdown2
                  options={dateOptions}
                  value={birthDate}
                  onChange={setBirthDate}
                  onSelect={setBirthDate}
                  placeholder={"00일"}
                  unit=" 일"
                  error={!isBirthValid && (birthYear || birthMonth || birthDate)}
                />
              </DropdownWrapper>
              <ErrorText $visible={!isBirthValid && (birthYear || birthMonth || birthDate)}>
                {!isBirthValid && (birthYear || birthMonth || birthDate) ? "생년월일을 선택하세요." : "\u00A0"}
              </ErrorText>
            </DropdownContainer>
          </ItemContainer>

          <ItemContainer>
            <LabelWrapper>
                <LabelText>학과</LabelText>
                <AsteriskMark>*</AsteriskMark>
            </LabelWrapper>
            <ExampleContent>복수전공일 경우 본전공/복수전공(혹은 부전공)과 같이 작성해주세요. (예시) 경영학부/컴퓨터공학전공
            </ExampleContent>
            <InputWrapper>
              <Input
                variant="form" 
                value={major}
                onChange={e => setMajor(e.target.value)}
                required
                error={!isMajorValid && major.length > 0}
                errorMessage="학과를 작성해주세요."
                placeholder={"학과를 작성해주세요."}
                $state={!isMajorValid && major.length > 0 ? 'error' : major.length > 0 ? 'focused' : 'default'}
              />
              <ErrorText $visible={!isMajorValid && major.length > 0}>
                {!isMajorValid && major.length > 0 ? "학과를 작성해주세요." : "\u00A0"}
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
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                error={!isStudentIdValid && studentId.length > 0}
                errorMessage="학번을 작성해주세요."
                placeholder={"학번을 작성해주세요."}
                $state={!isStudentIdValid && studentId.length > 0 ? 'error' : studentId.length > 0 ? 'focused' : 'default'}
              />
              <ErrorText $visible={!isStudentIdValid && studentId.length > 0}>
                {!isStudentIdValid && studentId.length > 0 ? "학번을 작성해주세요." : "\u00A0"}
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
                onChange={e => setGrade(e.target.value)}
                error={!isGradeValid && grade.length > 0}
                errorMessage="학년을 작성해주세요."
                placeholder={"학년을 작성해주세요."}
                $state={!isGradeValid && grade.length > 0 ? 'error' : grade.length > 0 ? 'focused' : 'default'}
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
            <ExampleContent>2차 면접은 0/0~0/0 오프라인, 0/0 온라인으로 진행되며, 오프라인 면접 장소는 이화여자대학교 학생문화관입니다. 지원자 분이 가진 열정과 역량을 더욱 잘 파악할 수 있도록 최대한 오프라인으로 참여하시는 것을 권장합니다. 다만 개인 사정으로 인해 대면으로 학교에 방문하기 어려운 분에 한하여 온라인으로 참여하실 수 있습니다.</ExampleContent>
              {isMO ? (
            <ButtonRowMobile>
                  {interviewType === "대면" ? (
                    <SelectPositiveButtonMobile onClick={() => setInterviewType("대면")} />
                  ) : (
                    <UnselectPositiveButtonMobile onClick={() => setInterviewType("대면")} />
                  )}
                  {interviewType === "비대면" ? (
                    <SelectNegativeButtonMobile onClick={() => setInterviewType("비대면")} />
                  ) : (
                    <UnselectNegativeButtonMobile onClick={() => setInterviewType("비대면")} />
                  )}
            </ButtonRowMobile>
              ) : (
            <ButtonRowPC>
                  {interviewType === "대면" ? (
                    <SelectPositiveButton onClick={() => setInterviewType("대면")} />
                  ) : (
                    <UnselectPositiveButton onClick={() => setInterviewType("대면")} />
                  )}
                  {interviewType === "비대면" ? (
                    <SelectNegativeButton onClick={() => setInterviewType("비대면")} />
                  ) : (
                    <UnselectNegativeButton onClick={() => setInterviewType("비대면")} />
                  )}
            </ButtonRowPC>
              )}
              <ErrorText $visible={!isInterviewTypeValid && interviewType !== ""}>
                {!isInterviewTypeValid && interviewType !== "" ? "면접 참여 방식을 선택해주세요." : "\u00A0"}
              </ErrorText>
          </ItemContainer>


          <ItemContainer>
            <LabelWrapper>
                <LabelText>개인정보 수집 및 이용 동의</LabelText>
                <AsteriskMark>*</AsteriskMark>
            </LabelWrapper>
            {(() => {
              const [isOpen, setIsOpen] = React.useState(false);
              return (
                <>
                  <Dropdown3
                    question="개인정보 수집 및 이용 동의서"
                    answer={PRIVACY_AGREE_TEXT}
                    styleType={2}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                  <RadioRow>
                    {isMO ? (
                      <RadioLabel onClick={() => setPrivacyAgree(prev => !prev)}>
                        {privacyAgree ? <MoSelectedRadio /> : <MoUnselectedRadio />}
                        <AsteriskText>(필수)</AsteriskText><RadioText>개인정보 수집 및 이용에 동의합니다.</RadioText>
                      </RadioLabel>
                    ) : (
                      <RadioLabel onClick={() => setPrivacyAgree(prev => !prev)}>
                        {privacyAgree ? <PcSelectedRadio /> : <PcUnselectedRadio />}
                        <AsteriskText>(필수)</AsteriskText><RadioText>개인정보 수집 및 이용에 동의합니다.</RadioText>
                      </RadioLabel>
                    )}
                  </RadioRow>
                  <ErrorText $visible={!isPrivacyValid && privacyAgree !== false}>
                    {!isPrivacyValid && privacyAgree !== false ? "개인정보 수집 및 이용에 동의해주세요." : "\u00A0"}
                  </ErrorText>
                </>
              );
            })()}
          </ItemContainer>

          </CardInner>
          </Card>
        </Section>

        <Section>
          <SectionTitle>2. 면접 일정</SectionTitle>
          <Card>
            <CardInner>

          <ItemContainer>
            <LabelWrapper>
              <LongDesc>
                가능한 요일에 한해 최소 1개 이상의 시간을 선택해주세요.
              </LongDesc>
              <AsteriskMark>*</AsteriskMark>
              </LabelWrapper>
              <TimeSection>
                {INTERVIEW_DATES.map(({ date, label, am, pm }) => (
                  <DateBlock key={date}>
                    <DateLabel>{label}</DateLabel>
                    <TimeCol>
                      <TimeLabel>오전</TimeLabel>
                      <TimeRow>
                        {am.map(time => {
                          const selected = (selectedTimes[date] || []).includes(time);
                          if (isMO) {
                            return (
                              <span
                                key={time}
                                style={{ display: 'inline-block', cursor: 'pointer' }}
                                onClick={() => toggleTime(date, time)}
                              >
                                {selected ? (
                                  <TimeSelectedMobile time={time} />
                                ) : (
                                  <TimeAbledMobile time={time} />
                                )}
                              </span>
                            );
                          } else {
                            return (
                              <span
                                key={time}
                                style={{ display: 'inline-block', cursor: 'pointer' }}
                                onClick={() => toggleTime(date, time)}
                              >
                                {selected ? (
                                  <TimeSelected time={time} />
                                ) : (
                                  <TimeAbled time={time} />
                                )}
                              </span>
                            );
                          }
                        })}
                      </TimeRow>

                      <TimeLabel>오후</TimeLabel>
                      <TimeRow>
                        {pm.map(time => {
                          const selected = (selectedTimes[date] || []).includes(time);
                          if (isMO) {
                            return (
                              <span
                                key={time}
                                style={{ display: 'inline-block', cursor: 'pointer' }}
                                onClick={() => toggleTime(date, time)}
                              >
                                {selected ? (
                                  <TimeSelectedMobile time={time} />
                                ) : (
                                  <TimeAbledMobile time={time} />
                                )}
                              </span>
                            );
                          } else {
                            return (
                              <span
                                key={time}
                                style={{ display: 'inline-block', cursor: 'pointer' }}
                                onClick={() => toggleTime(date, time)}
                              >
                                {selected ? (
                                  <TimeSelected time={time} />
                                ) : (
                                  <TimeAbled time={time} />
                                )}
                              </span>
                            );
                          }
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
                <ExampleContent>면접 진행시 면접 내용이 녹음 및 녹화됩니다. 녹화 영상은 본인 확인 및 평가를 위한 목적으로만 사용되며, 모집 이후 전면 폐기됩니다.</ExampleContent>
                <RadioRow>
                    {isMO ? (
                      <RadioLabel onClick={() => setVideoAgree(prev => !prev)}>
                        {videoAgree ? <MoSelectedRadio /> : <MoUnselectedRadio />}
                        <AsteriskText>(필수)</AsteriskText><RadioText>면접 영상 녹화에 동의합니다.</RadioText>
                      </RadioLabel>
                    ) : (
                      <RadioLabel onClick={() => setVideoAgree(prev => !prev)}>
                        {videoAgree ? <PcSelectedRadio /> : <PcUnselectedRadio />}
                        <AsteriskText>(필수)</AsteriskText><RadioText>면접 영상 녹화에 동의합니다.</RadioText>
                      </RadioLabel>
                    )}
                  <ErrorText $visible={!isVideoValid && videoAgree !== false}>
                    {!isVideoValid && videoAgree !== false ? "면접 영상 녹화에 동의해주세요." : "\u00A0"}
                  </ErrorText>
            </RadioRow>
          </ItemContainer>

        </CardInner>
        </Card>
    </Section>
    </Frame>
</Page>
  );
}

// —————————————————————— 스타일링 ——————————————————————


const Page = styled.div`
  display: flex;
  width: 100%;
  min-width: 400px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
    padding: 5rem;

  @media (max-width: 799px) {
    min-width: 0;
    padding: 1rem;
  }
`;
const Frame = styled.div`
  display: flex;
  width: 100%;
  min-width: 220px;
  max-width: 971px;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  align-self: stretch;
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
  line-height: 1.75rem; /* 20% */
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

const CodeLookupButton = styled.button`
  position: absolute;
  top: 7rem;
  right: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1.5px solid var(--Neutral-60, #6e6e6eff);
  
`;


const Card = styled.div`
  display: flex;
  width: 100%;
  padding: 2.5rem 3.25rem 2.5rem 3.25rem ;
  align-items: center;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--neutral-95, #dcdcdc);
  background: var(--static-white, #fff);

  @media (max-width: 799px) {
    padding: 1.05rem 1rem 1.05rem 1rem ;
    max-width: 550px
    margin: 0auto;
  }
`;

const CardInner = styled.div`
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
        margin-bottom : 0rem;
    }
`; 

const LabelText = styled.span`
  color: var(--Atomic-Neutral-30, var(--Neutral-30, #474747));
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;

  align-items: center;
  margin-bottom : 0.25rem;
  
    @media (max-width: 799px) {
        font-size: 0.875rem;
        font-style: normal;
        line-height: 1.375rem;
    }
`;

const InputWrapper = styled.div`
  margin : 0;
  width: 100%; 
  margin-bottom : 1rem;
  
    @media (max-width: 799px) {
        margin-bottom : 0rem;
    }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const AsteriskMark = styled.span`
  display: flex;
  margin-left : 0.1rem;

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

  margin: 0 0.1rem 0.25rem 0.2rem ;

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
  margin : 0.25rem 1rem 1.5rem 0;

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
  margin : 0.75rem 0 2rem 0;
`;

const ButtonRowMobile = styled.div`
  max-width: 799px;
  width : 100% !important;
  white-space: nowrap;

  display: flex;
  flex-direction: row;
  flex-grow: 1;

  gap: 4px;
  margin-top: 4px;
`;

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom : 2rem;
  gap: 1rem;
 
    @media (max-width: 799px) {
        margin-bottom : 1.25rem;
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
  margin-top : 0.25rem;
  color: var(--Atomic-Red-Orange-60, var(--Red-Orange-60, #FF7B2E));

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem; 
  
    @media (max-width: 799px) {
        margin-top : 0.25rem;
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
        margin-top : 0.12rem;
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
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: visibility 0.2s;
`
//props.$visible은 ErrorText 때문에 레이아웃 변하는 것 때문에 추가함

const LongDesc = styled.span`
  margin-bottom : 1rem;

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

// —————————————————————— 지원 코드 모달 스타일링 ——————————————————————

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
  color: #2A2A2A;
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
  background: #F4F4F5;
  border: none;
  border-radius: 50px;
  outline: none;
  
  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: #2A2A2A;

  &::placeholder {
    color: #9B9B9B;
  }

  &:focus {
    background: #EFEFEF;
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
  color: #9B9B9B;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.25rem;
`;

const ModalHelperLink = styled.a`
  color: #9B9B9B;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #737373;
  }
`;

// 이거는 그 사용자 정보 없다고 나옹는 모달
const ModalErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
`;

const ModalErrorTitle = styled.h2`
  margin: 0;
  color: #2A2A2A;
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
