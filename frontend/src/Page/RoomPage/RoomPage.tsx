import { useState, useEffect } from "react";
import RoomTitle from "./RoomTitle";
import RoomPicture from "./RoomPicture";
import ContactCard from "./ContactCard";
import RoomDescription from "./RoomDescription";
import FeaturedRooms from "../HomePage/FeaturedRooms";
import { useParams } from "react-router-dom";
import {
  getRoomDetail,
  isFavoritecheck,
  deleteFavorite,
  addFavorite,
} from "../../services";

export default function RoomPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [room, setRoom] = useState<any>(null);
  const token = localStorage.getItem("token");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    const fetchRooms = async () => {
      try {
        if (token) {
          try {
            const favorite = await isFavoritecheck(id);
            setIsFavorite(favorite);
          } catch (error) {
            console.error("Lỗi kiểm tra favorite:", error);
          }
        }

        const data = await getRoomDetail(id);
        setRoom(data);
      } catch (error) {
        console.error(error);
      }
    };
    window.scrollTo(0, 0);

    fetchRooms();
  }, []);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        const result = await deleteFavorite(room.id);
        if (result) {
          setIsFavorite(false);
        }
      } else {
        const result = await addFavorite(room.id);
        if (result) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error("Lỗi xử lý yêu thích:", error);
    }
  };

  //Thong tin

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#2D2F33]">
      {/* HEADER */}
      <main className="mx-auto max-w-7xl px-5 py-6 lg:px-8 lg:py-8">
        {/* TITLE */}
        {room && (
          <>
            <RoomTitle
              room={room}
              isFavorite={isFavorite}
              setIsFavorite={handleFavorite}
            />
            {/* IMAGE GALLERY */}
            <RoomPicture
              pictures={room.images}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
            />
            {/* MAIN CONTENT */}
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
              {/* LEFT */}
              <RoomDescription
                description={room.description}
                area={room.area}
                address={room.address}
                coordinates={room.coordinates}
                amenities={room.amenities}
                roomInfo={room.roomInfo ?? null}
              />

              {/* RIGHT - CONTACT CARD */}
              <ContactCard price={room.price} owner={room.owner} />
            </div>
            <FeaturedRooms />
          </>
        )}
      </main>
    </div>
  );
}
