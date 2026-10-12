import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/design", "/art", "/collect", "/supducks", "/tools", "/about"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: p === "/collect" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/collect" ? 0.9 : 0.8,
  }));
}
