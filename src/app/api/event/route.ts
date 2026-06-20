import { EventController } from "@/server/controller/event.controller";
import { publicRoute } from "@/server/http/route";

// Public: published events.
export const GET = publicRoute(EventController.getPublished);
