import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/site";

// Public, indexable pages (admin/api excluded via robots).
const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/teaching-approach", priority: 0.8, changeFrequency: "monthly" },
  { path: "/school", priority: 0.8, changeFrequency: "monthly" },
  { path: "/student-life", priority: 0.7, changeFrequency: "weekly" },
  { path: "/support-us", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
