import raw from "@/reference/school-data.json";
import type { Course } from "@/lib/types";

export const schoolData = raw;

export type SchoolData = typeof schoolData;

export function formatAddress() {
  const { line1, line2, area, country } = schoolData.school.address;
  return [line1, line2, area, country].filter(Boolean).join(", ");
}

/** Static course list from JSON — used only when MongoDB is unavailable (local dev). */
export function coursesFromSchoolData(): Course[] {
  return schoolData.courses.map((course) => ({
    _id: course.slug,
    title: course.title,
    slug: course.slug,
    summary: course.summary,
    duration: course.duration ?? undefined,
    level: course.level as Course["level"],
    category: course.category as Course["category"],
    status: course.status as Course["status"],
    featured: course.featured,
    order: course.order,
    outline: course.outline?.length ? course.outline : undefined,
    fee: course.fee ?? undefined,
    instructor: course.instructor ?? undefined,
  }));
}

export function categoryOrder(a: string, b: string) {
  const order = new Map(
    schoolData.categories.map((c) => [c.slug, c.order] as const),
  );
  return (order.get(a) ?? 99) - (order.get(b) ?? 99);
}

export function categoryName(slug: string) {
  return (
    schoolData.categories.find((c) => c.slug === slug)?.name ??
    slug.charAt(0).toUpperCase() + slug.slice(1)
  );
}
