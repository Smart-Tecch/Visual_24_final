import Link from "next/link";
import dbConnect from "@/lib/db";
import Course from "@/lib/models/Course";
import ContactMessage from "@/lib/models/ContactMessage";
import Application from "@/lib/models/Application";
import { BookOpen, Inbox, UserPlus } from "lucide-react";

export const instant = false;

export default async function AdminHomePage() {
  await dbConnect();
  const [courses, inquiries, applications] = await Promise.all([
    Course.countDocuments(),
    ContactMessage.countDocuments({ status: "new" }),
    Application.countDocuments({ status: "new" }),
  ]);

  const cards = [
    {
      label: "Courses in database",
      value: courses,
      href: "/admin/courses",
      icon: BookOpen,
    },
    {
      label: "New inquiries",
      value: inquiries,
      href: "/admin/inquiries",
      icon: Inbox,
    },
    {
      label: "New applications",
      value: applications,
      href: "/admin/applications",
      icon: UserPlus,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Courses, inquiries, and applications are stored in MongoDB. Run{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">pnpm seed</code>{" "}
        after you change <code className="rounded bg-muted px-1.5 py-0.5 text-sm">reference/school-data.json</code>.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-border bg-card/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <Icon className="size-5 text-primary opacity-80 transition group-hover:scale-110" />
              </div>
              <p className="mt-2 text-4xl font-semibold tabular-nums">
                {card.value}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
