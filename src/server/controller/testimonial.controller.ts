import { TestimonialService } from "../service/testimonial/testimonial.service";
import { handleRequest } from "./handleRequest";

export const TestimonialController = {
  getAllTestimonials: () => handleRequest(() => new TestimonialService().getAll()),
};
