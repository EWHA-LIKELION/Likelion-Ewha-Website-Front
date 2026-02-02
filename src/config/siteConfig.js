/**
 * 멋쟁이사자처럼 이화여대 웹사이트 설정
 * 매년 업데이트가 필요한 정보를 중앙에서 관리합니다.
 */

// ============================================
// 기본 정보
// ============================================
export const DISPLAY_YEAR = 2026; // 표시할 기준 연도 (매년 수정 필요)
export const CURRENT_GENERATION = DISPLAY_YEAR - 2012; // 현재 모집 기수 자동 계산 (2025년 = 13기)
export const PREVIOUS_GENERATION = CURRENT_GENERATION - 1; // 이전 기수
export const NEXT_GENERATION = CURRENT_GENERATION + 1; // 다음 기수

// ============================================
// 멋쟁이사자처럼 대학 (전국 연합)
// ============================================
export const OPERATING_YEARS = DISPLAY_YEAR - 2012; // 운영 년수 자동 계산 (2013년 시작)

// ============================================
// 멋쟁이사자처럼 이화여대
// ============================================
export const EWHA_OPERATING_YEARS = DISPLAY_YEAR - 2015; // 이대 멋사 운영 년수 자동 계산 (2016년 시작)

// 이대 멋사 통계 정보
export const STATS = {
  totalProjects: 50, // 프로젝트 수
  totalGraduates: 120, // 누적 수료 인원
  recentCompetitionRate: "8.31", // 최근 경쟁률
};

// ============================================
// FAQ에서 사용하는 정보
// ============================================
export const FAQ_INFO = {
  totalUniv: 81, // 올해 멋사 참여 대학 수
  totalMembers: 18, // 직전 기수 총 인원
  nonMajorMembers: 8, // 직전 기수 비전공자 수
};

// ============================================
// 모집 일정 Fallback 데이터
// ============================================
// Default 상태(백엔드 서버 꺼놓음)시 표시할 기본 모집 일정
// ⚠️ 매년 업데이트 필요
export const FALLBACK_SCHEDULE = {
  year: 2026,
  generation: 14,
  application_start: "2026-02-09T00:00:00+09:00",
  application_end: "2026-02-19T23:59:59+09:00",
  first_result_start: "2026-02-22T17:00:00+09:00",
  first_result_end: "2026-02-28T16:59:59+09:00",
  interview_start: "2026-02-24",
  interview_end: "2026-02-26",
  final_result_start: "2026-02-28T17:00:00+09:00",
  final_result_end: "2026-03-03T18:30:00+09:00",
};
