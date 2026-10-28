export interface Course {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  image?: string;
  isFeatured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  coverImage?: string;
  media?: string[];
  studentName?: string;
  course?: string | Course; // can be populated
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
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
