"use server";

import {
  findCourseBySlug,
  findFeaturedCourses,
  findOpenIntakeForCourse,
  findPublicCourses,
  type IntakeSummary,
} from "@/lib/data/courses";
import { Course as CourseType } from "@/lib/types";

export async function getCourses(): Promise<CourseType[]> {
  return findPublicCourses();
}

export async function getFeaturedCourses(): Promise<CourseType[]> {
  return findFeaturedCourses();
}

export async function getCourseBySlug(
  slug: string,
): Promise<CourseType | null> {
  return findCourseBySlug(slug);
}

export async function getOpenIntakeForCourse(
  courseId: string,
): Promise<IntakeSummary | null> {
  return findOpenIntakeForCourse(courseId);
}
