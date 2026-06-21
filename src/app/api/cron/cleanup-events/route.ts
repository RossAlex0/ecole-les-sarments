import { cronRoute } from "@/server/http/route";
import { EventController } from "@/server/controller/event.controller";

// Triggered by Vercel Cron (see vercel.json). Protected by CRON_SECRET.
export const GET = cronRoute(EventController.cleanupOld);
