import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import {
  getCourseBySlug,
  getOpenIntakeForCourse,
} from "@/lib/actions/course.actions";
import { getSiteSettings } from "@/lib/actions/settings.actions";
import { mediaForCourse } from "@/lib/site-content";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isComingSoon } from "@/lib/course-status";
import type { Course } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course" };
  return {
    title: course.title,
    description: course.summary,
    openGraph: {
      title: course.title,
      description: course.summary,
    },
  };
}

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-muted-foreground">
          Loading course…
        </div>
      }
    >
      <CourseDetailContent params={params} />
    </Suspense>
  );
}

async function CourseDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) notFound();

  const [settings, intake] = await Promise.all([
    getSiteSettings(),
    getOpenIntakeForCourse(course._id),
  ]);

  return (
    <CourseDetailView
      course={course}
      showFee={Boolean(settings.showFees && course.fee)}
      nextIntake={
        intake
          ? new Date(intake.startDate).toLocaleDateString("en-UG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : null
      }
    />
  );
}

function CourseDetailView({
  course,
  showFee,
  nextIntake,
}: {
  course: Course;
  showFee: boolean;
  nextIntake: string | null;
}) {
  const comingSoon = isComingSoon(course.status);

  return (
    <div>
      <PageHero
        kicker={course.level || "Course"}
        title={course.title}
        lede={course.summary}
        image={mediaForCourse(course.slug, course.image)}
        imageAlt={`${course.title} training at Visual 24 Technical Institute`}
      />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {comingSoon ? (
            <Badge variant="comingSoon">Coming soon</Badge>
          ) : course.level ? (
            <Badge
              variant={
                course.level === "Intermediate" ? "intermediate" : "beginner"
              }
            >
              {course.level}
            </Badge>
          ) : null}
          {!comingSoon && course.duration ? (
            <span className="text-sm text-muted-foreground">
              {course.duration}
            </span>
          ) : null}
          {showFee ? (
            <Badge variant="secondary">
              Fee: UGX {course.fee?.toLocaleString()}
            </Badge>
          ) : null}
        </div>

        {nextIntake ? (
          <p className="mb-8 text-muted-foreground">
            Next intake: <span className="font-medium text-foreground">{nextIntake}</span>
          </p>
        ) : null}

        {course.outline && course.outline.length > 0 ? (
          <div className="mb-10">
            <h2 className="text-xl font-semibold">What you will cover</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              {course.outline.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Outline topics may be updated after confirmation with the studio.
            </p>
          </div>
        ) : (
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Full syllabus coming soon. Contact us for the latest outline.
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {comingSoon ? (
            <Link
              href="/contact"
              className={buttonVariants({ className: "h-11 px-6" })}
            >
              Register interest
            </Link>
          ) : (
            <Link
              href={`/admissions?course=${course.slug}`}
              className={buttonVariants({
                variant: "accent",
                className: "h-11 px-6",
              })}
            >
              Apply
            </Link>
          )}
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "outline",
              className: "h-11 px-6",
            })}
          >
            Ask a question
          </Link>
        </div>
      </section>
    </div>
  );
}
