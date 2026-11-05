import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();
const srcDir = path.join(root, "reference", "pinterest-picks");

/** @type {{ file: string; dest: string; width: number }[]} */
const jobs = [
  { file: "hero-e.jpg", dest: "public/images/hero/home-hero.webp", width: 1600 },
  { file: "hero-a.jpg", dest: "public/images/courses/computer-studies.webp", width: 1200 },
  { file: "web-c.jpg", dest: "public/images/courses/web-design-development.webp", width: 1600 },
  { file: "coding-a.jpg", dest: "public/images/courses/coding-programming.webp", width: 1600 },
  { file: "graphic-b.jpg", dest: "public/images/courses/graphic-design.webp", width: 1600 },
  { file: "photo-b.jpg", dest: "public/images/courses/photography.webp", width: 1600 },
  { file: "video-a.jpg", dest: "public/images/courses/multimedia-training.webp", width: 1600 },
  { file: "music-b.jpg", dest: "public/images/courses/music-production.webp", width: 1600 },
  { file: "creator-a.jpg", dest: "public/images/courses/digital-marketing.webp", width: 1600 },
  { file: "collab-b.jpg", dest: "public/images/categories/technical.webp", width: 1200 },
  { file: "collab-b.jpg", dest: "public/images/studios/studio-technical.webp", width: 1200 },
  { file: "graphic-a.jpg", dest: "public/images/categories/creative.webp", width: 1200 },
  { file: "graphic-a.jpg", dest: "public/images/studios/studio-creative.webp", width: 1200 },
  { file: "creator-a.jpg", dest: "public/images/categories/business.webp", width: 1200 },
  { file: "creator-a.jpg", dest: "public/images/studios/studio-business.webp", width: 1200 },
  { file: "collab-a.jpg", dest: "public/images/about/about-mission.webp", width: 1600 },
  { file: "admit-b.jpg", dest: "public/images/pages/admissions-hero.webp", width: 1600 },
  { file: "admit-b.jpg", dest: "public/images/admissions/admissions-banner.webp", width: 1600 },
  { file: "contact-a.jpg", dest: "public/images/pages/contact-hero.webp", width: 1600 },
  { file: "contact-a.jpg", dest: "public/images/admissions/contact-banner.webp", width: 1600 },
  { file: "cta-a.jpg", dest: "public/images/admissions/cta-background.webp", width: 1600 },
];

for (const job of jobs) {
  const input = path.join(srcDir, job.file);
  const output = path.join(root, job.dest);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await sharp(input)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(output);
  const kb = Math.round(fs.statSync(output).size / 1024);
  console.log(job.dest, kb + "KB");
}

const hero = path.join(srcDir, "hero-e.jpg");
const og = path.join(root, "public/images/hero/og-image.webp");
const meta = await sharp(hero).metadata();
const targetW = 1200;
const targetH = 630;
const scale = Math.max(targetW / meta.width, targetH / meta.height);
const resizedW = Math.round(meta.width * scale);
const resizedH = Math.round(meta.height * scale);
await sharp(hero)
  .resize(resizedW, resizedH)
  .extract({
    left: Math.max(0, Math.floor((resizedW - targetW) / 2)),
    top: Math.max(0, Math.floor((resizedH - targetH) / 2)),
    width: targetW,
    height: targetH,
  })
  .webp({ quality: 72 })
  .toFile(og);
console.log("public/images/hero/og-image.webp", Math.round(fs.statSync(og).size / 1024) + "KB");
