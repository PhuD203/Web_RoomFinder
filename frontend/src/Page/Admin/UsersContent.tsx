import { useState, useEffect } from "react";
import type { UserContent } from "../../types";
import Pagination_Table from "../../components/common/Pagination_Table";
import {
  getListUser_Admin,
  changeStatusUser_Admin,
} from "../../services/Admin";

export default function UsersContent() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserContent[]>([]);
  const usersPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
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
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="font-bold text-[#2D2F33]">Người dùng</h2>

          <p className="mt-1 text-sm text-gray-600">
            {currentUsers.length} người dùng
          </p>
        </div>
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
                          src={`http://localhost:507${user.avatar}`}
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
                      src={`http://localhost:507${user.avatar}`}
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
