import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import type { Course as CourseType } from "@/lib/types";

function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

export async function findAllCourses(): Promise<CourseType[]> {
  await dbConnect();
  const courses = await Course.find().sort({ order: 1 }).lean();
  return serialize(courses);
}

/** Featured on home: active courses only (not coming-soon). */
export async function findFeaturedCourses(): Promise<CourseType[]> {
  await dbConnect();
  const courses = await Course.find({ featured: true, status: "active" })
    .sort({ order: 1 })
    .lean();
  return serialize(courses);
}

export async function findCourseBySlug(
  slug: string,
): Promise<CourseType | null> {
  await dbConnect();
  const course = await Course.findOne({ slug }).lean();
  return course ? serialize(course) : null;
}
