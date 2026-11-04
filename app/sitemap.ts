import { MetadataRoute } from "next";
import { schoolData } from "@/lib/school-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${schoolData.school.domain ?? "visual-24-technical-institute.vercel.app"}`;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const coursePages: MetadataRoute.Sitemap = schoolData.courses.map(
    (course) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: course.featured ? 0.8 : 0.7,
    }),
  );

  return [...staticPages, ...coursePages];
}
