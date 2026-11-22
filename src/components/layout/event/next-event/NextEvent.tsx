"use client";
import type { CSSProperties } from "react";
import Image from "next/image";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { Events } from "@/utils/types/table";
import { formatEventDate } from "@/utils/date/date";
import "./nextEvent.css";

export default function NextEvent({ event }: { event: Events }) {
  const { image_url, image_width, image_height } = event;

  // Stored ratio drives the CSS width: a tall image shrinks in width instead
  // of exceeding the max height. Unknown size → full width, natural height.
  const imageStyle =
    image_width && image_height
      ? ({ "--_ratio": image_width / image_height } as CSSProperties)
      : undefined;

  return (
    <section className="next_event">
      <header className="next_event_header">
        <div className="next_event_title_row">
          <SarmentsText format="title">Notre prochain événement</SarmentsText>
          <span className="next_event_badge">{formatEventDate(event.start_at)}</span>
        </div>
        {event.short_description && (
          <SarmentsText format="text" className="next_event_subtitle">
            {event.short_description}
          </SarmentsText>
        )}
      </header>

      {image_url && (
        <div className="next_event_image_wrapper">
          <div className="next_event_image" style={imageStyle}>
            <Image
              src={image_url}
              alt={event.title}
              // Real size when known (no layout shift); 0/0 + CSS `height: auto` otherwise.
              width={image_width ?? 0}
              height={image_height ?? 0}
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
