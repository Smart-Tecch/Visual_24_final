import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import dbConnect from "../lib/db";
import Course from "../lib/models/Course";
import SiteSettings from "../lib/models/SiteSettings";
import Admin from "../lib/models/Admin";

type SeedFile = {
  school: Record<string, unknown>;
  categories: { slug: string; name: string; order: number }[];
  courses: {
    slug: string;
    title: string;
    category: string;
    level: string;
    duration: string | null;
    status: string;
    featured: boolean;
    order: number;
    summary: string;
    outline?: string[];
    fee: number | null;
    instructor: string | null;
  }[];
  pages: Record<string, unknown>;
  seo: Record<string, unknown>;
};

function loadSchoolData(): SeedFile {
  const filePath = path.join(process.cwd(), "reference", "school-data.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as SeedFile;
}

async function seed() {
  try {
    await dbConnect();
    console.log("Connected to database...");

    const data = loadSchoolData();

    for (const course of data.courses) {
      await Course.findOneAndUpdate(
        { slug: course.slug },
        {
          title: course.title,
          slug: course.slug,
          category: course.category,
          level: course.level,
          duration: course.duration ?? undefined,
          status: course.status,
          featured: course.featured,
          order: course.order,
          summary: course.summary,
          outline: course.outline ?? [],
          fee: course.fee ?? undefined,
          instructor: course.instructor ?? undefined,
        },
        { upsert: true, setDefaultsOnInsert: true },
      );
    }
    console.log(`✅ Upserted ${data.courses.length} courses`);

    await SiteSettings.findOneAndUpdate(
      { key: "default" },
      {
        key: "default",
        school: data.school,
        categories: data.categories,
        pages: data.pages,
        seo: data.seo,
        showFees: false,
      },
      { upsert: true, setDefaultsOnInsert: true },
    );
    console.log("✅ Site settings upserted");

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminEmail && adminPassword) {
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await Admin.findOneAndUpdate(
        { email: adminEmail },
        {
          name: "Visual 24 Admin",
          email: adminEmail,
          passwordHash,
          role: "admin",
        },
        { upsert: true, setDefaultsOnInsert: true },
      );
      console.log(`✅ Admin upserted for ${adminEmail}`);
    } else {
      console.log(
        "Skipped admin user. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local, then run seed again.",
      );
    }

    console.log("\n🎉 Seeding completed successfully (safe to re-run).");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
