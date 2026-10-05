import { useEffect, useMemo, useState } from "react";
import type { PostRoomProps } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import Pagination_Table from "../../components/common/Pagination_Table";
import {
  getMyPostRooms,
  deleteMyPostRoom,
} from "../../services/MyPostRoomService";

export default function PostedRoomsPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rooms, setRooms] = useState<PostRoomProps[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("Tất cả");
  const roomsPerPage = 4;
  function StatusBadge({
    status,
  }: {
    status: "approved" | "pending" | "rejected";
  }) {
    const styles = {
      approved: "bg-green-50 text-green-700",
      pending: "bg-yellow-50 text-yellow-700",
      rejected: "bg-red-50 text-red-700",
    };

    return (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
      >
        {status === "approved"
          ? "Đã duyệt"
          : status === "pending"
            ? "Chờ duyệt"
            : "Từ chối"}
      </span>
    );
  }
  // LỌC PHÒNG
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, priceFilter]);
  useEffect(() => {
    const fetchMyRooms = async () => {
      try {
        const data = await getMyPostRooms();
        setRooms(data);
      } catch (error) {
        console.error("Lỗi lấy phòng đã đăng:", error);
      }
    };

    fetchMyRooms();
  }, []);
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Tìm kiếm
      const matchSearch = room.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      // Lọc trạng thái
      const matchStatus =
        statusFilter === "all" || room.status === statusFilter;
      // Lọc giá
      let matchPrice = true;
      if (priceFilter === "Dưới 2 triệu") {
        matchPrice = room.price < 2000000;
      }
      if (priceFilter === "2 - 3 triệu") {
        matchPrice = room.price >= 2000000 && room.price <= 3000000;
      }
      if (priceFilter === "Trên 3 triệu") {
        matchPrice = room.price > 3000000;
      }
      return matchSearch && matchStatus && matchPrice;
    });
  }, [rooms, search, statusFilter, priceFilter]);
  // LẤY 4 PHÒNG CỦA PAGE HIỆN TẠI
  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return filteredRooms.slice(startIndex, endIndex);
  }, [filteredRooms, currentPage]);

  const handleDelete = async (roomId: string | number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa phòng này không?",
    );

    if (!confirmDelete) return;

    try {
      const result = await deleteMyPostRoom(String(roomId));
      if (result) {
        setRooms((prev) => prev.filter((room) => room.id !== roomId));
      }
    } catch (error) {
      console.error("Lỗi xóa phòng:", error);
      alert("Xóa phòng thất bại!");
    }
  };
  const handleResetFilter = () => {
    setSearch("");
    setStatusFilter("all");
    setPriceFilter("Tất cả");
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            ← Quay lại trang chủ
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D2F33]">
                Phòng đã đăng
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Quản lý các phòng bạn đã đăng
              </p>
            </div>
            <Link
              to="/create-room"
              className="inline-flex w-fit items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Thêm phòng
            </Link>
          </div>
        </div>
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {/* Tìm kiếm */}
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-[#2D2F33]">
                Tìm kiếm
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên phòng..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#2D2F33]">
                Trạng thái
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="approved">Đã duyệt</option>
                <option value="pending">Chờ duyệt</option>
                <option value="rejected">Từ chối</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#2D2F33]">
                Giá thuê
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Dưới 2 triệu">Dưới 2 triệu</option>
                <option value="2 - 3 triệu">2 - 3 triệu</option>
                <option value="Trên 3 triệu">Trên 3 triệu</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Tìm thấy{" "}
              <span className="font-semibold text-[#2D2F33]">
                {filteredRooms.length}
              </span>{" "}
              phòng
            </p>
            {(search || statusFilter !== "all" || priceFilter !== "Tất cả") && (
              <button
                type="button"
                onClick={handleResetFilter}
                className="w-fit text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
        {/* ================= DESKTOP ================= */}
        <div className="hidden overflow-x-auto rounded-2xl border-2 border-gray-200 bg-[#D6E7FF] p-3 shadow-sm md:block">
          <div className="max-h-[610px] overflow-x-auto overflow-y-auto rounded-xl bg-white">
            <table className="w-full min-w-[1000px] table-auto">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F7F7F3] text-left text-sm text-gray-500">
                  <th className="whitespace-nowrap px-5 py-4 font-semibold text-[#2D2F33]">
                    Ảnh
                  </th>
                  <th className="px-5 py-4 font-semibold text-[#2D2F33]">
                    Tiêu đề
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold text-[#2D2F33]">
                    Diện tích
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold text-[#2D2F33]">
                    Giá thuê
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold text-[#2D2F33]">
                    Trạng thái
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-center font-semibold text-[#2D2F33]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedRooms.map((room) => (
                  <tr
                    key={room.id}
                    className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <img
                        src={`${import.meta.env.VITE_SERVER_URL}${room.image}`}
                        alt={room.title}
                        className="h-20 w-28 rounded-xl object-cover"
                      />
                    </td>
                    <td className="min-w-[220px] px-5 py-4">
                      <p className="text-sm font-semibold text-[#2D2F33]">
                        {room.title}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-[#2D2F33]">
                      {room.area} m²
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#2D2F33]">
                      {room.price.toLocaleString("vi-VN")} đ
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <StatusBadge status={room.status} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/rooms/${room.id}`}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                        >
                          Xem
                        </Link>
                        <Link
                          to={`/edits`}
                          state={{ id: room.id }}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                        >
                          Sửa
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(room.id)}
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredRooms.length === 0 && (
              <div className="mt-4 bg-white py-16 text-center">
                <p className="text-sm text-gray-500">
                  Không tìm thấy phòng phù hợp.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
            {/* Pagination */}
            <div className="pt-2 pb-5">
              <Pagination_Table
                totalroom={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
        {/* ================= MOBILE ================= */}
        <div className="space-y-3 rounded-2xl border-2 border-gray-200 bg-[#D6E7FF] p-3 md:hidden">
          {paginatedRooms.map((room) => (
            <div
              key={room.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <img
                src={`${import.meta.env.VITE_SERVER_URL}${room.image}`}
                alt={room.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <p className="line-clamp-2 text-base font-semibold leading-6 text-[#2D2F33]">
                  {room.title}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span>
                    Diện tích:{" "}
                    <span className="font-medium text-[#2D2F33]">
                      {room.area} m²
                    </span>
                  </span>
                  <span>
                    Giá:{" "}
                    <span className="font-semibold text-[#2D2F33]">
                      {room.price.toLocaleString("vi-VN")} đ
                    </span>
                  </span>
                </div>
                <div className="mt-4">
                  <StatusBadge status={room.status} />
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <Link
                    to={`/rooms/${room.id}`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Xem
                  </Link>
                  <Link
                    to={`/edits?id=${room.id}`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                  >
                    Sửa
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(room.id)}
                    className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredRooms.length === 0 && (
            <div className="mt-4 bg-white py-16 text-center">
              <p className="text-sm text-gray-500">
                Không tìm thấy phòng phù hợp.
              </p>
              <button
                type="button"
                onClick={handleResetFilter}
                className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
          {/* Pagination mobile */}
          <div className="pt-5 pb-2">
            <Pagination_Table
              totalroom={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
