import { NextResponse, connection } from "next/server";
import {
  getProjects,
  getFeaturedProjects,
} from "@/lib/actions/project.actions";

export async function GET(request: Request) {
  await connection(); // ✅ Add this line right at the start of GET
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const projects =
      featured === "true" ? await getFeaturedProjects() : await getProjects();

    return NextResponse.json(
      {
        success: true,
        data: projects,
        count: projects.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
      },
      { status: 500 },
    );
  }
}
