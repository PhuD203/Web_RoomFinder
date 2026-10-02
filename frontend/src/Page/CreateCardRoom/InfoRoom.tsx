import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import type { InfoRoomRef } from "../../types/ref";
import type { InfoRoomProps, RoomInfo } from "../../types";

const InfoRoom = forwardRef<InfoRoomRef, InfoRoomProps>(({ info }, ref) => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo>(info ?? {});
  useEffect(() => {
    setRoomInfo(info ?? {});
  }, [info]);
  useImperativeHandle(ref, () => ({
    getData: () => roomInfo,
  }));
  return (
    <section className="rounded-2xl border border-[#E7E9EC] bg-white p-5 lg:col-span-2">
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-extrabold text-[#2D2F33]">
            Thông tin phòng
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* GIÁ ĐIỆN */}
        <div>
          <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
            Giá điện
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="VD: 3500"
              value={roomInfo.electricity ?? ""}
              onChange={(e) =>
                setRoomInfo((prev) => ({
                  ...prev,
                  electricity: e.target.value,
                }))
              }
              className="h-12 w-full rounded-xl border border-[#D9DDE1] px-4 pr-24 text-sm outline-none focus:border-[#2D2F33]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#73777D]">
              VNĐ/kWh
            </span>
          </div>
        </div>
        {/* GIÁ NƯỚC */}
        <div>
          <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
            Giá nước
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="VD: 15000"
              value={roomInfo.water ?? ""}
              onChange={(e) =>
                setRoomInfo((prev) => ({
                  ...prev,
                  water: e.target.value,
                }))
              }
              className="h-12 w-full rounded-xl border border-[#D9DDE1] px-4 pr-20 text-sm outline-none focus:border-[#2D2F33]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#73777D]">
              VNĐ/m³
            </span>
          </div>
        </div>
        {/* LOẠI PHÒNG */}
        <div>
          <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
            Loại phòng
          </label>
          <input
            type="text"
            min="1"
            value={roomInfo.type ?? ""}
            onChange={(e) =>
              setRoomInfo((prev) => ({
                ...prev,
                type: e.target.value,
              }))
            }
            placeholder="VD: Phòng đơn"
            className="h-12 w-full rounded-xl border border-[#D9DDE1] px-4 text-sm outline-none focus:border-[#2D2F33]"
          />
        </div>
        {/* NỘI THẤT */}
        <div>
          <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
            Nội thất
          </label>
          <input
            type="text"
            min="1"
            value={roomInfo.furniture ?? ""}
            onChange={(e) =>
              setRoomInfo((prev) => ({
                ...prev,
                furniture: e.target.value,
              }))
            }
            placeholder="VD: Nội thất đầy đủ"
            className="h-12 w-full rounded-xl border border-[#D9DDE1] px-4 text-sm outline-none focus:border-[#2D2F33]"
          />
        </div>
        {/* SỐ NGƯỜI */}
        <div>
          <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
            Số người
          </label>
          <input
            type="number"
            min="1"
            value={roomInfo.people ?? ""}
            onChange={(e) =>
              setRoomInfo((prev) => ({
                ...prev,
                people: Number(e.target.value),
              }))
            }
            placeholder="VD: 2"
            className="h-12 w-full rounded-xl border border-[#D9DDE1] px-4 text-sm outline-none focus:border-[#2D2F33]"
          />
        </div>
        {/* THÔNG TIN KHÁC */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
            Thông tin khác
          </label>
          <textarea
            rows={4}
            placeholder="Nhập thêm thông tin về phòng..."
            value={roomInfo.other ?? ""}
            onChange={(e) =>
              setRoomInfo((prev) => ({
                ...prev,
                other: e.target.value,
              }))
            }
            className="w-full resize-none rounded-xl border border-[#D9DDE1] px-4 py-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#A0A4AA] focus:border-[#2D2F33]"
          />
        </div>
      </div>
    </section>
  );
});

export default InfoRoom;
