import { Link } from "react-router-dom";

const locations = [
  {
    id: 1,
    name: "Ninh Kiều",
    city: "Cần Thơ",
    rooms: 421,
    image: `${import.meta.env.VITE_SERVER_URL}/images/Background/CanTho_Location.jpg`,
  },
  {
    id: 2,
    name: "Đồ Sơn",
    city: "Hải Phòng",
    rooms: 156,
    image: `${import.meta.env.VITE_SERVER_URL}/images/Background/HaiPhong_Location.jpg`,
  },
  {
    id: 3,
    name: "Tân Cảng",
    city: "TP. Hồ Chí Minh",
    rooms: 523,
    image: `${import.meta.env.VITE_SERVER_URL}/images/Background/HCM_Location.jpg`,
  },
  {
    id: 4,
    name: "Hoàn Kiếm",
    city: "Hà Nội",
    rooms: 342,
    image: `${import.meta.env.VITE_SERVER_URL}/images/Background/HaNoi_Location.jpg`,
  },
];
export default function PopularLocations() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-semibold text-blue-600">KHÁM PHÁ</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Tìm phòng theo khu vực
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Khám phá những khu vực có nhiều phòng trọ phù hợp với nhu cầu của
            bạn.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={`${location.city}-${location.name}`}
              to={`/search?location=${encodeURIComponent(location.name)}`}
              className="group relative h-64 overflow-hidden rounded-2xl"
            >
              <img
                src={location.image}
                alt={location.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-sm text-gray-200">{location.city}</p>

                <h3 className="mt-1 text-xl font-bold">{location.name}</h3>

                <p className="mt-1 text-sm text-gray-200">
                  {location.rooms.toLocaleString("vi-VN")} phòng
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
