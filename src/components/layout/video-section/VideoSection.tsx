import "./videoSection.css";

export default function VideoSection() {
  return (
    <section className="video_section">
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
