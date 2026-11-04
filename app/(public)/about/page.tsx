import PageHero from "@/components/PageHero";
import { values } from "@/lib/site-content";
import { schoolData } from "@/lib/school-data";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const about = schoolData.pages.about;
  const team = about.team ?? [];

  return (
    <div>
      <PageHero
        kicker="About us"
        title={schoolData.school.name}
        lede={schoolData.school.tagline || schoolData.school.motto}
        image="/images/event6.png"
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker text-muted-foreground">Mission</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {about.mission}
            </h2>
          </div>
          <div>
            <p className="kicker text-muted-foreground">Studio code</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {about.studioCode}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-light-100">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-8 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="bg-card">
              <CardContent className="pt-2">
                <CardTitle className="text-2xl font-semibold">
                  {value.title}
                </CardTitle>
                <p className="mt-3 text-muted-foreground">{value.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {team.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="kicker text-muted-foreground">Team</p>
          <h2 className="mt-4 text-3xl font-semibold">People behind the studio</h2>
        </section>
      ) : null}
    </div>
  );
}
