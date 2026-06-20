import { TestimonialController } from "@/server/controller/testimonial.controller";
import { adminRoute } from "@/server/http/route";

export const GET = adminRoute(TestimonialController.listAll);
export const POST = adminRoute(TestimonialController.adminCreate);
