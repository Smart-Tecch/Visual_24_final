import { MetadataRoute } from "next";
import { schoolData } from "@/lib/school-data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/courses`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/admissions`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const coursePages: MetadataRoute.Sitemap = schoolData.courses.map(
    (course) => ({
      url: `${siteUrl}/courses/${course.slug}`,
      changeFrequency: "monthly" as const,
      priority: course.featured ? 0.8 : 0.7,
    }),
  );

  return [...staticPages, ...coursePages];
}
