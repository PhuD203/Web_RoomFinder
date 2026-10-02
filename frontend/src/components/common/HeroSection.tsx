import SearchSection from "./SearchSection";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/10" />
      <div className="relative mx-auto max-w-7xl py-10 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 mt-4 px-10 py-3 inline-flex items-center rounded-full bg-white/60 text-[22px] font-medium text-black backdrop-blur">
            🏠 FindRentalRoom -Nền tảng tìm phòng trọ
          </div>
          <div className="">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Tìm phòng trọ phù hợp với bạn
              <br />
            </h1>
          </div>
          <div className="mb-[80px]">
            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-8 text-blue-50">
              Dễ dàng tìm kiếm phòng trọ phù hợp với nhu cầu, ngân sách và vị
              trí của bạn.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-6 text-[15px] text-white">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Nhiều lựa chọn</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Tìm kiếm nhanh</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Thông tin rõ ràng</span>
              </div>
            </div>
          </div>

          <SearchSection />
        </div>
      </div>
    </section>
  );
}
