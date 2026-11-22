import { EventService } from "../service/event/event.service";
import { getCachedPublishedEvents, getCachedNextEvent } from "../service/event/event.cache";
import { CacheTag, expireTag } from "../cache/tags";
import { parseBody } from "../http/validate";
import { eventCreateSchema, eventUpdateSchema } from "../validation/event.schema";
import type { RouteContext } from "../http/route";

export const EventController = {
  // Public (read through the Next cache)
  getPublished: async () => ({ data: await getCachedPublishedEvents() }),
  getNextEvent: async () => ({ data: await getCachedNextEvent() }),

  // Admin
  getAll: () => new EventService().getAll(),

  create: async (request: Request) => {
    const body = await parseBody(request, eventCreateSchema);
    const { data, error } = await new EventService().create(body);
    if (error) throw error;
    expireTag(CacheTag.EVENTS);
    return data;
  },

  update: async (request: Request, context: RouteContext) => {
    const { id } = await context.params;
    const body = await parseBody(request, eventUpdateSchema);
    const { data, error } = await new EventService().update(id, body);
    if (error) throw error;
    expireTag(CacheTag.EVENTS);
    return data;
  },

  remove: async (_request: Request, context: RouteContext) => {
    const { id } = await context.params;
    const { error } = await new EventService().remove(id);
    if (error) throw error;
    expireTag(CacheTag.EVENTS);
    return { success: true };
  },

  // Cron: remove events that started more than 10 months ago (+ their images).
  cleanupOld: async () => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - 10);

    const { deleted, error } = await new EventService().removeStartedBefore(cutoff.toISOString());
    if (error) throw error;
    if (deleted > 0) expireTag(CacheTag.EVENTS);
    return { deleted };
  },
};
