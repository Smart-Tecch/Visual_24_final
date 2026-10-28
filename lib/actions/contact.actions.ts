"use server";

import dbConnect from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";

export async function createContactMessage(formData: FormData) {
  try {
    await dbConnect();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const courseInterest = formData.get("courseInterest") as string;
    const message = formData.get("message") as string;

    if (!name || !phone || !message) {
      return {
        success: false,
        message: "Name, phone and message are required",
      };
    }

    await ContactMessage.create({
      name,
      phone,
      email: email || undefined,
      courseInterest: courseInterest || undefined,
      message,
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
