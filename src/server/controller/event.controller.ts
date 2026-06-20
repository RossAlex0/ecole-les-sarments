import { EventService } from "../service/event/event.service";
import { handleRequest } from "./handleRequest";

export const EventController = {
  getAllEvents: () => handleRequest(() => new EventService().getAll()),
  getUpcomingNews: () => handleRequest(() => new EventService().getNews()),
  getNextEvent: () => handleRequest(() => new EventService().getNext()),
};
