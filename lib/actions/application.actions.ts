"use server";

import { headers } from "next/headers";
import { applicationSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import Application from "@/lib/models/Application";

export async function createApplication(formData: FormData) {
  try {
    const parsed = applicationSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      dateOfBirth: formData.get("dateOfBirth") || "",
      courseSlug: formData.get("courseSlug"),
      message: formData.get("message") || "",
      website: formData.get("website") || "",
    });

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message || "Please check the form.",
      };
    }

    if (parsed.data.website) {
      return {
        success: true,
        message: "Application received. We will contact you soon.",
      };
    }

    const headerList = await headers();
    const ip =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headerList.get("x-real-ip") ||
      "unknown";
    if (!rateLimit(`application:${ip}`).ok) {
      return {
        success: false,
        message: "Too many applications. Please wait a few minutes and try again.",
      };
    }

    await dbConnect();
    const course = await Course.findOne({
      slug: parsed.data.courseSlug,
      hidden: { $ne: true },
    });

    if (!course || course.status === "coming-soon" || course.hidden) {
      return {
        success: false,
        message: "That course is not open for applications yet.",
      };
    }

    const dateOfBirth = parsed.data.dateOfBirth
      ? new Date(parsed.data.dateOfBirth)
      : undefined;

    await Application.create({
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      email: parsed.data.email,
      dateOfBirth:
        dateOfBirth && !Number.isNaN(dateOfBirth.getTime())
          ? dateOfBirth
          : undefined,
      course: course._id,
      message: parsed.data.message || "",
    });

    return {
      success: true,
      message: "Application received. We will contact you soon.",
    };
  } catch (error) {
    console.error("Error creating application:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
