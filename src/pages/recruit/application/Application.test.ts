// 특성 테스트(characterization test): 지원서 제출 데이터 변환 로직의 "현재 동작"을 고정한다.
// 리팩토링 중 이 테스트의 기대값을 고쳐야 한다면 동작이 바뀐 것이므로, 멈추고 원인을 확인할 것.
import { describe, expect, it } from "vitest";
import {
  buildFormData,
  convertTo24Hour,
  formatBirthday,
  formatInterviewTimes,
} from "@/pages/recruit/application/Application";

describe("formatBirthday", () => {
  it("한 자리 월·일을 0으로 채워 YYYY-MM-DD로 만든다", () => {
    expect(formatBirthday("2003", "3", "7")).toBe("2003-03-07");
  });

  it("숫자 입력도 같은 결과를 낸다", () => {
    expect(formatBirthday(2003, 3, 7)).toBe("2003-03-07");
  });

  it("두 자리 월·일은 그대로 둔다", () => {
    expect(formatBirthday("2003", "12", "25")).toBe("2003-12-25");
  });

  it.each([
    ["연도", "", "3", "7"],
    ["월", "2003", "", "7"],
    ["일", "2003", "3", ""],
  ])("%s 값이 비면 null", (_, year, month, day) => {
    expect(formatBirthday(year, month, day)).toBeNull();
  });
});

describe("convertTo24Hour", () => {
  it.each([
    ["12:00", false, "00:00"],
    ["12:30", false, "00:30"],
    ["9:00", false, "09:00"],
    ["11:30", false, "11:30"],
  ])("오전 %s → %s", (time, isPM, expected) => {
    expect(convertTo24Hour(time, isPM)).toBe(expected);
  });

  it.each([
    ["12:00", true, "12:00"],
    ["12:30", true, "12:30"],
    ["1:00", true, "13:00"],
    ["5:30", true, "17:30"],
    ["9:00", true, "21:00"],
    ["9:30", true, "21:30"],
  ])("오후 %s → %s", (time, isPM, expected) => {
    expect(convertTo24Hour(time, isPM)).toBe(expected);
  });

  it("분이 없으면 00분으로 처리한다", () => {
    expect(convertTo24Hour("9", false)).toBe("09:00");
  });
});

describe("formatInterviewTimes", () => {
  const interviewDates = [
    { date: "2026-03-06", label: "3월 6일" },
    { date: "2026-03-07", label: "3월 7일" },
    { date: "2026-03-08", label: "3월 8일" },
  ];

  it("am_/pm_ 접두사로 오전·오후를 구분해 +09:00 ISO 문자열로 만든다", () => {
    expect(
      formatInterviewTimes(
        { "2026-03-06": ["am_9:00", "pm_9:00", "am_12:30", "pm_12:30"] },
        interviewDates,
      ),
    ).toEqual([
      "2026-03-06T09:00:00+09:00",
      "2026-03-06T21:00:00+09:00",
      "2026-03-06T00:30:00+09:00",
      "2026-03-06T12:30:00+09:00",
    ]);
  });

  it("날짜는 interviewDates 순서, 같은 날짜 안에서는 선택한 순서를 따른다", () => {
    expect(
      formatInterviewTimes(
        {
          "2026-03-07": ["pm_1:00", "am_9:00"],
          "2026-03-06": ["pm_9:00", "am_12:30"],
        },
        interviewDates,
      ),
    ).toEqual([
      "2026-03-06T21:00:00+09:00",
      "2026-03-06T00:30:00+09:00",
      "2026-03-07T13:00:00+09:00",
      "2026-03-07T09:00:00+09:00",
    ]);
  });

  it("interviewDates에 없는 날짜의 선택은 무시한다", () => {
    expect(
      formatInterviewTimes({ "2026-03-09": ["am_9:00"] }, interviewDates),
    ).toEqual([]);
  });

  it("선택이 없으면 빈 배열", () => {
    expect(formatInterviewTimes({}, interviewDates)).toEqual([]);
  });
});

describe("buildFormData", () => {
  const file = (name: string) => new File(["x"], name);

  const baseInput = {
    name: "  김멋사 ",
    phoneNumber: " 010-1234-5678 ",
    birthYear: "2003",
    birthMonth: "3",
    birthDay: "7",
    department: " 컴퓨터공학과 ",
    studentNumber: " 2312345 ",
    grade: " 3 ",
    interviewMethod: "OFFLINE",
    part: "FRONTEND",
    interviewAvailableTimes: { "2026-03-06": ["am_9:00", "pm_1:30"] },
    interviewDates: [{ date: "2026-03-06", label: "3월 6일" }],
    q1: " 답변1 ",
    q2: "답변2",
    q3: "답변3",
    q4: "답변4",
    q5: "",
    precourseFiles: [] as File[],
    portfolioFiles: [] as File[],
  };

  const entriesOf = (fd: FormData) =>
    [...fd.entries()].map(([key, value]) => [
      key,
      typeof value === "string" ? value : `File:${value.name}`,
    ]);

  it("필드명·순서·trim 처리를 고정한다", () => {
    expect(entriesOf(buildFormData(baseInput))).toEqual([
      ["name", "김멋사"],
      ["phone_number", "010-1234-5678"],
      ["birthday", "2003-03-07"],
      ["department", "컴퓨터공학과"],
      ["student_number", "2312345"],
      ["grade", "3"],
      ["interview_method", "OFFLINE"],
      ["part", "FRONTEND"],
      ["interview_available_times", "2026-03-06T09:00:00+09:00"],
      ["interview_available_times", "2026-03-06T13:30:00+09:00"],
      ["personal_statement_1", "답변1"],
      ["personal_statement_2", "답변2"],
      ["personal_statement_3", "답변3"],
      ["personal_statement_4", "답변4"],
    ]);
  });

  it("interview_method, part는 trim하지 않는다", () => {
    const fd = buildFormData({
      ...baseInput,
      interviewMethod: " OFFLINE ",
      part: " FRONTEND ",
    });
    expect(fd.get("interview_method")).toBe(" OFFLINE ");
    expect(fd.get("part")).toBe(" FRONTEND ");
  });

  it("생년월일이 비면 birthday는 빈 문자열", () => {
    const fd = buildFormData({ ...baseInput, birthDay: "" });
    expect(fd.get("birthday")).toBe("");
  });

  it("5번 문항이 비거나 공백뿐이면 personal_statement_5를 보내지 않는다", () => {
    expect(
      buildFormData({ ...baseInput, q5: "" }).has("personal_statement_5"),
    ).toBe(false);
    expect(
      buildFormData({ ...baseInput, q5: "   " }).has("personal_statement_5"),
    ).toBe(false);
  });

  it("5번 문항이 있으면 trim해서 보낸다", () => {
    const fd = buildFormData({ ...baseInput, q5: " 답변5 " });
    expect(fd.get("personal_statement_5")).toBe("답변5");
  });

  it("파일은 같은 키로 여러 개 append하고, 텍스트 필드 뒤에 붙는다", () => {
    const precourse = [file("p1.pdf"), file("p2.pdf")];
    const portfolio = [file("a.pdf"), file("b.pdf"), file("c.pdf")];
    const fd = buildFormData({
      ...baseInput,
      q5: "답변5",
      precourseFiles: precourse,
      portfolioFiles: portfolio,
    });

    expect(fd.getAll("completed_prerequisites")).toEqual(precourse);
    expect(fd.getAll("portfolios")).toEqual(portfolio);
    expect(entriesOf(fd).slice(-6)).toEqual([
      ["personal_statement_5", "답변5"],
      ["completed_prerequisites", "File:p1.pdf"],
      ["completed_prerequisites", "File:p2.pdf"],
      ["portfolios", "File:a.pdf"],
      ["portfolios", "File:b.pdf"],
      ["portfolios", "File:c.pdf"],
    ]);
  });

  it("면접 시간·파일이 없으면 해당 키를 보내지 않는다", () => {
    const fd = buildFormData({ ...baseInput, interviewAvailableTimes: {} });
    expect(fd.has("interview_available_times")).toBe(false);
    expect(fd.has("completed_prerequisites")).toBe(false);
    expect(fd.has("portfolios")).toBe(false);
  });
});
