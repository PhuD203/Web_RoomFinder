// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RoomCard from "../../components/common/Roomcart";
import Pagination from "../../components/common/Pagination";
import { useSearchParams } from "react-router-dom";
import type { Room, RoomFilter } from "../../types";
import { getSearchRoomsResult, getListFavorite } from "../../services";

export default function RoomResults() {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const filter: RoomFilter = {
          location: searchParams.get("location") || undefined,
          price: searchParams.get("price") || undefined,
          area: searchParams.get("area") || undefined,
        };
        const data = await getSearchRoomsResult(filter);
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const listfavorite = await getListFavorite();

            const favoriteIds = new Set(listfavorite);

            const roomsWithFavorite = data.map((room: Room) => ({
              ...room,
              isFavorite: favoriteIds.has(room.id),
            }));

            setRooms(roomsWithFavorite);
          } catch (error) {
            console.error("Lỗi lấy favorite:", error);
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
  }, [searchParams]);

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  const formatText = (value: string | null) => {
    if (!value) return "";
    if (value.startsWith("under-")) {
      return `dưới ${value.replace("under-", "")}`;
    }
    if (value.startsWith("over-")) {
      return `trên ${value.replace("over-", "")}`;
    }
    return value;
  };

  return (
    <section className="bg-gray-50 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          {(searchParams.get("location") ||
            searchParams.get("price") ||
            searchParams.get("area")) && (
            <p>
              Tìm kiếm:{" "}
              {searchParams.get("location") && (
                <> Địa điểm {searchParams.get("location")}</>
              )}
              {searchParams.get("price") && (
                <> Giá {formatText(searchParams.get("price") || "")} triệu</>
              )}
              {searchParams.get("area") && (
                <> Diện tích {formatText(searchParams.get("area") || "")} m²</>
              )}
            </p>
          )}
        </h2>
        {/* Rooms */}
        <div className="mt-8 pb-2 pt-2 overflow-hidden px-2 ">
          <div className="grid gap-6 w-full shrink-0 transition-transform md:grid-cols-2 lg:grid-cols-3 ">
            {rooms
              .slice(12 * (currentPage - 1), 12 * currentPage)
              .map((room) => (
                <RoomCard room={room} key={room.id} />
              ))}
          </div>
        </div>
        <div className="pt-9">
          <Pagination
            totalroom={rooms.length}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
