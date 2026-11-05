import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedCourses } from "@/lib/actions/course.actions";
import { getFeaturedProjects } from "@/lib/actions/project.actions";
import CourseCard from "@/components/CourseCard";
import { Project } from "@/lib/types";
import { schoolData } from "@/lib/school-data";
import { mediaForProject, studioCategories, siteImages } from "@/lib/site-content";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: {
    absolute: schoolData.seo.defaultTitle,
  },
  description: schoolData.seo.description,
};

export default function HomePage() {
  const home = schoolData.pages.home;
  const about = schoolData.pages.about;
  const settings = schoolData.school;

  return (
    <div className="bg-background text-foreground">
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <Image
          src={siteImages.hero}
          alt="Students learning web and computer skills at Visual 24 Technical Institute"
          fill
          priority
          className="object-cover object-[68%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,18,46,0.9)_0%,rgba(8,18,46,0.62)_46%,rgba(8,18,46,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,18,46,0.45),transparent_38%)]" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pt-28 pb-14 sm:px-8 lg:items-center lg:pb-16">
          <div className="max-w-xl">
            <p className="kicker text-[#f6d48a]">{settings.motto}</p>
            <h1 className="mt-4 text-5xl leading-[0.95] font-semibold tracking-tight text-white sm:text-7xl">
              {settings.shortName}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              {home.heroSubtitle}
            </p>
            {home.heroTags?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {home.heroTags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      [
                        "bg-[#dbe7ff] text-[#163273]",
                        "bg-[#ffe8c2] text-[#7a4b08]",
                        "bg-[#ffd6de] text-[#8c1024]",
                      ][index % 3]
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={home.primaryCta.href}
                className={buttonVariants({
                  className:
                    "h-11 bg-white px-6 !text-[#0b1f4b] hover:bg-[#eef2fb] hover:!text-[#0b1f4b]",
                })}
              >
                {home.primaryCta.label}
              </Link>
              <Link
                href={home.secondaryCta.href}
                className={buttonVariants({
                  variant: "accent",
                  className: "h-11 px-6",
                })}
              >
                {home.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="kicker text-muted-foreground">Our studios</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Three paths. Technical first.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studioCategories.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group relative min-h-[420px] overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark-100 via-dark-100/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="kicker">{category.name}</p>
                  <p className="mt-3 text-sm text-white/85">{category.blurb}</p>
                  <p className="mt-4 text-sm font-medium">View courses →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker text-muted-foreground">The standard</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Practical training for Kampala and beyond.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {settings.tagline ||
              schoolData.school.tagline}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-0 px-5 py-8 sm:px-8 lg:grid-cols-2">
        <article className="bg-card px-8 py-14 shadow-sm ring-1 ring-border lg:px-12">
          <p className="kicker text-muted-foreground">Our mission</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            {about.mission}
          </h2>
          <p className="mt-5 text-muted-foreground">
            We lead with web, coding and computer studies — then creative and
            business studios taught by working practitioners.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm font-semibold underline underline-offset-4"
          >
            Read more
          </Link>
        </article>
        <div className="relative min-h-[320px] overflow-hidden">
          <Image
            src={siteImages.mission}
            alt="Students working together on laptops"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <article className="bg-dark-100 px-8 py-14 text-white lg:px-12">
          <p className="kicker text-primary">The studio code</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Honor the work. Honor each other.
          </h2>
          <p className="mt-5 text-white/70">{about.studioCode}</p>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            Read more
          </Link>
        </article>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-dark-100 px-8 py-12 text-white sm:px-12">
            <Image
              src={siteImages.admissionsBanner}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-dark-100/75" />
            <div className="relative">
            <p className="kicker text-primary">Admissions</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start with a conversation.
            </h2>
            <p className="mt-4 max-w-2xl text-white/75">
              Tell us which course interests you. We will help you visit the
              studio and complete your application.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/admissions"
                className={buttonVariants({
                  variant: "accent",
                  className: "h-11 px-6",
                })}
              >
                Apply
              </Link>
              <Link
                href="/contact"
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "h-11 border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white",
                })}
              >
                Inquire
              </Link>
            </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <Suspense
        fallback={
          <div className="py-20 text-center text-muted-foreground">
            Loading courses...
          </div>
        }
      >
        <FeaturedCoursesSection />
      </Suspense>

      <Suspense fallback={null}>
        <FeaturedProjectsSection />
      </Suspense>
    </div>
  );
}

async function FeaturedCoursesSection() {
  await connection();
  const featuredCourses = await getFeaturedCourses();

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="kicker text-muted-foreground">Academics</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Featured courses
            </h2>
            <p className="mt-2 text-muted-foreground">
              Technical courses first — web, coding and computer studies.
            </p>
          </div>
          <Link
            href="/courses"
            className={buttonVariants({
              variant: "outline",
              className: "hidden h-10 px-4 sm:inline-flex",
            })}
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

async function FeaturedProjectsSection() {
  await connection();
  const featuredProjects: Project[] = await getFeaturedProjects();

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="bg-light-100 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="kicker text-muted-foreground">Student work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Proof in the portfolio
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-semibold underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project._id.toString()}
              href={`/projects/${project.slug}`}
              className="group"
            >
              <Card className="gap-0 overflow-hidden py-0 ring-border transition group-hover:-translate-y-1 group-hover:shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src={mediaForProject(
                      project.category,
                      project.coverImage || project.images?.[0],
                    )}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardContent className="p-5">
                  <p className="kicker text-muted-foreground">
                    {project.category}
                  </p>
                  <CardTitle className="mt-2 text-xl font-semibold">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
