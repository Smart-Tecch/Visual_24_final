import { FaTiktok, FaYoutube } from "react-icons/fa";

export const baseNavPages = [
  { name: "About", to: "/about" },
  { name: "Courses", to: "/courses" },
  { name: "Projects", to: "/projects" },
  { name: "Admissions", to: "/admissions" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

export const socials = [
  {
    name: "TikTok",
    icon: FaTiktok,
    to: "https://www.tiktok.com/@visual.techinical24",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    to: "https://youtube.com/@pixelmanagement-z1h",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];
