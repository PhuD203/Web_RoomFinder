"use client";

import { useState, useEffect } from "react";
import type { MapLocationProps } from "../../types";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// ===============================
// CLICK MAP
// ===============================

type MapClickProps = {
  onMapClick: (lat: number, lng: number) => void;
};

function MapClick({ onMapClick }: MapClickProps) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

// ===============================
// CENTER MAP
// ===============================

function MapCenter({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 14);
  }, [map, position]);

  return null;
}

// ===============================
// COMPONENT
// ===============================

export default function MapLocation({
  latitude,
  longitude,
  onChange,
}: MapLocationProps) {
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    latitude,
    longitude,
  ]);

  const [searchText, setSearchText] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  const [searchError, setSearchError] = useState("");

  // Đồng bộ khi latitude / longitude từ component cha thay đổi
  useEffect(() => {
    setSelectedPosition([latitude, longitude]);
  }, [latitude, longitude]);

  // ===============================
  // CLICK MAP
  // ===============================

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
    onChange?.(lat, lng);
  };

  // ===============================
  // KÉO MARKER
  // ===============================

  const handleMarkerDragEnd = (event: L.DragEndEvent) => {
    const marker = event.target as L.Marker;

    const position = marker.getLatLng();

    const lat = position.lat;
    const lng = position.lng;

    setSelectedPosition([lat, lng]);

    onChange?.(lat, lng);
  };

  // ===============================
  // TÌM KIẾM ĐỊA CHỈ
  // ===============================

  const handleSearch = async () => {
    if (!searchText.trim()) {
      return;
    }

    try {
      setIsSearching(true);
      setSearchError("");

      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(
          searchText,
        )}&limit=1`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Không thể tìm kiếm vị trí");
      }

      const data = await response.json();

      if (!data?.features || data.features.length === 0) {
        setSearchError("Không tìm thấy vị trí này");
        return;
      }

      // Photon: [longitude, latitude]
      const [lng, lat] = data.features[0].geometry.coordinates;

      setSelectedPosition([lat, lng]);

      // Trả tọa độ về component cha
      onChange?.(lat, lng);
    } catch (error) {
      console.error("Search location error:", error);
      setSearchError("Có lỗi xảy ra khi tìm kiếm vị trí");
    } finally {
      setIsSearching(false);
    }
  };

  // ENTER ĐỂ TÌM

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative z-0 w-full">
      {/* TITLE */}
      <h2 className="mb-3 text-center text-xl font-bold">BẢN ĐỒ</h2>

      {/* SEARCH */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Nhập địa chỉ cần tìm..."
            className="
              flex-1
              rounded-lg
              border
              border-gray-300
              px-4
              py-2.5
              outline-none
              focus:border-green-500
              focus:ring-1
              focus:ring-green-500
            "
          />

          <button
            type="button"
            onClick={handleSearch}
            disabled={isSearching}
            className="
              rounded-lg
              bg-green-600
              px-5
              py-2.5
              font-medium
              text-white
              hover:bg-green-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isSearching ? "Đang tìm..." : "Tìm kiếm"}
          </button>
        </div>

        {searchError && (
          <p className="mt-2 text-sm text-red-500">{searchError}</p>
        )}
      </div>

      {/* MAP */}
      <div
        className="
          relative
          overflow-hidden
          rounded-xl
          border
          border-gray-300
          shadow-sm
        "
      >
        <MapContainer
          center={[latitude, longitude]}
          zoom={14}
          scrollWheelZoom={true}
          className="h-[450px] w-full"
        >
          <MapCenter position={selectedPosition} />

          {/* BẢN ĐỒ */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
            maxZoom={19}
          />

          {/* CLICK MAP */}
          <MapClick onMapClick={handleMapClick} />

          {/* MARKER */}
          <Marker
            position={selectedPosition}
            draggable={true}
            icon={defaultIcon}
            eventHandlers={{
              dragend: handleMarkerDragEnd,
            }}
          >
            <Popup>
              <div>
                <b>Vị trí đã chọn</b>

                <br />

                <span>Vĩ độ: {selectedPosition[0].toFixed(6)}</span>

                <br />

                <span>Kinh độ: {selectedPosition[1].toFixed(6)}</span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
