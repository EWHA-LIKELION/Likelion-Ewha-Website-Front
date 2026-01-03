// example
//export * as SummariesAPI from "./summaries/snapshot";

//사용하는 쪽에서 import { SummariesAPI } from "@/apis"; 이렇게 불러와서 사용

// 공통 axios 인스턴스
export { default as api } from "./api";

// 도메인 모듈 export (사용처: import { ApplicationsAPI } from "@/apis";)
export * as ApplicationsAPI from "./applications/application";
