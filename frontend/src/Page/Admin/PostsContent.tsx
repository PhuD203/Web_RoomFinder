import { useState, useEffect } from "react";
import type { PostContent, PostDetailContent } from "../../types";
import PostDetailModal from "../../components/common/PostDetailModal";
import Pagination_Table from "../../components/common/Pagination_Table";
import {
  getPostRoom_Admin,
  changeStatusPost_Admin,
} from "../../services/Admin";
import { getRoomDetail } from "../../services";

export default function PostsContent({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: "pending" | "approved" | "rejected";
}) {
  const [selectedPost, setSelectedPost] = useState<PostDetailContent | null>(
    null,
  );
  const [posts, setPosts] = useState<PostContent[]>([]);
  // const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const status = type as "pending" | "approved" | "rejected";

        const data = await getPostRoom_Admin(status);

        setPosts(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Không lấy được danh sách bài đăng:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [type]);
  const postsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPosts = posts.filter((post) => {
    const keyword = search.trim().toLowerCase();

    const matchSearch =
      !keyword ||
      post.title.toLowerCase().includes(keyword) ||
      post.ownerName.toLowerCase().includes(keyword);

    // post.date: "10/09/2026"
    const [day, month, year] = post.createdAt.split("/");

    // Chuyển thành 20260910
    const postDateNumber = Number(`${year}${month}${day}`);

    // input date: "2026-09-10"
    const fromDateNumber = fromDate
      ? Number(fromDate.replaceAll("-", ""))
      : null;

    const toDateNumber = toDate ? Number(toDate.replaceAll("-", "")) : null;

    // Chỉ có Từ ngày
    if (fromDateNumber && !toDateNumber) {
      return matchSearch && postDateNumber >= fromDateNumber;
    }

    // Chỉ có Đến ngày
    if (!fromDateNumber && toDateNumber) {
      return matchSearch && postDateNumber <= toDateNumber;
    }

    // Có cả Từ ngày và Đến ngày
    if (fromDateNumber && toDateNumber) {
      return (
        matchSearch &&
        postDateNumber >= fromDateNumber &&
        postDateNumber <= toDateNumber
      );
    }

    // Không lọc ngày
    return matchSearch;
  });
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  function PageHeader() {
    return (
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2D2F33]">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    );
  }
  // ACTION
  const handleViewPost = async (IdRoom: string) => {
    const data = await getRoomDetail(IdRoom);
    setSelectedPost(data);
  };

  const handleStatus = async (
    roomId: string,
    status: "pending" | "approved" | "rejected",
  ) => {
    try {
      await changeStatusPost_Admin(roomId, status);

      setPosts((prev) => prev.filter((item) => item.id !== roomId));
      setSelectedPost(null);
    } catch (error) {
      console.error("Đổi trạng thái bài đăng thất bại:", error);
    }
  };

  // MAIN
  return (
    <div>
      <PageHeader />
      <div className="relative mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        {/* Hàng tìm kiếm + nút lọc */}
        <div className="flex flex-row items-center gap-2">
          {/* Tìm kiếm */}
          <div className="relative flex-1  shrink-0">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Tìm kiếm tên bài đăng hoặc người đăng..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 pr-10 text-sm outline-none transition focus:border-[#2D2F33]"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          {/* Nút Lọc + popup */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilter((prev) => !prev)}
              className={`h-11 rounded-xl border  px-4 text-sm font-medium transition ${
                showFilter || fromDate || toDate
                  ? "border-[#2D2F33] bg-[#2D2F33] text-white"
                  : "border-gray-200 bg-white text-[#2D2F33] hover:bg-gray-50"
              }`}
            >
              ⚙ Lọc
            </button>
            {/* Dropdown */}
            {showFilter && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[280px] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                <div className="mb-3 text-sm font-semibold text-gray-700">
                  Lọc theo ngày
                </div>
                <div className="space-y-3">
                  {/* Từ ngày */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Từ ngày
                    </label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => {
                        setFromDate(e.target.value);
                      }}
                      className="h-10 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-3 text-sm outline-none focus:border-[#2D2F33]"
                    />
                  </div>
                  {/* Đến ngày */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Đến ngày
                    </label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => {
                        setToDate(e.target.value);
                      }}
                      className="h-10 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-3 text-sm outline-none focus:border-[#2D2F33]"
                    />
                  </div>
                  {/* Xóa */}
                  {(fromDate || toDate) && (
                    <button
                      type="button"
                      onClick={() => {
                        setFromDate("");
                        setToDate("");
                      }}
                      className="w-full rounded-xl px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      Xóa bộ lọc
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* HEADER */}
      <div className=" rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="font-bold text-[#2D2F33]">Bài đăng</h2>

          <p className="mt-1 text-sm text-gray-600">
            {filteredPosts.length} bài đăng
          </p>
        </div>
        {/*  DESKTOP */}
        <div className="hidden h-[370px] flex-col overflow-x-auto md:flex bg-white mx-2 mb-3 rounded-b-2xl border border-gray-300">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-[#FAFAF8] text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Ảnh</th>
                <th className="px-6 py-4 font-medium">Bài đăng</th>
                <th className="px-6 py-4 font-medium">Người đăng</th>
                <th className="px-6 py-4 font-medium">Giá</th>
                <th className="px-6 py-4 font-medium">Ngày đăng</th>
                <th className="px-6 py-4 text-center font-medium">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  {/* IMAGE */}

                  <td className="pl-6 py-4">
                    <img
                      src={`http://localhost:507${post.imageUrl}`}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-30 h-16 rounded-lg object-cover"
                    />
                  </td>

                  {/* POST */}

                  <td className="px-6 py-4">
                    <p className="max-w-xs truncate font-medium text-[#2D2F33]">
                      {post.title}
                    </p>

                    <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                      {post.address}
                    </p>
                  </td>

                  {/* OWNER */}

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.ownerName}
                  </td>

                  {/* PRICE */}

                  <td className="px-6 py-4 text-sm font-semibold text-[#2D2F33]">
                    {post.price}
                  </td>

                  {/* DATE */}

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.createdAt}
                  </td>

                  {/* ACTION */}

                  <td className="w-1 whitespace-nowrap px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleViewPost(post.id)}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#2D2F33] transition hover:bg-gray-100"
                      >
                        Xem
                      </button>

                      {type !== "rejected" && (
                        <>
                          {/* Duyệt */}
                          <button
                            type="button"
                            onClick={() => handleStatus(post.id, "rejected")}
                            className="rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                          >
                            Loại
                          </button>

                          {/* Vi phạm - chỉ hiện khi cả 2 điều kiện đúng */}
                          {type !== "approved" && (
                            <button
                              type="button"
                              onClick={() => handleStatus(post.id, "approved")}
                              className="rounded-lg bg-green-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                            >
                              Duyệt
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-auto flex justify-center">
            <Pagination_Table
              currentPage={currentPage}
              totalroom={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        {/* MOBILE */}
        <div className="divide-y divide-gray-100 md:hidden">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-4">
              <div className="flex gap-4">
                <img
                  src={`http://localhost:507${post.imageUrl}`}
                  alt={post.title}
                  className="h-20 w-24 shrink-0 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-semibold text-[#2D2F33]">
                    {post.title}
                  </p>

                  <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                    {post.address}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#2D2F33]">
                    {post.price}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">{post.createdAt}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => handleViewPost(post.id)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-[#2D2F33] transition hover:bg-gray-100"
                >
                  Xem chi tiết
                </button>
                {type !== "approved" && (
                  <>
                    {/* Duyệt */}
                    <button
                      type="button"
                      onClick={() => handleStatus(post.id, "approved")}
                      className="rounded-lg bg-green-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                      Duyệt
                    </button>

                    {/* Vi phạm - chỉ hiện khi cả 2 điều kiện đúng */}
                    {type !== "rejected" && (
                      <button
                        type="button"
                        onClick={() => handleStatus(post.id, "rejected")}
                        className="rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        Loại
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
          <div className="mt-auto flex justify-center">
            <Pagination_Table
              currentPage={currentPage}
              totalroom={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        {/*EMPTY */}
        {filteredPosts.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            Không tìm thấy người dùng.
          </div>
        )}
      </div>
      {/* MODAL */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          mode="manage"
          type={type}
          onClose={() => setSelectedPost(null)}
          onApprove={(post) => handleStatus(post.id, "approved")}
          onReject={(post) => handleStatus(post.id, "rejected")}
        />
      )}
    </div>
  );
}
