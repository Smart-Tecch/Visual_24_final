"use server";

import dbConnect from "@/lib/db";
import Project from "@/lib/models/Project";
import { Project as ProjectType } from "@/lib/types";

export async function getProjects(): Promise<ProjectType[]> {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects)) as ProjectType[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<ProjectType[]> {
  try {
    await dbConnect();
    const projects = await Project.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(projects)) as ProjectType[];
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectType | null> {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug }).populate("course").lean();
    return project
      ? (JSON.parse(JSON.stringify(project)) as ProjectType)
      : null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}
