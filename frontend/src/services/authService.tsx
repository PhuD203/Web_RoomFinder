import api from "./api";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);

  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await api.post<string>("/auth/register", data);

  return response.data;
};
