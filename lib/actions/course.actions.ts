"use server";

import {
  findAllCourses,
  findCourseBySlug,
  findFeaturedCourses,
} from "@/lib/data/courses";
import { Course as CourseType } from "@/lib/types";

export async function getCourses(): Promise<CourseType[]> {
  try {
    return await findAllCourses();
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function getFeaturedCourses(): Promise<CourseType[]> {
  try {
    return await findFeaturedCourses();
  } catch (error) {
    console.error("Error fetching featured courses:", error);
    return [];
  }
}

export async function getCourseBySlug(
  slug: string,
): Promise<CourseType | null> {
  try {
    return await findCourseBySlug(slug);
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}
