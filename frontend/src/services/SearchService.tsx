import api from "./api";
import type { RoomFilter } from "../types";

export const getSearchRoomsResult = async (filter: RoomFilter) => {
  const response = await api.get("/search", {
    params: {
      location: filter.location,
      price: filter.price,
      area: filter.area,
    },
  });

  return response.data;
};
