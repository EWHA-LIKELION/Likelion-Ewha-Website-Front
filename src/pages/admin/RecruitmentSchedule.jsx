import { useRef, useState } from "react";
import styled from "styled-components";
import { asset } from "@/assets";
import Dropdown from "@/components/dropdown/Dropdown";
import SegmentBar from "@/components/SegmentBar";
import AdminButton from "@/components/buttons/AdminButtons";
import AdminInput from "@/components/input/AdminInput";

/* TODO: mock 데이터. API 연동 시 서버가 내려주는 년도 목록으로 교체 */
const YEARS = ["2026", "2025", "2024"];

/* 년도 드롭다운은 조회용이라 form 밖에 있다.
   폼 밖의 버튼이 이 폼을 제출하도록 form 속성으로 연결한다. */
const FORM_ID = "recruitment-schedule-form";

/* 날짜 / 시각 인풋 한 세트 */
const DateTime = ({ readOnly }) => (
  <>
    <AdminInput variant="date" readOnly={readOnly} />
    <AdminInput variant="timeWithSeconds" readOnly={readOnly} />
  </>
);

/* 제목 + "시작 ~ 종료" 한 줄 */
const PeriodSection = ({ title, readOnly }) => (
  <Section>
    <h4 className="h4-bold">{title}</h4>
    <Row>
      <DateTime readOnly={readOnly} />
      <span className="h5-bold">~</span>
      <DateTime readOnly={readOnly} />
    </Row>
  </Section>
);

/* 하루 안에서 시간대만 범위로 받는 한 줄 (날짜 / 시각~시각) */
const DateWithTimeRange = ({ readOnly }) => (
  <Row>
    <AdminInput variant="date" readOnly={readOnly} />
    <TimeRange>
      <AdminInput variant="time" readOnly={readOnly} />
      <span className="h5-bold">~</span>
      <AdminInput variant="time" readOnly={readOnly} />
    </TimeRange>
  </Row>
);

/* 면접 일정 한 줄 */
const Interview = ({ readOnly, onCopy, onDelete }) => (
  <InterviewRow>
    <DateWithTimeRange readOnly={readOnly} />
    <SegmentBar
      items={["대면", "비대면"]}
      size="s"
      tone="dark"
      readOnly={readOnly}
    />
    <AdminInput variant="text" readOnly={readOnly} />
    {readOnly ? (
      <IconButton type="button" aria-label="복사" onClick={onCopy}>
        <img src={asset("/icons/copy.svg")} alt="" />
      </IconButton>
    ) : (
      <IconButton type="button" aria-label="삭제" onClick={onDelete}>
        <img src={asset("/icons/trash.svg")} alt="" />
      </IconButton>
    )}
  </InterviewRow>
);

const RecruitmentSchedule = () => {
  // TODO: year가 바뀌면 해당 년도 모집 일정을 조회해서 채운다
  const [year, setYear] = useState(YEARS[0]);

  const [isEditing, setIsEditing] = useState(true);

  const [interviews, setInterviews] = useState([{ id: 1 }]);
  const nextId = useRef(2);

  const addInterview = () =>
    setInterviews((prev) => [...prev, { id: nextId.current++ }]);

  const removeInterview = (id) =>
    setInterviews((prev) => prev.filter((interview) => interview.id !== id));

  const copyInterviewLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      // TODO: 복사 완료 토스트 추가
    } catch (error) {
      console.error("면접 링크 복사 실패:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 저장 API 호출. 각 인풋에 name을 붙여야 FormData로 값을 읽을 수 있다.
    setIsEditing(false);
  };

  return (
    <Wrapper>
      <h2 className="point-kor-h2">모집 일정 관리</h2>
      <Select>
        <Dropdown options={YEARS} defaultValue={year} onSelect={setYear} />
        {isEditing ? (
          <AdminButton variant="lightgreen" type="submit" form={FORM_ID}>
            수정완료
          </AdminButton>
        ) : (
          <AdminButton type="button" onClick={() => setIsEditing(true)}>
            수정하기
          </AdminButton>
        )}
      </Select>
      <Form id={FORM_ID} onSubmit={handleSubmit}>
        <PeriodSection title="서류 모집 기간" readOnly={!isEditing} />
        <PeriodSection title="1차 합격자 발표 기간" readOnly={!isEditing} />
        <Section className="interview">
          <h4 className="h4-bold">면접 기간</h4>
          <h5 className="h5-regular">03월 06일 ~ 03월 08일</h5>
          <Select className="interview">
            <SegmentBar
              items={["기획·디자인", "프론트엔드", "백엔드"]}
              size="s"
              tone="dark"
            />
            {isEditing && (
              <AdminButton
                type="button"
                variant="outline"
                onClick={addInterview}
              >
                추가하기
              </AdminButton>
            )}
          </Select>
          <InterviewCol>
            {interviews.map((interview) => (
              <Interview
                key={interview.id}
                readOnly={!isEditing}
                onCopy={() => copyInterviewLink(interview.link)}
                onDelete={() => removeInterview(interview.id)}
              />
            ))}
          </InterviewCol>
        </Section>
        <PeriodSection title="최종 합격자 발표 기간" readOnly={!isEditing} />
      </Form>
    </Wrapper>
  );
};

export default RecruitmentSchedule;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

/* 섹션들이 form 안으로 들어가면서 Wrapper가 하던 세로 배치를 이어받는다 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Select = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.interview {
    padding: 0.5rem 0rem 1.75rem 0rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &.interview {
    gap: 0.75rem;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const TimeRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.38rem;
`;

const InterviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

const InterviewCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;

  /* trash.svg는 22px로 그려져 있어 여기서만 28px로 키운다 */
  img {
    width: 1.75rem;
    height: 1.75rem;
    flex-shrink: 0;
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;
