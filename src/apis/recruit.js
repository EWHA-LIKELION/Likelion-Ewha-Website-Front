import api from "./api";

// 모집 일정 조회
export const getRecruitmentSchedule = async (year) => {
  const response = await api.get("/recruitments/recruitment-schedules", {
    params: {
      year,
      only: "recruitment",
    },
  });

  return response.data; // { recruitment_schedule: {...} }
};
