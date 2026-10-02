import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import type { PictureRoomRef } from "../../types/ref";
import type { ImageItem, NewImageItem } from "../../types";
import type { ChangeEvent } from "react";

const PictureRoom = forwardRef<PictureRoomRef, { picture?: string[] }>(
  ({ picture }, ref) => {
    // Ảnh ban đầu từ backend

    const [initialImages, setInitialImages] = useState<ImageItem[]>([]);

    // Danh sách ảnh đang hiển thị
    const [images, setImages] = useState<ImageItem[]>(
      (picture ?? []).map((url, index) => ({
        url,
        imageIndex: index + 1,
      })),
    );

    // Ảnh mới thêm
    const [imageFiles, setImageFiles] = useState<NewImageItem[]>([]);

    // Index của ảnh ban đầu bị xóa
    const [deletedIndexes, setDeletedIndexes] = useState<number[]>([]);

    useEffect(() => {
      const newInitialImages = (picture ?? []).map((url, index) => ({
        url,
        imageIndex: index + 1,
      }));

      setInitialImages(newInitialImages);
      setImages(newInitialImages);
    }, [picture]);

    const imageInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      getData: () => ({
        images,
        imageFiles,
        deletedIndexes,
      }),
    }));

    // IMAGE
    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      if (!files.length) return;

      const remaining = 5 - images.length;

      if (remaining <= 0) {
        e.target.value = "";
        return;
      }

      const selectedFiles = files.slice(0, remaining);

      const newImages: ImageItem[] = [];
      const newImageFiles: NewImageItem[] = [];
      const maxImageIndex = Math.max(
        0,
        ...images.map((image) => image.imageIndex),
      );

      selectedFiles.forEach((file, index) => {
        const imageIndex = maxImageIndex + index + 1;

        const url = URL.createObjectURL(file);

        newImages.push({
          url,
          imageIndex,
        });

        newImageFiles.push({
          file,
          imageIndex,
          url,
        });
      });

      setImages((prev) => [...prev, ...newImages]);

      setImageFiles((prev) => [...prev, ...newImageFiles]);

      e.target.value = "";
    };

    const removeImage = (index: number) => {
      const image = images[index];

      if (!image) return;

      const isInitialImage = initialImages.some(
        (item) => item.imageIndex === image.imageIndex,
      );

      // Chỉ ảnh ban đầu bị xóa mới lưu index
      if (isInitialImage) {
        setDeletedIndexes((prev) => {
          if (prev.includes(image.imageIndex)) {
            return prev;
          }

          return [...prev, image.imageIndex];
        });
      }

      // Nếu là ảnh mới thì xóa khỏi imageFiles
      setImageFiles((prev) =>
        prev.filter((item) => item.imageIndex !== image.imageIndex),
      );

      // Xóa URL tạm
      if (image.url.startsWith("blob:")) {
        URL.revokeObjectURL(image.url);
      }

      // Xóa khỏi danh sách hiển thị
      setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <section className="rounded-2xl border border-[#E7E9EC] bg-white p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-extrabold text-[#2D2F33]">Hình ảnh</h2>
          </div>

          <span className="text-xs font-semibold text-[#73777D]">
            {images.length}/5 ảnh
          </span>
        </div>

        {/* UPLOAD */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          className="hidden"
        />

        <button
          type="button"
          disabled={images.length >= 5}
          onClick={() => imageInputRef.current?.click()}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#BFC4C9] bg-[#FAFAFA] text-sm font-bold text-[#2D2F33] transition hover:bg-[#F2F3F4] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="text-lg">+</span>
          Thêm hình ảnh
        </button>

        <p className="mt-3 text-xs leading-5 text-[#8A8F96]">
          Tối đa 5 ảnh. Ảnh đầu tiên sẽ được dùng làm ảnh đại diện.
        </p>

        {/* IMAGE PREVIEW */}
        {images.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {images.map((image, index) => (
              <div
                key={`${image.imageIndex}-${image.url}`}
                className="group relative aspect-square overflow-hidden rounded-xl bg-[#F0F1F2]"
              >
                <img
                  src={image.url}
                  alt={`Ảnh ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;

                    if (img.dataset.fallback !== "true") {
                      img.dataset.fallback = "true";
                      img.src = `http://localhost:507${image.url}`;
                    } else {
                      img.src = "/images/no-image.png";
                    }
                  }}
                />

                {/* MAIN IMAGE */}
                {index === 0 && (
                  <div className="absolute left-2 top-2 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold text-[#2D2F33]">
                    Ảnh đại diện
                  </div>
                )}

                {/* DELETE */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#2D2F33]/80 text-sm text-white opacity-100 transition hover:bg-[#2D2F33] lg:opacity-0 lg:group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  },
);

export default PictureRoom;
