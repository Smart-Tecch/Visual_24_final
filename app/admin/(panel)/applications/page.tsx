import dbConnect from "@/lib/db";
import Application from "@/lib/models/Application";
import { updateApplicationStatus } from "@/lib/actions/admin.actions";

export const instant = false;

type AppDoc = {
  _id: { toString(): string };
  fullName: string;
  phone: string;
  email: string;
  message?: string;
  status: string;
  course?: { title?: string };
};

export default async function ApplicationsPage() {
  await dbConnect();
  const items = (await Application.find()
    .populate("course", "title")
    .sort({ createdAt: -1 })
    .lean()) as AppDoc[];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Applications</h1>
      <p className="mt-2 text-muted-foreground">
        Admission applications saved in MongoDB.
      </p>
      {items.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No applications yet.</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {items.map((item) => (
            <li
              key={item._id.toString()}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="font-semibold">{item.fullName}</p>
              <p className="text-sm text-muted-foreground">
                {item.phone} · {item.email}
                {item.course?.title ? ` · ${item.course.title}` : ""}
              </p>
              {item.message ? <p className="mt-3">{item.message}</p> : null}
              <form action={updateApplicationStatus} className="mt-4 flex gap-3">
                <input type="hidden" name="id" value={item._id.toString()} />
                <select
                  name="status"
                  defaultValue={item.status}
                  className="h-10 rounded-md border border-border bg-background px-3"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="declined">Declined</option>
                </select>
                <button
                  type="submit"
                  className="h-10 rounded-md bg-foreground px-4 text-background"
                >
                  Update
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
