import RoomCard from "../../components/common/Roomcart";
import type { Room } from "../../types/room";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "../../components/common/Pagination";
import { useNavigate } from "react-router-dom";
import { getFavoritesRooms } from "../../services/FaroviteService";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const [favoriteRooms, setfavoriteRooms] = useState<Room[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFavoriteRooms = async () => {
      try {
        window.scrollTo(0, 0);
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getFavoritesRooms();
          setfavoriteRooms(
            data.map((room) => ({
              ...room,
              isFavorite: true,
            })),
          );
        }
      } catch (error) {
        console.error("Lỗi lấy phòng yêu thích:", error);
      }
    };

    fetchFavoriteRooms();
  }, []);

  const filteredRooms = favoriteRooms
    .filter((room) => {
      // Tìm kiếm
      const keyword = search.trim().toLowerCase();

      const matchSearch =
        !keyword ||
        room.title?.toLowerCase().includes(keyword) ||
        room.location?.toLowerCase().includes(keyword);

      // Lọc giá
      let matchPrice = true;
      if (priceFilter === "under-2") {
        matchPrice = room.price < 2000000;
      }
      if (priceFilter === "2-3") {
        matchPrice = room.price >= 2000000 && room.price <= 3000000;
      }
      if (priceFilter === "over-3") {
        matchPrice = room.price > 3000000;
      }
      // Lọc diện tích
      let matchArea = true;
      if (areaFilter === "under-20") {
        matchArea = room.area < 20;
      }
      if (areaFilter === "20-30") {
        matchArea = room.area >= 20 && room.area <= 30;
      }
      if (areaFilter === "over-30") {
        matchArea = room.area > 30;
      }
      return matchSearch && matchPrice && matchArea;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }

      if (sortBy === "price-desc") {
        return b.price - a.price;
      }

      if (sortBy === "area-asc") {
        return a.area - b.area;
      }

      if (sortBy === "area-desc") {
        return b.area - a.area;
      }

      return 0;
    });

  useEffect(() => {
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    setSearchParams(params, { replace: true });
  }, [search, priceFilter, areaFilter, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <main className="min-h-screen bg-[#F5F5F3] px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/")}
              className="mb-4 flex items-center gap-2 text-gray-600 transition hover:text-[#2D2F33]"
            >
              <span className="text-[18px]">←</span>
              <span className="text-sm font-medium">Quay lại</span>
            </button>

            <h1 className="text-2xl font-bold text-[#2D2F33] md:text-3xl">
              Phòng trọ đã yêu thích
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Những phòng trọ bạn đã lưu
            </p>
          </div>
          {/* Tìm kiếm + Lọc + Sắp xếp */}
          <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row">
              {/* Tìm kiếm */}
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm phòng, khu vực..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] pl-11 pr-4 text-sm outline-none transition focus:border-[#2D2F33]"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilter(!showFilter)}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-medium text-[#2D2F33] transition hover:bg-gray-50"
              >
                <span>⚙</span>
                <span>Lọc</span>
              </button>

              {/* Sắp xếp */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 rounded-xl border border-gray-200 bg-white px-5 text-sm font-medium text-[#2D2F33] outline-none"
              >
                <option value="">↕ Sắp xếp</option>
                <option value="price-asc">Giá thấp → cao</option>
                <option value="price-desc">Giá cao → thấp</option>
                <option value="area-asc">Diện tích nhỏ → lớn</option>
                <option value="area-desc">Diện tích lớn → nhỏ</option>
              </select>
            </div>
            {showFilter && (
              <div className="mt-4 grid gap-4 border-t border-gray-100 pt-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Giá
                  </label>

                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 text-sm outline-none"
                  >
                    <option value="">Tất cả mức giá</option>
                    <option value="under-2">Dưới 2 triệu</option>
                    <option value="2-3">2 - 3 triệu</option>
                    <option value="over-3">Trên 3 triệu</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Diện tích
                  </label>

                  <select
                    value={areaFilter}
                    onChange={(e) => setAreaFilter(e.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 text-sm outline-none"
                  >
                    <option value="">Tất cả diện tích</option>
                    <option value="under-20">Dưới 20 m²</option>
                    <option value="20-30">20 - 30 m²</option>
                    <option value="over-30">Trên 30 m²</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 pb-2 pt-2 overflow-hidden px-2 ">
            <div className="grid gap-6 w-full shrink-0 transition-transform md:grid-cols-2 lg:grid-cols-3 ">
              {filteredRooms
                .slice(12 * (currentPage - 1), 12 * currentPage)
                .map((room) => (
                  <RoomCard
                    room={room}
                    key={room.id}
                    onFavoriteChange={(roomId: string) => {
                      setfavoriteRooms((prev) =>
                        prev.filter((room) => room.id !== roomId),
                      );
                    }}
                  />
                ))}
            </div>
          </div>
          <div className="pt-9">
            <Pagination
              totalroom={filteredRooms.length}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
