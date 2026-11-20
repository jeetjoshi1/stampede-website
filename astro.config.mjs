// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// [TODO: domain — Jeet decides (branding.md §15.2)]. Set SITE_URL (or edit this line) before launch
// so canonical URLs and Open Graph image URLs become absolute.
const site = process.env.SITE_URL || undefined;

export default defineConfig({
  site,
  integrations: [mdx()],
  trailingSlash: "ignore",
});
