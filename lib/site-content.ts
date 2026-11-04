import { schoolData } from "@/lib/school-data";

export const courseImages: Record<string, string> = {
  "web-design-development": "/images/event4.png",
  "coding-programming": "/images/event4.png",
  "computer-studies": "/images/event4.png",
  "multimedia-training": "/images/event-full.png",
  "graphic-design": "/images/event3.png",
  photography: "/images/event2.png",
  "digital-marketing": "/images/event6.png",
  "music-production": "/images/event5.png",
  videography: "/images/event-full.png",
  "film-production": "/images/event1.png",
};

export function mediaForCourse(slug: string, image?: string) {
  return image || courseImages[slug] || "/images/event4.png";
}

export function mediaForProject(category?: string, image?: string) {
  if (image) return image;
  const key = (category || "").toLowerCase();
  if (key.includes("film")) return "/images/event1.png";
  if (key.includes("photo")) return "/images/event2.png";
  if (key.includes("design")) return "/images/event3.png";
  return "/images/event6.png";
}

const categoryBlurbs: Record<string, string> = {
  technical:
    "Web, coding, and computer skills — the courses our director teaches first.",
  creative:
    "Design, photo, music and media — practical studio work with working creatives.",
  business: "Digital marketing and skills that help you grow a real audience.",
};

const categoryImages: Record<string, string> = {
  technical: "/images/event4.png",
  creative: "/images/event3.png",
  business: "/images/event6.png",
};

export const studioCategories = [...schoolData.categories]
  .sort((a, b) => a.order - b.order)
  .map((category) => ({
    slug: category.slug,
    name: category.name,
    href: `/courses#${category.slug}`,
    image: categoryImages[category.slug] ?? "/images/event4.png",
    blurb: categoryBlurbs[category.slug] ?? "",
  }));

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
