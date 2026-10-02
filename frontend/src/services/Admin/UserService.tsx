import api from "../api";
import type { UserContent } from "../../types";

export const getListUser_Admin = async (): Promise<UserContent[]> => {
  const response = await api.get("/admin/getUser");
  return response.data;
};

export const changeStatusUser_Admin = async (
  userID: string,
  status: string,
) => {
  const response = await api.put(`/admin/change_status/${userID}`, null, {
    params: {
      status,
    },
  });

  return response.data;
};
