import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import {
  contactPhones,
  formatAddress,
  schoolData,
} from "@/lib/school-data";
import { siteImages } from "@/lib/site-content";
import { socials } from "@/public/data/footerdata";
import { getCourses } from "@/lib/actions/course.actions";
import { whatsappHref } from "@/lib/phone";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ask about a Visual 24 course, a visit day, or how to apply. We reply personally.",
};

export default function ContactPage() {
  const { contacts } = schoolData.school;
  const email = contacts.email;
  const phones = contactPhones();
  const whatsapp = contacts.whatsapp as string | null;
  const openingHours = contacts.openingHours as string | null;

  return (
    <div>
      <PageHero
        kicker="Inquire"
        title="Tell us what you want to learn."
        lede="Ask about a course, a visit day, or how to apply. We reply personally."
        image={siteImages.pages.contact}
        imageAlt="Training room at Visual 24 Technical Institute"
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardContent className="pt-2">
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">
              Name, phone and a short note are enough to start.
            </p>
            <Suspense fallback={<p className="text-muted-foreground">Loading form…</p>}>
              <ContactFormWithCourses />
            </Suspense>
          </CardContent>
        </Card>
        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="kicker text-muted-foreground">Address</p>
            <p className="mt-2 text-lg">{formatAddress()}</p>
          </div>
          {openingHours ? (
            <div>
              <p className="kicker text-muted-foreground">Hours</p>
              <p className="mt-2 text-lg">{openingHours}</p>
            </div>
          ) : null}
          {email ? (
            <div>
              <p className="kicker text-muted-foreground">Email</p>
              <a
                href={`mailto:${email}`}
                className="mt-2 inline-block text-lg underline underline-offset-4"
              >
                {email}
              </a>
            </div>
          ) : null}
          {phones.length > 0 ? (
            <div>
              <p className="kicker text-muted-foreground">Phone</p>
              <ul className="mt-2 flex flex-col gap-1 text-lg">
                {phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="underline underline-offset-4"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {whatsapp ? (
            <div>
              <p className="kicker text-muted-foreground">WhatsApp</p>
              <a
                href={whatsappHref(whatsapp)}
                className="mt-2 inline-flex items-center gap-2 text-lg underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="size-5 text-[#25D366]" aria-hidden />
                Chat on WhatsApp ({whatsapp})
              </a>
            </div>
          ) : null}
          <div>
            <p className="kicker text-muted-foreground">Social</p>
            <div className="mt-3 flex flex-col gap-2">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {social.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

async function ContactFormWithCourses() {
  await connection();
  const courses = await getCourses();
  return <ContactForm courses={courses} />;
}
