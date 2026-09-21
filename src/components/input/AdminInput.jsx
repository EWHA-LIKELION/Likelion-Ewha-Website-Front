import styled from "styled-components";

/* =========================
    Admin Input

    사용 예시)
    <AdminInput variant="date" min="2026-01-01" max="2026-12-31" />
    <AdminInput variant="time" readOnly />
    <AdminInput variant="text" />
========================= */

const VARIANTS = {
  /* 날짜 — min/max로 선택 가능한 범위를 제한한다 */
  date: { type: "date", width: "9rem" },
  /* 시간 (시, 분) */
  time: { type: "time", width: "8rem" },
  /* 시간 (시, 분, 초) */
  timeWithSeconds: { type: "time", step: 1, width: "10rem" },
  /* 텍스트 */
  text: {
    placeholder: "대면 면접 장소 또는 비대면 면접 링크 입력",
    width: "20rem",
    align: "left",
  },
};

const AdminInput = ({ variant = "date", onClick, ...props }) => {
  const { type, step, placeholder, label, width, align } = VARIANTS[variant];

  // 달력·시계 아이콘을 숨겨서 피커를 여는 기본 통로가 없다.
  // 인풋 아무 곳이나 눌러도 열리도록 직접 띄우되, 조회 모드에선 열지 않는다.
  // type이 없는 text variant는 대상이 아니다.
  const handleClick = (e) => {
    if (type && !props.readOnly) e.target.showPicker?.();
    onClick?.(e);
  };

  return (
    <Field>
      <Input
        className="h5-regular"
        type={type}
        step={step}
        required
        placeholder={placeholder}
        $width={width}
        $align={align}
        onClick={handleClick}
        {...props}
      />
      {label && <Label className="h5-bold">{label}</Label>}
    </Field>
  );
};

export default AdminInput;

/* =========================
    styled-components
========================= */

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const Label = styled.span`
  color: var(--neutral-20);
`;

const Input = styled.input`
  field-sizing: content;
  width: ${({ $width }) => $width ?? "auto"};

  padding: 0.63rem 1.25rem;
  text-align: ${({ $align }) => $align ?? "center"};

  border: none;
  border-radius: 3.125rem;
  background: var(--cool-neutral-98);

  color: var(--neutral-20);

  &::placeholder {
    color: var(--neutral-70);
  }

  /* date·time은 placeholder가 없다. 값이 비면 :invalid가 되는 걸 이용해
     yyyy-mm-dd / --:-- 를 placeholder와 같은 색으로 맞춘다. */
  &:invalid {
    color: var(--neutral-70);
  }

  /* date·time의 달력·시계 아이콘 제거 */
  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  /* 포커스 시 기본 아웃라인 제거 */
  &:focus,
  &:focus-visible {
    outline: none;
  }

  /* 읽기 전용: 클릭·포커스 불가 */
  &:read-only {
    background: var(--static-white);
    border: 1px solid var(--neutral-95);
    cursor: default;
  }

  /* 비활성: 기본 스타일 그대로 두고 흐리게만 (:read-only보다 뒤에 와야 이김) */
  &:disabled {
    background: var(--cool-neutral-98);
    border: none;
    opacity: 0.2;
    cursor: not-allowed;
  }
`;
