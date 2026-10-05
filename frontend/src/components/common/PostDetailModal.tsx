import type { PostDetailModalProps } from "../../types";
import { useState } from "react";

export default function PostDetailModal({
  post,
  onClose,
  mode,
  type,
  onApprove,
  onReject,
}: PostDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 p-3 sm:p-5 md:p-8"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-[#2D2F33]">
                Thông tin phòng trọ
              </h2>

              <p className="mt-1 text-xs text-gray-500">Chi tiết bài đăng</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          {/* =====================================================
                CONTENT
            ===================================================== */}
          <div className="overflow-y-auto">
            <div className="space-y-6 p-5 sm:p-6">
              {/* =================================================
                    HÌNH ẢNH
                ================================================= */}

              {/* =================================================
      HÌNH ẢNH
  ================================================= */}
              <div>
                <p className="mb-3 text-sm font-semibold text-[#2D2F33]">
                  Hình ảnh phòng
                </p>

                {/* ẢNH LỚN */}
                <div className="overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}${post.images[activeImage]}`}
                    alt={post.title}
                    className="h-64 w-full object-cover sm:h-80"
                  />
                </div>

                {/* 5 ẢNH NHỎ */}
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {post.images.slice(0, 5).map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`overflow-hidden rounded-lg border-2 transition ${
                        activeImage === index
                          ? "border-[#2D2F33]"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={`${import.meta.env.VITE_SERVER_URL}${image}`}
                        alt={`Ảnh phòng ${index + 1}`}
                        className="h-16 w-full object-cover sm:h-20"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* THÔNG TIN CƠ BẢN */}

              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-4 text-base font-bold text-[#2D2F33]">
                  Thông tin cơ bản
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Tiêu đề */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Tiêu đề bài đăng
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-[#2D2F33]">
                      {post?.title}
                    </div>
                  </div>
                  {/* MÔ TẢ */}
                  <div className="sm:col-span-2">
                    <h3 className="mb-1.5 block text-xs font-medium text-gray-500">
                      Mô tả phòng
                    </h3>

                    <p className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-[#2D2F33]">
                      {post.description}
                    </p>
                  </div>

                  {/* Giá */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Giá thuê
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-blue-600">
                      {post?.price}
                    </div>
                  </div>

                  {/* Diện tích */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Diện tích
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                      {post.area} m²
                    </div>
                  </div>

                  {/* Loại phòng */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Loại phòng
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                      {post.roomInfo.type}
                    </div>
                  </div>

                  {/* Số người */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Số người tối đa
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                      {post.roomInfo.people} người
                    </div>
                  </div>
                </div>
              </div>

              {/* ĐỊA CHỈ */}

              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-4 text-base font-bold text-[#2D2F33]">
                  Địa chỉ
                </h3>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    Địa chỉ phòng
                  </label>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                    {post.address}
                  </div>
                </div>
              </div>

              {/* GIÁ ĐIỆN NƯỚC */}

              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-4 text-base font-bold text-[#2D2F33]">
                  Thông tin chi tiết
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 py-2 ">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Tiền điện
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                      {post.roomInfo.electricity}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Tiền nước
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                      {post.roomInfo.water}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols py-2 ">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Nội thất:
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                      {post.roomInfo.furniture}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols py-2 ">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Thông tin khác
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                      {post.roomInfo.other}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-4 text-base font-bold text-[#2D2F33]">
                  Tiện ích
                </h3>

                <div className="flex flex-wrap gap-2">
                  {post.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-700"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              {/* THÔNG TIN NGƯỜI ĐĂNG */}
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-4 text-base font-bold text-[#2D2F33]">
                  Thông tin người đăng
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Họ tên
                    </label>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                      {post.owner.name}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Số điện thoại
                    </label>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#2D2F33]">
                      {post.owner.phone}
                    </div>
                  </div>
                </div>
              </div>
              {/* ADMIN ACTION */}
              {/* ADMIN ACTION */}
              <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
                {/* Quản lý bài đăng */}
                {mode === "manage" && (
                  <>
                    {/* Pending hoặc Approved → được loại bài */}
                    {(type === "pending" || type === "approved") && (
                      <button
                        type="button"
                        onClick={() => {
                          onReject?.(post);
                          onClose();
                        }}
                        className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Loại bài
                      </button>
                    )}

                    {/* Chỉ Pending → được duyệt */}
                    {type === "pending" && (
                      <button
                        type="button"
                        onClick={() => {
                          onApprove?.(post);
                          onClose();
                        }}
                        className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        Duyệt bài
                      </button>
                    )}
                  </>
                )}

                {/* Báo cáo bài đăng */}
                {mode === "report" && (
                  <>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Bỏ qua
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onReject?.(post);
                        onClose();
                      }}
                      className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      Xóa bài đăng
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
