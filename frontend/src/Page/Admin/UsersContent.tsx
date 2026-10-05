import { useState, useEffect } from "react";
import type { UserContent } from "../../types";
import Pagination_Table from "../../components/common/Pagination_Table";
import {
  getListUser_Admin,
  changeStatusUser_Admin,
} from "../../services/Admin";
import { register } from "../../services";

export default function UsersContent() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserContent[]>([]);
  const usersPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getListUser_Admin();
        setUsers(data);
      } catch (error) {
        console.error("Không lấy được danh sách user:", error);
      }
    };

    fetchUsers();
  }, []);
  const [userList, setUserList] = useState(users);
  useEffect(() => {
    setUserList(users);
  }, [users]);
  const filteredUsers = userList.filter((user) => {
    const keyword = search.toLowerCase().trim();
    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.phone.includes(keyword)
    );
  });
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  function UserStatus({
    status,
    onChange,
  }: {
    status: UserContent["status"];
    onChange: (status: UserContent["status"]) => void;
  }) {
    return (
      <select
        value={status}
        onChange={(e) => onChange(e.target.value as UserContent["status"])}
        className={`rounded-full px-3 py-1 text-xs font-medium outline-none cursor-pointer ${
          status === "Active"
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
        }`}
      >
        <option className="bg-white text-gray-700" value="Active">
          Đang hoạt động
        </option>
        <option className="bg-white text-gray-700" value="Block">
          Đã khóa
        </option>
      </select>
    );
  }

  const handleStatusChange = async (
    userId: string,
    newStatus: UserContent["status"],
  ) => {
    try {
      await changeStatusUser_Admin(userId, newStatus);
      setUserList((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user,
        ),
      );
    } catch (error) {
      console.error("Không thể cập nhật trạng thái:", error);
    }
  };
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      await register({
        name,
        email,
        phone,
        password,
        type: "Admin",
      });

      alert("Tạo tài khoản Admin thành công");

      setShowAddUser(false);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      const data = await getListUser_Admin();
      setUsers(data);
    } catch (error) {
      console.error("Không thể tạo tài khoản Admin:", error);
      alert("Tạo tài khoản thất bại");
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

  return (
    <div>
      {/* Header */}
      <PageHeader
        title="Danh sách tất cả người dùng"
        description="Quản lý các tài khoản đang sử dụng hệ thống"
      />

      {/* Search */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          {/* Thanh tìm kiếm */}
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm kiếm tên bài đăng hoặc người đăng..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 pr-10 text-sm outline-none transition focus:border-[#2D2F33]"
            />

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className=" rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
        {/* Table header */}
        <div className=" flex items-center justify-between  border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="font-bold text-[#2D2F33]">Người dùng</h2>

            <p className="mt-1 text-sm text-gray-600">
              {currentUsers.length} người dùng
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddUser(true)}
            className="flex items-center gap-2 rounded-lg bg-[#2D2F33] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#44474b]"
          >
            <span className="text-lg leading-none">+</span>
            Tạo tài khoản
          </button>
        </div>
        {showAddUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <div>
                  <h2 className="text-lg font-bold text-[#2D2F33]">
                    Thêm tài khoản Admin
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Tạo tài khoản quản trị viên mới
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form className="space-y-4 p-6" onSubmit={handleCreateAdmin}>
                {/* Họ tên */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ và tên"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 text-sm outline-none transition focus:border-[#2D2F33]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 text-sm outline-none transition focus:border-[#2D2F33]"
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 text-sm outline-none transition focus:border-[#2D2F33]"
                  />
                </div>

                {/* Mật khẩu */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 text-sm outline-none transition focus:border-[#2D2F33]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-[#2D2F33]"
                    >
                      {showPassword ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                </div>

                {/* Xác nhận mật khẩu */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Xác nhận mật khẩu
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 pr-16 text-sm outline-none transition focus:border-[#2D2F33]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-[#2D2F33]"
                    >
                      {showConfirmPassword ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    Hủy
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-[#2D2F33] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#44474b]"
                  >
                    Tạo tài khoản
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div className="hidden h-[370px] flex-col overflow-x-auto md:flex bg-white mx-2 mb-3 rounded-b-2xl border border-gray-300">
          <table className="w-full min-w-[900px] ">
            <thead>
              <tr className="border-b border-gray-200 bg-[#FAFAF8] text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Người dùng</th>

                <th className="px-6 py-4 font-medium">Số điện thoại</th>

                <th className="px-6 py-4 font-medium">Ngày tham gia</th>

                <th className="px-6 py-4 font-medium">Bài đăng</th>

                <th className="px-6 py-4 font-medium">Yêu thích</th>

                <th className="px-6 py-4 font-medium">Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-[#E9E9E4]">
                        <img
                          src={`${import.meta.env.VITE_SERVER_URL}${user.avatar ?? "/images/Avatar/none.jpg"}`}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-[#2D2F33]">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.phone}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.joinedAt}
                  </td>

                  {/* Posts */}
                  <td className="px-6 py-4 text-sm font-medium">
                    {user.postCount}
                  </td>

                  {/* Favorites */}
                  <td className="px-6 py-4 text-sm font-medium">
                    {user.favoriteCount}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <UserStatus
                      status={user.status}
                      onChange={(newStatus) =>
                        handleStatusChange(user.id, newStatus)
                      }
                    />
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
        {/* MOBILE USERS */}
        <div className="divide-y divide-gray-100 md:hidden">
          {currentUsers.map((user) => (
            <div key={user.id} className="p-4">
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E9E9E4]">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-[#E9E9E4]">
                    <img
                      src={`${import.meta.env.VITE_SERVER_URL}${user.avatar ?? "/images/Avatar/none.jpg"}`}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#2D2F33]">{user.name}</p>

                  <p className="truncate text-sm text-gray-500">{user.email}</p>

                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">SĐT</p>
                      <p className="mt-1">{user.phone}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Tham gia</p>
                      <p className="mt-1">{user.joinedAt}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Bài đăng</p>
                      <p className="mt-1 font-medium">{user.postCount}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Yêu thích</p>
                      <p className="mt-1 font-medium">{user.favoriteCount}</p>
                    </div>
                  </div>

                  <UserStatus
                    status={user.status}
                    onChange={(newStatus) =>
                      handleStatusChange(user.id, newStatus)
                    }
                  />
                </div>
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

        {/* Empty */}
        {currentUsers.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            Không tìm thấy người dùng.
          </div>
        )}
      </div>
    </div>
  );
}
