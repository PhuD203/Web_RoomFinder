import { useState, useEffect } from "react";
import type { InfoProfile } from "../../types";
import { getUserProfile, updateUserProfile } from "../../services/UserService";

export default function Infoprofile({ data }: { data: InfoProfile | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvatarRemoved, setIsAvatarRemoved] = useState(false);
  // File ảnh mới người dùng chọn
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // URL dùng để preview ảnh trước khi lưu
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [user, setUser] = useState<InfoProfile | null>(data);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const EditStatus = async () => {
    // Bấm "Chỉnh sửa"
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (!user) {
      return;
    }

    try {
      const changedData: {
        name?: string;
        phone?: string;
      } = {};

      // Kiểm tra name có thay đổi không
      if (user.name !== data?.name) {
        changedData.name = user.name;
      }

      // Kiểm tra phone có thay đổi không
      if (user.phone !== data?.phone) {
        changedData.phone = user.phone;
      }

      // Không có gì thay đổi
      if (Object.keys(changedData).length === 0 && !avatarFile) {
        setIsEditing(false);
        setAvatarPreview(null);
        return;
      }

      // Gọi API cập nhật
      const result = await updateUserProfile(changedData, avatarFile);

      console.log("Kết quả cập nhật:", result);

      // Lấy lại thông tin user mới nhất từ backend
      const updatedUser = await getUserProfile();

      setUser(updatedUser);

      // Xóa file preview
      setAvatarFile(null);
      setAvatarPreview(null);

      // Thoát chế độ chỉnh sửa
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi cập nhật user:", error);
    }
  };

  // Nếu chưa có user
  if (!user) {
    return null;
  }

  return (
    <section className="relative mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Nút bên phải */}
      <div className="flex justify-end gap-2">
        {isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Hủy
          </button>
        )}

        <button
          type="button"
          onClick={EditStatus}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            isEditing
              ? "bg-blue-600 text-white hover:bg-blue-700 "
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isEditing ? "Lưu" : "Chỉnh sửa"}
        </button>
      </div>

      <div className="flex flex-col gap-6 pr-0 sm:flex-row sm:items-center sm:pr-28">
        {/* ================= AVATAR ================= */}
        <div className="relative h-20 w-20 shrink-0">
          {/* Avatar */}
          <label
            htmlFor="avatar-upload"
            className={`relative block h-20 w-20 overflow-hidden rounded-full ${
              isEditing ? "cursor-pointer" : ""
            }`}
          >
            <img
              src={
                avatarPreview
                  ? avatarPreview
                  : isAvatarRemoved
                    ? "http://localhost:507/images/Avatar/none.jpg?d=mp&s=150"
                    : user.avatar
                      ? `http://localhost:507${user.avatar}`
                      : "http://localhost:507/images/Avatar/none.jpg?d=mp&s=150"
              }
              alt="Avatar"
              className="h-full w-full object-cover"
            />

            {/* Overlay khi chỉnh sửa */}
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition hover:opacity-100">
                <span className="text-xs font-medium text-white">Đổi ảnh</span>
              </div>
            )}
          </label>

          {/* Input chọn ảnh */}
          {isEditing && (
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) {
                  return;
                }
                // Lưu file để gửi backend
                setAvatarFile(file);
                // Tạo URL preview
                const imageUrl = URL.createObjectURL(file);
                setIsAvatarRemoved(false);
                setAvatarPreview(imageUrl);
              }}
            />
          )}

          {/* Nút Xóa ảnh */}
          {isEditing && !isAvatarRemoved && (avatarPreview || user.avatar) && (
            <button
              type="button"
              onClick={() => {
                setAvatarFile(null);
                setAvatarPreview(null);
                setIsAvatarRemoved(true);
              }}
              className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md hover:bg-red-600"
              title="Xóa ảnh"
            >
              ×
            </button>
          )}
        </div>

        {/* ================= INFORMATION ================= */}
        <div className="flex-1">
          {/* Tên */}
          <input
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
            disabled={!isEditing}
            className={`pl-2 text-xl font-bold text-[#2D2F33] outline-none disabled:bg-transparent ${
              isEditing
                ? "rounded-xl border border-black bg-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                : "border border-transparent bg-transparent"
            }`}
          />

          <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {/* Email */}
            <div>
              <span className="text-gray-500">Email:</span>{" "}
              <input
                type="text"
                value={user.email}
                disabled
                className="border border-transparent bg-transparent pl-2 font-medium text-[#2D2F33]"
              />
            </div>

            {/* SĐT */}
            <div>
              <span className="text-gray-500">SĐT:</span>{" "}
              <input
                type="text"
                value={user.phone}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phone: e.target.value,
                  })
                }
                disabled={!isEditing}
                className={`pl-2 font-medium text-[#2D2F33] ${
                  isEditing
                    ? "rounded-xl border border-black bg-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    : "border border-transparent bg-transparent"
                }`}
              />
            </div>

            {/* Ngày tham gia */}
            <div>
              <span className="text-gray-500">Ngày tham gia:</span>

              <span className="font-medium text-[#2D2F33]">
                {" "}
                {user.joinedAt}
              </span>
            </div>

            {/* Trạng thái */}
            <div>
              <span className="text-gray-500">Trạng thái:</span>

              <span className="font-medium text-green-600">
                {" "}
                ● {user.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
