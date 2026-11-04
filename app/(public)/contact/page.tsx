import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { formatAddress, schoolData } from "@/lib/school-data";
import { socials } from "@/public/data/footerdata";
import Link from "next/link";

export default function ContactPage() {
  const { contacts } = schoolData.school;
  const email = contacts.email;
  const phone = contacts.phone as string | null;
  const whatsapp = contacts.whatsapp as string | null;

  return (
    <div>
      <PageHero
        kicker="Inquire"
        title="Tell us what you want to learn."
        lede="Ask about a course, a visit day, or how to apply. We reply personally."
        image="/images/event2.png"
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardContent className="pt-2">
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">
              Name, phone and a short note are enough to start.
            </p>
            <ContactForm />
          </CardContent>
        </Card>
        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="kicker text-muted-foreground">Address</p>
            <p className="mt-2 text-lg">{formatAddress()}</p>
          </div>
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
          {phone ? (
            <div>
              <p className="kicker text-muted-foreground">Phone</p>
              <a
                href={`tel:${phone}`}
                className="mt-2 inline-block text-lg underline underline-offset-4"
              >
                {phone}
              </a>
            </div>
          ) : null}
          {whatsapp ? (
            <div>
              <p className="kicker text-muted-foreground">WhatsApp</p>
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                className="mt-2 inline-block text-lg underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
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
