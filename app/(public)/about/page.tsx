import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  getSponsors,
  getTeamMembers,
  siteImages,
  values,
} from "@/lib/site-content";
import { schoolData } from "@/lib/school-data";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const about = schoolData.pages.about;
  const team = getTeamMembers();
  const sponsors = getSponsors();

  return (
    <div>
      <PageHero
        kicker="About us"
        title={schoolData.school.name}
        lede={schoolData.school.tagline || schoolData.school.motto}
        image={siteImages.pages.about}
        imageAlt="Visual 24 team and community at the institute"
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
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            People behind the studio
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} className="h-full bg-card">
                <CardContent className="pt-2">
                  <div
                    className="mb-4 flex aspect-square items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground"
                    aria-hidden={member.photo ? undefined : true}
                  >
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt=""
                        width={320}
                        height={320}
                        className="size-full rounded-xl object-cover"
                      />
                    ) : (
                      <span>Photo coming soon</span>
                    )}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {member.name}
                  </CardTitle>
                  <p className="mt-1 text-sm text-primary">{member.role}</p>
                  {member.coursesTaught ? (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {member.coursesTaught}
                    </p>
                  ) : null}
                  {member.socialUrl ? (
                    <Link
                      href={member.socialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
                    >
                      TikTok profile
                    </Link>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {sponsors.length > 0 ? (
        <section className="border-t border-border bg-background py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="kicker text-muted-foreground">Partners</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Sponsors and partners
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {sponsors.map((sponsor) => (
                <Card key={sponsor.name} className="bg-card">
                  <CardContent className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                    {sponsor.logo ? (
                      <div className="relative h-24 w-full shrink-0 sm:w-32">
                        <Image
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          fill
                          className="object-contain object-left"
                          sizes="128px"
                        />
                      </div>
                    ) : null}
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {sponsor.url ? (
                          <Link
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {sponsor.name}
                          </Link>
                        ) : (
                          sponsor.name
                        )}
                      </CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {sponsor.relationship}
                        {sponsor.description ? ` · ${sponsor.description}` : ""}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
