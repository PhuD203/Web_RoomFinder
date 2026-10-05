import { Link, useNavigate } from "react-router-dom";
import type { RoomCardProps } from "../../types";
import { useState } from "react";
import { deleteFavorite, addFavorite } from "../../services/FaroviteService";

export default function RoomCard({ room, onFavoriteChange }: RoomCardProps) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(room.isFavorite ?? false);
  console.log("Room:", room);
  console.log("room.isFavorite:", room.isFavorite);
  const handleToggleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("login");
      } else {
        if (favorite) {
          const result = await deleteFavorite(room.id);
          if (result) {
            setFavorite(false);
            onFavoriteChange?.(room.id);
          }
        } else {
          const result = await addFavorite(room.id);
          if (result) {
            setFavorite(true);
          }
        }
      }
    } catch (error) {
      console.error("Lỗi xử lý yêu thích:", error);
    }
  };
  return (
    <Link
      to={`/rooms/${room.id}`}
      className="group w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={`${import.meta.env.VITE_SERVER_URL}${room.image}?auto=format&fit=crop&w=800&q=80`}
          alt={"Hình ảnh"}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          Nổi bật
        </span>

        <button
          onClick={(e) => {
            //Ngăn chuyển trang khi click
            e.preventDefault();
            //Click đỏ tim
            handleToggleFavorite();
          }}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow `}
        >
          {favorite ? "❤️" : "♡"}
        </button>
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
          {room.title}
        </h3>

        <p className="mt-3 text-xl font-bold text-blue-600">
          {room.price.toLocaleString("vi-VN")} đ
          <span className="text-sm font-normal text-gray-500">/ tháng</span>
        </p>

        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <span className="shrink-0 whitespace-nowrap">📐 {room.area} m²</span>

          <span className="min-w-0 truncate">📍 {room.location}</span>
        </div>
      </div>
    </Link>
  );
}
