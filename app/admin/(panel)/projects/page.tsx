import dbConnect from "@/lib/db";
import Project from "@/lib/models/Project";
import {
  createProjectFromAdmin,
  updateProjectFromAdmin,
} from "@/lib/actions/admin.actions";

export const instant = false;

type ProjectDoc = {
  _id: { toString(): string };
  title: string;
  slug: string;
  description: string;
  category: string;
  coverImage?: string;
  studentNames?: string[];
  published?: boolean;
  isFeatured?: boolean;
};

export default async function AdminProjectsPage() {
  await dbConnect();
  const projects = (await Project.find()
    .sort({ createdAt: -1 })
    .lean()) as ProjectDoc[];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Student projects</h1>
      <p className="mt-2 text-muted-foreground">
        Only published projects appear on the public site and in the navigation.
        Use a local path such as <code>/images/courses/web-design-development.webp</code>{" "}
        or a Cloudinary URL after you add image hosting.
      </p>

      <form
        action={createProjectFromAdmin}
        className="mt-8 grid gap-3 rounded-xl border border-dashed border-border bg-card p-5"
      >
        <h2 className="text-lg font-semibold">Add a project</h2>
        <label className="text-sm font-medium">
          Title
          <input
            name="title"
            required
            className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
          />
        </label>
        <label className="text-sm font-medium">
          Category
          <input
            name="category"
            required
            placeholder="Web, Photography, Film…"
            className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
          />
        </label>
        <label className="text-sm font-medium">
          Description
          <textarea
            name="description"
            required
            className="mt-1 min-h-20 w-full rounded-md border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="text-sm font-medium">
          Cover image path or URL
          <input
            name="coverImage"
            className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
          />
        </label>
        <label className="text-sm font-medium">
          Extra image paths (one per line)
          <textarea
            name="images"
            className="mt-1 min-h-20 w-full rounded-md border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="text-sm font-medium">
          Student names (comma separated)
          <input
            name="studentNames"
            className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isFeatured" />
          Featured on the home page
        </label>
        <button
          type="submit"
          className="h-11 w-fit rounded-md bg-foreground px-5 text-background"
        >
          Add project
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-6">
        {projects.length === 0 ? (
          <p className="text-muted-foreground">No projects yet.</p>
        ) : (
          projects.map((project) => (
            <form
              key={project._id.toString()}
              action={updateProjectFromAdmin}
              className="grid gap-3 rounded-xl border border-border bg-card p-5"
            >
              <input type="hidden" name="id" value={project._id.toString()} />
              <p className="text-sm text-muted-foreground">{project.slug}</p>
              <label className="text-sm font-medium">
                Title
                <input
                  name="title"
                  defaultValue={project.title}
                  className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
                />
              </label>
              <label className="text-sm font-medium">
                Category
                <input
                  name="category"
                  defaultValue={project.category}
                  className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
                />
              </label>
              <label className="text-sm font-medium">
                Description
                <textarea
                  name="description"
                  defaultValue={project.description}
                  className="mt-1 min-h-20 w-full rounded-md border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="text-sm font-medium">
                Cover image
                <input
                  name="coverImage"
                  defaultValue={project.coverImage || ""}
                  className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
                />
              </label>
              <label className="text-sm font-medium">
                Student names
                <input
                  name="studentNames"
                  defaultValue={(project.studentNames || []).join(", ")}
                  className="mt-1 h-11 w-full rounded-md border border-border bg-background px-3"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={Boolean(project.published)}
                />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="isFeatured"
                  defaultChecked={Boolean(project.isFeatured)}
                />
                Featured
              </label>
              <button
                type="submit"
                className="h-11 w-fit rounded-md bg-foreground px-5 text-background"
              >
                Save {project.title}
              </button>
            </form>
          ))
        )}
      </div>
    </div>
  );
}
