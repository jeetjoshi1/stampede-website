# Editing the STAMPEDE site

## The easy way: the admin page (/admin)

Most content can be edited in a form-based editor at **/admin**, no code needed:
update posts, team members, timeline, talks & events, partners, the photo gallery, and site settings
(tagline, mission line, team email, social links, contact-form endpoint, sponsorship PDF).

**On your computer (works now):**
1. Run `npm run dev` and open http://localhost:4321/admin/ in Chrome or Edge.
2. Click **Work with Local Repository** and choose this project folder (`stampede_website`). Allow it to view and edit files.
3. Edit and click **Save**. The change is written straight into the files below, and the dev site updates instantly.
4. Redeploy to Netlify to publish (see the bottom of this file).

**On the live site:** open https://stampede-ucalgary.netlify.app/admin/ and sign in with GitHub (or a GitHub access token).
Each Save commits to the GitHub repository, and Netlify republishes the site automatically about a minute later.

Uploaded photos, logos and PDFs go in `public/uploads/`.

## The files behind it

All the facts on the site live in a handful of plain files. /admin edits them for you, or you can change them by hand:
save, and the site updates (instantly with `npm run dev`; on Netlify after the next build and deploy).

Anything left as `null` shows up on the site as a dashed **[TODO]** chip, so nothing is ever invented.

| What you want to change | File |
|---|---|
| Team members: names, roles, discipline/year, one-line bios, LinkedIn, photos, order | [`src/content/team.yaml`](src/content/team.yaml) |
| Timeline milestones: titles, dates, done / now / next | [`src/content/timeline.yaml`](src/content/timeline.yaml) |
| Talks & events on the Outreach page (e.g. IEEE CCECE 2027) | [`src/content/events.yaml`](src/content/events.yaml) |
| Partners and sponsors (logos only with written permission) | [`src/content/partners.yaml`](src/content/partners.yaml) |
| Team email, tagline, mission line, site description, social links, contact-form endpoint, sponsorship PDF | [`src/content/settings.json`](src/content/settings.json) |
| Experiment specs table and test-plan cards (lists at the top of the file); all other experiment text | [`src/pages/experiment.astro`](src/pages/experiment.astro) |
| The technical answers (from the proposal) that the Experiment page is based on | [`docs/experiment-facts.md`](docs/experiment-facts.md) |
| Update posts (dev log) | [`src/content/log/`](src/content/log/), one Markdown file per post; format in [`docs/log-post-template.md`](docs/log-post-template.md) |
| Photo gallery on the Outreach page | [`src/content/gallery.json`](src/content/gallery.json) |

## Current facts at a glance

- **Team email:** teamstampede.canrgx@gmail.com
- **Tagline:** Built in Calgary. Measured in free fall.
- **Team:** Jeet Joshi (Team Lead, Software & Integration), Sadeeb Dewan (Mechanical Design & Outreach Lead), plus 2 member slots and the faculty advisor still to fill.
- **Timeline:** team formed early Oct 2026 · proposal submitted Oct 23, 2026 · selected for CAN-RGX X Nov 19, 2026 · now in kickoff (late Nov – Dec 2026) · PDR Feb 2027 · CDR Apr 2027 · IEEE CCECE 2027 May 23–26, 2027 (Toronto) · ground test & flight readiness Jun 2027 · flight campaign Jul 2027 (tentative) · post-flight analysis Aug 2027.

Date sources: CAN-RGX 10 milestones from https://seds.ca/can-rgx/ (SEDS says they're approximate);
CCECE 2027 from https://attend.ieee.org/ccece-2027/.

## Tips for editing the YAML files by hand

- Each item starts with `- id: ...`. Keep the indentation (two spaces) and give each item a unique `id`.
- The home page's "Current phase" follows whichever timeline milestone has `status: now`.
- If the dev server shows an error after saving, it's almost always a missing quote or a wrong indent on the line you just edited.

## Publishing to Netlify

Netlify builds the site from GitHub (jeetjoshi1/stampede-website) on every push to `main`, using the settings in
[`netlify.toml`](netlify.toml). Saving in /admin while signed in with GitHub commits to `main`, so the live site updates
by itself about a minute later. Edits made locally go live once they're committed and pushed (`git push`).

Live preview: https://stampede-ucalgary.netlify.app (marked noindex, so search engines skip it).

To deploy by hand instead (e.g. to test without pushing), stop `npm run dev` first, then:

```powershell
$env:SITE_URL="https://stampede-ucalgary.netlify.app"; $env:NOINDEX="1"; npm run build
```

```powershell
npx netlify-cli deploy --dir dist --prod --site fdf8d7f3-7462-46cf-b1b2-0ddccb33e71f --no-build
```
