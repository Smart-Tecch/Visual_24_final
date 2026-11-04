import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";

export const instant = false;

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <AdminShell>
      <header className="border-b border-border/80 bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              Visual 24
            </p>
            <p className="font-semibold">Admin</p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm">
            <Link href="/admin" className="underline-offset-4 hover:underline">
              Overview
            </Link>
            <Link
              href="/admin/courses"
              className="underline-offset-4 hover:underline"
            >
              Courses
            </Link>
            <Link
              href="/admin/inquiries"
              className="underline-offset-4 hover:underline"
            >
              Inquiries
            </Link>
            <Link
              href="/admin/applications"
              className="underline-offset-4 hover:underline"
            >
              Applications
            </Link>
            <Link
              href="/admin/projects"
              className="underline-offset-4 hover:underline"
            >
              Projects
            </Link>
            <Link href="/" className="underline-offset-4 hover:underline">
              View site
            </Link>
          </nav>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button className="text-sm underline-offset-4 hover:underline" type="submit">
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </AdminShell>
  );
}
