import { formatPrice } from "../../utils/formatPrice";
import type { ContactCardProps } from "../../types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ToastMessage from "../../components/common/ToastMessage";
import { createReport } from "../../services/ReportService";

export default function ContactCard({ price, owner }: ContactCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [reportType, setReportType] = useState<"account" | "post">("account");
  const [reportReason, setReportReason] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { id } = useParams<{ id: string }>();
  const RoomId = id;

  const gettargetId = reportType === "account" ? owner.id : RoomId;
  const handleSubmitReport = async () => {
    try {
      const result = await createReport({
        targetType: reportType,
        targetId: gettargetId,
        reason: reportReason,
      });
      console.log("Kết quả:", result);
      setShowConfirm(false);
      setReportReason("");
      setMessage("Gửi báo cáo thành công");
      setSuccess(true);
    } catch (error: any) {
      console.error("Lỗi gửi báo cáo:", error);
      setMessage(error.response?.data || "Gửi báo cáo thất bại");
      setSuccess(false);
    }
  };
  return (
    <div>
      <ToastMessage message={message} success={success} />
      <aside>
        <div className="sticky top-6 ">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            {/* PRICE */}
            <p className="text-sm text-gray-500">Giá thuê</p>

            <p className="mt-1 text-3xl font-extrabold">
              {formatPrice(price)}
              <span className="ml-1 text-base font-normal text-gray-500">
                /tháng
              </span>
            </p>

            {/* CONTACT */}
            <div className="my-6 border-t pt-6">
              <p className="mb-4 text-sm font-semibold">Liên hệ chủ phòng</p>

              <div className="flex items-center gap-3">
                <img
                  src={`http://localhost:507${owner.avatar}`}
                  alt={owner.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-bold">{owner.name}</p>

                  <p className="text-sm text-gray-500">Chủ phòng</p>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="space-y-3">
              <a
                href={
                  owner.phone
                    ? `tel:${owner.phone.replace(/\s/g, "")}`
                    : undefined
                }
                className="flex h-12 items-center justify-center rounded-xl bg-[#2D2F33] font-semibold text-white transition hover:opacity-90"
              >
                Gọi điện
              </a>

              <button className="h-12 w-full rounded-xl border border-[#2D2F33] font-semibold transition hover:bg-gray-50">
                Nhắn Zalo
              </button>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              Hãy cẩn thận khi giao dịch và không chuyển tiền trước khi xem
              phòng.
            </p>
          </div>
          <p className="mt-4 text-center text-[12px] leading-5 text-gray-500">
            Nếu phát hiện tin đăng có dấu hiệu lừa đảo, thông tin sai lệch hoặc
            nội dung không phù hợp, vui lòng{" "}
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="font-semibold text-red-500 hover:text-red-600 hover:underline"
            >
              báo cáo tin đăng
            </button>{" "}
            để chúng tôi kiểm tra và xử lý.
          </p>
        </div>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              {/* Nút đóng */}
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                ×
              </button>
              {/* Tiêu đề */}
              <h3 className="pr-8 text-lg font-bold text-[#2D2F33]">Báo cáo</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Vui lòng chọn đối tượng bạn muốn báo cáo và nhập lý do.
                <br />
                Báo cáo sẽ được gửi đến quản trị viên để kiểm tra và xử lý.
              </p>

              {/* Chọn loại báo cáo */}
              <div className="mt-5">
                <label className="mb-3 block text-sm font-semibold text-[#2D2F33]">
                  Đối tượng báo cáo
                </label>
                <div className="space-y-3">
                  {/* Báo cáo người dùng */}
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition hover:bg-gray-50">
                    <input
                      type="radio"
                      name="reportType"
                      value="account"
                      checked={reportType === "account"}
                      onChange={() => setReportType("account")}
                      className="h-4 w-4 accent-red-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#2D2F33]">
                        Báo cáo người dùng
                      </p>

                      <p className="text-xs text-gray-500">
                        Báo cáo tài khoản người đăng
                      </p>
                    </div>
                  </label>
                  {/* Báo cáo bài đăng */}
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition hover:bg-gray-50">
                    <input
                      type="radio"
                      name="reportType"
                      value="post"
                      checked={reportType === "post"}
                      onChange={() => setReportType("post")}
                      className="h-4 w-4 accent-red-600"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#2D2F33]">
                        Báo cáo bài đăng
                      </p>
                      <p className="text-xs text-gray-500">
                        Báo cáo phòng trọ này
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              {/* Lý do */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-[#2D2F33]">
                  Lý do báo cáo
                </label>
                <textarea
                  rows={4}
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Nhập lý do báo cáo..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#2D2F33] outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>
              {/* Nút */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#2D2F33] transition hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSubmitReport}
                  className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Xác nhận báo cáo
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
