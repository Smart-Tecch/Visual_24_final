"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { schoolData } from "@/lib/school-data";

export default function WhatsAppButton() {
  const whatsapp = schoolData.school.contacts.whatsapp as string | null;
  if (!whatsapp) return null;

  const href = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl focus-visible:ring-3 focus-visible:ring-ring"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp className="size-7" aria-hidden />
    </Link>
  );
}
