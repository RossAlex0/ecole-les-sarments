import { EventController } from "@/server/controller/event.controller";
import { adminRoute } from "@/server/http/route";

export const GET = adminRoute(EventController.getAll);
export const POST = adminRoute(EventController.create);
