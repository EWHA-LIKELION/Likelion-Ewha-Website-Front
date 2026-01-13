// 공통 axios 인스턴스
export { default as api } from "./api";
// API 모듈
export * as RecruitAPI from "./recruit";
// 도메인 모듈 export
export * as ApplicationsAPI from "./applications/application";

//사용하는 쪽에서 import { SummariesAPI } from "@/apis"; 이렇게 불러와서 사용