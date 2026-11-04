import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import Intake from "@/lib/models/Intake";
import {
  createCourseFromAdmin,
  createIntakeFromAdmin,
  updateCourseFromAdmin,
  updateIntakeStatus,
} from "@/lib/actions/admin.actions";

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
  hidden?: boolean;
  order?: number;
  summary: string;
  outline?: string[];
};

type IntakeDoc = {
  _id: { toString(): string };
  course: { toString(): string };
  startDate: Date | string;
  seats?: number;
  status: string;
};

export default async function AdminCoursesPage() {
  await dbConnect();
  const [courses, intakes] = await Promise.all([
    Course.find().sort({ order: 1 }).lean() as Promise<CourseDoc[]>,
    Intake.find().sort({ startDate: 1 }).lean() as Promise<IntakeDoc[]>,
  ]);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Courses</h1>
      <p className="mt-2 text-muted-foreground">
        Edits here are what the public site reads from MongoDB.
      </p>

      <form
        action={createCourseFromAdmin}
        className="mt-8 grid gap-3 rounded-xl border border-dashed border-border bg-card p-5"
      >
        <h2 className="text-lg font-semibold">Add a course</h2>
        <label className="text-sm font-medium">
          Title
          <input
            name="title"
            required
            className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
          />
        </label>
        <label className="text-sm font-medium">
          Slug (optional — generated from the title if empty)
          <input
            name="slug"
            className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
          />
        </label>
        <label className="text-sm font-medium">
          Summary
          <textarea
            name="summary"
            required
            className="mt-1 min-h-20 w-full rounded-md border border-border bg-background px-3 py-2"
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-4">
          <label className="text-sm font-medium">
            Category
            <select
              name="category"
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
              className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
            >
              <option value="active">Active</option>
              <option value="coming-soon">Coming soon</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Duration
            <input
              name="duration"
              className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
            />
          </label>
        </div>
        <button
          type="submit"
          className="h-11 w-fit rounded-md bg-foreground px-5 text-background"
        >
          Add course
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-8">
        {courses.map((course) => {
          const courseIntakes = intakes.filter(
            (item) => item.course.toString() === course._id.toString(),
          );
          return (
            <article
              key={course._id.toString()}
              className="rounded-xl border border-border bg-card p-5"
            >
              <form action={updateCourseFromAdmin} className="grid gap-3">
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
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="hidden"
                    defaultChecked={Boolean(course.hidden)}
                  />
                  Hide from the public site
                </label>
                <button
                  type="submit"
                  className="h-11 w-fit rounded-md bg-foreground px-5 text-background"
                >
                  Save {course.title}
                </button>
              </form>

              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-medium">Intakes</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {courseIntakes.map((intake) => (
                    <li
                      key={intake._id.toString()}
                      className="flex flex-wrap items-center gap-3 text-sm"
                    >
                      <span>
                        {new Date(intake.startDate).toLocaleDateString()} ·{" "}
                        {intake.status}
                        {intake.seats ? ` · ${intake.seats} seats` : ""}
                      </span>
                      <form action={updateIntakeStatus}>
                        <input
                          type="hidden"
                          name="id"
                          value={intake._id.toString()}
                        />
                        <input
                          type="hidden"
                          name="status"
                          value={intake.status === "open" ? "closed" : "open"}
                        />
                        <button type="submit" className="underline">
                          Mark {intake.status === "open" ? "closed" : "open"}
                        </button>
                      </form>
                    </li>
                  ))}
                  {courseIntakes.length === 0 ? (
                    <li className="text-sm text-muted-foreground">
                      No intakes yet.
                    </li>
                  ) : null}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Add an intake</h2>
        <form
          action={createIntakeFromAdmin}
          className="mt-3 grid gap-3 rounded-xl border border-border bg-card p-5 sm:grid-cols-4"
        >
          <label className="text-sm font-medium">
            Course
            <select
              name="courseId"
              className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
            >
              {courses.map((course) => (
                <option key={course._id.toString()} value={course._id.toString()}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Start date
            <input
              name="startDate"
              type="date"
              required
              className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
            />
          </label>
          <label className="text-sm font-medium">
            Seats
            <input
              name="seats"
              type="number"
              className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
            />
          </label>
          <button
            type="submit"
            className="h-11 self-end rounded-md bg-foreground px-5 text-background"
          >
            Add intake
          </button>
        </form>
      </div>
    </div>
  );
}
