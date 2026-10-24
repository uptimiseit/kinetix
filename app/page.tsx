import ShoeHubHeroSection from "@/components/sections/ShoeHubHeroSection";
import CustomizerSection from "@/components/sections/CustomizerSection";
import LookbookSection from "@/components/sections/LookbookSection";
import AnatomySection from "@/components/sections/AnatomySection";
import CollectionSection from "@/components/sections/CollectionSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Character-Figurine Carousel Hero ("ShoeHub / ToonHub") */}
      <ShoeHubHeroSection />

      {/* Section 2: Live 3D Multi-Colorway & Material Studio (Click-to-Change Color) */}
      <CustomizerSection />

      {/* Section 3: Interactive Model "Occasion & Outfit Matcher" (Virtual Model Lookbook) */}
      <LookbookSection />

      {/* Section 4: Exploded 3D Anatomy & Performance Tech */}
      <AnatomySection />

      {/* Section 5: Trending Footwear Grid & E-Commerce Catalog */}
      <CollectionSection />
    </div>
  );
}
