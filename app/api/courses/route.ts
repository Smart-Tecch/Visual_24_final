import { NextResponse } from "next/server";
import { getCourses, getFeaturedCourses } from "@/lib/actions/course.actions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const courses =
      featured === "true" ? await getFeaturedCourses() : await getCourses();

    return NextResponse.json(
      {
        success: true,
        data: courses,
        count: courses.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch courses",
      },
      { status: 500 },
    );
  }
}
