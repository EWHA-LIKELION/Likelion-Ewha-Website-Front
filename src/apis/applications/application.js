import api from "../api";

/**
 * 지원서 제출
 * POST /recruitments/application/
 *
 * @param {FormData} formData multipart/form-data (파일 포함)
 * @returns response.data
 */
export const createApplication = async (formData) => {
  const response = await api.post("/recruitments/application/", formData);
  return response.data;
};
