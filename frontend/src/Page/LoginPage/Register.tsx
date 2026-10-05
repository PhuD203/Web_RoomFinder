import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const phoneRegex = /^(03|05|07|08|09)\d{8}$/;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage("Vui lòng nhập họ và tên.");
      return;
    }

    if (!email.trim()) {
      setMessage("Vui lòng nhập email.");
      return;
    }

    if (!phone.trim()) {
      setMessage("Vui lòng nhập số điện thoại.");
      return;
    }
    if (!phoneRegex.test(phone.trim())) {
      setIsSuccess(false);
      setMessage("Số điện thoại không đúng định dạng");
      return;
    }
    if (!password.trim()) {
      setMessage("Vui lòng nhập password.");
      return;
    }

    if (password !== confirmpassword) {
      setIsSuccess(false);
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!acceptedTerms) {
      setIsSuccess(false);
      setMessage(
        "Vui lòng đồng ý với điều khoản sử dụng và chính sách bảo mật.",
      );
      return;
    }

    try {
      await register({
        name,
        phone,
        email,
        password,
        type: "User",
      });
      setIsSuccess(true);
      setMessage("Đăng ký thành công!"); // navigate("/");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setIsSuccess(false);
      setMessage("Email đã tồn tại hoặc thông tin đăng ký không hợp lệ.");
    }
  };

  return (
    <main
      className="flex items-center h-screen w-full overflow-hidden bg-[#D9DEE4] bg-cover bg-center bg-no-repeat
    bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=90')]
    lg:bg-none p-4 sm:p-6 lg:p-[20px]"
    >
      <div className="mx-auto flex min-h-[715px] w-full max-w-[1375px] overflow-hidden rounded-[36px] bg-[#F0FDF4] shadow-xl">
        {/* ================= LEFT - IMAGE ================= */}
        <div className="relative hidden w-1/2 lg:block">
          <img
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=90"
            alt="Phòng trọ"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25" />
          {/* TEXT */}
          <div className="absolute bottom-[45px] left-[48px] max-w-[560px] text-white">
            <h2 className="text-[42px] font-extrabold leading-[1.2]">
              Tìm nơi ở phù hợp
              <br />
              với cuộc sống của bạn.
            </h2>
            <p className="mt-5 text-[16px] leading-7">
              Khám phá những phòng trọ phù hợp với nhu cầu và ngân sách
              <br />
              của bạn.
            </p>
          </div>
        </div>
        {/* ================= RIGHT - FORM ================= */}
        <div className="flex w-full items-center justify-center bg-[#F0FDF4] px-6 sm:px-10 lg:w-1/2 lg:px-[95px]">
          <div className="w-full max-w-[500px]">
            {/* TITLE */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-[#2D2F33] sm:text-[36px]">
                Đăng ký
              </h1>
              <p className="mt-2 text-sm text-[#6E6F72] sm:text-base">
                Tạo tài khoản để bắt đầu tìm kiếm phòng trọ
              </p>
            </div>

            <form className="space-y-[4px]" onSubmit={handleRegister}>
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2D2F33]">
                  Họ và tên
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    h-12
                    w-full
                    rounded-[14px]
                    border
                    border-[#D1D5DB]
                    bg-transparent
                    px-5
                    text-sm
                    outline-none
                    transition
                    placeholder:text-[#9CA3AF]
                    focus:border-[#2D2F33]
                  "
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2D2F33]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    h-12
                    w-full
                    rounded-[14px]
                    border
                    border-[#D1D5DB]
                    bg-transparent
                    px-5
                    text-sm
                    outline-none
                    transition
                    placeholder:text-[#9CA3AF]
                    focus:border-[#2D2F33]
                  "
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2D2F33]">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="
                    h-12
                    w-full
                    rounded-[14px]
                    border
                    border-[#D1D5DB]
                    bg-transparent
                    px-5
                    text-sm
                    outline-none
                    transition
                    placeholder:text-[#9CA3AF]
                    focus:border-[#2D2F33]
                  "
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2D2F33]">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                      h-12
                      w-full
                      rounded-[14px]
                      border
                      border-[#D1D5DB]
                      bg-transparent
                      px-5
                      pr-16
                      text-sm
                      outline-none
                      transition
                      placeholder:text-[#9CA3AF]
                      focus:border-[#2D2F33]
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-5
                      top-1/2
                      -translate-y-1/2
                      text-sm
                      text-[#2D2F33]
                    "
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2D2F33]">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="
                      h-12
                      w-full
                      rounded-[14px]
                      border
                      border-[#D1D5DB]
                      bg-transparent
                      px-5
                      text-sm
                      outline-none
                      transition
                      placeholder:text-[#9CA3AF]
                      focus:border-[#2D2F33]
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="
                      absolute
                      right-5
                      top-1/2
                      -translate-y-1/2
                      text-sm
                      text-[#2D2F33]
                    "
                  >
                    {showConfirmPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>
              {/* TERMS */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 h-3 w-4 accent-[#2D2F33]"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />

                <p className="text-xs leading-5 text-[#6E6F72] sm:text-sm">
                  Tôi đồng ý với{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#2D2F33] hover:underline"
                  >
                    điều khoản sử dụng
                  </button>{" "}
                  và chính sách bảo mật.
                </p>
              </div>
              {/* REGISTER */}
              <button
                type="submit"
                className="
                  mt-2
                  h-12
                  w-full
                  rounded-[14px]
                  bg-[#2D2F33]
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-[#1A1B1E]
                "
              >
                Đăng ký
              </button>
              {message && (
                <div
                  className={`mb-5 mt-1 rounded-xl px-4 py-3 text-[14px] font-medium ${
                    isSuccess
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
            {/* LOGIN */}
            <p className="mt-2 text-center text-sm text-[#6E6F72]">
              Đã có tài khoản?{" "}
              <Link to="/login">
                <button
                  type="button"
                  className="font-bold text-[#2D2F33] hover:underline"
                >
                  Đăng nhập
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
