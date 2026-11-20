// SITE SETTINGS. The editable values (tagline, mission, email, socials, form endpoint, sponsorship PDF)
// live in src/content/settings.json, which /admin edits. Anything null shows a visible [TODO] chip.
import settings from "../content/settings.json";

type Social = { label: string; href: string };

export const SITE = {
  name: "STAMPEDE",
  fullName: "Spacecraft Tensor And Mass Property Estimation During Excitation",
  institution: "University of Calgary · Schulich School of Engineering",
  description: settings.description as string,
  mission: settings.mission as string,
  tagline: (settings.tagline || null) as string | null,
  teamEmail: (settings.teamEmail || null) as string | null,
  socials: (settings.socials ?? []) as Social[],
  formEndpoint: (settings.formEndpoint || null) as string | null,
  sponsorshipPdf: (settings.sponsorshipPdf || null) as string | null,
};

export const NAV = [
  { href: "/experiment", label: "Experiment" },
  { href: "/team", label: "Team" },
  { href: "/progress", label: "Progress" },
  { href: "/partners", label: "Partners" },
  { href: "/outreach", label: "Outreach" },
];
