export interface Course {
  _id: string;
  title: string;
  slug: string;
  category: "technical" | "creative" | "business";
  summary: string;
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  status: "active" | "coming-soon";
  featured: boolean;
  hidden?: boolean;
  order: number;
  outline?: string[];
  fee?: number;
  instructor?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  images?: string[];
  coverImage?: string;
  studentNames?: string[];
  course?: string | Course;
  published: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  _id: string;
  key: string;
  school: {
    name: string;
    shortName: string;
    motto: string;
    tagline?: string;
    country?: string;
    address: {
      line1: string;
      line2?: string | null;
      area?: string | null;
      country?: string;
      mapUrl?: string | null;
    };
    contacts: {
      email?: string | null;
      phone?: string | null;
      whatsapp?: string | null;
      openingHours?: string | null;
    };
    social: {
      tiktok?: string[] | null;
      youtube?: string | null;
      facebook?: string | null;
      instagram?: string | null;
    };
    domain?: string | null;
    foundedYear?: number | null;
  };
  categories: { slug: string; name: string; order: number }[];
  pages: {
    home: {
      heroTitle: string;
      heroSubtitle: string;
      primaryCta: { label: string; href: string };
      secondaryCta: { label: string; href: string };
      heroTags?: string[];
    };
    about: {
      mission: string;
      studioCode: string;
      team: unknown[];
    };
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    description: string;
  };
  showFees: boolean;
}

export interface ContactMessage {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  courseInterest?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt?: string;
  updatedAt?: string;
}
