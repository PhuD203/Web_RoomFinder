import type { RoomTitleProps } from "../../types";
import { formatPrice } from "../../utils/formatPrice";

export default function RoomTitle({
  room,
  isFavorite,
  setIsFavorite,
}: RoomTitleProps) {
  return (
    <div>
      {/* TITLE */}
      <section className="border-b pb-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="mb-2 text-sm text-gray-500">Phòng trọ • Ninh Kiều</p>

            <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
              {room.title}
            </h1>
          </div>

          {/* FAVORITE */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex h-11 w-11 flex-none items-center justify-center rounded-full border transition ${
              isFavorite
                ? "border-red-200 bg-red-50 text-red-500"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        {/* PRICE / AREA / LOCATION */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Giá thuê</p>
            <p className="mt-1 text-xl font-bold">
              {formatPrice(room.price)}
              <span className="ml-1 text-sm font-normal text-gray-500">
                /tháng
              </span>
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Diện tích</p>
            <p className="mt-1 text-xl font-bold">{room.area} m²</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Khu vực</p>
            <p className="mt-1 font-semibold">{room.location}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
