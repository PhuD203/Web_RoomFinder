import { Link } from "react-router-dom";

const locations = [
  {
    name: "Ninh Kiều",
    city: "Cần Thơ",
    rooms: 1245,
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cái Răng",
    city: "Cần Thơ",
    rooms: 856,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Long Xuyên",
    city: "An Giang",
    rooms: 523,
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Thốt Nốt",
    city: "Cần Thơ",
    rooms: 342,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
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
