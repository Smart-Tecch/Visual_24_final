import dbConnect from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";
import { updateInquiryStatus } from "@/lib/actions/admin.actions";

export const instant = false;

type Inquiry = {
  _id: { toString(): string };
  name: string;
  phone: string;
  email?: string;
  courseInterest?: string;
  message: string;
  status: string;
};

export default async function InquiriesPage() {
  await dbConnect();
  const items = (await ContactMessage.find()
    .sort({ createdAt: -1 })
    .lean()) as Inquiry[];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Inquiries</h1>
      <p className="mt-2 text-muted-foreground">
        Messages sent from the contact form.
      </p>
      {items.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No inquiries yet.</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {items.map((item) => (
            <li
              key={item._id.toString()}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.phone}
                {item.email ? ` · ${item.email}` : ""}
                {item.courseInterest ? ` · ${item.courseInterest}` : ""}
              </p>
              <p className="mt-3">{item.message}</p>
              <form action={updateInquiryStatus} className="mt-4 flex gap-3">
                <input type="hidden" name="id" value={item._id.toString()} />
                <select
                  name="status"
                  defaultValue={item.status}
                  className="h-10 rounded-md border border-border bg-background px-3"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
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
