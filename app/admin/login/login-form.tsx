"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError("");
    const result = await signIn("credentials", {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/admin",
    });
    setPending(false);
    if (!result || result.error) {
      setError("Email or password is not correct.");
      return;
    }
    window.location.href = result.url || "/admin";
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
        Visual 24
      </p>
      <h1 className="mt-2 text-3xl font-semibold">Admin login</h1>
      <form action={onSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className="h-11 rounded-md border border-border bg-background px-3"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="h-11 rounded-md border border-border bg-background px-3"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-md bg-foreground text-background"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
