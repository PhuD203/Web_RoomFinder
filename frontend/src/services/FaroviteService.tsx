import api from "./api";
import type { Room } from "../types";

export const isFavoritecheck = async (roomId: string): Promise<boolean> => {
  const response = await api.post<boolean>("/favorites/isFavorites", {
    roomId,
  });

  return response.data;
};

export const addFavorite = async (roomId: string): Promise<boolean> => {
  const response = await api.post<boolean>("/favorites/addFavorites", {
    roomId,
  });

  return response.data;
};

export const deleteFavorite = async (roomId: string): Promise<boolean> => {
  const response = await api.post<boolean>("/favorites/deleteFavorites", {
    roomId,
  });

  return response.data;
};

export const getListFavorite = async (): Promise<string[]> => {
  const response = await api.post<string[]>("/favorites/listFavoriteRoom");
  return response.data;
};

export const getFavoritesRooms = async (): Promise<Room[]> => {
  const response = await api.post<Room[]>("/favoritesroom");

  return response.data;
};
