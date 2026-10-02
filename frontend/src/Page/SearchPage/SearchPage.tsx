import HeroSection from "../../components/common/HeroSection";
import RoomResults from "../SearchPage/RoomResults";
import LandlordCTA from "../../components/common/LandlordCTA";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <RoomResults />
      <LandlordCTA />
    </div>
  );
}
