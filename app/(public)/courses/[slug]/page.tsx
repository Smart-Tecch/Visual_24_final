import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { mediaForCourse } from "@/lib/site-content";
import { coursesFromSchoolData } from "@/lib/school-data";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/types";

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
  const fromDb = await getCourseBySlug(slug);
  const course =
    fromDb || coursesFromSchoolData().find((item) => item.slug === slug) || null;

  if (!course) notFound();

  return <CourseDetailView course={course} />;
}

function CourseDetailView({ course }: { course: Course }) {
  const comingSoon = course.status === "coming-soon";
  const showFee = false;

  return (
    <div>
      <PageHero
        kicker={course.level || "Course"}
        title={course.title}
        lede={course.summary}
        image={mediaForCourse(course.slug, course.image)}
      />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {comingSoon ? <Badge>Coming soon</Badge> : null}
          {course.duration ? (
            <Badge variant="secondary">{course.duration}</Badge>
          ) : null}
          {course.level ? <Badge variant="outline">{course.level}</Badge> : null}
          {showFee ? (
            <Badge variant="secondary">
              Fee: UGX {course.fee?.toLocaleString()}
            </Badge>
          ) : null}
        </div>

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
              href="/admissions"
              className={buttonVariants({ className: "h-11 px-6" })}
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
