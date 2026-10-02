import api from "./api";
import type { ReportRequestDTO } from "../types";

export const createReport = async (data: ReportRequestDTO) => {
  const response = await api.post("/report", data);
  return response.data;
};
