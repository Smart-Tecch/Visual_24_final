"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import ContactMessage from "@/lib/models/ContactMessage";
import Application from "@/lib/models/Application";
import Intake from "@/lib/models/Intake";
import Project from "@/lib/models/Project";
import { slugify } from "@/lib/slug";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/courses");
  revalidatePath("/projects");
  revalidatePath("/admissions");
  revalidatePath("/admin/courses");
  revalidatePath("/admin/projects");
}

export async function updateCourseFromAdmin(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const category = String(formData.get("category") || "");
  const level = String(formData.get("level") || "Beginner");
  const duration = String(formData.get("duration") || "").trim();
  const status = String(formData.get("status") || "active");
  const featured = formData.get("featured") === "on";
  const hidden = formData.get("hidden") === "on";
  const order = Number(formData.get("order") || 0);
  const outline = String(formData.get("outline") || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!id || !title || !summary) {
    return;
  }

  await Course.findByIdAndUpdate(id, {
    title,
    summary,
    category,
    level,
    duration: duration || undefined,
    status,
    featured: status === "coming-soon" || hidden ? false : featured,
    hidden,
    order,
    outline,
  });

  revalidatePublic();
}

export async function createCourseFromAdmin(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const category = String(formData.get("category") || "technical");
  const level = String(formData.get("level") || "Beginner");
  const duration = String(formData.get("duration") || "").trim();
  const status = String(formData.get("status") || "active");
  const featured = formData.get("featured") === "on";
  const order = Number(formData.get("order") || 99);
  const slugInput = String(formData.get("slug") || "").trim();
  const slug = slugify(slugInput || title);

  if (!title || !summary || !slug) return;

  await Course.create({
    title,
    slug,
    summary,
    category,
    level,
    duration: duration || undefined,
    status,
    featured: status === "coming-soon" ? false : featured,
    hidden: false,
    order,
    outline: [],
  });

  revalidatePublic();
}

export async function createIntakeFromAdmin(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const courseId = String(formData.get("courseId") || "");
  const startDate = String(formData.get("startDate") || "");
  const seats = Number(formData.get("seats") || 0);
  const status = String(formData.get("status") || "open");

  if (!courseId || !startDate) return;

  await Intake.create({
    course: courseId,
    startDate: new Date(startDate),
    seats: seats || undefined,
    status,
  });

  revalidatePublic();
}

export async function updateIntakeStatus(formData: FormData) {
  await requireAdmin();
  await dbConnect();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "closed");
  await Intake.findByIdAndUpdate(id, { status });
  revalidatePublic();
}

export async function createProjectFromAdmin(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const coverImage = String(formData.get("coverImage") || "").trim();
  const images = String(formData.get("images") || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const studentNames = String(formData.get("studentNames") || "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
  const published = formData.get("published") === "on";
  const isFeatured = formData.get("isFeatured") === "on";
  const slug = slugify(String(formData.get("slug") || title));

  if (!title || !description || !category || !slug) return;

  await Project.create({
    title,
    slug,
    description,
    category,
    coverImage: coverImage || images[0] || undefined,
    images,
    studentNames,
    published,
    isFeatured: published ? isFeatured : false,
  });

  revalidatePublic();
}

export async function updateProjectFromAdmin(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const coverImage = String(formData.get("coverImage") || "").trim();
  const published = formData.get("published") === "on";
  const isFeatured = formData.get("isFeatured") === "on";
  const studentNames = String(formData.get("studentNames") || "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

  if (!id || !title || !description) return;

  await Project.findByIdAndUpdate(id, {
    title,
    description,
    category,
    coverImage: coverImage || undefined,
    studentNames,
    published,
    isFeatured: published ? isFeatured : false,
  });

  revalidatePublic();
}

export async function updateInquiryStatus(formData: FormData) {
  await requireAdmin();
  await dbConnect();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "new");
  await ContactMessage.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/inquiries");
}

export async function updateApplicationStatus(formData: FormData) {
  await requireAdmin();
  await dbConnect();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "new");
  await Application.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/applications");
}
