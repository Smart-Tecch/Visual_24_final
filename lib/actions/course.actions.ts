"use server";

import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";

// Get all courses
export async function getCourses() {
  try {
    await dbConnect();
    const courses = await Course.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// Get featured courses
export async function getFeaturedCourses() {
  try {
    await dbConnect();
    const courses = await Course.find({ isFeatured: true })
      .sort({ order: 1 })
      .lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Error fetching featured courses:", error);
    return [];
  }
}

// Get single course by slug
export async function getCourseBySlug(slug: string) {
  try {
    await dbConnect();
    const course = await Course.findOne({ slug }).lean();
    return course ? JSON.parse(JSON.stringify(course)) : null;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}
