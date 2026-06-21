import { revalidateTag } from "next/cache";
import { EventService } from "../service/event/event.service";
import {
  getCachedPublishedEvents,
  getCachedUpcomingNews,
  getCachedNextEvent,
} from "../service/event/event.cache";
import { CacheTag } from "../cache/tags";
import { parseBody } from "../http/validate";
import { eventCreateSchema, eventUpdateSchema } from "../validation/event.schema";
import type { RouteContext } from "../http/route";

export const EventController = {
  // Public (read through the Next cache)
  getPublished: async () => ({ data: await getCachedPublishedEvents() }),
  getUpcomingNews: async () => ({ data: await getCachedUpcomingNews() }),
  getNextEvent: async () => ({ data: await getCachedNextEvent() }),

  // Admin
  getAll: () => new EventService().getAll(),

  create: async (request: Request) => {
    const body = await parseBody(request, eventCreateSchema);
    const { data, error } = await new EventService().create(body);
    if (error) throw error;
    revalidateTag(CacheTag.EVENTS, "max");
    return data;
  },

  update: async (request: Request, context: RouteContext) => {
    const { id } = await context.params;
    const body = await parseBody(request, eventUpdateSchema);
    const { data, error } = await new EventService().update(id, body);
    if (error) throw error;
    revalidateTag(CacheTag.EVENTS, "max");
    return data;
  },

  remove: async (_request: Request, context: RouteContext) => {
    const { id } = await context.params;
    const { error } = await new EventService().remove(id);
    if (error) throw error;
    revalidateTag(CacheTag.EVENTS, "max");
    return { success: true };
  },
};
