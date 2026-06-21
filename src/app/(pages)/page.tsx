import CitationBanner from "@/components/block/citation-banner/CitationBanner";
import EventHome from "@/components/block/event-home/EventHome";
import Hero from "@/components/layout/hero/Hero";
import HomeFooter from "@/components/layout/home-footer/HomeFooter";
import Stat from "@/components/layout/stat/Stat";
import VideoSection from "@/components/layout/video-section/VideoSection";
import { organizationJsonLd } from "@/utils/seo/organization";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main>
        <Hero />
        <CitationBanner />
        <VideoSection />
        <Stat />
        <EventHome />
        <HomeFooter />
      </main>
    </>
  );
}
