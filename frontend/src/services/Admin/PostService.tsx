import api from "../api";
import type { PostContent } from "../../types";

export const getPostRoom_Admin = async (
  status: "pending" | "approved" | "rejected",
): Promise<PostContent[]> => {
  const response = await api.get("/admin/getPost", {
    params: {
      status,
    },
  });

  return response.data;
};

export const changeStatusPost_Admin = async (
  roomId: string,
  status: "pending" | "approved" | "rejected",
) => {
  const response = await api.put(`/rooms/changestatus/${roomId}`, null, {
    params: {
      status,
    },
  });

  return response.data;
};
