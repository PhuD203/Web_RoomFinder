import api from "../api";
import type { ReportContent, UserContent } from "../../types";

export const getListReport_Admin = async (): Promise<ReportContent[]> => {
  const response = await api.get("/admin/getReport");
  return response.data;
};

export const getUserReport_Admin = async (id: string): Promise<UserContent> => {
  const response = await api.get("/admin/getUserReport", {
    params: { id },
  });

  return response.data;
};

export const updateReport_Admin = async (id: string): Promise<string> => {
  const response = await api.put(`/admin/updateReport/${id}`);

  return response.data;
};
