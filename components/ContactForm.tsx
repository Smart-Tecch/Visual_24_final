"use client";

import { useState } from "react";
import { createContactMessage } from "@/lib/actions/contact.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setStatus(null);
    const result = await createContactMessage(formData);
    setStatus(result);
    setPending(false);
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Name
          <Input name="name" required placeholder="Your name" className="h-11" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Phone
          <Input name="phone" required placeholder="Phone number" className="h-11" />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Email
        <Input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="h-11"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Course of interest
        <Input
          name="courseInterest"
          placeholder="Web design, coding, computer studies…"
          className="h-11"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Message
        <Textarea
          name="message"
          required
          placeholder="What do you want to make?"
          className="min-h-32"
        />
      </label>
      <Button type="submit" disabled={pending} className="h-11 w-full sm:w-auto">
        {pending ? "Sending…" : "Send inquiry"}
      </Button>
      {status ? (
        <p
          className={
            status.success ? "text-sm text-dark-200" : "text-sm text-destructive"
          }
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
