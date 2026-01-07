import { api } from "@/apis";

export const createApplication = async (formData) => {
  const response = await api.post("/recruitments/application/", formData, {
    headers: { "Content-Type": undefined },
  });
  return response.data;
};

export const getMyApplication = async (application_code) => {
  const response = await api.post("/recruitments/application/my/", {
    application_code,
  });
  return response.data;
};
