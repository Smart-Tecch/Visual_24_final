import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getProjectBySlug } from "@/lib/actions/project.actions";
import { mediaForProject } from "@/lib/site-content";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-muted-foreground">
          Loading project…
        </div>
      }
    >
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}

async function ProjectDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div>
      <PageHero
        kicker={project.category}
        title={project.title}
        lede={project.description}
        image={mediaForProject(
          project.category,
          project.coverImage || project.images?.[0],
        )}
      />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Badge variant="secondary">{project.category}</Badge>
        {project.studentNames && project.studentNames.length > 0 ? (
          <p className="mt-6 text-muted-foreground">
            {project.studentNames.join(", ")}
          </p>
        ) : null}
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <Link
          href="/projects"
          className={buttonVariants({
            variant: "outline",
            className: "mt-10 h-11 px-6",
          })}
        >
          All projects
        </Link>
      </section>
    </div>
  );
}
