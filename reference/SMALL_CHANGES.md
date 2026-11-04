# Visual 24 - Small Detail Changes

Three small changes: (1) coming-soon courses, (2) colour-coded badges, (3) smaller menu links.
Each one has a plain explanation (so you learn it) and a ready prompt to paste into Cursor.

---

## Change 1 - Coming-soon courses

### What it is
Courses you plan to offer later are shown on the Courses page next to the real ones, with an orange
"Coming soon" badge, so visitors see how much the school will grow.

### The logic (how it works)
- Every course gets one new piece of information called **status**.
- Status has only two values: `available` or `coming-soon`.
- The Courses page reads the status and decides how each card behaves:
  - **available**: normal card, badge shows the level (Beginner or Intermediate), "Learn more" opens the course page.
  - **coming-soon**: card shows the orange "Coming soon" badge instead of a level, the picture is a little
    dimmed, and there is NO "Learn more" link (no empty page to open).
    Instead the button says "Get notified" and opens WhatsApp (0741653226) with a ready message like
    "Hello Visual 24, please tell me when [course name] starts."
- Because the data lives in school-data.json and MongoDB, you add the status field in both places.
  Next time you launch a course, you only change its status from `coming-soon` to `available`. Nothing else.

### Courses to list as coming soon (CONFIRM these, I only guessed)
Your site already mentions these, so they are my suggestions:
1. Photography
2. Multimedia and Video Editing
3. Music Production
4. Digital Marketing
(Film production is left out because the equipment is not bought yet.)
Tell me which of these are really coming soon, and the exact names, and I will update this list.

### Where they appear
- Courses page: inside their own group, under Technical / Creative / Business as they belong.
- Home page "Loading courses..." section: keep only available courses there, so the home page stays clean.

---

## Change 2 - Badge colours

All three badges use the same recipe: a soft, see-through tinted background, a brighter text colour,
and a thin border of the same colour. This keeps them readable on your dark navy cards and not too loud.

| Badge         | Meaning        | Text colour | Background (15% tint) | Border (40%) |
|---------------|----------------|-------------|-----------------------|--------------|
| Beginner      | Green          | #4ADE80     | rgba(74, 222, 128, 0.15) | rgba(74, 222, 128, 0.40) |
| Intermediate  | Sky blue       | #38BDF8     | rgba(56, 189, 248, 0.15) | rgba(56, 189, 248, 0.40) |
| Coming soon   | Orange         | #FB923C     | rgba(251, 146, 60, 0.15) | rgba(251, 146, 60, 0.40) |

Light mode (your site has a light/dark toggle): the bright text colours get hard to read on white,
so use these darker versions for text only:
- Beginner text: #15803D
- Intermediate text: #0369A1
- Coming soon text: #C2410C
(Keep the same tinted backgrounds, they work on both themes.)

Why these colours: green = start here, easy. Blue = steady progress, calm. Orange = attention, something new
is arriving. Orange is the warmest colour on the page, so "Coming soon" naturally stands out first.

Badge shape: small rounded pill, small uppercase-free text, a little padding left and right.
The duration ("4 Months") stays plain grey text next to the badge, as it is now.
For coming-soon cards, do not show a duration unless you know it.

---

## Change 3 - Smaller menu links

### What it is
When you press MENU, the page links (About, Courses, Contact, Admissions...) look too big.

### The logic
Reduce the size, not the importance. The links should still be the biggest text in the menu,
just calmer.
- Make the link text about 30-35% smaller than now.
  Rough targets: about 28-32px on computers and about 22-24px on phones.
- Reduce the gap between links by about a quarter so the list looks tidy.
- Keep them in the same font and weight so the style stays consistent.
- Keep the tap area tall enough for fingers (at least 44px high) even though the text is smaller.
- Do not change the top bar (INQUIRE, VISIT, COURSES, MENU) unless you also want it smaller.
I have not seen the opened menu, so tell Cursor to reduce from whatever the current size is by that percentage.

---

## Bonus small fixes I noticed in your screenshot
1. "Learn more →" on the cards is almost invisible (very faint on the dark card). Make it a
   brighter colour such as the sky blue #38BDF8, and brighten it a little on hover.
2. The Web Design card picture is a close-up of a computer tower. It does not say "web design".
   Swap it for a website/design laptop picture (see the Pinterest list, Part 2).

---

## Prompt to paste into Cursor (Grok)

```
Make these small changes to the Visual 24 Next.js project. Do not change anything else.

1. COMING-SOON COURSES
- Add a "status" field to every course in school-data.json and in the MongoDB course model.
  Allowed values: "available" or "coming-soon". Existing courses = "available".
- Add these courses with status "coming-soon": [PASTE CONFIRMED NAMES HERE].
  Give each a short one-line description and put it in the right group (Technical / Creative / Business).
- On the Courses page, show coming-soon courses as cards in their group.
  Coming-soon cards: orange "Coming soon" badge instead of the level, slightly dimmed image,
  no link to a course detail page, and a "Get notified" button that opens
  https://wa.me/256741653226 with the message "Hello Visual 24, please tell me when [course name] starts."
- On the home page course section, show only courses with status "available".

2. BADGE COLOURS (use for the level and coming-soon badges, pill shape)
- Beginner: text #4ADE80, background rgba(74,222,128,0.15), border rgba(74,222,128,0.40)
- Intermediate: text #38BDF8, background rgba(56,189,248,0.15), border rgba(56,189,248,0.40)
- Coming soon: text #FB923C, background rgba(251,146,60,0.15), border rgba(251,146,60,0.40)
- In light mode use darker text: Beginner #15803D, Intermediate #0369A1, Coming soon #C2410C.
- Keep the duration (for example "4 Months") as plain grey text beside the badge.

3. MENU
- In the opened MENU, reduce the page link font size by about 30-35%
  (about 28-32px desktop, 22-24px mobile) and reduce spacing between links by about 25%.
- Keep tap targets at least 44px high. Do not change the top bar.

4. SMALL FIX
- Make the "Learn more →" text on course cards clearly visible (#38BDF8, brighter on hover).

After the changes, run the project, confirm there are no errors, and tell me which files you changed.
```
