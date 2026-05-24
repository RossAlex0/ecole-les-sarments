import CitationBanner from "@/components/block/citation-banner/CitationBanner";
import Footer from "@/components/block/footer/Footer";
import Header from "@/components/block/header/Header";
import Hero from "@/components/layout/hero/Hero";
import HomeFooter from "@/components/layout/home-footer/HomeFooter";
import Stat from "@/components/layout/stat/Stat";
import VideoSection from "@/components/layout/video-section/VideoSection";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <CitationBanner />
      <VideoSection />
      <Stat />
      <HomeFooter />
      <Footer />
    </main>
  );
}
