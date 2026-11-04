import { Suspense } from "react";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/actions/project.actions";
import PageHero from "@/components/PageHero";
import { mediaForProject, siteImages } from "@/lib/site-content";
import { Project } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <div>
      <PageHero
        kicker="Student work"
        title="The portfolio is the proof."
        lede="Real student projects will appear here once they are published from the admin area."
        image={siteImages.pages.projects}
        imageAlt="Creative studio work at Visual 24 Technical Institute"
      />
      <Suspense
        fallback={
          <div className="py-16 text-center text-muted-foreground">
            Loading projects…
          </div>
        }
      >
        <ProjectGrid />
      </Suspense>
    </div>
  );
}

async function ProjectGrid() {
  await connection();
  const projects: Project[] = await getProjects();

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Student work is coming soon. Check back after the first cohort ships
          projects.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project) => (
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
                  <CardTitle className="mt-2 text-xl">
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
      )}
    </section>
  );
}
