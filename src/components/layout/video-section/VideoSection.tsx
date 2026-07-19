"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import "./videoSection.css";

const VIDEO_ID = "dnyKRCaplxs";

export default function VideoSection() {
  // Lazy YouTube facade: show a poster (thumbnail + dark filter + button) and
  // only load the ~1MB YouTube iframe on click — better LCP, no YouTube cookies
  // until the visitor opts in.
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => setPlaying(true), []);

  return (
    <section className="video_section">
      <div className="video_section_frame">
        {playing ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video_section_poster"
            onClick={play}
            aria-label="Lire la vidéo de présentation de l'école Les Sarments"
          >
            <Image
              className="video_section_thumbnail"
              src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
              alt="Aperçu de la vidéo de présentation de l'école Les Sarments"
              fill
              sizes="(max-width: 1024px) 100vw, 1440px"
            />
            <span className="video_section_cta">
              Voir la vidéo <FaPlay aria-hidden />
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
