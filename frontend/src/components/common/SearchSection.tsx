import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchSection() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");

  const handleSearch = () => {
    const query = [];

    if (location) {
      query.push(`location=${encodeURIComponent(location)}`);
    }
    if (price) {
      query.push(`price=${price}`);
    }
    if (area) {
      query.push(`area=${area}`);
    }
    navigate(`/search?${query.join("&")}`);
  };

  return (
    <div className="mx-auto mt-10 max-w-5xl rounded-2xl bg-white p-4 shadow-2xl">
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
        {/* Location */}
        <div>
          <div className="flex flex-row pl-2 gap-2">
            <span className="text-xl">📍</span>
            <label className="block text-[18px] font-medium text-black">
              Địa điểm
            </label>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
            <div className="flex-1 text-left">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bạn muốn ở đâu?"
                className="mt-1 w-full border-none p-0 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Price */}
        <div>
          <div className="flex flex-row pl-2 gap-2">
            <span className="text-sl">💰</span>
            <label className="block text-[18px] font-medium text-black">
              Khoảng giá
            </label>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
            <div className="flex-1 text-left">
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full bg-transparent text-sm text-gray-900 outline-none"
              >
                <option value="">Tất cả mức giá</option>
                <option value="under-2">Dưới 2 triệu</option>
                <option value="2-3">2 - 3 triệu</option>
                <option value="3-5">3 - 5 triệu</option>
                <option value="over-5">Trên 5 triệu</option>
              </select>
            </div>
          </div>
        </div>

        {/* Area */}
        <div>
          <div className="flex flex-row pl-2 gap-2">
            <span className="text-sl">📐</span>
            <label className="block text-[18px] font-medium text-black">
              Diện tích
            </label>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
            <div className="flex-1 text-left">
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="mt-1 w-full bg-transparent text-sm text-gray-900 outline-none"
              >
                <option value="">Tất cả diện tích</option>
                <option value="under-20">Dưới 20 m²</option>
                <option value="20-30">20 - 30 m²</option>
                <option value="30-50">30 - 50 m²</option>
                <option value="over-50">Trên 50 m²</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="self-stretch whitespace-nowrap rounded-xl bg-blue-600 px-5 text-[17px] font-semibold text-white transition hover:bg-blue-700"
        >
          🔍 Tìm phòng
        </button>
      </div>
    </div>
  );
}
