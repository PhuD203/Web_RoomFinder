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
// Click bản đồ
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

// Component chính
function MapCenter({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 14);
  }, [map, position]);

  return null;
}
export default function MapLocation({
  latitude,
  longitude,
  onChange,
}: MapLocationProps) {
  // Vị trí marker đang chọn
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    latitude,
    longitude,
  ]);
  useEffect(() => {
    setSelectedPosition([latitude, longitude]);
  }, [latitude, longitude]);
  // Click bản đồ
  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
    onChange?.(lat, lng);
  };
  // Kéo marker
  const handleMarkerDragEnd = (event: L.DragEndEvent) => {
    const marker = event.target as L.Marker;
    const position = marker.getLatLng();
    const lat = position.lat;
    const lng = position.lng;
    setSelectedPosition([lat, lng]);
    onChange?.(lat, lng);
  };
  // Lấy vị trí hiện tại
  // const handleLocationChange = (lat: number, lng: number) => {
  //   setSelectedPosition([lat, lng]);
  //   onChange?.(lat, lng);
  // };
  return (
    <div className="relative z-0 w-full">
      {/* TITLE */}
      <h2 className="mb-3 text-center text-xl font-bold">BẢN ĐỒ</h2>
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
          className="
            h-[450px]
            w-full
          "
        >
          <MapCenter position={selectedPosition} />
          {/* LỚP BẢN ĐỒ */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
          />
          {/* CLICK MAP */}
          <MapClick onMapClick={handleMapClick} />
          {/* <LocationButton onLocationChange={handleLocationChange} /> */}
          {/* MARKER VỊ TRÍ ĐANG CHỌN */}
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
