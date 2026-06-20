import { TestimonialController } from "@/server/controller/testimonial.controller";
import { adminRoute } from "@/server/http/route";

export const PATCH = adminRoute(TestimonialController.update);
export const DELETE = adminRoute(TestimonialController.remove);
