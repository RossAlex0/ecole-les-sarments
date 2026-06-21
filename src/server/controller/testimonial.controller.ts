import { revalidateTag } from "next/cache";
import { TestimonialService } from "../service/testimonial/testimonial.service";
import { getCachedTestimonials } from "../service/testimonial/testimonial.cache";
import { CacheTag } from "../cache/tags";
import { parseBody } from "../http/validate";
import {
  testimonialAdminCreateSchema,
  testimonialPublicCreateSchema,
  testimonialUpdateSchema,
} from "../validation/testimonial.schema";
import type { RouteContext } from "../http/route";

export const TestimonialController = {
  // Public (read through the Next cache)
  publicList: async () => ({ data: await getCachedTestimonials() }),

  publicCreate: async (request: Request) => {
    const body = await parseBody(request, testimonialPublicCreateSchema);
    const { data, error } = await new TestimonialService().create({
      author: body.author,
      content: body.content,
      school_level: body.school_level,
      is_published: false,
    });
    if (error) throw error;
    return data;
  },

  // Admin
  listAll: () => new TestimonialService().getAll(),

  adminCreate: async (request: Request) => {
    const body = await parseBody(request, testimonialAdminCreateSchema);
    const isPublished = Boolean(body.is_published);
    const { data, error } = await new TestimonialService().create({
      author: body.author,
      content: body.content,
      school_level: body.school_level,
      is_published: isPublished,
    });
    if (error) throw error;
    if (isPublished) revalidateTag(CacheTag.TESTIMONIALS, "max");
    return data;
  },

  update: async (request: Request, context: RouteContext) => {
    const { id } = await context.params;
    const body = await parseBody(request, testimonialUpdateSchema);
    const { data, error } = await new TestimonialService().update(id, body);
    if (error) throw error;
    revalidateTag(CacheTag.TESTIMONIALS, "max");
    return data;
  },

  remove: async (_request: Request, context: RouteContext) => {
    const { id } = await context.params;
    const { error } = await new TestimonialService().remove(id);
    if (error) throw error;
    revalidateTag(CacheTag.TESTIMONIALS, "max");
    return { success: true };
  },
};
