import { Suspense } from "react";
import AdminLoginForm from "./login-form";

export const instant = false;

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="p-8">Loading login…</main>}>
      <AdminLoginForm />
    </Suspense>
  );
}
