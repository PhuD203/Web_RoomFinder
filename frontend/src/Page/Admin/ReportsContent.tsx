import type {
  ReportContent,
  PostDetailContent,
  UserContent,
} from "../../types";
import { useState, useEffect } from "react";
import PostDetailModal from "../../components/common/PostDetailModal";
import Pagination_Table from "../../components/common/Pagination_Table";
import {
  getListReport_Admin,
  getUserReport_Admin,
} from "../../services/Admin/ReportService";
import { getRoomDetail } from "../../services";
import {
  changeStatusUser_Admin,
  changeStatusPost_Admin,
  updateReport_Admin,
} from "../../services/Admin/";

export default function ReportContent() {
  const translateStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "Chưa xử lý",
      approved: "Đã xử lý",
    };

    return statusMap[status] ?? status;
  };
  const [selectedReport, setSelectedReport] = useState<ReportContent | null>(
    null,
  );

  const [SelecportID, setSelecportID] = useState<PostDetailContent | null>(
    null,
  );
  const [SelecportIDAccount, setSelecportIDAccount] =
    useState<UserContent | null>(null);
  const [reports, setReports] = useState<ReportContent[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getListReport_Admin();
        setReports(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Không lấy được danh sách bài đăng:", error);
        setReports([]);
      }
    };
    fetchPosts();
  }, []);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  console.log(selectedPost);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const postsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const filteredPosts = reports.filter((post) => {
    const keyword = search.trim().toLowerCase();

    const matchSearch =
      !keyword ||
      post.reporter.toLowerCase().includes(keyword) ||
      post.target.toLowerCase().includes(keyword) ||
      post.reason.toLowerCase().includes(keyword);

    // post.created_at: "10/09/2026"
    const [day, month, year] = post.created_at.split("/");
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

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);

  const handleProcess = async (report: ReportContent) => {
    setSelectedReport(report);

    if (report.target_type === "account") {
      try {
        const data = await getUserReport_Admin(report.IDtarget);
        setSelecportIDAccount(data);
        setIsReportModalOpen(true);
      } catch (error) {
        console.error("Không lấy được thông tin bài đăng:", error);
      }
      return;
    }
    if (report.target_type === "post") {
      try {
        const data = await getRoomDetail(report.IDtarget);
        setSelecportID(data);
        setIsReportModalOpen(true);
      } catch (error) {
        console.error("Không lấy được thông tin bài đăng:", error);
      }
      return;
    }
    if (report.target_type === "orther") {
      try {
        await updateReport_Admin(report.id);

        setReports((prev) =>
          prev.map((item) =>
            item.id === report.id ? { ...item, status: "approved" } : item,
          ),
        );
      } catch (error) {
        console.error("Không thể cập nhật báo cáo:", error);
      }
      return;
    }
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: UserContent["status"],
    reportId: string,
  ) => {
    try {
      await changeStatusUser_Admin(userId, newStatus);
      await updateReport_Admin(reportId);
      setReports((prev) =>
        prev.map((item) =>
          item.id === reportId ? { ...item, status: "approved" } : item,
        ),
      );

      setSelectedReport(null);
      setSelecportIDAccount(null);
      setIsReportModalOpen(false);
    } catch (error) {
      console.error("Không thể cập nhật trạng thái:", error);
    }
  };

  const handleStatus = async (
    roomId: string,
    status: "pending" | "approved" | "rejected",
    reportId: string,
  ) => {
    try {
      await changeStatusPost_Admin(roomId, status);
      await updateReport_Admin(reportId);
      setReports((prev) =>
        prev.map((item) =>
          item.id === reportId ? { ...item, status: "approved" } : item,
        ),
      );

      setSelectedReport(null);
      setSelecportID(null);
      setSelectedPost(null);
      setIsReportModalOpen(false);
    } catch (error) {
      console.error("Đổi trạng thái bài đăng thất bại:", error);
    }
  };

  function PageHeader({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2D2F33]">{title}</h1>

        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    );
  }
  function ReportStatus({ status }: { status: ReportContent["status"] }) {
    return (
      <span
        className={`
        inline-flex whitespace-nowrap rounded-full
        px-3 py-1 text-xs font-medium
        ${
          status === "approved"
            ? "bg-green-50 text-green-700"
            : "bg-yellow-50 text-yellow-700"
        }
      `}
      >
        {translateStatus(status)}
      </span>
    );
  }

  return (
    <div>
      <PageHeader
        title="Quản lý báo cáo"
        description="Theo dõi và xử lý các báo cáo từ người dùng"
      />
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
      {/* <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"> */}
      <div className=" rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="font-bold text-[#2D2F33]"> Báo cáo</h2>

          <p className="mt-1 text-sm text-gray-600">
            {filteredPosts.length} báo cáo
          </p>
        </div>
        {/*   DESKTOP */}

        <div className="mx-2 mb-3 hidden h-[370px] flex-col overflow-x-auto rounded-b-2xl border border-gray-300 bg-white md:flex">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-200 bg-[#FAFAF8] text-left text-sm text-gray-500">
                <th className="whitespace-nowrap px-6 py-4 font-medium">
                  Người báo cáo
                </th>

                <th className="whitespace-nowrap px-6 py-4 font-medium">
                  Đối tượng
                </th>

                <th className="whitespace-nowrap px-6 py-4 font-medium">
                  Lý do
                </th>

                <th className="whitespace-nowrap px-6 py-4 font-medium">
                  Ngày báo cáo
                </th>

                <th className="whitespace-nowrap px-6 py-4 font-medium">
                  Trạng thái
                </th>

                <th className="whitespace-nowrap px-6 py-4 font-medium"></th>
              </tr>
            </thead>

            <tbody>
              {paginatedPosts.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  {/* Người báo cáo */}
                  <td
                    className="max-w-[180px] truncate whitespace-nowrap px-6 py-4 text-sm font-medium"
                    title={report.reporter}
                  >
                    {report.reporter}
                  </td>

                  {/* Đối tượng */}
                  <td className="max-w-[220px] px-6 py-4">
                    <div className="min-w-0">
                      <p
                        className="truncate whitespace-nowrap text-sm font-medium text-[#2D2F33]"
                        title={report.target}
                      >
                        {report.target}
                      </p>

                      <p className="mt-0.5 whitespace-nowrap text-[13px] text-gray-400">
                        {report.target_type === "account" && "Tài khoản"}
                        {report.target_type === "post" && "Bài đăng"}
                        {report.target_type === "orther" && "Vấn đề khác"}
                      </p>
                    </div>
                  </td>

                  {/* Lý do */}
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedReportId(
                          expandedReportId === report.id ? null : report.id,
                        )
                      }
                      className={`max-w-[300px] text-left text-sm text-gray-600 ${
                        expandedReportId === report.id
                          ? "whitespace-normal break-words"
                          : "truncate whitespace-nowrap"
                      }`}
                    >
                      {report.reason}
                    </button>
                  </td>
                  {/* Ngày báo cáo */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {report.created_at}
                  </td>

                  {/* Trạng thái */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <ReportStatus status={report.status} />
                  </td>

                  {/* Xử lý */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <button
                      type="button"
                      disabled={report.status === "approved"}
                      onClick={() => handleProcess(report)}
                      className="whitespace-nowrap rounded-lg bg-[#2D2F33] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100"
                    >
                      Xử lý
                    </button>
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
        <div className="space-y-3 md:hidden">
          {paginatedPosts.map((report) => (
            <div
              key={report.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {/* Người báo cáo + trạng thái */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {/* Người báo cáo */}
                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Người báo cáo
                    </p>

                    <p className="mt-1 font-semibold text-[#2D2F33]">
                      {report.reporter}
                    </p>
                  </div>

                  {/* Đối tượng bị báo cáo */}
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <p className="text-xs font-medium text-gray-400">
                      Đối tượng
                    </p>

                    <p className="mt-1 font-semibold text-[#2D2F33]">
                      {report.target}
                    </p>

                    <p className="mt-1 text-[13px] text-gray-400">
                      Loại:{" "}
                      <span className="font-medium text-gray-500">
                        {report.target_type === "account" && "Tài khoản"}
                        {report.target_type === "post" && "Bài đăng"}
                        {report.target_type === "orther" && "Vấn đề khác"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Trạng thái + nút xử lý */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <ReportStatus status={report.status} />
                  <button
                    type="button"
                    disabled={report.status === "approved"}
                    onClick={() => handleProcess(report)}
                    className="rounded-lg bg-[#2D2F33] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100"
                  >
                    Xử lý
                  </button>
                </div>
              </div>

              {/* Lý do */}
              <div className="mt-2 border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-400">Lý do</p>

                <p className="mt-1 text-sm leading-5 text-gray-700">
                  {report.reason}
                </p>
              </div>

              {/* Ngày */}
              <p className="mt-3 text-xs text-gray-400">{report.created_at}</p>
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
      </div>
      {isReportModalOpen && selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          {selectedReport.target_type === "account" && SelecportIDAccount && (
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl">
              {/* Header */}
              <div className="border-b border-gray-100 px-5 py-4">
                <p className="text-lg font-semibold text-[#2D2F33]">
                  Thông tin tài khoản
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Kiểm tra thông tin người dùng trước khi xử lý báo cáo.
                </p>
              </div>

              {/* Account info */}
              <div className="p-5">
                <div className="rounded-xl border border-gray-100 bg-[#FAFAF8] p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Họ tên */}
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Họ và tên
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-[#2D2F33]">
                        {SelecportIDAccount.name}
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <p className="text-xs font-medium text-gray-400">Email</p>
                      <p className="mt-1.5 break-all text-sm text-[#2D2F33]">
                        {SelecportIDAccount.email}
                      </p>
                    </div>

                    {/* Số điện thoại */}
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Số điện thoại
                      </p>
                      <p className="mt-1.5 text-sm text-[#2D2F33]">
                        {SelecportIDAccount.phone}
                      </p>
                    </div>

                    {/* Ngày tham gia */}
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Ngày tham gia
                      </p>
                      <p className="mt-1.5 text-sm text-[#2D2F33]">
                        {SelecportIDAccount.joinedAt}
                      </p>
                    </div>

                    {/* Trạng thái */}
                    <div className="sm:col-span-2">
                      <p className="text-xs font-medium text-gray-400">
                        Trạng thái
                      </p>

                      <span
                        className={`mt-1.5 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          SelecportIDAccount.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {SelecportIDAccount.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedReport(null);
                      setIsReportModalOpen(false);
                    }}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 active:scale-[0.98]"
                  >
                    Hủy
                  </button>

                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-[#2D6CDF] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#245BC0] active:scale-[0.98]"
                    onClick={() =>
                      handleStatusChange(
                        SelecportIDAccount.id,
                        "Block",
                        selectedReport.id,
                      )
                    }
                  >
                    Khóa tài khoản
                  </button>
                </div>
              </div>
            </div>
          )}
          {selectedReport.target_type === "post" && SelecportID && (
            <div>
              {/* Bài đăng */}

              <PostDetailModal
                post={SelecportID}
                mode="report"
                onClose={() => {
                  setSelectedReport(null);
                  setSelectedPost(null);
                  setIsReportModalOpen(false);
                }}
                onReject={(SelecportID) =>
                  handleStatus(SelecportID.id, "rejected", selectedReport.id)
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
