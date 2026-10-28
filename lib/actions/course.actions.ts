"use server";

import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import { Course as CourseType } from "@/lib/types";

export async function getCourses(): Promise<CourseType[]> {
  try {
    await dbConnect();
    const courses = await Course.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(courses)) as CourseType[];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function getFeaturedCourses(): Promise<CourseType[]> {
  try {
    await dbConnect();
    const courses = await Course.find({ isFeatured: true })
      .sort({ order: 1 })
      .lean();
    return JSON.parse(JSON.stringify(courses)) as CourseType[];
  } catch (error) {
    console.error("Error fetching featured courses:", error);
    return [];
  }
}

export async function getCourseBySlug(
  slug: string,
): Promise<CourseType | null> {
  try {
    await dbConnect();
    const course = await Course.findOne({ slug }).lean();
    return course ? (JSON.parse(JSON.stringify(course)) as CourseType) : null;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}
