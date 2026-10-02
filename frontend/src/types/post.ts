import type { Owner, RoomInfo, RoomStatus } from "./room";

export type PostContent = {
  id: string;
  imageUrl: string;
  title: string;
  ownerName: string;
  price: string;
  address: string;
  createdAt: string;
};

export type PostContentProps = {
  post: PostContent[];
};

export type PostRoomProps = {
  id: string;
  image: string;
  title: string;
  status: RoomStatus;
  price: number;
  area?: number;
};

export type PostedRoomsPageProps = {
  data?: PostRoomProps[];
};

export type PostDetailContent = {
  id: string;
  title: string;
  price: number;
  area: number;
  address: string;
  description: string;
  images: string[];
  amenities: string[];
  owner: Owner;
  roomInfo: RoomInfo;
};

export type PostDetailModalProps = {
  post: PostDetailContent;
  onClose: () => void;
  mode: "manage" | "report";
  type?: RoomStatus;
  onApprove?: (post: PostDetailContent) => void;
  onReject?: (post: PostDetailContent) => void;
  onDelete?: (post: PostDetailContent) => void;
};
