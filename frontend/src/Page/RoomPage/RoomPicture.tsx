import type { RoomPictureProps } from "../../types";

export default function RoomPicture({
  pictures,
  activeImage,
  setActiveImage,
}: RoomPictureProps) {
  const images = pictures.map((image, index) => ({
    id: index,
    image,
  }));
  const otherpicture = images.filter((_, index) => index !== activeImage);
  return (
    <section className="grid gap-3 overflow-hidden rounded-2xl lg:grid-cols-[2fr_1fr] pt-2">
      {/* MAIN IMAGE */}
      <div className="relative h-[280px] overflow-hidden sm:h-[400px] lg:h-[520px]">
        <img
          src={`http://localhost:507${pictures[activeImage]}`}
          alt=""
          className="h-full w-full object-cover transition-all duration-300"
        />

        {/* IMAGE COUNT */}
        <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur">
          {activeImage + 1} / {pictures.length}
        </div>
      </div>

      {/* OTHER IMAGES */}
      <div className="hidden grid-cols-2 gap-3 lg:grid">
        {otherpicture.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveImage(image.id)}
            className="group relative overflow-hidden"
          >
            <img
              src={`http://localhost:507${image.image}`}
              alt=""
              className="h-full min-h-[250px] w-full object-cover transition duration-300 group-hover:scale-105"
            />

            {index === 3 && pictures.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <span className="text-sm font-semibold">
                  +{pictures.length - 5} ảnh
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* MOBILE THUMBNAILS */}
      <div className="flex gap-2 overflow-x-auto lg:hidden">
        {pictures.map((image, index) => (
          <button
            key={image}
            onClick={() => setActiveImage(index)}
            className={`h-20 w-24 flex-none overflow-hidden rounded-lg border-2 ${
              activeImage === index ? "border-[#2D2F33]" : "border-transparent"
            }`}
          >
            <img
              src={`http://localhost:507${image}`}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
