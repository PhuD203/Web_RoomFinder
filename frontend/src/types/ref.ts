import type {
  RoomCartTitle,
  RoomInfo,
  Owner,
  AddressMapProps,
  ImageItem,
  NewImageItem,
} from "../types";

export type InfoCardRoomRef = {
  getData: () => RoomCartTitle;
};

export type AmenitiesRoomRef = {
  getData: () => string[] | undefined;
};

export type InfoRoomRef = {
  getData: () => RoomInfo;
};

export type LandlordInfoRef = {
  getData: () => Owner;
};

export type AddressMapRef = {
  getData: () => AddressMapProps;
};

export type PictureRoomRef = {
  getData: () => {
    images: ImageItem[];
    imageFiles: NewImageItem[];
    deletedIndexes: number[];
  };
};
