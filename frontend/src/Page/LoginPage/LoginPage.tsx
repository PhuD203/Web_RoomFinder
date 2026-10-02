import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Vui lòng nhập email.");
      return;
    }
    if (!password.trim()) {
      setMessage("Vui lòng nhập password.");
      return;
    }

    try {
      const result = await login({
        email,
        password,
      });

      // Lưu JWT
      localStorage.setItem("token", result.token);

      // Lưu thông tin user
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: result.userId,
          name: result.name,
          email: result.email,
        }),
      );

      setIsSuccess(true);
      setMessage("Đăng nhập thành công!");
      if (result.type === "User") {
        navigate("/");
      }
      if (result.type === "Admin") {
        navigate("/admin");
      }
    } catch (error: any) {
      setIsSuccess(false);
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Email hoặc mật khẩu không đúng.";
      setMessage(message);
    }
  };

  return (
    <main className="min-h-screen bg-[#D1D5DB]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] items-center justify-center px-5 py-10 bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=90')]  lg:bg-none">
        <div className="grid w-full overflow-hidden rounded-[32px] bg-white shadow-sm lg:grid-cols-2">
          {/* LEFT - IMAGE */}
          <div className="relative hidden min-h-[650px] lg:block">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=90"
              alt="Phòng trọ"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-10 left-10 right-10 text-white">
              <h2 className="text-4xl font-extrabold leading-tight">
                Tìm nơi ở phù hợp
                <br />
                với cuộc sống của bạn.
              </h2>

              <p className="mt-4 max-w-[400px] text-sm leading-6 text-white/90">
                Khám phá những phòng trọ phù hợp với nhu cầu và ngân sách của
                bạn.
              </p>
            </div>
          </div>

          {/* RIGHT - LOGIN */}
          <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16 bg-green-50">
            <div className="w-full max-w-[420px]">
              {/* TITLE */}
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-black ">
                  Đăng nhập
                </h1>

                <p className="mt-2 text-sm text-black ">
                  Đăng nhập để tiếp tục
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black ">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#E1E1E1] px-4 text-sm outline-none transition focus:border-[#2D2F33]"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-black ">
                      Mật khẩu
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-[#6A6B6E] hover:text-[#2D2F33]"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full rounded-xl border border-[#E1E1E1] px-4 pr-16 text-sm outline-none transition focus:border-[#2D2F33]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-black "
                    >
                      {showPassword ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#2D2F33] text-sm font-bold text-white transition hover:opacity-90"
                >
                  Đăng nhập
                </button>
              </form>
              {message && (
                <div
                  className={`mb-5 mt-[10px] rounded-xl px-4 py-3 text-sm font-medium ${
                    isSuccess
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* DIVIDER */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E5E5E5]" />

                <span className="text-xs text-[#999]">hoặc</span>

                <div className="h-px flex-1 bg-[#E5E5E5]" />
              </div>

              {/* REGISTER */}
              <p className="text-center text-sm text-[#6E6F72]">
                Chưa có tài khoản?{" "}
                <Link to="/register">
                  <button
                    type="button"
                    className="font-bold text-[#2D2F33] hover:underline"
                  >
                    Đăng ký
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
