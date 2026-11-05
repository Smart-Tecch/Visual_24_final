import { schoolData } from "@/lib/school-data";

/** Public WebP paths — copied from reference/ by scripts/process-reference-images.mjs */

export const siteImages = {
  logo: "/images/logos/logo-main.webp",
  logoFull: "/images/logos/logo-full.webp",
  hero: "/images/hero/home-hero.webp",
  og: "/images/hero/og-image.webp",
  mission: "/images/about/about-mission.webp",
  cta: "/images/admissions/cta-background.webp",
  admissionsBanner: "/images/admissions/admissions-banner.webp",
  pages: {
    about: "/images/pages/about-hero.webp",
    contact: "/images/pages/contact-hero.webp",
    courses: "/images/studios/studio-technical.webp",
    admissions: "/images/pages/admissions-hero.webp",
    blog: "/images/courses/photography.webp",
    projects: "/images/studios/studio-creative.webp",
  },
} as const;

export const courseImages: Record<string, string> = {
  "web-design-development": "/images/courses/web-design-development.webp",
  "coding-programming": "/images/courses/coding-programming.webp",
  "computer-studies": "/images/courses/computer-studies.webp",
  "multimedia-training": "/images/courses/multimedia-training.webp",
  "graphic-design": "/images/courses/graphic-design.webp",
  photography: "/images/courses/photography.webp",
  "digital-marketing": "/images/courses/digital-marketing.webp",
  "music-production": "/images/courses/music-production.webp",
  videography: "/images/courses/videography.webp",
  "film-production": "/images/courses/film-production.webp",
};

export function mediaForCourse(slug: string, image?: string) {
  return image || courseImages[slug] || siteImages.pages.courses;
}

export function mediaForProject(category?: string, image?: string) {
  if (image) return image;
  const key = (category || "").toLowerCase();
  if (key.includes("film") || key.includes("video"))
    return courseImages.videography;
  if (key.includes("photo")) return courseImages.photography;
  if (key.includes("design")) return courseImages["graphic-design"];
  if (key.includes("web") || key.includes("code"))
    return courseImages["web-design-development"];
  return siteImages.pages.projects;
}

const categoryBlurbs: Record<string, string> = {
  technical:
    "Web, coding, and computer skills — the courses our director teaches first.",
  creative:
    "Design, photo, music and media — practical studio work with working creatives.",
  business: "Digital marketing and skills that help you grow a real audience.",
};

const categoryImages: Record<string, string> = {
  technical: "/images/studios/studio-technical.webp",
  creative: "/images/studios/studio-creative.webp",
  business: "/images/studios/studio-business.webp",
};

export const studioCategories = [...schoolData.categories]
  .sort((a, b) => a.order - b.order)
  .map((category) => ({
    slug: category.slug,
    name: category.name,
    href: `/courses#${category.slug}`,
    image: categoryImages[category.slug] ?? siteImages.pages.courses,
    blurb: categoryBlurbs[category.slug] ?? "",
  }));

export type TeamMember = {
  name: string;
  role: string;
  coursesTaught?: string;
  socialUrl?: string | null;
  photo?: string | null;
  show?: boolean;
};

export type Sponsor = {
  name: string;
  relationship: string;
  description?: string;
  url?: string | null;
  logo?: string | null;
  show?: boolean;
};

export function getTeamMembers(): TeamMember[] {
  const team =
    (schoolData.pages.about.team as TeamMember[] | undefined) ?? [];
  return team.filter((member) => member.name && member.show !== false);
}

export function getSponsors(): Sponsor[] {
  const sponsors =
    (schoolData as { sponsors?: Sponsor[] }).sponsors ?? [];
  return sponsors.filter((s) => s.name && s.show !== false);
}

export const values = [
  {
    title: "Make the work",
    body: "Every week ends with something you can show: a site, a campaign, a document, or a finished brief.",
  },
  {
    title: "Stay curious",
    body: "We treat tools as a starting point. Students learn to ask better questions of the brief.",
  },
  {
    title: "Belong here",
    body: "Small groups, named feedback, and mentors who still work in the industry.",
  },
];

export const admissionSteps = [
  {
    step: "01",
    title: "Inquire",
    body: "Tell us what you want to learn. We will match you with a course and a start date.",
  },
  {
    step: "02",
    title: "Visit the studio",
    body: "Tour the labs, meet a mentor, and sit in on a session if one is running.",
  },
  {
    step: "03",
    title: "Apply",
    body: "A short application and a conversation about your goals.",
  },
  {
    step: "04",
    title: "Begin",
    body: "Orientation and your first practical brief in the first week.",
  },
];
