import Link from "next/link";
import { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block bg-zinc-900 rounded-2xl overflow-hidden hover:ring-2 hover:ring-orange-500 transition"
    >
      <div className="aspect-[4/3] bg-zinc-800 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Course Image</span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {course.level && (
            <span className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded">
              {course.level}
            </span>
          )}
          {course.duration && (
            <span className="text-xs text-gray-400">{course.duration}</span>
          )}
        </div>

        <h3 className="text-lg font-semibold group-hover:text-orange-400 transition">
          {course.title}
        </h3>
        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
          {course.shortDescription}
        </p>
      </div>
    </Link>
  );
}
