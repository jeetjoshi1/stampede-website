import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

// Fields left empty in /admin may be saved as "" or omitted; treat both as "not set" (shows a [TODO] chip).
const blank = (v: unknown) => (v === "" ? null : v);
const optStr = () => z.preprocess(blank, z.string().nullish());
const optUrl = () => z.preprocess(blank, z.string().url().nullish());

// Content lives in src/content so non-coders can edit it (branding.md §14).
// Any field set to null renders as a visible [TODO] chip on the site. Never invent values.

const team = defineCollection({
  loader: file("src/content/team.yaml"),
  schema: z.object({
    name: optStr(),
    role: optStr(),
    group: z.enum(["Leadership", "Software & Controls", "Mechanical", "Electrical", "Advisor"]),
    discipline: optStr(), // e.g. "Software Engineering, 4th year"
    bio: optStr(), // one line
    photo: optStr(), // path under /public, e.g. "/team/jeet.webp" (square, ≥ 400 px)
    linkedin: optUrl(),
    order: z.number(),
  }),
});

const timeline = defineCollection({
  loader: file("src/content/timeline.yaml"),
  schema: z.object({
    title: z.string(),
    date: optStr(), // free text, e.g. "Nov 2026"
    status: z.enum(["done", "now", "next"]),
    order: z.number(),
  }),
});

const partners = defineCollection({
  loader: file("src/content/partners.yaml"),
  schema: z.object({
    name: z.string(),
    tier: z.enum(["Program", "Funding", "Industry", "Academic"]),
    support: optStr(), // what they support
    url: optUrl(),
    // Only set a logo once the partner has given WRITTEN permission (branding.md §9.5).
    logo: optStr(),
    order: z.number(),
  }),
});

const events = defineCollection({
  loader: file("src/content/events.yaml"),
  schema: z.object({
    title: z.string(),
    kind: z.enum(["Talk", "Event", "School visit", "Media"]),
    place: optStr(),
    date: optStr(),
    url: optUrl(),
    order: z.number(),
  }),
});

const gallery = defineCollection({
  loader: file("src/content/gallery.json"),
  schema: z.object({
    src: z.string(), // AVIF/WebP under /public/gallery
    width: z.number().optional(),
    height: z.number().optional(),
    alt: z.string().min(1), // required (branding.md §11)
    caption: optStr(),
    telemetry: optStr(), // real values only, e.g. "T+00:22 · 0.01 g"
  }),
});

// Dev log: one Markdown/MDX file per post. Files starting with "_" are ignored (see _template.md).
const log = defineCollection({
  loader: glob({ base: "./src/content/log", pattern: "**/[^_]*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.enum(["Software", "Mechanical", "Electrical", "Testing", "Outreach", "Team"])).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { team, timeline, partners, events, gallery, log };
