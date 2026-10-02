import HeroSection from "../../components/common/HeroSection";
import FeaturedRooms from "./FeaturedRooms";
import PopularLocations from "../../components/common/PopularLocations";
import WhyChooseUs from "./WhyChooseUs";
import LandlordCTA from "../../components/common/LandlordCTA";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <FeaturedRooms />

      <PopularLocations />

      <WhyChooseUs />

      <LandlordCTA />
    </div>
  );
}
