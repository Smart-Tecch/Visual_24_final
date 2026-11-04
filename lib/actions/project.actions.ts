"use server";

import dbConnect from "@/lib/db";
import Project from "@/lib/models/Project";
import { Project as ProjectType } from "@/lib/types";

function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

export async function getProjects(): Promise<ProjectType[]> {
  try {
    await dbConnect();
    const projects = await Project.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();
    return serialize(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<ProjectType[]> {
  try {
    await dbConnect();
    const projects = await Project.find({ published: true, isFeatured: true })
      .sort({ createdAt: -1 })
      .lean();
    return serialize(projects);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getPublishedProjectCount(): Promise<number> {
  try {
    await dbConnect();
    return Project.countDocuments({ published: true });
  } catch (error) {
    console.error("Error counting projects:", error);
    return 0;
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectType | null> {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug, published: true })
      .populate("course")
      .lean();
    return project ? serialize(project) : null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}
