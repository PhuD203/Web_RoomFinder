import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAvatar } from "../../services/UserService";
import { createReport } from "../../services/ReportService";

export default function Header() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [avatar, setAvatar] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ShowFeedback, setShowFeedback] = useState(false);
  const [reportReason, setReportReason] = useState("");
  useEffect(() => {
    if (!token) return;

    const fetchAvatar = async () => {
      try {
        const avatarUrl = await getAvatar();
        setAvatar(avatarUrl);
      } catch (error) {
        console.error("Không lấy được avatar:", error);
      }
    };

    fetchAvatar();
  }, [token]);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const handleSubmitReport = async () => {
    try {
      const result = await createReport({
        targetType: "orther",
        targetId: "null",
        reason: reportReason,
      });
      console.log("Kết quả:", result);
      setReportReason("");
      setShowFeedback(false);
      // setMessage("Gửi báo cáo thành công");
      // setSuccess(true);
    } catch (error: any) {
      console.error("Lỗi gửi báo cáo:", error);
      // setMessage(error.response?.data || "Gửi báo cáo thất bại");
      // setSuccess(false);
    }
  };
  return (
    <div>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            FindRentalroom
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {token ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowFeedback(true)}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Góp ý
                </button>
                <Link
                  to="/create-room"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Đăng tin
                </Link>

                <Link
                  to="/favorites"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Yêu thích
                </Link>

                <Link
                  to="/mypostroom"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Đã đăng
                </Link>

                <Link
                  to="/profile"
                  className="h-10 w-10 overflow-hidden rounded-full"
                >
                  <img
                    src={
                      avatar
                        ? `http://localhost:507${avatar}`
                        : "http://localhost:507/images/Avatar/none.jpg"
                    }
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowFeedback(true)}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Góp ý
                </button>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Đăng tin
                </Link>

                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Yêu thích
                </Link>

                <Link
                  to="/login"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Đăng nhập
                </Link>
              </>
            )}
          </nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2"
          >
            ☰
          </button>

          {isMenuOpen && (
            <div className="absolute left-0 top-16 z-50 w-full border-t bg-white shadow-md md:hidden">
              {token ? (
                <>
                  {/* MENU */}
                  <div className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => setShowFeedback(true)}
                      className="block py-3"
                    >
                      Góp ý
                    </button>
                    <Link
                      to="/create-room"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3"
                    >
                      Đăng tin
                    </Link>

                    <Link
                      to="/favorites"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3"
                    >
                      Yêu thích
                    </Link>

                    <Link
                      to="/mypostroom"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3"
                    >
                      Đã đăng
                    </Link>
                    <Link
                      to="/profile"
                      className="h-10 w-10 overflow-hidden rounded-full"
                    >
                      <img
                        src={
                          avatar
                            ? `http://localhost:507${avatar}`
                            : "http://localhost:507/images/Avatar/none.jpg"
                        }
                        alt="Avatar"
                        className="h-10 w-10 rounded-full object-cover mt-2"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {/* CHƯA ĐĂNG NHẬP */}
                  <div className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => setShowFeedback(true)}
                      className="block py-3"
                    >
                      Góp ý
                    </button>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3"
                    >
                      Đăng tin
                    </Link>

                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3"
                    >
                      Đã thích
                    </Link>

                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="mt-2 inline-block rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      {ShowFeedback && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {/* Nút đóng */}
            <button
              type="button"
              onClick={() => setShowFeedback(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              ×
            </button>
            {/* Tiêu đề */}
            <h3 className="pr-8 text-lg font-bold text-[#2D2F33]">Góp ý</h3>
            {/* Mô tả */}
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Hãy chia sẻ ý kiến hoặc vấn đề bạn gặp phải khi sử dụng website. Ý
              kiến của bạn sẽ giúp chúng tôi cải thiện dịch vụ tốt hơn.
            </p>
            {/* Nội dung */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-[#2D2F33]">
                Nội dung
              </label>
              <textarea
                rows={6}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Nhập ý kiến hoặc vấn đề bạn muốn chia sẻ..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#2D2F33] outline-none transition placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
              />
            </div>
            {/* Nút */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowFeedback(false)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#2D2F33] transition hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSubmitReport}
                className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
