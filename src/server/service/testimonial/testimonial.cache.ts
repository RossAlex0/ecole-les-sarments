import { unstable_cache } from "next/cache";
import { TestimonialService } from "./testimonial.service";
import { CacheTag } from "../../cache/tags";

/**
 * Cached read of testimonials.
 * `revalidate: false` → Supabase is queried only once, then served from cache.
 * The cache is regenerated via `revalidateTag(CacheTag.TESTIMONIALS)` from the admin.
 */
export const getCachedTestimonials = unstable_cache(
  async () => {
    const { data, error } = await new TestimonialService().getAll();
    if (error) throw error;
    return data ?? [];
  },
  ["testimonials:all"],
  { tags: [CacheTag.TESTIMONIALS], revalidate: false },
);
