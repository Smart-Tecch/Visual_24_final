import Link from "next/link";
import PageHero from "@/components/PageHero";
import { admissionSteps, siteImages } from "@/lib/site-content";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function AdmissionsPage() {
  return (
    <div>
      <PageHero
        kicker="Admissions"
        title="Come see the rooms. Then apply."
        lede="A visit, a conversation, and a start date. We keep the process human so you can focus on the work."
        image={siteImages.pages.admissions}
        imageAlt="Web design session at Visual 24 Technical Institute"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {admissionSteps.map((item) => (
            <Card key={item.step}>
              <CardContent>
                <p className="kicker text-primary">{item.step}</p>
                <CardTitle className="mt-3 text-2xl">{item.title}</CardTitle>
                <p className="mt-3 text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className={buttonVariants({ className: "h-11 px-6" })}
          >
            Inquire
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "outline",
              className: "h-11 px-6",
            })}
          >
            Apply
          </Link>
        </div>
      </section>
    </div>
  );
}
