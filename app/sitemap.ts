import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://visual-24-technical-institute.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: "2026-10-28",
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2026-10-28",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
