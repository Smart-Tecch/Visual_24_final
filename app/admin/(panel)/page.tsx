import Link from "next/link";
import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import ContactMessage from "@/lib/models/ContactMessage";
import Application from "@/lib/models/Application";

export const instant = false;

export default async function AdminHomePage() {
  await dbConnect();
  const [courses, inquiries, applications] = await Promise.all([
    Course.countDocuments(),
    ContactMessage.countDocuments({ status: "new" }),
    Application.countDocuments({ status: "new" }),
  ]);

  const cards = [
    { label: "Courses in database", value: courses, href: "/admin/courses" },
    { label: "New inquiries", value: inquiries, href: "/admin/inquiries" },
    { label: "New applications", value: applications, href: "/admin/applications" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Courses, inquiries, and applications are stored in MongoDB.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-border bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-2 text-4xl font-semibold">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
