import NextEvent from "@/components/layout/event/next-event/NextEvent";
import { getCachedNextEvent } from "@/server/service/event/event.cache";

import "./eventHome.css";

export default async function EventHome() {
  const nextEvent = await getCachedNextEvent();

  return <div className="event_home">{nextEvent && <NextEvent event={nextEvent} />}</div>;
}
