"use server";

import { headers } from "next/headers";
import { inquirySchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import dbConnect from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";

export async function createContactMessage(formData: FormData) {
  try {
    const parsed = inquirySchema.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email") || "",
      courseInterest: formData.get("courseInterest") || "",
      message: formData.get("message"),
      website: formData.get("website") || "",
    });

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message || "Please check the form.",
      };
    }

    // Honeypot: bots fill hidden fields. Humans leave this empty.
    if (parsed.data.website) {
      return { success: true, message: "Message sent successfully! We will contact you soon." };
    }

    const headerList = await headers();
    const ip =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headerList.get("x-real-ip") ||
      "unknown";
    if (!rateLimit(`inquiry:${ip}`).ok) {
      return {
        success: false,
        message: "Too many messages. Please wait a few minutes and try again.",
      };
    }

    await dbConnect();

    await ContactMessage.create({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || undefined,
      courseInterest: parsed.data.courseInterest || undefined,
      message: parsed.data.message,
    });

    return {
      success: true,
      message: "Message sent successfully! We will contact you soon.",
    };
  } catch (error) {
    console.error("Error creating contact message:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
