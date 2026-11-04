"use client";

import { useState } from "react";
import { createApplication } from "@/lib/actions/application.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Course } from "@/lib/types";

export default function ApplicationForm({
  courses,
  defaultCourseSlug,
}: {
  courses: Course[];
  defaultCourseSlug?: string;
}) {
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [pending, setPending] = useState(false);
  const openCourses = courses.filter((course) => course.status === "active");
  const selectedSlug = openCourses.some((course) => course.slug === defaultCourseSlug)
    ? defaultCourseSlug
    : openCourses[0]?.slug;

  async function onSubmit(formData: FormData) {
    setPending(true);
    setStatus(null);
    const result = await createApplication(formData);
    setStatus(result);
    setPending(false);
  }

  if (openCourses.length === 0) {
    return (
      <p className="text-muted-foreground">
        Applications open when a course is listed as active. Inquire and we will
        tell you the next start date.
      </p>
    );
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      />
      <label className="flex flex-col gap-2 text-sm font-medium">
        Full name
        <Input name="fullName" required placeholder="Your full name" className="h-11" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Phone
          <Input name="phone" required placeholder="Phone number" className="h-11" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Email
          <Input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-11"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Date of birth (optional)
        <Input name="dateOfBirth" type="date" className="h-11" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Course
        <select
          name="courseSlug"
          required
          defaultValue={selectedSlug}
          className="h-11 rounded-md border border-border bg-background px-3"
        >
          {openCourses.map((course) => (
            <option key={course.slug} value={course.slug}>
              {course.title}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Message (optional)
        <Textarea
          name="message"
          placeholder="What do you want to learn, and when can you start?"
          className="min-h-28"
        />
      </label>
      <Button type="submit" disabled={pending} className="h-11 w-full sm:w-auto">
        {pending ? "Sending…" : "Submit application"}
      </Button>
      {status ? (
        <p
          className={
            status.success ? "text-sm text-dark-200" : "text-sm text-destructive"
          }
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
