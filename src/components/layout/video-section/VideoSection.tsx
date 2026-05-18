import Quote from "@/components/ui/quote/Quote";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "./video-section.css";

export default function VideoSection() {
  return (
    <section className="video_section">
      <div className="video_section_text">
        <Quote className="first_quote" />
        <div className="video_section_title">
          <SarmentsText format="fat-title">Connaitre pour aimer, aimer pour connaitre</SarmentsText>
          <SarmentsText format="text">Notre formidable devise</SarmentsText>
        </div>
        <Quote className="last_quote" />
      </div>
      <div className="video_section_frame">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/9n2s8Xo1l3c"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
