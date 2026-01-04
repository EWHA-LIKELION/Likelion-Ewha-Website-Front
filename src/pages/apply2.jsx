import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";

import Input from "../components/Input";
import { Modal } from "../components/Modal.jsx";
import { ApplicationsAPI } from "@/apis";

const MAX_CHARS = 500;
const MIN_TEXTAREA_HEIGHT = 266;
const FILE_LIMIT = 3;
const SUBMIT_BOTTOM_GAP = 160;

const isFilled = (v) => v.trim().length > 0;

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

export default function Apply2() {
  const navigate = useNavigate();
  const location = useLocation();
  const base = location.state || {}; // Step에서 넘어온 인적/선택 정보
  const isMobile = useIsMobile(799);

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

  // 제출 성공 후 서버가 내려준 코드
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
  const canSubmit =
    isFilled(q1) &&
    isFilled(q2) &&
    isFilled(q3) &&
    isFilled(q4) &&
    !over1 &&
    !over2 &&
    !over3 &&
    !over4;

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

      formData.append("name", base.name ?? "");
      formData.append("phone_number", base.phone_number ?? "");
      formData.append("birthday", base.birthday ?? "");
      formData.append("department", base.department ?? "");
      formData.append("student_number", base.student_number ?? "");
      formData.append("grade", base.grade ?? "");
      formData.append("interview_method", base.interview_method ?? "");
      formData.append("part", base.part ?? "");

      (base.interview_available_times ?? []).forEach((t) => {
        formData.append("interview_available_times", t);
      });

      formData.append("personal_statement_1", q1.trim());
      formData.append("personal_statement_2", q2.trim());
      formData.append("personal_statement_3", q3.trim());
      formData.append("personal_statement_4", q4.trim());
      formData.append("personal_statement_5", q5.trim());

      // 파일(옵션): 있으면 보내고 없으면 안 보냄
      precourseFiles.forEach((file) => formData.append("completed_prerequisites", file));
      portfolioFiles.forEach((file) => formData.append("portfolios", file));

      // 제출
      const data = await ApplicationsAPI.createApplication(formData);
      const codeFromServer =
        data?.application_code || data?.applicationCode || data?.code || "";

      setApplicationCode(codeFromServer);

      setConfirmOpen(false);
      setResultOpen(true);
    } catch (err) {
      const status = err?.response?.status;

      if (status === 409) {
        setSubmitError("이미 제출한 지원서가 있습니다. (409)");
      } else if (status === 400) {
        setSubmitError("입력값이 올바르지 않습니다. 필수 항목/글자수/선택지를 확인해주세요. (400)");
      } else {
        setSubmitError("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const SubmitBtn = (
    <SubmitButton type="button" disabled={!canSubmit || isSubmitting} onClick={onClickSubmit}>
      {isSubmitting ? "제출 중..." : "제출하기"}
    </SubmitButton>
  );

  return (
    <Page>
      <Frame>
        <TitleBlock>
          <Title className="h4-bold">지원서 작성</Title>
          <Subtitle className="body-regular">파트명</Subtitle>
        </TitleBlock>

        <Sections>
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
                    <QTitle className="h5-bold">5. 다룰 수 있는 프로그램과 언어, 활용 능력을 간단히 작성해주세요. (선택)</QTitle>
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
                      <Input variant="form" placeholder="내용을 작성해주세요." value={q5} onChange={onChange(setQ5)} />
                    </InputForceSingle>
                  </InputWrap>
                </EssayItem5>
              </CardInner>
            </Card>
          </Section>

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
                          파일은 최대 {FILE_LIMIT}개까지 업로드할 수 있으며, 파일당 20MB 이내로 업로드해 주세요.
                        </EtcDesc>
                      </EtcText>

                      <AddFileButton type="button" onClick={() => precourseRef.current?.click()}>
                        파일 추가
                      </AddFileButton>
                      <HiddenFileInput ref={precourseRef} type="file" multiple onChange={onPickFiles(setPrecourseFiles)} />
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
                      <HiddenFileInput ref={portfolioRef} type="file" multiple onChange={onPickFiles(setPortfolioFiles)} />
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
              </CardInner>
            </Card>
          </Section>

          <SubmitRow $bottomGap={SUBMIT_BOTTOM_GAP}>
            <SubmitStack>
              {SubmitBtn}
              {!!submitError && <SubmitError className="footnote-regular">{submitError}</SubmitError>}
            </SubmitStack>
          </SubmitRow>
        </Sections>
      </Frame>

      {/* PC Confirm */}
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

      {/* PC Result */}
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
              onClick: () =>
                navigate("/recruit/apply/preview", {
                  state: { application_code: applicationCode },
                }),
            },
            { label: "홈으로", variant: "primary", closeOnClick: false, onClick: () => navigate("/") },
          ]}
        />
      )}

      {/* MO Confirm */}
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

      {/* MO Result */}
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
                  style={{ opacity: applicationCode ? 1 : 0.4, cursor: applicationCode ? "pointer" : "default" }}
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
                onClick={() => navigate("/recruit/apply/preview", { state: { application_code: applicationCode } })}
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
