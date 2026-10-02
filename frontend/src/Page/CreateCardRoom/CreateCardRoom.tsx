"use client";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoCardRoom from "../CreateCardRoom/InfoCardRoom";
import AmenitiesRoom from "../CreateCardRoom/AmenitiesRoom";
import InfoRoom from "../CreateCardRoom/InfoRoom";
import AddressMap from "../CreateCardRoom/AddressMap";
import PictureRoom from "../CreateCardRoom/PictureRoom";
import { createRoom, getRoomDetail, updateRoom } from "../../services";
import type {
  InfoCardRoomRef,
  AmenitiesRoomRef,
  InfoRoomRef,
  AddressMapRef,
  PictureRoomRef,
} from "../../types/ref";

export default function CreateCardRoom() {
  const roomInfoCardRef = useRef<InfoCardRoomRef>(null);
  const amenitiesroomdRef = useRef<AmenitiesRoomRef>(null);
  const inforoomRef = useRef<InfoRoomRef>(null);
  const addressMapRef = useRef<AddressMapRef>(null);
  const pictureRoomRef = useRef<PictureRoomRef>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  // const id: string | undefined = location.state?.id;
  const navigate = useNavigate();

  const [id] = useState<string | undefined>(location.state?.id);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    if (id) {
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [id, navigate, location.pathname]);
  const [room, setRoom] = useState<any>(undefined);

  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        const data = await getRoomDetail(id);
        console.log("ID EDIT:", id);
        console.log("DATA ROOM API:", data);
        setRoom(data);
      } catch (error) {
        console.error("Không thể lấy thông tin phòng:", error);
      }
    };

    fetchRoom();
  }, [id]);

  const handleGetAddressData = async () => {
    try {
      const infoCardData = roomInfoCardRef.current?.getData();
      const amenities = amenitiesroomdRef.current?.getData();
      const roomInfo = inforoomRef.current?.getData();
      const addressData = addressMapRef.current?.getData();
      const pictureData = pictureRoomRef.current?.getData();

      // Kiểm tra dữ liệu bắt buộc
      if (!infoCardData) {
        setErrorMessage("Vui lòng nhập đầy đủ thông tin đăng.");
        return;
      }

      if (!infoCardData.title?.trim()) {
        setErrorMessage("Vui lòng nhập tiêu đề.");
        return;
      }
      if (!infoCardData.description?.trim()) {
        setErrorMessage("Vui lòng nhập mô tả phòng.");
        return;
      }

      if (!infoCardData.area || infoCardData.area <= 0) {
        setErrorMessage("Vui lòng nhập diện tích.");
        return;
      }

      if (!infoCardData.price || infoCardData.price <= 0) {
        setErrorMessage("Vui lòng nhập giá phòng.");
        return;
      }

      // Kiểm tra tiện ích
      if (!amenities || amenities.length === 0) {
        setErrorMessage("Vui lòng chọn ít nhất một tiện ích.");
        return;
      }

      // Kiểm tra thông tin phòng
      if (!roomInfo) {
        setErrorMessage("Vui lòng nhập đầy đủ thông tin phòng.");
        return;
      }
      if (!roomInfo.electricity?.trim()) {
        setErrorMessage("Vui lòng nhập giá điện.");
        return;
      }

      if (!roomInfo.water?.trim()) {
        setErrorMessage("Vui lòng nhập giá nước.");
        return;
      }

      if (!roomInfo.type?.trim()) {
        setErrorMessage("Vui lòng nhập loại phòng.");
        return;
      }
      if (!roomInfo.furniture?.trim()) {
        setErrorMessage("Vui lòng nhập thông tin nội thất.");
        return;
      }

      if (!roomInfo.people || roomInfo.people <= 0) {
        setErrorMessage("Vui lòng nhập số người.");
        return;
      }

      if (!roomInfo.other?.trim()) {
        setErrorMessage("Vui lòng nhập thông tin khác.");
        return;
      }

      // Kiểm tra địa chỉ
      if (!addressData) {
        setErrorMessage("Vui lòng nhập địa chỉ.");
        return;
      }

      if (!addressData.address?.trim()) {
        setErrorMessage("Vui lòng nhập địa chỉ phòng.");
        return;
      }

      if (!addressData.coordinates) {
        setErrorMessage("Vui lòng chọn vị trí phòng trên bản đồ.");
        return;
      }

      // Kiểm tra hình ảnh

      if (!id && (!pictureData || pictureData.imageFiles.length === 0)) {
        setErrorMessage("Vui lòng chọn ít nhất một hình ảnh phòng.");
        return;
      }
      if (!pictureData) {
        setErrorMessage("Không lấy được dữ liệu hình ảnh.");
        return;
      }

      const formData = new FormData();

      formData.append("title", infoCardData.title ?? "");
      formData.append("price", String(infoCardData.price ?? 0));
      formData.append("area", String(infoCardData.area ?? 0));
      formData.append("description", infoCardData.description ?? "");

      formData.append("address", addressData.address ?? "");

      formData.append(
        "coordinates.latitude",
        String(addressData.coordinates.latitude),
      );

      formData.append(
        "coordinates.longitude",
        String(addressData.coordinates.longitude),
      );

      // Amenities
      amenities.forEach((amenity) => {
        formData.append("amenities", amenity);
      });

      // Room info
      formData.append("roomInfo.type", roomInfo.type ?? "");
      formData.append("roomInfo.people", String(roomInfo.people ?? 0));
      formData.append("roomInfo.furniture", roomInfo.furniture ?? "");
      formData.append("roomInfo.electricity", roomInfo.electricity ?? "");
      formData.append("roomInfo.water", roomInfo.water ?? "");
      formData.append("roomInfo.other", roomInfo.other ?? "");

      // Images
      pictureData.imageFiles.forEach((item) => {
        formData.append("images", item.file);
      });
      pictureData.deletedIndexes.forEach((index) => {
        formData.append("deletedIndexes", String(index));
      });

      console.log("Dữ liệu gửi lên:");

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      let result;

      if (id) {
        formData.append("roomId", id);
        result = await updateRoom(formData);
      } else {
        result = await createRoom(formData);
      }
      if (result) {
        setErrorMessage("");
        if (id) {
          // Chỉnh sửa phòng
          navigate("/mypostroom");
        } else {
          // Thêm phòng mới
          navigate("/");
        }
      }
      console.log("Kết quả:", result);
    } catch (error) {
      console.error("Lỗi đăng tin:", error);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F5F6F7] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1200px]">
        {/* TITLE */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#2D2F33] lg:text-3xl">
            {id ? "Chỉnh sửa tin cho thuê" : "Đăng tin cho thuê"}
          </h1>
          <p className="mt-2 text-sm text-[#73777D]">
            {id
              ? "Cập nhật thông tin phòng cho thuê"
              : "Nhập thông tin để đăng tin cho thuê phòng"}
          </p>
        </div>
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/*  THÔNG TIN ĐĂNG */}
          <InfoCardRoom
            ref={roomInfoCardRef}
            title={room?.title}
            area={room?.area}
            price={room?.price}
            description={room?.description}
          />
          {/* TIỆN ÍCH */}
          <AmenitiesRoom ref={amenitiesroomdRef} amenities={room?.amenities} />
          {/* THÔNG TIN PHÒNG */}
          <InfoRoom ref={inforoomRef} info={room?.roomInfo} />
          {/* THÔNG TIN CHỦ TRỌ / LIÊN HỆ */}
          <PictureRoom ref={pictureRoomRef} picture={room?.images} />
          {/* <LandlordInfo ref={landlordInfoRef} owner={room?.owner} /> */}
          {/* ĐỊA CHỈ */}
          <AddressMap
            ref={addressMapRef}
            address={room?.address}
            coordinates={room?.coordinates}
          />
          <div className="flex h-full flex-col justify-end gap-3 lg:col-start-3">
            {errorMessage && (
              <p className="text-right text-[15px] text-bold font-medium text-red-500">
                {errorMessage}
              </p>
            )}
            <div className="flex flex-col-reverse gap-3  sm:flex-row sm:justify-end">
              <button
                type="button"
                className="h-12 rounded-xl border border-[#D9DDE1] bg-white px-8 text-sm font-bold text-[#2D2F33] transition hover:bg-[#F5F6F7]"
              >
                HỦY
              </button>
              <button
                type="button"
                onClick={handleGetAddressData}
                className="h-12 rounded-xl bg-[#2D2F33] px-8 text-sm font-bold text-white transition hover:bg-[#1A1B1E]"
              >
                {id ? "CHỈNH SỬA" : "ĐĂNG TIN"}
              </button>
            </div>
          </div>
        </div>
        {/* ACTION BUTTONS */}
      </div>
    </main>
  );
}
