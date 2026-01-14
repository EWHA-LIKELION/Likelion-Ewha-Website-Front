/**
 * 멋쟁이사자처럼 이화여대 웹사이트 설정
 * 매년 업데이트가 필요한 정보를 중앙에서 관리합니다.
 */

// ============================================
// 기본 정보
// ============================================
export const DISPLAY_YEAR = 2025; // 표시할 기준 연도 (매년 수정 필요)
export const CURRENT_GENERATION = DISPLAY_YEAR - 2012; // 현재 모집 기수 자동 계산 (2025년 = 13기)

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
// 직전 기수 정보 (FAQ 등에서 사용)
// ============================================
export const PREV_GENERATION_INFO = {
  totalMembers: 17, // 직전 기수 총 인원
  nonMajorMembers: 11, // 직전 기수 비전공자 수
  pmDesignMembers: 6, // 직전 기수 기획디자인 파트 인원
  frontendMembers: 5, // 직전 기수 프론트엔드 파트 인원
  backendMembers: 6, // 직전 기수 백엔드 파트 인원
};

export const CLUB_REGISTRATION_YEAR = 2024; // 단대동아리 등록 기준 연도
