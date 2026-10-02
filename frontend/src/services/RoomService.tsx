import api from "./api";
import type { Room } from "../types";

export const getRoomDetail = async (id: string) => {
  const response = await api.get(`/rooms/${id}`);

  return response.data;
};

export const createRoom = async (data: FormData) => {
  const response = await api.post("/rooms/create", data);

  return response.data;
};

export const updateRoom = async (data: FormData) => {
  const response = await api.put("/rooms/update", data);

  return response.data;
};

export const getFeaturedRooms = async (): Promise<Room[]> => {
  const response = await api.get("/featuredrooms", {});
  return response.data;
};
