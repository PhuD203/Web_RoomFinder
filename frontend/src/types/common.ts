import type { Coordinates, Owner, Room, RoomInfo, RoomTitle } from "./room";

export type RoomCardProps = {
  room: Room;
  onFavoriteChange?: (roomId: string) => void;
};

export type RoomTitleProps = {
  room: RoomTitle;
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
};

export type RoomPictureProps = {
  pictures: string[];
  activeImage: number;
  setActiveImage: (index: number) => void;
};

export type ContactCardProps = {
  price: number;
  owner: Owner;
};

export type RoomDescriptionProps = {
  description: string;
  area: number;
  coordinates?: Coordinates | null;
  address: string;
  amenities: string[];
  roomInfo: RoomInfo | null;
};

export type InfoRoomProps = {
  info?: RoomInfo;
};

export type LandlordInfoProps = {
  owner?: Owner;
};

export type AddressMapProps = {
  address?: string;
  coordinates?: Coordinates | null;
};

export type MapLocationProps = {
  latitude: number;
  longitude: number;
  onChange?: (latitude: number, longitude: number) => void;
};

export type RoomCartTitle = {
  title?: string;
  area?: number;
  price?: number;
  description?: string;
};

export type ImageItem = {
  url: string;
  imageIndex: number;
};

export type NewImageItem = {
  file: File;
  imageIndex: number;
  url: string;
};

export type PaginationProps = {
  totalroom: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export type MenuKey = "users" | "pending" | "approved" | "rejected" | "reports";

export type ToastMessageProps = {
  message: string;
  success: boolean;
};
