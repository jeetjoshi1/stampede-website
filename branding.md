# STAMPEDE — Brand & Website Spec

> **For Claude Code:** This file is the single source of truth for the STAMPEDE team website.
> Follow it exactly for colours, type, layout, components and page structure.
> Where a value is marked `[TODO: …]`, leave a visible placeholder in the UI — **never invent
> names, numbers, dates, results or sponsor logos.**

---

## 1. Who we are

| | |
|---|---|
| **Team name** | STAMPEDE |
| **Full name** | **S**pacecraft **T**ensor **A**nd **M**ass **P**roperty **E**stimation **D**uring **E**xcitation |
| **Competition** | CAN-RGX X (Canadian Reduced Gravity Experiment design challenge), flying in 2027 |
| **Home** | University of Calgary — Schulich School of Engineering, Calgary, Alberta |
| **Experiment (one line)** | Measuring a body's mass moment of inertia in reduced gravity using reaction wheels. |
| **Experiment (short)** | We spin reaction wheels to apply known torques to a free-floating test article during parabolic flight, measure how it responds, and estimate its full inertia tensor in real time onboard using recursive least squares (RLS) and an extended Kalman filter (EKF). |
| **Team lead** | Jeet Joshi — software & integration |
| **Faculty advisor (PI)** | `[TODO: name, title]` |
| **Team members** | `[TODO: names, roles, photos]` |
| **Support** | Schulich SSAF · faculty advisor (travel co-funding) · SDTech Alberta (experiment build) |
| **Presenting at** | IEEE CCECE 2027 (Toronto) · UCalgary student symposia |

**Brand idea in one sentence:** *Calgary engineering, launched into zero-g.*
The brand mixes Calgary pride (red, white, gold, skyline, Rockies) with real aerospace
engineering (precise, data-driven, clean). It should feel like a mission patch, not a sports team.

### 1.1 Using the name

- **STAMPEDE** (all caps) is the name everywhere. Never write "Stampede" or "the Stampede team"; it reads as the rodeo.
- **Full name:** *Spacecraft Tensor And Mass Property Estimation During Excitation.* Spell it out exactly like this, with "And" capitalised so the acronym works.
- **Where the full name appears:**
  - Home hero, directly under the H1 (Archivo 500, 20 px, `--text-muted`)
  - The first paragraph of `/experiment` and the Team intro
  - Footer, under the lockup (Archivo 14 px)
  - The default `<meta name="description">` and Open Graph description
  - Press kit boilerplate
- **Acronym treatment** (hero and About only): set the first letter of each word in `--calgary-red` (`--gold-light` on dark), Archivo 700, so the full name visibly spells S-T-A-M-P-E-D-E:
  ```html
  <p class="fullname"><b>S</b>pacecraft <b>T</b>ensor <b>A</b>nd <b>M</b>ass <b>P</b>roperty <b>E</b>stimation <b>D</b>uring <b>E</b>xcitation</p>
  ```
  `.fullname b { color: var(--primary); font-weight: 700; }` Keep it one line on desktop; let it wrap naturally on mobile.
- **Page titles:** `STAMPEDE — Spacecraft Tensor And Mass Property Estimation During Excitation` on Home; `Page — STAMPEDE` everywhere else.

---

## 2. Logo

### 2.1 Assets
Already in this repo:

| File | What | Use |
|---|---|---|
| `/public/brand/stampede-patch.svg` | Round mission patch (full colour, 800×800) | Hero, About, social avatar |
| `/public/brand/stampede-lockup.svg` | Patch + "TEAM / STAMPEDE / CAN-RGX X · UCALGARY" + full name, horizontal (1384×480) | Footer, headers, press kit |
| `/public/brand/favicon.svg` | Simplified mark: gold reaction wheel on a red disc | Favicon, app icon, anything under 96 px |
| `/src/styles/tokens.css` | Every colour, font, spacing, radius and theme variable from §3–§6 | Import once globally; use only these variables |

**Fonts inside the SVGs:** the ring text and wordmark are live SVG text in **Archivo Expanded** (Archivo at `font-stretch: 125%`, weights 600–800) plus regular Archivo 500, loaded with an `@import` inside each SVG. The site must load Archivo with its width axis (`family=Archivo:wdth,wght@…`) for inlined copies to render correctly; `BaseLayout.astro` already does.
That works when the SVG is opened directly or **inlined** in the page (with the site loading the same fonts), but a browser does **not** load web fonts for an SVG used through `<img>` or CSS `background-image`, so the text would fall back to a default font.
So: **inline the patch and lockup** (e.g. as an Astro/React component), or first convert their text to outlines.

**Setup task (Claude Code, then delete this paragraph):** the patch and lockup changed on 2026-11-19. `scripts/build-brand-assets.mjs` only embeds static Unbounded/Archivo fonts, so it would outline the new Archivo Expanded text wrongly. Install `@fontsource-variable/archivo` (it includes the `wdth` axis), make the script load it for `font-stretch: 125%` text, update its og-image wordmark to Archivo Expanded 800 to match the lockup, switch the footer `.lockup-word` / `.lockup-sub` in `Footer.astro` to Archivo Expanded (800 / 700, `font-stretch: 125%`) with the sub-line "CAN-RGX X · UCALGARY", then run `npm run brand:assets` and `npm run build`.

Derived files (regenerate with `npm run brand:assets` after editing a master SVG): `stampede-patch-outlined.svg` and `stampede-lockup-outlined.svg` (text as outlines, use wherever an `<img>` is needed), `stampede-patch.png` (1600×1600), `apple-touch-icon.png` (180×180) and `og-image.png` (1200×630).

**The patch contains:** a Calgary-red ring with cream "TEAM STAMPEDE" (top) and "CAN-RGX X · UCALGARY" (bottom, the Roman numeral "X" in light gold) set in **Archivo Expanded** and spread widely around the ring, gold rims and two gold four-point stars.
Inside, on a cream sky: a gold reaction wheel rising like the sun, the Rockies in two flat red tints with cream snow and soft ridge lines,
a small red-and-maroon satellite with gold sparkles in the sky, and a **solid maroon silhouette** of the downtown Calgary skyline (The Bow with its diagrid, the Calgary Tower, the downtown towers and the Saddledome on the right)
over cream river lines. The style is flat and minimal: four colours, no gradients.

**The lockup:** patch (400 px in a 1384×480 frame) beside a text block 800 px wide: a gold dash + "TEAM" (Archivo Expanded 700, red), "STAMPEDE" (Archivo Expanded 800, red, fills the block width), a 120 px gold rule, "CAN-RGX X · UCALGARY" (Archivo Expanded 700, maroon, gold "X"), and the full name (Archivo 500, `--ink-muted`). Widths are fixed with SVG `textLength`, so the block keeps its proportions in any renderer.

### 2.2 Usage rules
- **Clear space:** at least 25% of the logo's diameter on every side.
- **Minimum size:** full patch ≥ 96 px wide on screen. Below that, use `favicon.svg` (the wheel mark).
- **Backgrounds:** white, `--cream`, `--paper`, `--night`, or a plain photo darkened to ≥ 60%. Never on busy imagery.
- **Never:** recolour, stretch, rotate, add drop shadows or glows, crop the ring, re-type the ring text, or put the patch inside another circle/badge.
- The wordmark "STAMPEDE" is always **Archivo Expanded 800** (Archivo, `font-stretch: 125%`), all caps. Never set it in another font.

---

## 3. Colour

### 3.1 Core palette (from the patch)

| Token | Hex | Role |
|---|---|---|
| `--calgary-red` | `#A6192E` | **Primary.** Brand colour, primary buttons, key headings, links (light theme) |
| `--red-bright` | `#C8102E` | Hover/active for red, small accents, focus ring on light |
| `--gold` | `#C9A13B` | Decorative only on light backgrounds (rules, icons, borders). **Not for text on white** (2.4:1) |
| `--gold-light` | `#F2CD6A` | Highlights on dark/red backgrounds, "X"-style accents, dark-theme links |
| `--maroon` | `#6E0F1D` | Deep red from the skyline silhouette. Headings on cream, footer, dark accents (12.0:1 on white) |
| `--cream` | `#F7F1E6` | The patch's sky. Warm section background, text on red/maroon |
| `--gold-ink` | `#8A6A1E` | When gold-coloured **text** is needed on white (5.0:1) |
| `--white` | `#FFFFFF` | Base background, text on red |
| `--paper` | `#F7F4EE` | Warm off-white for alternating sections |
| `--ink` | `#1E2A33` | Body text and headings on light |
| `--ink-muted` | `#4A5560` | Secondary text, captions on light |
| `--line` | `#E3DED5` | Borders and dividers on light |
| `--night` | `#0E1726` | Dark theme background, dark hero sections |
| `--night-surface` | `#172338` | Cards and panels on dark |
| `--night-line` | `#2A3A55` | Borders on dark |
| `--snow` | `#F5F1EA` | Text on dark |
| `--snow-muted` | `#A9B4C2` | Secondary text on dark |

### 3.2 Patch tints (illustration and data viz only)
These are the flat mountain tints from the patch. Use them for section art, illustration fills and chart backgrounds, **never for text**.

| Token | Hex | From the patch |
|---|---|---|
| `--tint-1` | `#EED8D0` | Far mountains |
| `--tint-2` | `#DDB2A9` | Near mountains |

**No gradients.** The brand is flat: solid fills, crisp silhouettes, thin gold rules.

### 3.3 Colour proportions
About 60% neutral (white/cream or night), 25% ink/snow text, 10% Calgary red + maroon, 5% gold.
Red is the voice; gold is the sparkle. If a screen looks like a sports jersey, there's too much red.

### 3.4 Checked contrast pairs (WCAG)
| Text | Background | Ratio | OK for |
|---|---|---|---|
| `--ink` | white | 14.6 | everything |
| `--ink-muted` | white | 7.6 | everything |
| `--calgary-red` | white | 7.5 | everything |
| `--red-bright` | white | 5.9 | body text and up |
| white | `--calgary-red` | 7.5 | buttons, banners |
| `--gold-light` | `--calgary-red` | 4.9 | short text ≥ 16px |
| `--gold-ink` | white | 5.0 | body text and up |
| `--snow` | `--night` | 16.0 | everything |
| `--snow-muted` | `--night` | 8.6 | everything |
| `--gold-light` | `--night` | 11.7 | links, accents |
| `--maroon` | white | 12.0 | everything |
| `--maroon` | `--cream` | 10.7 | everything |
| `--cream` | `--calgary-red` | 6.7 | buttons, banners, ring-style text |
| `--gold-light` | `--maroon` | 7.2 | accents, small caps |
| `--ink` | `--cream` | 13.0 | everything |
| `--gold` | white | **2.4** | ❌ never text, decoration only |

---

## 4. Themes

Support **light (default)** and **dark**: follow `prefers-color-scheme`, add a toggle in the header, and remember the choice in `localStorage` (wrapped in try/catch).

```css
:root {
  --bg: #FFFFFF;        --bg-alt: #F7F1E6;     --surface: #FFFFFF;
  --text: #1E2A33;      --text-muted: #4A5560; --border: #E3DED5;
  --primary: #A6192E;   --primary-hover: #C8102E; --on-primary: #FFFFFF;
  --accent: #C9A13B;    --link: #A6192E;       --focus: #C8102E;
}
[data-theme="dark"] {
  --bg: #0E1726;        --bg-alt: #121D30;     --surface: #172338;
  --text: #F5F1EA;      --text-muted: #A9B4C2; --border: #2A3A55;
  --primary: #C8102E;   --primary-hover: #E0283F; --on-primary: #FFFFFF;
  --accent: #F2CD6A;    --link: #F2CD6A;       --focus: #F2CD6A;
}
```
The hero is always `--cream` with a full-width maroon skyline silhouette along its bottom edge, whatever the theme, so the patch always sits on the same backdrop.

---

## 5. Typography

Load from Google Fonts: **Unbounded** (500, 600, 700, 800), **Archivo** (400, 500, 700), **JetBrains Mono** (400, 600).

Unbounded is the character font: wide, geometric and modern, with a space-age feel. Archivo keeps body text clean and readable. Never set body text or long paragraphs in Unbounded; it's a display face.

| Role | Font | Size (desktop / mobile) | Weight | Notes |
|---|---|---|---|---|
| Display / H1 | Unbounded | 64 / 38 px | 800 | ALL CAPS, letter-spacing 0.02em, line-height 1.05 |
| H2 | Unbounded | 34 / 26 px | 700 | Sentence case, line-height 1.2, `--maroon` on light |
| H3 | Archivo | 24 / 20 px | 700 | |
| Eyebrow / label | Unbounded | 12 px | 600 | ALL CAPS, letter-spacing 0.18em, `--primary` (light) / `--accent` (dark) |
| Body | Archivo | 18 / 17 px | 400 | line-height 1.6, max 68 characters a line |
| Small / caption | Archivo | 14 px | 500 | `--text-muted` |
| Data / code / specs | JetBrains Mono | 15 px | 400 | Equations, telemetry, spec tables, timestamps |

Use the mono font for anything engineering-flavoured (`τ = I·α`, `RLS`, `EKF`, `0.04 N·m`, `t+00:21`).
KaTeX is allowed for real equations on the Experiment page.

---

## 6. Layout, spacing, shape

- **Container:** max-width 1200 px, side padding 24 px (mobile) / 48 px (desktop).
- **Grid:** 12 columns, 24 px gutter.
- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 96 px desktop / 64 px mobile.
- **Radius:** 6 px for buttons and inputs, 12 px for cards, 999 px for pills/tags. The patch is the only circle.
- **Borders over shadows.** 1 px `--border`. If a shadow is needed: `0 8px 24px rgba(14,23,38,0.08)`.
- **Breakpoints:** 640, 960, 1200 px. Mobile first.

---

## 7. Brand motifs (use them, but sparingly)

1. **The satellite.** The patch's small satellite (solar panels, body, dish). Use it as an accent icon, beside the timeline's "now" node, or drifting slowly across the hero (disabled under reduced motion). A thin gold dotted orbit ring is allowed as a section divider.
2. **The reaction wheel.** A ring, 6 spokes and a hub. Use it as a loading spinner (slow rotation), bullet icon, favicon, or behind numbered steps.
3. **Skyline silhouette.** The patch's maroon skyline as a solid band: along the bottom of the hero and on top of the footer. Always one flat colour.
4. **Mission-patch framing.** Round crops for team headshots, with a 3 px `--calgary-red` ring and a 2 px gap.
5. **Telemetry labels.** Small mono captions like `T+00:22 · 0.01 g` on images and figures. Only use real values, or `[TODO]`.

Don't use: emoji, stock "rocket launch" clipart, neon glows, generic purple/blue tech gradients, or glassmorphism.

---

## 8. Voice & tone

- **Confident, precise, plain.** Write like engineers explaining to smart non-engineers.
- Short sentences, active voice, real units (SI), real numbers or `[TODO]`.
- A little Calgary warmth is fine ("Built in Calgary, tested in free fall."). Rodeo/cowboy jokes are not.
- Headline style: Unbounded for H1 (caps), H2 (sentence case) and eyebrows (caps); Archivo for H3 and below.
- Example tagline options (pick one, Jeet): *"Calgary engineering, launched into zero-g."* · *"Measuring inertia where gravity lets go."* · *"Spin. Float. Measure."*

---

## 9. Sitemap & page specs

```
/                Home
/experiment      The Experiment
/team            Team
/progress        Progress (timeline + dev log)
/partners        Partners & Support
/outreach        Outreach & Media
/contact         Contact
```
Header nav: Experiment · Team · Progress · Partners · Outreach · **Contact** (as a red button). The logo goes to `/`.
Footer: lockup, short mission line, nav links, social links `[TODO]`, "University of Calgary · Schulich School of Engineering", skyline band, © year.

### 9.1 Home `/`
1. **Hero**: `--cream` background with the maroon skyline silhouette as a full-width band along the bottom, patch on the right (400–480 px, floats gently, ±6 px over 6 s, disabled under reduced motion). Left: eyebrow `CAN-RGX X · UNIVERSITY OF CALGARY`, H1 `STAMPEDE`, the full name beneath it with the acronym treatment (§1.1), one-line mission, buttons: **See the experiment** (primary) · **Support us** (outline).
2. **The idea in 3 steps** (reaction-wheel numbered cards): *Spin* the wheels to apply known torque → *Float* in microgravity on a parabolic flight → *Measure* the response and estimate the inertia tensor onboard (RLS + EKF).
3. **Why it matters:** 2–3 short paragraphs on why in-orbit inertia estimation matters for spacecraft attitude control. `[TODO: Jeet to approve copy]`
4. **Status strip:** current phase as a pill (e.g. `PROPOSAL`), next milestone + date `[TODO]`, link to /progress.
5. **Team teaser:** 4 round headshots + "Meet the team".
6. **Partners strip:** logo row (greyscale, colour on hover) — **only logos with permission**, `[TODO]` placeholders otherwise.
7. **CTA band** (red background): "Want to support a Calgary team in zero-g?" → Contact.

### 9.2 Experiment `/experiment`
- Hero (light): H1 "Measuring inertia where gravity lets go."
- **Objective:** what we're measuring and why.
- **How it works:** diagram slot (test article, reaction-wheel assembly `[TODO: wheel count/config]`, sensors) `[TODO: diagram]`.
- **The physics:** short explanation with KaTeX, e.g. Euler's rotational equations, and how wheel torques excite the body. Mono callouts.
- **Onboard estimation:** RLS vs EKF side by side (what each does, why we run both).
- **Flight profile:** parabola graphic with phases (pull-up ~1.8 g → microgravity ~20 s → pull-out). Real figures from CAN-RGX docs, otherwise `[TODO]`.
- **Hardware spec table** (mono): mass, wheel count/config, max torque, max speed, IMU, computer — all `[TODO]` until confirmed.
- **Safety & constraints:** containment, power and flight-safety approach `[TODO]`.

### 9.3 Team `/team`
- Grid of member cards: round photo with the red patch-ring, name, role, discipline/year, 1-line bio, LinkedIn icon link.
- Groups: Leadership · Software & Controls · Mechanical · Electrical · Advisor.
- Jeet Joshi — Team Lead, Software & Integration. All others `[TODO]`.

### 9.4 Progress `/progress`
- **Timeline** drawn along a gold dotted orbit arc (desktop) / vertical line (mobile): Team formed → Proposal → Selection → Design reviews → Build & test → Flight campaign → Results / CCECE 2027. Each node: date `[TODO]`, status (done / now / next).
- **Dev log:** reverse-chronological posts (Markdown/MDX files in `/content/log/`), each with title, date, author, tags (Software, Mechanical, Testing…), cover image optional.

### 9.5 Partners `/partners`
- Thank-you intro.
- Tiered logo grid: e.g. Program · Funding · Industry · Academic. Known supporters: Schulich SSAF, SDTech Alberta, faculty advisor. Use logos **only with written permission**; otherwise show the name in text.
- "Become a partner": what support goes to (hardware, travel, testing), plus a contact button. Downloadable sponsorship package link `[TODO: PDF]`.

### 9.6 Outreach `/outreach`
- Talks and events (CCECE 2027, UCalgary symposia, school visits `[TODO]`), media mentions, photo gallery (masonry, lightbox, alt text required).
- **Press kit:** patch + lockup downloads, one-paragraph boilerplate, team-lead contact.

### 9.7 Contact `/contact`
- Short form: name, email, organisation (optional), reason (Sponsorship / Media / Join the team / Other), message. Real `<label>`s, inline validation, success state.
- Form backend `[TODO: Formspree / Netlify Forms / mailto — Jeet decides]`. No captcha unless spam becomes a problem.
- Team email `[TODO]`, socials `[TODO]`.

### 9.8 404
Patch at 160 px, "Lost signal." plus a link home. The wheel spinner rotates slowly.

---

## 10. Components

| Component | Spec |
|---|---|
| **Button: primary** | `--primary` bg, white Archivo 700 16 px, padding 14×24, radius 6. Hover `--primary-hover`. Focus: 3 px `--focus` outline, 2 px offset |
| **Button: outline** | 2 px `--primary` border, `--primary` text; on dark: `--snow` border/text |
| **Button: ghost/link** | `--link` text with an underline on hover |
| **Card** | `--surface`, 1 px `--border`, radius 12, padding 24. Optional 3 px top border in `--accent` |
| **Pill / tag** | radius 999, 12 px Archivo 700 caps, `--bg-alt` bg. Status pills: done = `--park`, now = `--calgary-red`, next = `--text-muted` outline |
| **Stat block** | Big number in Unbounded 800 44 px + mono unit + caption. **Real values only** |
| **Spec table** | Mono 15 px, zebra rows in `--bg-alt`, units right-aligned |
| **Section eyebrow** | Small caps label + 24 px gold dash before it |
| **Divider** | Thin gold dotted orbit arc, 100% wide, 40 px tall |
| **Headshot** | 1:1 round crop, 3 px red ring + 2 px gap, greyscale → colour on hover |
| **Header** | 72 px tall, sticky, `--bg` at 90% with backdrop blur, 1 px bottom border once scrolled. Mobile: hamburger → full-screen menu on `--night` |
| **Footer** | `--night` bg in both themes, skyline band on top, lockup, 3 link columns |

Icons: Lucide (stroke 1.75), sized 20–24 px, `currentColor`.

---

## 11. Imagery

- **Photos:** real team, real hardware, real Calgary. Warm, natural colour grading. No stock photos of astronauts or rockets.
- **Diagrams:** flat line art: 1.5 px strokes in `--ink`/`--snow`, `--calgary-red` for the key part, `--gold` for motion/torque arrows, mono labels.
- **Charts:** series colours in order: `--calgary-red`, `--gold`, `--maroon`, `--ink-muted`, `--tint-2`. Gridlines `--border`. Mono tick labels.
- Every image needs `alt` text. Decorative SVGs get `aria-hidden="true"`.

---

## 12. Motion

- Ease `cubic-bezier(0.2, 0.7, 0.2, 1)`, durations 150 ms (hover), 300 ms (UI), 600 ms (section reveals).
- Reveal on scroll: fade + 12 px rise, once only.
- Signature moments: the patch floating in the hero, the wheel spinner, the orbit divider drawing itself (stroke-dashoffset) when it scrolls into view, and the satellite drifting across the hero.
- Respect `prefers-reduced-motion`: no floating, no drawing, no parallax.

---

## 13. Accessibility & quality bar

- WCAG 2.2 AA: use only the contrast pairs in §3.4. Visible focus everywhere. Touch targets ≥ 44 px.
- Semantic HTML (`header`, `nav`, `main`, `footer`, real `button`/`a`), one H1 per page, skip-to-content link.
- Lighthouse ≥ 95 on Performance, Accessibility, Best Practices and SEO. Images in AVIF/WebP with explicit width/height; fonts with `font-display: swap`.
- Each page gets a title (`Page — STAMPEDE`), a meta description, Open Graph tags (`og-image.png`) and a canonical URL.

---

## 14. Implementation notes for Claude Code

- Use the framework already in the repo. If the repo is empty, use **Astro + MDX** (static, fast, Markdown dev log), deployable to GitHub Pages / Netlify.
- Put all tokens from §3–§6 in one `src/styles/tokens.css` and only ever use the variables — no hard-coded hex values in components.
- Content (team members, timeline, partners, log posts) goes in data/MD files under `src/content/`, so non-coders can edit it.
- Keep placeholder text as visibly flagged `[TODO: …]` chips (dashed `--accent` border) so they're easy to find before launch.
- Don't add analytics, cookies or trackers without asking.

---

## 15. Open decisions (Jeet to make)

1. **Tagline:** pick one from §8 or write your own.
2. **Domain and hosting:** e.g. a club subdomain vs your own domain; GitHub Pages vs Netlify.
3. **Contact form backend:** a form service vs a plain `mailto`.
4. **Dev log:** public from day one, or only after selection?
5. **Hardware numbers:** which specs are firm enough to publish before the design review?
6. **Partner logos:** who has given written permission to show their logo?
