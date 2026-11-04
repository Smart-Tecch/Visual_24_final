import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import { updateCourseFromAdmin } from "@/lib/actions/admin.actions";

export const instant = false;

type CourseDoc = {
  _id: { toString(): string };
  title: string;
  slug: string;
  category: string;
  level?: string;
  duration?: string;
  status: string;
  featured?: boolean;
  order?: number;
  summary: string;
  outline?: string[];
};

export default async function AdminCoursesPage() {
  await dbConnect();
  const courses = (await Course.find().sort({ order: 1 }).lean()) as CourseDoc[];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Courses</h1>
      <p className="mt-2 text-muted-foreground">
        Edits here are what the public site reads from MongoDB.
      </p>
      <div className="mt-8 flex flex-col gap-8">
        {courses.map((course) => (
          <form
            key={course._id.toString()}
            action={updateCourseFromAdmin}
            className="grid gap-3 rounded-xl border border-border bg-card p-5"
          >
            <input type="hidden" name="id" value={course._id.toString()} />
            <p className="text-sm text-muted-foreground">{course.slug}</p>
            <label className="text-sm font-medium">
              Title
              <input
                name="title"
                defaultValue={course.title}
                className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
              />
            </label>
            <label className="text-sm font-medium">
              Summary
              <textarea
                name="summary"
                defaultValue={course.summary}
                className="mt-1 min-h-20 w-full rounded-md border border-border bg-background px-3 py-2"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="text-sm font-medium">
                Category
                <select
                  name="category"
                  defaultValue={course.category}
                  className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
                >
                  <option value="technical">Technical</option>
                  <option value="creative">Creative</option>
                  <option value="business">Business</option>
                </select>
              </label>
              <label className="text-sm font-medium">
                Level
                <select
                  name="level"
                  defaultValue={course.level || "Beginner"}
                  className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
              <label className="text-sm font-medium">
                Status
                <select
                  name="status"
                  defaultValue={course.status}
                  className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
                >
                  <option value="active">Active</option>
                  <option value="coming-soon">Coming soon</option>
                </select>
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Duration
                <input
                  name="duration"
                  defaultValue={course.duration || ""}
                  className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
                />
              </label>
              <label className="text-sm font-medium">
                Order
                <input
                  name="order"
                  type="number"
                  defaultValue={course.order || 0}
                  className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
                />
              </label>
            </div>
            <label className="text-sm font-medium">
              Outline (one line per topic)
              <textarea
                name="outline"
                defaultValue={(course.outline || []).join("\n")}
                className="mt-1 min-h-28 w-full rounded-md border border-border bg-background px-3 py-2"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={Boolean(course.featured)}
              />
              Featured on the home page
            </label>
            <button
              type="submit"
              className="h-11 w-fit rounded-md bg-foreground px-5 text-background"
            >
              Save {course.title}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
