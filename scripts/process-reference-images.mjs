/**
 * Copies reference/images into public/images as WebP (does not modify reference/).
 * Run: node scripts/process-reference-images.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();
const ref = path.join(root, "reference", "images");
const out = path.join(root, "public", "images");

/** @type {{ src: string; dest: string; maxWidth: number; quality?: number }[]} */
const jobs = [
  {
    src: "logos/file_0000000002188210bc2988c9eb78837a.png",
    dest: "logos/logo-main.webp",
    maxWidth: 512,
    quality: 90,
  },
  {
    src: "logos/New folder/visual24-logo-big.png",
    dest: "logos/logo-full.webp",
    maxWidth: 800,
    quality: 90,
  },
  {
    src: "logos/file_0000000002188210bc2988c9eb78837a.png",
    dest: "logos/favicon.webp",
    maxWidth: 64,
    quality: 92,
  },
  {
    src: "images for coding/IMG-20261024-WA0048.jpg",
    dest: "hero/home-hero.webp",
    maxWidth: 1600,
  },
  {
    src: "images for coding/943738ef34067a8851191ed00203f763.jpg",
    dest: "categories/technical.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/92fb682d807a4a29b09738e22cfe2532.jpg",
    dest: "categories/creative.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/19f1377467b8422e902ee2530a97ab90.jpg",
    dest: "categories/business.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/IMG-20260418-WA0024.jpg",
    dest: "courses/web-design-development.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/504c9430631cde54eb8f5f15e24273c2.jpg",
    dest: "courses/coding-programming.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/663613ac5bac500279b4ca7edea8c20a.jpg",
    dest: "courses/computer-studies.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/6ef98e0b6bf51dc4c72001feb56a8470.jpg",
    dest: "courses/multimedia-training.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/d33b6542151f482e8478cf65ebdf35ba.jpg",
    dest: "courses/graphic-design.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/1d25d7837cc84689932166cef41af9d0.jpg",
    dest: "courses/photography.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/cbd143be1a2da86ca61b1f15931575e4.jpg",
    dest: "courses/digital-marketing.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/IMG-20260418-WA0025.jpg",
    dest: "courses/music-production.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/5caa4d729d86d0024dc3e299d1206eec (1).jpg",
    dest: "courses/videography.webp",
    maxWidth: 1200,
  },
  {
    src: "images for coding/6ef98e0b6bf51dc4c72001feb56a8470.jpg",
    dest: "courses/film-production.webp",
    maxWidth: 1200,
  },
  {
    src: "about founders schools details and friends/IMG-20261010-WA0221.jpg",
    dest: "pages/about-hero.webp",
    maxWidth: 1600,
  },
  {
    src: "images for coding/IMG-20260418-WA0025.jpg",
    dest: "pages/contact-hero.webp",
    maxWidth: 1600,
  },
  {
    src: "images for coding/504c9430631cde54eb8f5f15e24273c2.jpg",
    dest: "pages/courses-hero.webp",
    maxWidth: 1600,
  },
  {
    src: "images for coding/IMG-20260418-WA0024.jpg",
    dest: "pages/admissions-hero.webp",
    maxWidth: 1600,
  },
  {
    src: "images for coding/943738ef34067a8851191ed00203f763.jpg",
    dest: "pages/blog-hero.webp",
    maxWidth: 1600,
  },
  {
    src: "supponsors/IMG-20260413-WA0011.jpg",
    dest: "sponsors/t24-tours.webp",
    maxWidth: 400,
  },
  {
    src: "supponsors/IMG-20260929-WA0004.jpg",
    dest: "sponsors/dzionz-youth-center.webp",
    maxWidth: 400,
  },
];

async function convertJob(job) {
  const srcPath = path.join(ref, job.src);
  const destPath = path.join(out, job.dest);
  if (!fs.existsSync(srcPath)) {
    console.warn(`Skip (missing): ${job.src}`);
    return;
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  await sharp(srcPath)
    .rotate()
    .resize({ width: job.maxWidth, withoutEnlargement: true })
    .webp({ quality: job.quality ?? 82 })
    .toFile(destPath);
  const stat = fs.statSync(destPath);
  console.log(`OK ${job.dest} (${Math.round(stat.size / 1024)} KB)`);
}

async function main() {
  for (const job of jobs) {
    await convertJob(job);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
