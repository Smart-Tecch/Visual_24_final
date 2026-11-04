"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import ContactMessage from "@/lib/models/ContactMessage";
import Application from "@/lib/models/Application";

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
    featured: status === "coming-soon" ? false : featured,
    order,
    outline,
  });

  revalidatePath("/");
  revalidatePath("/courses");
  revalidatePath("/admin/courses");
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
