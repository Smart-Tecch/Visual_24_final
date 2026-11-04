import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import Intake from "@/lib/models/Intake";
import { serialize } from "@/lib/serialize";
import { rethrowNext } from "@/lib/next-errors";
import { isAvailable } from "@/lib/course-status";
import { categoryOrder, coursesFromSchoolData } from "@/lib/school-data";
import type { Course as CourseType } from "@/lib/types";

export type IntakeSummary = {
  _id: string;
  startDate: string;
  seats?: number;
  status: "open" | "closed";
};

function sortPublic(courses: CourseType[]) {
  return [...courses].sort((a, b) => {
    const byCategory = categoryOrder(a.category, b.category);
    if (byCategory !== 0) return byCategory;
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

function isVisible(course: CourseType) {
  return course.hidden !== true;
}

export async function findAllCourses(): Promise<CourseType[]> {
  await dbConnect();
  const courses = await Course.find().sort({ order: 1 }).lean();
  return serialize(courses);
}

export async function findPublicCourses(): Promise<CourseType[]> {
  try {
    await dbConnect();
    const courses = await Course.find({ hidden: { $ne: true } })
      .sort({ order: 1 })
      .lean();
    const list = serialize<CourseType[]>(courses).filter(isVisible);
    if (list.length > 0) return sortPublic(list);
  } catch (error) {
    rethrowNext(error);
    console.error("Error fetching courses:", error);
  }
  return sortPublic(coursesFromSchoolData().filter(isVisible));
}

/** Featured on home: available courses only (not coming-soon, not hidden). */
export async function findFeaturedCourses(): Promise<CourseType[]> {
  try {
    await dbConnect();
    const courses = await Course.find({
      featured: true,
      status: { $in: ["available", "active"] },
      hidden: { $ne: true },
    })
      .sort({ order: 1 })
      .lean();
    const list = serialize<CourseType[]>(courses).filter(isVisible);
    if (list.length > 0) return sortPublic(list);
  } catch (error) {
    rethrowNext(error);
    console.error("Error fetching featured courses:", error);
  }
  return sortPublic(
    coursesFromSchoolData().filter(
      (course) =>
        course.featured && isAvailable(course.status) && isVisible(course),
    ),
  );
}

export async function findCourseBySlug(
  slug: string,
): Promise<CourseType | null> {
  try {
    await dbConnect();
    const course = await Course.findOne({ slug, hidden: { $ne: true } }).lean();
    if (course) {
      const parsed = serialize<CourseType>(course);
      if (parsed.hidden) return null;
      return parsed;
    }
  } catch (error) {
    rethrowNext(error);
    console.error("Error fetching course:", error);
  }
  return (
    coursesFromSchoolData().find(
      (item) => item.slug === slug && isVisible(item),
    ) || null
  );
}

export async function findOpenIntakeForCourse(
  courseId: string,
): Promise<IntakeSummary | null> {
  if (!/^[a-f0-9]{24}$/i.test(courseId)) return null;
  try {
    await dbConnect();
    const intake = await Intake.findOne({
      course: courseId,
      status: "open",
    })
      .sort({ startDate: 1 })
      .lean();
    return intake ? serialize<IntakeSummary>(intake) : null;
  } catch (error) {
    rethrowNext(error);
    console.error("Error fetching intake:", error);
    return null;
  }
}
