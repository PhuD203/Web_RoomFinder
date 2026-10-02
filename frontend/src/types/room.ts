export type RoomStatus = "pending" | "approved" | "rejected";

export type Room = {
  id: string;
  title: string;
  price: number;
  area: number;
  location: string;
  image: string;
  isFavorite?: boolean | null;
};

export type RoomCart = {
  title?: string;
  area?: number;
  price?: number;
};

export type RoomTitle = {
  id: number;
  title: string;
  price: number;
  area: number;
  location: string;
};

export type Owner = {
  id?: string;
  name?: string;
  avatar?: string;
  phone?: string;
};

export type RoomInfo = {
  type?: string;
  people?: number;
  furniture?: string;
  electricity?: string;
  water?: string;
  other?: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type RoomFilter = {
  location?: string;
  price?: string;
  area?: string;
};

export type CreateRoomRequest = {
  title: string;
  price: number;
  area: number;
  address: string;
  description: string;

  coordinates: {
    latitude: number;
    longitude: number;
  };

  amenities: string[];

  images: string[];

  roomInfo: {
    type: string;
    people: number;
    furniture: string;
    electricity: string;
    water: string;
    other: string;
  };
};
