import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import type { AddressMapRef } from "../../types/ref";
import type { AddressMapProps } from "../../types";
import MapLocation from "../CreateCardRoom/MapLocation";

const AddressMap = forwardRef<AddressMapRef, AddressMapProps>(
  ({ address, coordinates }, ref) => {
    const [addressState, setAddressState] = useState<AddressMapProps>({
      address: address ?? "",
      coordinates: {
        latitude: coordinates?.latitude ?? 10.761005,
        longitude: coordinates?.longitude ?? 106.673791,
      },
    });
    useEffect(() => {
      setAddressState({
        address: address ?? "",
        coordinates: {
          latitude: coordinates?.latitude ?? 10.761005,
          longitude: coordinates?.longitude ?? 106.673791,
        },
      });
    }, [address, coordinates]);

    useImperativeHandle(ref, () => ({
      getData: () => addressState,
    }));

    return (
      <section className="rounded-2xl border border-[#E7E9EC] bg-white p-5 lg:col-span-2">
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-extrabold text-[#2D2F33]">Địa chỉ</h2>
          </div>
        </div>
        <MapLocation
          longitude={addressState.coordinates!.longitude}
          latitude={addressState.coordinates!.latitude}
          onChange={(lat, lng) => {
            setAddressState((prev) => ({
              ...prev,
              coordinates: {
                latitude: lat,
                longitude: lng,
              },
            }));
          }}
        />
        {/* ADDRESS */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-bold text-[#2D2F33]">
            Địa chỉ đã chọn
          </label>
          <input
            type="text"
            placeholder="Địa chỉ sẽ hiển thị sau khi chọn trên bản đồ"
            value={addressState.address ?? ""}
            onChange={(e) => {
              setAddressState((prev) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
            className="h-12 w-full rounded-xl border border-[#D9DDE1] bg-[#F8F9FA] px-4 text-sm text-[#73777D] outline-none placeholder:text-[#A0A4AA]"
          />
        </div>
      </section>
    );
  },
);
export default AddressMap;
