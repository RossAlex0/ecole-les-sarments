import CitationBanner from "@/components/block/citation-banner/CitationBanner";
import Hero from "@/components/layout/hero/Hero";
import HomeFooter from "@/components/layout/home-footer/HomeFooter";
import Stat from "@/components/layout/stat/Stat";
import VideoSection from "@/components/layout/video-section/VideoSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <CitationBanner />
      <VideoSection />
      <Stat />
      <HomeFooter />
    </main>
  );
}
