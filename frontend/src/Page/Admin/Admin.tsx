"use client";
import { useState, useEffect } from "react";
import SidebarItem from "../../components/common/SidebarItem";
import UsersContent from "./UsersContent";
import PostsContent from "./PostsContent";
import ReportsContent from "./ReportsContent";
import { getUserType } from "../../services";
import { useNavigate } from "react-router-dom";
import type { MenuKey } from "../../types";

//  MAIN PAGE
export default function Admin() {
  const navigate = useNavigate();
  // Menu hiện tại
  const [activeMenu, setActiveMenu] = useState<MenuKey>("users");
  // Trạng thái sidebar trên mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Chuyển menu
  const changeMenu = (menu: MenuKey) => {
    setActiveMenu(menu);
    setSidebarOpen(false);
  };
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const result = await getUserType();
        if (result === "User") {
          navigate("/");
        }
      } catch (error) {
        console.error("Không lấy được avatar:", error);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F5F3]">
      {/* MOBILE HEADER */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-lg"
        >
          ☰
        </button>
        <h1 className="font-bold text-[#2D2F33]">ADMIN</h1>
        <div className="w-10" />
      </header>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}
      <div className="flex">
        {/* SIDEBAR */}
        <aside
          className={`
            fixed left-0 top-0 z-50
            h-screen w-[280px]
            overflow-y-auto
            border-r border-gray-200
            bg-white
            p-5
            transition-transform duration-300
            lg:sticky lg:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* LOGO*/}
          <div className="relative mb-8 w-full text-center">
            <h1 className="text-[24px] font-bold text-[#2D2F33]">
              Quản lý hệ thống
            </h1>
            <p className="mt-1 text-[18px] font-bold tracking-wide text-[#16A34A]">
              ADMIN
            </p>
            {/* Nút đóng mobile */}
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
            >
              ✕
            </button>
          </div>
          {/*  QUẢN LÝ NGƯỜI DÙNG */}
          <div className="mb-7">
            <h2 className="mb-3 px-3 text-base font-bold text-[#2D2F33]">
              Quản lý người dùng
            </h2>
            <SidebarItem
              active={activeMenu === "users"}
              onClick={() => changeMenu("users")}
              icon="👤"
            >
              Danh sách người dùng
            </SidebarItem>
          </div>
          {/* QUẢN LÝ BÀI ĐĂNG */}
          <h2 className="mb-3 px-3 text-base font-bold text-[#2D2F33]">
            Quản lý bài đăng
          </h2>
          <SidebarItem
            active={activeMenu === "pending"}
            onClick={() => {
              setActiveMenu("pending");
            }}
            icon="🕐"
          >
            Chờ duyệt
          </SidebarItem>

          <SidebarItem
            active={activeMenu === "approved"}
            onClick={() => {
              setActiveMenu("approved");
            }}
            icon="✓"
          >
            Đã duyệt
          </SidebarItem>

          <SidebarItem
            active={activeMenu === "rejected"}
            onClick={() => {
              setActiveMenu("rejected");
            }}
            icon="✕"
          >
            Từ chối
          </SidebarItem>
          {/* QUẢN LÝ BÁO CÁO */}
          <div>
            <h2 className="mb-3 px-3 text-base font-bold text-[#2D2F33]">
              Quản lý báo cáo
            </h2>
            <SidebarItem
              active={activeMenu === "reports"}
              onClick={() => changeMenu("reports")}
              icon="⚠"
            >
              Quản lý báo cáo
            </SidebarItem>
          </div>
        </aside>
        {/* CONTENT RIGHT */}
        <section className="min-w-0 flex-1">
          <div className="p-5 sm:p-6 lg:p-8">
            {/* Người dùng */}
            {activeMenu === "users" && <UsersContent />}
            {/* Chờ duyệt */}
            {activeMenu === "pending" && (
              <PostsContent
                title="Bài đăng chờ duyệt"
                description="Danh sách bài đăng đang chờ admin kiểm duyệt"
                type="pending"
              />
            )}
            {/* Đã duyệt */}
            {activeMenu === "approved" && (
              <PostsContent
                title="Bài đăng đã duyệt"
                description="Danh sách bài đăng đã được duyệt"
                type="approved"
              />
            )}
            {/* Từ chối */}
            {activeMenu === "rejected" && (
              <PostsContent
                title="Bài đăng bị từ chối"
                description="Danh sách bài đăng không được duyệt"
                type="rejected"
              />
            )}
            {/* Báo cáo */}
            {activeMenu === "reports" && <ReportsContent />}
          </div>
        </section>
      </div>
    </main>
  );
}
