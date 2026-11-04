import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ApplicationForm from "@/components/ApplicationForm";
import { admissionSteps, siteImages } from "@/lib/site-content";
import { getCourses } from "@/lib/actions/course.actions";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Visit Visual 24 Technical Institute, then apply for a technical or creative course.",
};

export default function AdmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  return (
    <div>
      <PageHero
        kicker="Admissions"
        title="Come see the rooms. Then apply."
        lede="A visit, a conversation, and a start date. We keep the process human so you can focus on the work."
        image={siteImages.pages.admissions}
        imageAlt="Web design session at Visual 24 Technical Institute"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {admissionSteps.map((item) => (
            <Card key={item.step}>
              <CardContent>
                <p className="kicker text-primary">{item.step}</p>
                <CardTitle className="mt-3 text-2xl">{item.title}</CardTitle>
                <p className="mt-3 text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="kicker text-muted-foreground">Apply</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Short application
            </h2>
            <p className="mt-3 text-muted-foreground">
              Coming-soon courses have no apply button. Choose an active course
              and we will follow up about a visit day.
            </p>
          </div>
          <Card>
            <CardContent className="pt-2">
              <Suspense
                fallback={
                  <p className="text-muted-foreground">Loading form…</p>
                }
              >
                <ApplicationSection searchParams={searchParams} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

async function ApplicationSection({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  await connection();
  const [{ course }, courses] = await Promise.all([
    searchParams,
    getCourses(),
  ]);
  return (
    <ApplicationForm courses={courses} defaultCourseSlug={course} />
  );
}
