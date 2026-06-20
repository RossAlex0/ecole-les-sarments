import { TestimonialController } from "@/server/controller/testimonial.controller";
import { publicRoute } from "@/server/http/route";

// Public: list published testimonials, submit a new one (created pending).
export const GET = publicRoute(TestimonialController.publicList);
export const POST = publicRoute(TestimonialController.publicCreate);
