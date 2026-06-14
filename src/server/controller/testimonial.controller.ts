import { NextResponse } from "next/server";
import { TestimonialService } from "../service/testimonial/testimonial.service";

export const TestimonialController = {
  getAllTestimonials: async () => {
    try {
      const testimonialService = new TestimonialService();
      const testimonials = await testimonialService.getAll();
      return NextResponse.json(testimonials);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },
};
