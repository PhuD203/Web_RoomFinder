import type { RoomCartTitle } from "../../types";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import type { InfoCardRoomRef } from "../../types/ref";

const InfoCardRoom = forwardRef<InfoCardRoomRef, RoomCartTitle>(
  ({ title, area, price, description }, ref) => {
    const [formData, setFormData] = useState<RoomCartTitle>({
      title,
      area,
      price,
      description,
    });
    useEffect(() => {
      setFormData({
        title,
        area,
        price,
        description,
      });
    }, [title, area, price, description]);
    useImperativeHandle(ref, () => ({
      getData: () => formData,
    }));

    return (
      <section className="rounded-2xl border border-[#E7E9EC] bg-white p-5 lg:col-span-2">
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-extrabold text-[#2D2F33]">
              Thông tin tin đăng
            </h2>
          </div>
        </div>
        <div className="space-y-5">
          {/* TIÊU ĐỀ */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
              Tiêu đề
            </label>
            <input
              type="text"
              value={formData.title ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="VD: Phòng trọ sinh viên"
              className="h-12 w-full rounded-xl border border-[#D9DDE1] bg-white px-4 text-sm text-[#2D2F33] outline-none transition placeholder:text-[#A0A4AA] focus:border-[#2D2F33]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
              Mô tả
            </label>
            <textarea
              rows={2}
              value={formData.description ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="VD: Phòng trọ đầy đủ nội thất gần trung tâm"
              className="h-18 w-full rounded-xl border border-[#D9DDE1] bg-white px-4 text-sm text-[#2D2F33] outline-none transition placeholder:text-[#A0A4AA] focus:border-[#2D2F33]"
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* DIỆN TÍCH */}
            <div>
              <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
                Diện tích
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.area ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      area: Number(e.target.value),
                    }))
                  }
                  placeholder="VD: 25"
                  className="h-12 w-full rounded-xl border border-[#D9DDE1] bg-white px-4 pr-14 text-sm text-[#2D2F33] outline-none focus:border-[#2D2F33]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#73777D]">
                  m²
                </span>
              </div>
            </div>
            {/* GIÁ Tiền */}
            <div>
              <label className="mb-2 block text-sm font-bold text-[#000000]">
                Giá tiền
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="VD: 2500000"
                  value={formData.price ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                  className="h-12 w-full rounded-xl border border-[#D9DDE1] bg-white px-4 pr-16 text-sm text-[#2D2F33] outline-none focus:border-[#2D2F33]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#000000]">
                  VNĐ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);
export default InfoCardRoom;
