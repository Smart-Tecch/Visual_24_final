import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { getCourses } from "@/lib/actions/course.actions";
import CourseCard from "@/components/CourseCard";
import PageHero from "@/components/PageHero";
import { siteImages } from "@/lib/site-content";
import { categoryName, schoolData } from "@/lib/school-data";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Technical training first — web, coding and computer studies — plus creative and business studios at Visual 24 Technical Institute.",
};

export default function CoursesPage() {
  return (
    <div>
      <PageHero
        kicker="Academics"
        title="Courses that start with doing."
        lede="Technical training first — web, coding and computer studies — plus creative and business studios."
        image={siteImages.pages.courses}
        imageAlt="Students at computers during a Visual 24 coding class"
      />
      <Suspense
        fallback={
          <div className="py-16 text-center text-muted-foreground">
            Loading courses…
          </div>
        }
      >
        <CoursesByCategory />
      </Suspense>
    </div>
  );
}

async function CoursesByCategory() {
  await connection();
  const courses = await getCourses();

  const categories = [...schoolData.categories].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="flex flex-col gap-16">
        {categories.map((category) => {
          const inCategory = courses.filter(
            (course) => course.category === category.slug,
          );
          if (inCategory.length === 0) return null;

          return (
            <div key={category.slug} id={category.slug}>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {categoryName(category.slug)}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {category.slug === "technical"
                  ? "Our core focus — taught in-house."
                  : null}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inCategory.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
