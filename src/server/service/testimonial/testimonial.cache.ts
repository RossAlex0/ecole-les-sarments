import { unstable_cache } from "next/cache";
import { TestimonialService } from "./testimonial.service";
import { CacheTag } from "../../cache/tags";

/**
 * Lecture cachée des témoignages.
 * `revalidate: false` → Supabase n'est interrogé qu'une fois puis servi depuis le cache.
 * Le cache est régénéré via `revalidateTag(CacheTag.TESTIMONIALS)` depuis l'admin.
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
