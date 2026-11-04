import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { socials } from "@/public/data/footerdata";
import { buttonVariants } from "@/components/ui/button";
import { formatAddress, schoolData } from "@/lib/school-data";
import { whatsappHref } from "@/lib/phone";

const Footer = () => {
  const { school } = schoolData;
  const email = school.contacts.email;
  const contacts = school.contacts as {
    phones?: string[];
    phone?: string | null;
    whatsapp?: string | null;
  };
  const phones =
    contacts.phones?.length && contacts.phones
      ? contacts.phones
      : contacts.phone
        ? [contacts.phone]
        : [];
  const whatsapp = contacts.whatsapp;

  return (
    <footer className="bg-dark-100 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="kicker text-primary">Admission</p>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Ready to build real skills?
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/70">
            {school.motto}. Explore technical and creative courses, then inquire
            or apply when you are ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={buttonVariants({ className: "h-11 px-6" })}
            >
              Inquire
            </Link>
            <Link
              href="/admissions"
              className={buttonVariants({
                variant: "accent",
                className: "h-11 px-6",
              })}
            >
              Apply
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-6 text-sm text-white/70">
          <p>
            {school.name}
            <br />
            {formatAddress()}
          </p>
          {email ? (
            <p>
              <a className="hover:text-primary" href={`mailto:${email}`}>
                {email}
              </a>
            </p>
          ) : null}
          {phones.length > 0 ? (
            <p>
              {phones.map((phone) => (
                <a
                  key={phone}
                  className="mr-3 hover:text-primary"
                  href={`tel:${phone.replace(/\s/g, "")}`}
                >
                  {phone}
                </a>
              ))}
            </p>
          ) : null}
          {whatsapp ? (
            <p>
              <a
                className="inline-flex items-center gap-2 hover:text-primary"
                href={whatsappHref(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="size-4 text-[#25D366]" aria-hidden />
                WhatsApp
              </a>
            </p>
          ) : null}
          <div className="flex gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.to}
                  target={social.target}
                  rel={social.rel}
                  className="hover:text-primary"
                  aria-label={social.name}
                >
                  <Icon className="size-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-white/50 sm:px-8">
          <p>© 2026 {school.shortName}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/courses" className="hover:text-white">
              Courses
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
