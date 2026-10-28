import { connection, NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/actions/project.actions";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  await connection();
  try {
    const { slug } = await params;

    const project = await getProjectBySlug(slug);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/projects/[slug] error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project",
      },
      { status: 500 },
    );
  }
}
