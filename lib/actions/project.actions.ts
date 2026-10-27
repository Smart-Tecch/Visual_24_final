"use server";

import dbConnect from "@/lib/db";
import Project from "@/lib/models/Project";

// Get all projects
export async function getProjects() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Get featured projects
export async function getFeaturedProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

// Get single project by slug
export async function getProjectBySlug(slug: string) {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug }).populate("course").lean();
    return project ? JSON.parse(JSON.stringify(project)) : null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}
