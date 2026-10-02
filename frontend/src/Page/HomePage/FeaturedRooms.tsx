import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RoomCard from "../../components/common/Roomcart";
import type { Room } from "../../types";
import { getFeaturedRooms, getListFavorite } from "../../services";

export default function FeaturedRooms() {
  const slides = [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getFeaturedRooms();
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const listfavorite = await getListFavorite();
            const favoriteIds = new Set(listfavorite);
            const roomsWithFavorite = data.map((room) => ({
              ...room,
              isFavorite: favoriteIds.has(room.id),
            }));
            setRooms(roomsWithFavorite);
          } catch (error) {
            console.error("Lỗi kiểm tra favorite:", error);
            setRooms(data);
          }
        } else {
          setRooms(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, []);

  for (let i = 0; i < rooms.length - 1; i += 3) {
    slides.push(rooms.slice(i, i + 3));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="bg-gray-50 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-semibold text-blue-600">GỢI Ý CHO BẠN</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Phòng trọ nổi bật
            </h2>

            <p className="mt-2 text-gray-500">
              Những phòng trọ được nhiều người quan tâm
            </p>
          </div>

          <Link
            to="/search"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Xem tất cả →
          </Link>
        </div>
        {/* Rooms */}
        <div className="mt-8 pb-2 pt-2 overflow-hidden px-2 ">
          <div
            className=" flex gap-6 transition-transform duration-500 ease-in-out "
            style={{
              transform: `translateX(calc(-${currentSlide} * (100% + 24px)))`,
            }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="grid gap-6 w-full shrink-0 transition-transform min-[870px]:grid-cols-3 "
              >
                {slide.map((item) => (
                  <RoomCard key={item.id} room={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {[1, 2, 3].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                currentSlide === index ? "w-6 bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
