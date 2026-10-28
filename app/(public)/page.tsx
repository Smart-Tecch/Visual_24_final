import { connection } from "next/server";
import { getFeaturedCourses } from "@/lib/actions/course.actions";
import { getFeaturedProjects } from "@/lib/actions/project.actions";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import { Course, Project } from "@/lib/types";

export default async function HomePage() {
  // This makes the page dynamic (Next.js 15/16 way)
  await connection();

  const [featuredCourses, featuredProjects] = await Promise.all([
    getFeaturedCourses(),
    getFeaturedProjects(),
  ]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Visual <span className="text-orange-500">24</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Master Film, Photography, Design & Digital Creativity
          </p>
          <Link
            href="/courses"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Courses</h2>
            <p className="text-gray-400 mt-2">Start your creative journey</p>
          </div>
          <Link href="/courses" className="text-orange-500 hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 max-w-7xl mx-auto bg-zinc-950 rounded-3xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Student Projects</h2>
            <p className="text-gray-400 mt-2">
              Work from our talented students
            </p>
          </div>
          <Link href="/projects" className="text-orange-500 hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className="group block bg-zinc-900 rounded-2xl overflow-hidden hover:ring-2 hover:ring-orange-500 transition"
            >
              <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Project Image</span>
              </div>
              <div className="p-5">
                <p className="text-sm text-orange-500 mb-1">
                  {project.category}
                </p>
                <h3 className="text-xl font-semibold group-hover:text-orange-400 transition">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
