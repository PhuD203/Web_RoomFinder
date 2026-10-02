import api from "./api";

export const getMyPostRooms = async () => {
  const response = await api.get(`/mypostroom`);
  return response.data;
};

export const deleteMyPostRoom = async (roomId: string): Promise<boolean> => {
  const response = await api.post<boolean>(
    `/mypostroom/delete?roomId=${roomId}`,
  );

  return response.data;
};
