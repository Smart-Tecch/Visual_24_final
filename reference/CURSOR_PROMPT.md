\*\*\*\*# Project brief: Visual 24 Technical Institute website (Next.js + MongoDB)

You are helping a junior developer rebuild a school website. He is learning back-end development for the first time (MongoDB, APIs, authentication) and wants to understand every step, not just receive finished code. Read this whole file, then read `school-data.json` before writing anything.

## 1. Context

- **School:** Visual 24 Technical Institute, Katale Road, off Kasenge, Steve House, Room No. 4, Uganda.
- **Motto:** "Your Talent, Our Training". Use this exact wording.
- **Audience:** school leavers, young adults and working people in and around Kampala, mostly on phones and mobile data.
- **Owner's focus:** he teaches web design and development, programming and computer studies. Friends teach the creative courses. Lead with the technical courses.
- **Reference UI:** https://visual-24-technical-institute.lovable.app/ — open it and reuse its visual identity: layout, section order, typography feel, colors and spacing. Do not redesign it from scratch. Improve it where this file says to.
- **Source of truth for all facts:** `school-data.json`.

## 2. Tech stack (do not substitute)

- Next.js (latest stable) with the **App Router** and **TypeScript**
- Tailwind CSS
- **MongoDB Atlas** with **Mongoose**
- **Zod** for validating every request body
- **Auth.js (NextAuth)** with a credentials provider for the admin login. Hash passwords with bcrypt.
- Forms: React Hook Form with Zod
- Image uploads: Cloudinary or UploadThing (ask which before adding)
- Email notifications: Resend (ask before adding)
- Secrets live in `.env.local`. Never hardcode them. Provide a `.env.example`.

## 3. Hard rules about content

1. **Never invent facts.** If a value in `school-data.json` is `null`, empty or contains "TODO", do not make one up. Hide the UI that depends on it, or show a clear "coming soon" state.
2. The live site's stats (12+ courses, 8 labs, 70% mentors in industry) and sample student projects are unverified placeholders. Do not display them. Follow the `stats` and `projects` notes in the data file.
3. Courses with `status: "coming-soon"` (Film Production, Videography) appear with a "Coming soon" badge, have no apply button, and are not featured on the home page.
4. Put the technical category first on the home page and on `/courses`.
5. Phone and WhatsApp are not available yet. Build the WhatsApp button and phone display so they appear automatically once those fields are filled in.
6. Fees may be private. Only show a fee if the course has one and a `showFees` site setting is true (default false).

## 4. Pages and routes

| Route                           | Content                                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `/`                             | Hero, studios/categories, featured courses, student work (only if projects exist), admission call to action |
| `/about`                        | Mission, studio code, team (only if provided)                                                               |
| `/courses`                      | All courses grouped by category, technical first                                                            |
| `/courses/[slug]`               | Summary, level, duration, outline, next intake, Apply button                                                |
| `/projects`, `/projects/[slug]` | Student work gallery, hidden from navigation until projects exist                                           |
| `/admissions`                   | Apply form                                                                                                  |
| `/contact`                      | Inquiry form, address, email, phone/WhatsApp when available, social links                                   |
| `/admin`                        | Protected dashboard (see section 6)                                                                         |

Use Server Components for pages that read data and Client Components only for interactive parts (forms, menus).

## 5. Data model (Mongoose)

Create these collections with sensible indexes and timestamps:

- **Course:** title, slug (unique index), category, level, duration, status (`active` or `coming-soon`), featured, order, summary, outline (string array), fee (optional), instructor (optional)
- **Intake:** course (reference), startDate, seats, status (`open` or `closed`)
- **Inquiry:** name, phone, email, course (optional reference), message, status (`new`, `contacted`, `closed`)
- **Application:** fullName, phone, email, dateOfBirth (optional), course (reference), intake (optional reference), message, status (`new`, `contacted`, `enrolled`, `declined`)
- **Project:** title, slug, category, description, images (URLs), studentNames, published
- **Admin:** name, email (unique), passwordHash, role
- **SiteSettings:** a single document for school details, contacts, social links and the `showFees` flag

Write one **cached connection helper** (so development reloads do not open many connections) and a **seed script** (`npm run seed`) that reads `school-data.json` and upserts courses and settings. The seed must be safe to run repeatedly.

## 6. Features and build order

Work in phases. **Stop at the end of each phase**, summarize what you built in plain language, tell me how to test it, and wait for my go-ahead.

**Phase 1: Public site from the database.** Project setup, MongoDB connection, models, seed script, home, courses list and course detail pages reading from MongoDB. Port the Lovable UI.

**Phase 2: Forms.** Inquiry and application forms. Validate on the server with Zod. Return proper status codes and friendly errors. Add basic rate limiting and a honeypot field against spam. Save to MongoDB.

**Phase 3: Admin.** Auth.js login, middleware protecting `/admin`, and verification of the session inside every admin API route and server action. Admin can add, edit, hide and reorder courses; manage intakes; read and change status of inquiries and applications; add projects with images.

**Phase 4: Discoverability and performance.** Per-page metadata and Open Graph, `sitemap.xml`, `robots.txt`, `EducationalOrganization` JSON-LD with the address, `next/image` everywhere, light pages for mobile data, 404 and error pages. Correct the canonical and share URL typo on the old site ("technial" should be "technical").

**Phase 5 (only when asked):** Mobile Money payments (Flutterwave or Pesapal), student portal.

## 7. Quality bar

- Mobile first. Every page must work at 360 px wide.
- Accessible: semantic headings, labels on every input, visible focus, sufficient contrast, alt text.
- Consistent API response shape and correct status codes (400, 401, 403, 404, 500).
- Never return password hashes or secrets in responses.
- Keep routes thin. Put database logic in a separate data/service layer.
- No unused dependencies. No placeholder lorem ipsum.

## 8. How I want you to work (important: I am learning)

- Explain _why_ before big steps, in simple words. Add short comments in code where a beginner would be confused (connection caching, Server vs Client Components, validation, auth checks).
- Do not scaffold everything in one go. Small, reviewable steps.
- When you make a choice (library, folder layout), say what the alternative was.
- If something in this file or the data file is unclear or missing, **ask me instead of guessing**.
- Finish each phase with: files created, how to run and test, and one thing I should try changing myself to confirm I understood it.

## 9. Reusability

This will become a template for other schools. Keep every school-specific value (name, motto, colors, address, contacts, courses) in `school-data.json`, the database or a single theme config, never scattered through components.

## 10. Definition of done for each phase

It builds with no TypeScript or lint errors, runs locally with `npm run dev`, works on a phone-sized screen, and I understand what each new file does.
