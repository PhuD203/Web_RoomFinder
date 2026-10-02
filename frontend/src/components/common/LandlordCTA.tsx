import { Link } from "react-router-dom";

export default function LandlordCTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-8 py-14 text-center sm:px-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />

          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Bạn có phòng muốn cho thuê?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Đăng tin phòng trọ của bạn và tiếp cận những người đang có nhu cầu
              tìm phòng.
            </p>

            <Link
              to="/create-room"
              className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Đăng tin ngay →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
