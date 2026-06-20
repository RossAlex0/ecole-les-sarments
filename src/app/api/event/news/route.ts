import { EventController } from "@/server/controller/event.controller";
import { publicRoute } from "@/server/http/route";

// Public: upcoming news/events.
export const GET = publicRoute(EventController.getUpcomingNews);
