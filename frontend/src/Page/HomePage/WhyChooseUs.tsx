const features = [
  {
    icon: "🔍",
    title: "Tìm kiếm dễ dàng",
    description:
      "Tìm phòng theo vị trí, giá thuê, diện tích và nhiều tiêu chí khác.",
  },
  {
    icon: "🛡️",
    title: "Thông tin rõ ràng",
    description:
      "Thông tin phòng được trình bày đầy đủ giúp bạn dễ dàng lựa chọn.",
  },
  {
    icon: "❤️",
    title: "Lưu phòng yêu thích",
    description: "Lưu lại những phòng bạn quan tâm để xem lại bất cứ lúc nào.",
  },
  {
    icon: "📱",
    title: "Sử dụng mọi thiết bị",
    description:
      "Giao diện responsive, sử dụng thuận tiện trên máy tính và điện thoại.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-semibold text-blue-600">FindRentalroom</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Tại sao chọn chúng tôi?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Những tính năng giúp việc tìm phòng trở nên đơn giản và thuận tiện
            hơn.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
