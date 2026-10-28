import { connection, NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/actions/course.actions";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  await connection();
  try {
    const { slug } = await params;

    const course = await getCourseBySlug(slug);

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: course,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/courses/[slug] error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch course",
      },
      { status: 500 },
    );
  }
}
