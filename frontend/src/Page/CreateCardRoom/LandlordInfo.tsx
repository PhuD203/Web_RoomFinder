import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type { LandlordInfoRef } from "../../types/ref";
import type { LandlordInfoProps, Owner } from "../../types";
import type { ChangeEvent } from "react";

const LandlordInfo = forwardRef<LandlordInfoRef, LandlordInfoProps>(
  ({ owner }, ref) => {
    const [avatar, setAvatar] = useState<string | null>(owner?.avatar ?? null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [landlordInfo, setLandlordInfo] = useState<Owner>(owner ?? {});
    useImperativeHandle(ref, () => ({
      getData: () => landlordInfo,
    }));
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
      const preview = URL.createObjectURL(file);
      setAvatar(preview);
      e.target.value = "";
    };

    const removeAvatar = () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
      setAvatar(null);
    };
    return (
      <section className="rounded-2xl border border-[#E7E9EC] bg-white p-5">
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-extrabold text-[#2D2F33]">
              Chủ trọ / Liên hệ
            </h2>
          </div>
        </div>
        {/* AVATAR */}
        <div className="mb-5 flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F0F1F2] text-2xl text-[#8A8F96]">
                👤
              </div>
            )}
            {avatar && (
              <button
                type="button"
                onClick={removeAvatar}
                className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#2D2F33] text-xs text-white"
              >
                ×
              </button>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-[#2D2F33]">Avatar</p>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="mt-2 text-sm font-semibold text-[#2D2F33] underline underline-offset-2"
            >
              {avatar ? "Đổi ảnh" : "Chọn ảnh"}
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>
        {/* TÊN */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
            Tên chủ trọ
          </label>
          <input
            type="text"
            placeholder="Nhập tên chủ trọ"
            value={landlordInfo?.name ?? ""}
            onChange={(e) =>
              setLandlordInfo((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="h-12 w-full rounded-xl border border-[#D9DDE1] px-4 text-sm outline-none placeholder:text-[#A0A4AA] focus:border-[#2D2F33]"
          />
        </div>
        {/* PHONE */}
        <div>
          <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
            Số điện thoại
          </label>
          <input
            type="tel"
            placeholder="Nhập số điện thoại"
            value={landlordInfo?.phone ?? ""}
            onChange={(e) =>
              setLandlordInfo((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="h-12 w-full rounded-xl border border-[#D9DDE1] px-4 text-sm outline-none placeholder:text-[#A0A4AA] focus:border-[#2D2F33]"
          />
        </div>
      </section>
    );
  },
);

export default LandlordInfo;
