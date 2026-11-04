import Link from "next/link";
import Image from "next/image";
import { Course } from "@/lib/types";
import { isComingSoon } from "@/lib/course-status";
import { courseNotifyHref } from "@/lib/phone";
import { mediaForCourse } from "@/lib/site-content";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const image = mediaForCourse(course.slug, course.image);
  const comingSoon = isComingSoon(course.status);
  const levelVariant =
    course.level === "Intermediate" ? "intermediate" : "beginner";

  const body = (
    <Card className="h-full gap-0 py-0 ring-border transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={course.title}
          fill
          className={
            comingSoon
              ? "object-cover brightness-75"
              : "object-cover transition duration-500 group-hover:scale-105"
          }
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <CardContent className="flex flex-1 flex-col gap-3 px-5 pt-5 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          {comingSoon ? (
            <Badge variant="comingSoon">Coming soon</Badge>
          ) : course.level ? (
            <Badge variant={levelVariant}>{course.level}</Badge>
          ) : null}
          {!comingSoon && course.duration ? (
            <span className="text-xs text-muted-foreground">
              {course.duration}
            </span>
          ) : null}
        </div>
        <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {course.summary}
        </CardDescription>
      </CardContent>
      <CardFooter className="border-0 bg-transparent text-sm font-medium text-[#38BDF8] transition group-hover:text-[#7dd3fc]">
        {comingSoon ? "Get notified →" : "Learn more →"}
      </CardFooter>
    </Card>
  );

  if (comingSoon) {
    return (
      <a
        href={courseNotifyHref(course.title)}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={`/courses/${course.slug}`} className="group block h-full">
      {body}
    </Link>
  );
}
