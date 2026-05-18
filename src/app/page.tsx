import Header from "@/components/block/header/Header";
import Hero from "@/components/layout/hero/Hero";
import Stat from "@/components/layout/stat/Stat";
import VideoSection from "@/components/layout/video-section/VideoSection";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <VideoSection />
      <Stat />
    </main>
  );
}
