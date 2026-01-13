import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Input from "../../components/Input";

import {
  SelectedRadio,
  UnselectedRadio,
} from "../../components/buttons/SelectionButtons";

import { TimeSelected } from "../../components/buttons/TimeButtons";

const MIN_TEXTAREA_HEIGHT = 266;
const SUBMIT_BOTTOM_GAP = 160;

const PART_OPTIONS = [
  { value: "PM_DESIGN", label: "기획•디자인" },
  { value: "FRONTEND", label: "프론트엔드" },
  { value: "BACKEND", label: "백엔드" },
];

const pickNameFromUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  try {
    const last = url.split("/").pop() || "";
    return decodeURIComponent((last.split("?")[0] || "").trim());
  } catch {
    return url;
  }
};

const groupInterviewTimes = (isoList) => {
  const out = {};
  (isoList || [])
    .filter(Boolean)
    .forEach((iso) => {
      const [datePart, timePartRaw] = String(iso).split("T");
      if (!datePart || !timePartRaw) return;
      const timePart = timePartRaw.slice(0, 5);
      if (!out[datePart]) out[datePart] = [];
      out[datePart].push(timePart);
    });

  Object.keys(out).forEach((k) => {
    out[k] = Array.from(new Set(out[k])).sort((a, b) => a.localeCompare(b));
  });

  return out;
};

export default function Apply2Review() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const app = state?.submitted || state?.app || null;
  useEffect(() => {
    if (!app) {
      navigate("/recruit/apply");
    }
  }, [app, navigate]);

  const partLabel = useMemo(() => {
    const val = app?.part ?? "";
    return PART_OPTIONS.find((p) => p.value === val)?.label || val || "";
  }, [app]);

  const interviewTimesByDate = useMemo(
    () => groupInterviewTimes(app?.interview_available_times ?? []),
    [app]
  );

  const essays = useMemo(() => {
    if (!app) return null;
    return {
      q1: app.personal_statement_1 ?? "",
      q2: app.personal_statement_2 ?? "",
      q3: app.personal_statement_3 ?? "",
      q4: app.personal_statement_4 ?? "",
      q5: app.personal_statement_5 ?? "",
    };
  }, [app]);

  const precourseLinks = useMemo(
    () => (app?.completed_prerequisites ?? []).filter(Boolean),
    [app]
  );
  const portfolioLinks = useMemo(
    () => (app?.portfolios ?? []).filter(Boolean),
    [app]
  );

  const isOffline = app?.interview_method === "OFFLINE";
  const isOnline = app?.interview_method === "ONLINE";
  if (!app) {
    return null;
  }

  return (
    <Page>
      <Frame>
        <TitleBlock>
          <Title className="h4-bold">지원서 작성</Title>
          <Subtitle className="body-regular">제출한 내용 확인</Subtitle>
        </TitleBlock>
        <HeaderRow>
          <HeaderLeft>
            <HeaderTitle className="h4-bold">지원서 작성</HeaderTitle>
            <HeaderSub className="body-regular">{partLabel}</HeaderSub>
          </HeaderLeft>
          <HeaderRight>
            <Chip className="footnote-regular">{app?.part || "-"}</Chip>
          </HeaderRight>
        </HeaderRow>

        <Sections>
          {/* 1. 지원자 정보 */}
          <Section>
            <SectionTitle className="h4-bold">1. 지원자 정보</SectionTitle>

            <Card>
              <CardInner>
                <InfoGrid>
                  <InfoItem>
                    <Label className="body-regular">이름</Label>
                    <InputForceSingle>
                      <Input variant="form" value={app?.name ?? ""} onChange={() => {}} />
                    </InputForceSingle>
                  </InfoItem>

                  <InfoItem>
                    <Label className="body-regular">전화번호</Label>
                    <InputForceSingle>
                      <Input variant="form" value={app?.phone_number ?? ""} onChange={() => {}} />
                    </InputForceSingle>
                  </InfoItem>

                  <InfoItem>
                    <Label className="body-regular">생년월일</Label>
                    <InputForceSingle>
                      <Input variant="form" value={app?.birthday ?? ""} onChange={() => {}} />
                    </InputForceSingle>
                  </InfoItem>

                  <InfoItem>
                    <Label className="body-regular">학과</Label>
                    <InputForceSingle>
                      <Input variant="form" value={app?.department ?? ""} onChange={() => {}} />
                    </InputForceSingle>
                  </InfoItem>

                  <InfoItem>
                    <Label className="body-regular">학번</Label>
                    <InputForceSingle>
                      <Input variant="form" value={app?.student_number ?? ""} onChange={() => {}} />
                    </InputForceSingle>
                  </InfoItem>

                  <InfoItem>
                    <Label className="body-regular">학년</Label>
                    <InputForceSingle>
                      <Input variant="form" value={app?.grade ?? ""} onChange={() => {}} />
                    </InputForceSingle>
                  </InfoItem>

                  <InfoItemWide>
                    <Label className="body-regular">지원 파트</Label>
                    <InputForceSingle>
                      <Input variant="form" value={partLabel} onChange={() => {}} />
                    </InputForceSingle>
                  </InfoItemWide>

                  <InfoItemWide>
                    <Label className="body-regular">면접 참여 방식</Label>
                    <RadioRow>
                      <RadioLabel>
                        {isOffline ? <SelectedRadio /> : <UnselectedRadio />}
                        <RadioText>오프라인</RadioText>
                      </RadioLabel>
                      <RadioLabel>
                        {isOnline ? <SelectedRadio /> : <UnselectedRadio />}
                        <RadioText>온라인</RadioText>
                      </RadioLabel>
                    </RadioRow>
                  </InfoItemWide>
                </InfoGrid>
              </CardInner>
            </Card>
          </Section>

          {/* 2. 면접 일정 */}
          <Section>
            <SectionTitle className="h4-bold">2. 면접 일정</SectionTitle>

            <Card>
              <CardInner>
                {Object.keys(interviewTimesByDate).length > 0 ? (
                  <DateList>
                    {Object.entries(interviewTimesByDate)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([date, times]) => (
                        <DateBlock key={date}>
                          <DateLabel className="h5-bold">{date}</DateLabel>
                          <TimeRow>
                            {times.map((t) => (
                              <span key={`${date}-${t}`} style={{ display: "inline-block" }}>
                                <TimeSelected time={t} />
                              </span>
                            ))}
                          </TimeRow>
                        </DateBlock>
                      ))}
                  </DateList>
                ) : (
                  <NoneText className="footnote-regular">선택된 시간이 없습니다.</NoneText>
                )}
              </CardInner>
            </Card>
          </Section>

          {/* 3. 자기소개서 */}
          <Section>
            <SectionTitle className="h4-bold">3. 자기소개서</SectionTitle>

            <Card>
              <CardInner>
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
                      <Input variant="form" multiline value={essays?.q1 ?? ""} onChange={() => {}} />
                    </InputForceTextarea>
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
                      <Input variant="form" multiline value={essays?.q2 ?? ""} onChange={() => {}} />
                    </InputForceTextarea>
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
                      <Input variant="form" multiline value={essays?.q3 ?? ""} onChange={() => {}} />
                    </InputForceTextarea>
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
                      <Input variant="form" multiline value={essays?.q4 ?? ""} onChange={() => {}} />
                    </InputForceTextarea>
                  </InputWrap>
                </EssayItem>

                <EssayItem5>
                  <QTitleRow>
                    <QTitle className="h5-bold">
                      5. 다룰 수 있는 프로그램과 언어, 활용 능력을 간단히 작성해주세요. (선택)
                    </QTitle>
                  </QTitleRow>

                  <LongDesc className="footnote-regular">
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
                  </LongDesc>

                  <InputWrap>
                    <InputForceSingle>
                      <Input variant="form" value={essays?.q5 ?? ""} onChange={() => {}} />
                    </InputForceSingle>
                  </InputWrap>
                </EssayItem5>
              </CardInner>
            </Card>
          </Section>

          {/* 4. 기타 */}
          <Section>
            <SectionTitle className="h4-bold">4. 기타</SectionTitle>

            <Card>
              <CardInner>
                <EtcGroup>
                  <EtcItem>
                    <EtcTop>
                      <EtcText>
                        <EtcTitle className="h5-bold">1. 선수강 강의 이수 내역</EtcTitle>
                        <EtcDesc className="footnote-regular">
                          파일은 최대 3개까지 업로드할 수 있으며, 파일당 20MB 이내로 업로드해 주세요.
                        </EtcDesc>
                      </EtcText>
                    </EtcTop>

                    {precourseLinks.length > 0 ? (
                      <FileList>
                        {precourseLinks.map((link, idx) => (
                          <FileRow key={`pre-${idx}`}>
                            <FileName className="body-regular">
                              {pickNameFromUrl(link) || `파일 ${idx + 1}`}
                            </FileName>
                            <FileLink href={link} target="_blank" rel="noreferrer">
                              열기
                            </FileLink>
                          </FileRow>
                        ))}
                      </FileList>
                    ) : (
                      <NoneText className="footnote-regular">제출된 파일이 없습니다.</NoneText>
                    )}
                  </EtcItem>

                  <EtcItem>
                    <EtcTop>
                      <EtcText>
                        <EtcTitle className="h5-bold">2. 포트폴리오</EtcTitle>
                        <EtcDesc className="footnote-regular">
                          파일은 최대 3개까지 업로드할 수 있으며, 파일당 100MB 이내로 업로드해 주세요.
                          {"\n"}* 필수는 아니지만, 기획/디자인 파트를 선택하신 분들은 포트폴리오를 제출하시는 것을 권장합니다.
                        </EtcDesc>
                      </EtcText>
                    </EtcTop>

                    {portfolioLinks.length > 0 ? (
                      <FileList>
                        {portfolioLinks.map((link, idx) => (
                          <FileRow key={`port-${idx}`}>
                            <FileName className="body-regular">
                              {pickNameFromUrl(link) || `파일 ${idx + 1}`}
                            </FileName>
                            <FileLink href={link} target="_blank" rel="noreferrer">
                              열기
                            </FileLink>
                          </FileRow>
                        ))}
                      </FileList>
                    ) : (
                      <NoneText className="footnote-regular">제출된 파일이 없습니다.</NoneText>
                    )}
                  </EtcItem>
                </EtcGroup>
              </CardInner>
            </Card>
          </Section>

          <BottomRow $bottomGap={SUBMIT_BOTTOM_GAP}>
            <BottomBtn type="button" onClick={() => navigate("/")}>
              홈으로
            </BottomBtn>
          </BottomRow>
        </Sections>
      </Frame>
    </Page>
  );
}



const Page = styled.div`
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
  gap: 28px;
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

const Section = styled.section`
  display: flex;
  width: 100%;
  max-width: 639px;
  margin: 0 auto;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: center;
`;

const SectionTitle = styled.div`
  color: var(--neutral-20, #2a2a2a);
  align-self: stretch;
`;

const Card = styled.div`
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

const CardInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  flex: 1 0 0;
`;

/* Header */
const HeaderRow = styled.div`
  width: 100%;
  max-width: 639px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-self: center;
  margin-top: 8px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HeaderTitle = styled.div`
  color: var(--neutral-20, #2a2a2a);
  font-family: "Cafe24 PRO Slim";
`;

const HeaderSub = styled.div`
  color: var(--neutral-30, #474747);
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Chip = styled.div`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--neutral-95, #dcdcdc);
  color: var(--neutral-50, #737373);
  background: #fff;
`;

/* Info */
const InfoGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 16px;

  @media (max-width: 799px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItemWide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: span 2;

  @media (max-width: 799px) {
    grid-column: span 1;
  }
`;

const Label = styled.div`
  color: var(--neutral-30, #474747);
  font-weight: 700;
`;

const RadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 4px;
  flex-wrap: wrap;
`;

const RadioLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
`;

const RadioText = styled.div`
  color: var(--neutral-30, #474747);
  font-weight: 400;
`;

/* Interview */
const DateList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DateBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DateLabel = styled.div`
  color: var(--Red-Orange-60, #ff7b2e);
`;

const TimeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

/* Essay */
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

const LongDesc = styled.div`
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

    pointer-events: none !important;
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

    pointer-events: none !important;
  }

  input::placeholder {
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9b9b9b)) !important;
  }
`;

/* Files */
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1 0 0;
`;

const FileLink = styled.a`
  flex: 0 0 auto;
  color: var(--neutral-30, #474747);
  font-weight: 700;
  text-decoration: none;
  padding-left: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const NoneText = styled.div`
  color: var(--neutral-50, #737373);
  padding-left: 4px;
`;

/* Bottom */
const BottomRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ $bottomGap }) => $bottomGap}px;
`;

const BottomBtn = styled.button`
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

  @media (max-width: 799px) {
    width: 100%;
  }
`;

/* Empty */
const EmptyCard = styled.div`
  width: 100%;
  border: 1px solid var(--neutral-95, #dcdcdc);
  border-radius: 16px;
  background: #fff;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EmptyText = styled.div`
  color: var(--neutral-50, #737373);
  white-space: pre-wrap;
`;
