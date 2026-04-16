import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ["/", "/login", "/register"].map((url) => ({
    url,
    lastModified
  }));
}
