import { EventController } from "@/server/controller/event.controller";
import { adminRoute } from "@/server/http/route";

export const PATCH = adminRoute(EventController.update);
export const DELETE = adminRoute(EventController.remove);
