import mongoose from "mongoose";
import dbConnect from "../lib/db";
import Course from "../lib/models/Course";
import Project from "../lib/models/Project";

const courses = [
  {
    title: "Film Production",
    slug: "film-production",
    shortDescription: "Learn professional filmmaking from script to screen.",
    fullDescription:
      "Complete training in directing, cinematography, editing and production.",
    duration: "3 Months",
    level: "Beginner",
    isFeatured: true,
    order: 1,
  },
  {
    title: "Photography",
    slug: "photography",
    shortDescription: "Master the art of capturing stunning images.",
    fullDescription:
      "From camera basics to advanced lighting and photo editing.",
    duration: "2 Months",
    level: "Beginner",
    isFeatured: true,
    order: 2,
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    shortDescription: "Create powerful visual designs using modern tools.",
    fullDescription:
      "Learn Photoshop, Illustrator, branding and visual communication.",
    duration: "3 Months",
    level: "Beginner",
    isFeatured: true,
    order: 3,
  },
  {
    title: "Web Design & Development",
    slug: "web-design-development",
    shortDescription: "Build modern and responsive websites.",
    fullDescription: "HTML, CSS, JavaScript, React and Next.js training.",
    duration: "4 Months",
    level: "Intermediate",
    isFeatured: true,
    order: 4,
  },
  {
    title: "Music Production",
    slug: "music-production",
    shortDescription: "Produce professional music tracks.",
    fullDescription: "Learn FL Studio, mixing, mastering and sound design.",
    duration: "3 Months",
    level: "Beginner",
    isFeatured: false,
    order: 5,
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    shortDescription: "Grow businesses using digital platforms.",
    fullDescription:
      "SEO, Social Media Marketing, Google Ads and content strategy.",
    duration: "2 Months",
    level: "Beginner",
    isFeatured: false,
    order: 6,
  },
  {
    title: "Videography",
    slug: "videography",
    shortDescription: "Professional video shooting and editing.",
    fullDescription: "Camera work, lighting, storytelling and post-production.",
    duration: "2 Months",
    level: "Beginner",
    isFeatured: false,
    order: 7,
  },
  {
    title: "Computer Studies",
    slug: "computer-studies",
    shortDescription: "Essential computer skills for everyone.",
    fullDescription:
      "MS Office, internet, basic troubleshooting and digital literacy.",
    duration: "1.5 Months",
    level: "Beginner",
    isFeatured: false,
    order: 8,
  },
];

async function seed() {
  try {
    await dbConnect();
    console.log("Connected to database...");

    // Clear existing data
    await Course.deleteMany({});
    await Project.deleteMany({});
    console.log("Cleared old data...");

    // Insert courses
    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ ${createdCourses.length} courses created`);

    // Create some sample projects
    const projects = [
      {
        title: "Student Short Film - Dreams",
        slug: "student-short-film-dreams",
        description:
          "A powerful short film created by our film production students.",
        category: "Film Production",
        isFeatured: true,
        course: createdCourses[0]._id,
      },
      {
        title: "Brand Identity - Local Cafe",
        slug: "brand-identity-local-cafe",
        description:
          "Complete branding package designed by graphic design class.",
        category: "Graphic Design",
        isFeatured: true,
        course: createdCourses[2]._id,
      },
      {
        title: "Wedding Photography Series",
        slug: "wedding-photography-series",
        description: "Beautiful wedding coverage by photography students.",
        category: "Photography",
        isFeatured: true,
        course: createdCourses[1]._id,
      },
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log(`✅ ${createdProjects.length} projects created`);

    console.log("\n🎉 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
