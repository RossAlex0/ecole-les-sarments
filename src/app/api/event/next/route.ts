import { EventController } from "@/server/controller/event.controller";
import { publicRoute } from "@/server/http/route";

// Public: the next upcoming highlighted event.
export const GET = publicRoute(EventController.getNextEvent);
