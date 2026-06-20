"use client";
import { useState } from "react";
import Image from "next/image";
import { LuChevronDown } from "react-icons/lu";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { Events } from "@/utils/types/table";
import { formatMonthYear } from "@/utils/date/date";
import "./eventList.css";

const INITIAL_COUNT = 2;
const LOAD_MORE_STEP = 3;

export default function EventsList({ events }: { events: Events[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  if (!events || events.length === 0) return null;

  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  return (
    <section className="events_list">
      <header className="events_list_header">
        <SarmentsText format="title">Actualités des Sarments</SarmentsText>
        <SarmentsText format="text" className="events_list_subtitle">
          Découvrez les temps forts, projets et moments de vie qui rythment l&apos;année des
          enfants.
        </SarmentsText>
      </header>

      <ul className="events_list_items">
        {visibleEvents.map((event) => (
          <li key={event.id} className="event_card">
            {event.image_url && (
              <div className="event_card_image">
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div className="event_card_body">
              <span className="event_card_badge">{formatMonthYear(event.start_at)}</span>
              <SarmentsText format="semi-title-medium" color="blue">
                {event.title}
              </SarmentsText>

              <SarmentsText format="text" color="blue" className="event_card_desc">
                {expandedIds.has(event.id)
                  ? (event.description ?? event.short_description ?? " ")
                  : (event.short_description ?? " ")}
              </SarmentsText>

              <button
                onClick={() => toggleExpanded(event.id)}
                className="event_card_link"
                type="button"
              >
                {expandedIds.has(event.id) ? "Voir moins" : "Voir plus"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className="events_list_more"
          onClick={() => setVisibleCount((c) => c + LOAD_MORE_STEP)}
        >
          Découvrir plus d&apos;actualités
          <LuChevronDown />
        </button>
      )}
    </section>
  );
}
