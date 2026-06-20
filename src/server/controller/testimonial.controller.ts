import { revalidateTag } from "next/cache";
import { TestimonialService } from "../service/testimonial/testimonial.service";
import { getCachedTestimonials } from "../service/testimonial/testimonial.cache";
import { HttpError } from "../http/httpError";
import { CacheTag } from "../cache/tags";
import type { RouteContext } from "../http/route";

function assertContent(body: { author?: unknown; content?: unknown }) {
  if (!body?.author || !body?.content) {
    throw new HttpError(400, "Auteur et témoignage sont requis.");
  }
}

export const TestimonialController = {
  // Public (read through the Next cache)
  publicList: async () => ({ data: await getCachedTestimonials() }),

  publicCreate: async (request: Request) => {
    const body = await request.json();
    assertContent(body);
    const { data, error } = await new TestimonialService().create({
      author: body.author,
      content: body.content,
      school_level: body.school_level ?? null,
      is_published: false,
    });
    if (error) throw error;
    return data;
  },

  // Admin
  listAll: () => new TestimonialService().getAll(),

  adminCreate: async (request: Request) => {
    const body = await request.json();
    assertContent(body);
    const isPublished = Boolean(body.is_published);
    const { data, error } = await new TestimonialService().create({
      author: body.author,
      content: body.content,
      school_level: body.school_level ?? null,
      is_published: isPublished,
    });
    if (error) throw error;
    if (isPublished) revalidateTag(CacheTag.TESTIMONIALS, "max");
    return data;
  },

  update: async (request: Request, context: RouteContext) => {
    const { id } = await context.params;
    const body = await request.json();
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
