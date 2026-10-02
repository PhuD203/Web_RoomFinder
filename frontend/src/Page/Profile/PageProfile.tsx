"use client";
import { useState, useEffect } from "react";
import InfoProfile from "../Profile/InfoProfile";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, blockUserProfile } from "../../services/UserService";

export default function PageUser() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const handleLockAccount = async () => {
    try {
      const response = await blockUserProfile();
      console.log(response);
      setShowConfirm(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Lỗi khóa tài khoản:", error);
    }
  };
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await getUserProfile();
        setData(result);
      } catch (error) {
        console.error("Lỗi lấy user:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Back */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-[16px] font-medium text-[#2D2F33] hover:opacity-70"
        >
          <span className="text-lg">←</span>
          Quay lại
        </button>
        {/* Title */}
        <div className="flex flex-row">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#2D2F33]">
              Thông tin người dùng
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Thông tin chi tiết và hoạt động của người dùng
            </p>
          </div>
          <Link to="/login" className="ml-auto mr-5">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              className="flex h-[40px] items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Đăng Xuất
            </button>
          </Link>
        </div>

        {/* ================= USER INFORMATION ================= */}
        <InfoProfile data={data} />
        {/* ================= REPORTS ================= */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Báo cáo đã gửi */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#2D2F33]">Báo cáo đã gửi</h2>

            <p className="mt-2 text-3xl font-bold text-[#2D2F33]">
              {data?.reportCount}
            </p>

            <p className="text-sm text-gray-500">báo cáo</p>
          </section>

          {/* Phòng đã đăng */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#2D2F33]">Phòng đã đăng</h2>

            <p className="mt-2 text-3xl font-bold text-[#2D2F33]">
              {data?.postCount}
            </p>

            <p className="text-sm text-gray-500">phòng</p>

            <button
              type="button"
              onClick={() => navigate("/mypostroom")}
              className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Xem phòng đã đăng →
            </button>
          </section>

          {/* Phòng đã thích */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#2D2F33]">Phòng đã thích</h2>

            <p className="mt-2 text-3xl font-bold text-[#2D2F33]">
              {data?.favoriteCount}
            </p>

            <p className="text-sm text-gray-500">phòng</p>

            <button
              type="button"
              onClick={() => navigate("/favorites")}
              className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Xem phòng đã thích →
            </button>
          </section>
        </div>
        <div className="flex flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Khóa tài khoản
          </button>
        </div>
      </div>
      {/* ================= CONFIRM MODAL ================= */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#2D2F33]">
              Khóa tài khoản?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Bạn có chắc muốn khóa tài khoản của {data.name}? Người dùng sẽ
              không thể sử dụng tài khoản cho đến khi được mở khóa.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#2D2F33] hover:bg-gray-50"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={handleLockAccount}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Khóa tài khoản
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
