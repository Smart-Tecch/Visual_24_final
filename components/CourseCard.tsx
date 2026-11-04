import Link from "next/link";
import Image from "next/image";
import { Course } from "@/lib/types";
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
  const comingSoon = course.status === "coming-soon";

  return (
    <Link href={`/courses/${course.slug}`} className="group block h-full">
      <Card className="h-full gap-0 py-0 ring-border transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={image}
            alt={course.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          {comingSoon ? (
            <Badge className="absolute top-3 left-3">Coming soon</Badge>
          ) : null}
        </div>
        <CardContent className="flex flex-1 flex-col gap-3 px-5 pt-5 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            {course.level ? (
              <Badge variant="secondary">{course.level}</Badge>
            ) : null}
            {course.duration ? (
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
        <CardFooter className="border-0 bg-transparent text-sm font-medium text-dark-200">
          Learn more →
        </CardFooter>
      </Card>
    </Link>
  );
}
