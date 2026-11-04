import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(9, "Enter a valid phone number")
  .max(20, "Enter a valid phone number");

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone,
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  courseInterest: z.string().trim().max(120).optional(),
  message: z.string().trim().min(8, "Please write a short message").max(2000),
  website: z.string().optional(),
});

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(80),
  phone,
  email: z.string().trim().email("Enter a valid email"),
  dateOfBirth: z.string().optional(),
  courseSlug: z.string().trim().min(1, "Choose a course"),
  message: z.string().trim().max(2000).optional(),
  website: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
