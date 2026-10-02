import type { RoomDescriptionProps } from "../../types";

export default function RoomDescription({
  description,
  area,
  address,
  coordinates,
  amenities,
  roomInfo,
}: RoomDescriptionProps) {
  function InfoRow({
    label,
    value,
  }: {
    label: string;
    value: string | number | null | undefined;
  }) {
    return (
      <div className="flex justify-between gap-5 border-b border-gray-100 pb-3 pr-5">
        <span className="text-sm text-gray-500">{label}</span>

        <span className="text-right text-sm font-semibold">{value}</span>
      </div>
    );
  }
  return (
    <div>
      {/* DESCRIPTION */}
      <section className="border-b py-8">
        <h2 className="text-xl font-bold">Mô tả phòng</h2>

        <p className="mt-4 text-[15px] leading-7 text-gray-600">
          {description}
        </p>
      </section>

      {/* AMENITIES */}
      <section className="border-b py-8">
        <h2 className="text-xl font-bold">Tiện nghi</h2>

        <div className="mt-5 grid grid-cols-2 gap-y-5 sm:grid-cols-3">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                ✓
              </span>

              {amenity}
            </div>
          ))}
        </div>
      </section>

      {/* ROOM INFORMATION */}
      <section className="border-b py-8">
        <h2 className="text-xl font-bold">Thông tin phòng</h2>

        <div className="mt-5 grid grid-cols-1 gap-y-4 sm:grid-cols-2">
          <InfoRow label="Loại phòng" value={roomInfo?.type} />

          <InfoRow label="Diện tích" value={`${area} m²`} />

          <InfoRow label="Số người tối đa" value={roomInfo?.people} />

          <InfoRow label="Nội thất" value={roomInfo?.furniture} />

          <InfoRow label="Điện" value={roomInfo?.electricity} />

          <InfoRow label="Nước" value={roomInfo?.water} />

          <InfoRow label="Khác" value={roomInfo?.other} />
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-8">
        <h2 className="text-xl font-bold">Vị trí</h2>

        <p className="mt-3 text-sm text-gray-600">{address}</p>

        <div className="mt-5 h-[300px] overflow-hidden rounded-2xl">
          <iframe
            title="Vị trí phòng trọ"
            src={`https://www.google.com/maps?q=${coordinates?.latitude},${coordinates?.longitude}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
