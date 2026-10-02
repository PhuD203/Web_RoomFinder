import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import type { AmenitiesRoomRef } from "../../types/ref";
import type { KeyboardEvent } from "react";

const AmenitiesRoom = forwardRef<AmenitiesRoomRef, { amenities?: string[] }>(
  ({ amenities }, ref) => {
    const [amenityInput, setAmenityInput] = useState("");
    const [amenitiesState, setAmenitiesState] = useState<string[]>(
      amenities ?? [],
    );
    useEffect(() => {
      setAmenitiesState(amenities ?? []);
    }, [amenities]);
    useImperativeHandle(ref, () => ({
      getData: () => amenitiesState,
    }));
    const addAmenity = () => {
      const value = amenityInput.trim();
      if (!value) return;
      const duplicate = amenitiesState.some(
        (item) => item.toLowerCase() === value.toLowerCase(),
      );
      if (duplicate) {
        setAmenityInput("");
        return;
      }
      setAmenitiesState((prev) => [...prev, value]);
      setAmenityInput("");
    };
    const handleAmenityKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addAmenity();
      }
    };
    const removeAmenity = (index: number) => {
      setAmenitiesState((prev) => prev.filter((_, i) => i !== index));
    };
    return (
      <section className="rounded-2xl border border-[#E7E9EC] bg-white p-5">
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-extrabold text-[#2D2F33]">Tiện ích</h2>
          </div>
        </div>
        {/* INPUT */}
        <div className="flex gap-2">
          <input
            type="text"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            onKeyDown={handleAmenityKeyDown}
            placeholder="VD: Máy lạnh"
            className="h-11 min-w-0 flex-1 rounded-xl border border-[#D9DDE1] px-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#A0A4AA] focus:border-[#2D2F33]"
          />
          <button
            type="button"
            onClick={addAmenity}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2D2F33] text-xl font-medium text-white transition hover:bg-[#1A1B1E]"
          >
            +
          </button>
        </div>
        {/* AMENITIES */}
        {amenitiesState.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {amenitiesState.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center gap-2 rounded-full bg-[#F0F1F2] px-3 py-2 text-sm text-[#2D2F33]"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[#73777D] transition hover:bg-[#D9DDE1] hover:text-[#2D2F33]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs leading-5 text-[#8A8F96]">
          Nhập tiện ích rồi nhấn Enter hoặc nút +
        </p>
      </section>
    );
  },
);
export default AmenitiesRoom;
