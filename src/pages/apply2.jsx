import React, { useRef, useState } from "react";
import styled from "styled-components";

import Input from "../components/Input";
import { DisabledSubmitButton } from "../components/buttons/MainButtons_pc.jsx";

/*
   숫자 관리
  - MAX_CHARS: 자기소개서 1~4 글자 제한
  - MIN_TEXTAREA_HEIGHT: textarea 기본 높이(피그마 266px)
  - FILE_LIMIT: 업로드 최대 파일 수
  - SUBMIT_BOTTOM_GAP: BottomBar 위 여백(피그마 160px)
*/
const MAX_CHARS = 500;
const MIN_TEXTAREA_HEIGHT = 266;
const FILE_LIMIT = 3;
const SUBMIT_BOTTOM_GAP = 160;

/*
  제출 활성화 기준
  - 필수(*) 문항 q1~q4: 공백 제외하고 1자 이상
  - 파일: (선수강/포폴) 합쳐서 1개 이상
  - 글자수 초과(over) 없어야 함
*/
const isFilled = (v) => v.trim().length > 0;

export default function Apply2() {
  // 1) 자기소개서 문항 상태
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");

  // 2) 파일 업로드 상태
  // - 3개 제한(FILE_LIMIT)
  // - precourse + portfolio 합쳐서 1개 이상이면 제출 가능 조건에 포함
  const [precourseFiles, setPrecourseFiles] = useState([]);
  const [portfolioFiles, setPortfolioFiles] = useState([]);

  const precourseRef = useRef(null);
  const portfolioRef = useRef(null);

  // 3) 글자수 초과 체크(필수 q1~q4만)
  const over1 = q1.length > MAX_CHARS;
  const over2 = q2.length > MAX_CHARS;
  const over3 = q3.length > MAX_CHARS;
  const over4 = q4.length > MAX_CHARS;

  // 4) textarea 자동 리사이즈
  // - Input 컴포넌트 내부 InputBox(height 고정) 때문에
  //   wrapper(InputForceTextarea)에서 height:auto를 강제로 풀고,
  //   여기서 textarea 자체도 scrollHeight 기반으로 늘림
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

  // 5) 파일 추가/삭제
  // - input[type=file] value 초기화(e.target.value="")로
  //   같은 파일 재선택 가능하게 처리
  const onPickFiles = (bucketSetter) => (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;

    bucketSetter((prev) => [...prev, ...picked].slice(0, FILE_LIMIT));
    e.target.value = "";
  };

  const removeFileAt = (bucketSetter, idx) => {
    bucketSetter((prev) => prev.filter((_, i) => i !== idx));
  };

  // 6) 제출 가능 여부 계산
  // - 필수 문항 모두 입력 + 파일 1개 이상 + 글자수 초과 없음
  const hasAnyFile = precourseFiles.length + portfolioFiles.length >= 1;

  const canSubmit =
    isFilled(q1) &&
    isFilled(q2) &&
    isFilled(q3) &&
    isFilled(q4) &&
    hasAnyFile &&
    !over1 &&
    !over2 &&
    !over3 &&
    !over4;

  const onClickSubmit = () => {
    if (!canSubmit) return;
    console.log("💊 제출 버튼 클릭 (모달/제출 로직 연결 예정)");
  };

  return (
    <Page>
      <Frame>
        <TitleBlock>
          <Title className="h4-bold">지원서 작성</Title>
          <Subtitle className="body-regular">파트명</Subtitle>
        </TitleBlock>

        <Sections>
          {/* 3. 자기소개서
             - 질문 추가 시: 아래 EssayItem 블록 복사해서 작업 가능
             - 필수 여부에 따라 canSubmit 조건에도 반영해주면 됨 */}
          <Section>
            <SectionTitle className="h4-bold">3. 자기소개서</SectionTitle>

            <Card>
              <CardInner>
                {/* Q1 */}
                <EssayItem>
                  <QHead>
                    <QTitleRow>
                      <QTitle className="h5-bold">
                        1. 다양한 IT 동아리 중에서 멋쟁이사자처럼을 선택하여 지원하게 된 이유를
                        작성해주세요.<Req>*</Req>
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

                {/* Q2 */}
                <EssayItem>
                  <QHead>
                    <QTitleRow>
                      <QTitle className="h5-bold">
                        2. 선택한 파트를 희망하는 이유와 관련 경험을 해본 적이 있는지, 그리고 해당
                        파트를 통해 어떤 성장을 희망하시는지 작성해주세요.<Req>*</Req>
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

                {/* Q3 */}
                <EssayItem>
                  <QHead>
                    <QTitleRow>
                      <QTitle className="h5-bold">
                        3. 멋쟁이사자처럼 대학은 협업과 팀워크를 중요시하는 공동체입니다. 지원자 본인이
                        협업과 팀워크를 진행해보았던 경험과, 그 경험을 멋쟁이사자처럼 대학에서 어떻게
                        적용할 수 있을지 작성해주세요.<Req>*</Req>
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

                {/* Q4 */}
                <EssayItem>
                  <QHead>
                    <QTitleRow>
                      <QTitle className="h5-bold">
                        4. 멋쟁이사자처럼 대학은 최소 주 2회 모임 &amp; 10시간 이상의 시간 투자를
                        권장합니다. 활동 기간 동안 매주 어느 정도의 시간을 얼마나 열정적으로 할애할 수
                        있는지 작성해주세요.<Req>*</Req>
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

                {/*Q5*/}
                <EssayItem5>
                  <QTitleRow>
                    <QTitle className="h5-bold">
                      5. 다룰 수 있는 프로그램과 언어, 활용 능력을 간단히 작성해주세요. (선택)
                    </QTitle>
                  </QTitleRow>

                  <LongDesc className="footnote-regular">
                    해당 문항은 지원자 분의 기본적인 역량을 파악하기 위한 것으로, 필수로 작성하지 않아도
                    됩니다.
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
                      <Input
                        variant="form"
                        placeholder="내용을 작성해주세요."
                        value={q5}
                        onChange={onChange(setQ5)}
                      />
                    </InputForceSingle>
                  </InputWrap>
                </EssayItem5>
              </CardInner>
            </Card>
          </Section>

          {/* 4. 기타 (파일 업로드)
             - FileList는 항상 FILE_LIMIT 개의 row를 렌더링해서 레이아웃 고정
             - 파일명은 없으면 placeholder("파일명 파일명") 유지*/}
          <Section>
            <SectionTitle className="h4-bold">4. 기타</SectionTitle>

            <Card>
              <CardInner>
                <EtcGroup>
                  {/* 선수강 */}
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
                        onChange={onPickFiles(setPrecourseFiles)}
                      />
                    </EtcTop>

                    <FileList>
                      {Array.from({ length: FILE_LIMIT }).map((_, idx) => {
                        const f = precourseFiles[idx] ?? null;
                        return (
                          <FileRow key={`pre-${idx}`}>
                            <FileName className="body-regular">{f ? f.name : "파일명 파일명"}</FileName>
                            <TrashButton
                              type="button"
                              disabled={!f}
                              onClick={() => f && removeFileAt(setPrecourseFiles, idx)}
                            >
                              <img src="/icons/trash.svg" alt="" />
                            </TrashButton>
                          </FileRow>
                        );
                      })}
                    </FileList>
                  </EtcItem>

                  {/* 포트폴리오 */}
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
                        onChange={onPickFiles(setPortfolioFiles)}
                      />
                    </EtcTop>

                    <FileList>
                      {Array.from({ length: FILE_LIMIT }).map((_, idx) => {
                        const f = portfolioFiles[idx] ?? null;
                        return (
                          <FileRow key={`port-${idx}`}>
                            <FileName className="body-regular">{f ? f.name : "파일명 파일명"}</FileName>
                            <TrashButton
                              type="button"
                              disabled={!f}
                              onClick={() => f && removeFileAt(setPortfolioFiles, idx)}
                            >
                              <img src="/icons/trash.svg" alt="" />
                            </TrashButton>
                          </FileRow>
                        );
                      })}
                    </FileList>
                  </EtcItem>
                </EtcGroup>
              </CardInner>
            </Card>
          </Section>

          {/*Submit*/}
          <SubmitRow $bottomGap={SUBMIT_BOTTOM_GAP}>
            {canSubmit ? (
              <ActiveSubmitButton type="button" onClick={onClickSubmit}>
                제출하기
              </ActiveSubmitButton>
            ) : (
              <DisabledSubmitButton disabled />
            )}
          </SubmitRow>
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

/*
  textarea 늘리는 wrapper
  - Input 내부 InputBox(height 고정) 해제
  - MIN_TEXTAREA_HEIGHT만 바꾸면 전체 기본 높이 반영
*/
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

  @media (max-width: 799px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
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
  gap: 8px;
  border-radius: 40px;
  background: var(--neutral-30, #474747);
  color: var(--static-white, #fff);
  border: none;
  cursor: pointer;

  font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;

  @media (max-width: 799px) {
    align-self: flex-end;
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

const ActiveSubmitButton = styled.button`
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
