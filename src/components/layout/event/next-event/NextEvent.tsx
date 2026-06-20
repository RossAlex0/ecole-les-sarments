"use client";
import Image from "next/image";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { Events } from "@/utils/types/table";
import { formatEventDate } from "@/utils/date/date";
import "./nextEvent.css";

export default function NextEvent({ event }: { event: Events }) {
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

      {event.image_url && (
        <div className="next_event_image_wrapper">
          <div className="next_event_image">
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
