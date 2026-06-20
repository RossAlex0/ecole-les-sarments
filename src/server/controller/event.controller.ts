import { EventService } from "../service/event/event.service";
import { NextResponse } from "next/server";

export const EventController = {
  getAllEvents: async () => {
    try {
      const eventService = new EventService();

      const events = await eventService.getAll();
      return NextResponse.json(events);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },
  getUpcomingNews: async () => {
    try {
      const eventService = new EventService();

      const events = await eventService.getNews();
      return NextResponse.json(events);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },
  getNextEvent: async () => {
    try {
      const eventService = new EventService();

      const events = await eventService.getNext();
      return NextResponse.json(events);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },
};
