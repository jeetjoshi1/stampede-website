// Builds derived brand assets from the master SVGs in /public/brand (branding.md §2.1):
//   stampede-patch-outlined.svg, stampede-lockup-outlined.svg  (live text -> glyph outlines)
//   stampede-patch.png (1600²), apple-touch-icon.png (180²), og-image.png (1200×630)
//
// Layout comes from a real browser (so textPath, letter-spacing and kerning match exactly),
// glyph outlines come from the same font files via opentype.js.
// Run: npm run brand:assets   (set BROWSER_PATH if Edge/Chrome is not at the default path)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import opentype from "opentype.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brand = path.join(root, "public", "brand");
const fsrc = (pkg, file) => path.join(root, "node_modules", "@fontsource", pkg, "files", file);

const FONTS = [
  { family: "Unbounded", weight: 500, file: fsrc("unbounded", "unbounded-latin-500-normal.woff") },
  { family: "Unbounded", weight: 600, file: fsrc("unbounded", "unbounded-latin-600-normal.woff") },
  { family: "Unbounded", weight: 700, file: fsrc("unbounded", "unbounded-latin-700-normal.woff") },
  { family: "Unbounded", weight: 800, file: fsrc("unbounded", "unbounded-latin-800-normal.woff") },
  { family: "Archivo", weight: 400, file: fsrc("archivo", "archivo-latin-400-normal.woff") },
  { family: "Archivo", weight: 500, file: fsrc("archivo", "archivo-latin-500-normal.woff") },
  { family: "Archivo", weight: 700, file: fsrc("archivo", "archivo-latin-700-normal.woff") },
];

const BROWSER_CANDIDATES = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const executablePath = BROWSER_CANDIDATES.find((p) => fs.existsSync(p));
if (!executablePath) throw new Error("No Chromium-based browser found; set BROWSER_PATH.");

const fontFaceCss = FONTS.map(
  (f) =>
    `@font-face{font-family:"${f.family}";font-weight:${f.weight};font-style:normal;` +
    `src:url(data:font/woff;base64,${fs.readFileSync(f.file).toString("base64")}) format("woff");}`
).join("\n");

const otFonts = new Map(FONTS.map((f) => [`${f.family}|${f.weight}`, opentype.parse(toArrayBuffer(fs.readFileSync(f.file)))]));
function toArrayBuffer(buf) {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/** Serialise opentype.js path commands ourselves: toPathData() in v2 flips/optimises some glyphs incorrectly. */
function pathData(cmds) {
  const n = (v) => String(Math.round(v * 100) / 100);
  return cmds
    .map((c) => {
      switch (c.type) {
        case "M": case "L": return `${c.type}${n(c.x)} ${n(c.y)}`;
        case "Q": return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
        case "C": return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
        case "Z": return "Z";
      }
    })
    .join("");
}

/** Strip the XML prolog and the network @import so the SVG can be inlined offline. */
const inlineable = (svg) => svg.replace(/<\?xml[^>]*>\s*/, "").replace(/<style>@import[^<]*<\/style>\s*/g, "");

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();

async function setPage(html, width, height, scale = 1) {
  await page.setViewport({ width, height, deviceScaleFactor: scale });
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8"><style>${fontFaceCss}
     html,body{margin:0;padding:0;background:transparent}svg{display:block}</style></head><body>${html}</body></html>`,
    { waitUntil: "load" }
  );
  await page.evaluate(async () => {
    // Force every face used in the document to load before measuring/rendering.
    await Promise.all([...document.fonts].map((f) => f.load()));
    await document.fonts.ready;
  });
}

/** Replace each <text> in `svg` with outlined glyph paths, using browser-measured positions. */
async function outline(svg) {
  const clean = inlineable(svg);
  await setPage(clean, 1400, 900);
  const texts = await page.evaluate(() => {
    return [...document.querySelectorAll("text")].map((t) => {
      const cs = getComputedStyle(t);
      const fontSize = parseFloat(cs.fontSize);
      const family = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim();
      const weight = Number(cs.fontWeight);
      // Map each character index to the fill of its nearest ancestor (tspan or text).
      const chars = [];
      const walker = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
      let i = 0;
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const el = node.parentElement;
        const fill = el.getAttribute("fill") || el.closest("[fill]")?.getAttribute("fill") || "#000";
        for (const ch of node.data) {
          if (ch.trim()) {
            const p = t.getStartPositionOfChar(i);
            chars.push({ ch, x: p.x, y: p.y, rot: t.getRotationOfChar(i), fill });
          }
          i++;
        }
      }
      return { fontSize, family, weight, chars, fill: t.getAttribute("fill"), content: t.textContent };
    });
  });

  let n = 0;
  return clean.replace(/<text\b[\s\S]*?<\/text>/g, () => {
    const t = texts[n++];
    const font = otFonts.get(`${t.family}|${t.weight}`);
    if (!font) throw new Error(`Missing font ${t.family} ${t.weight}`);
    const r = (v) => Math.round(v * 100) / 100;
    const paths = t.chars
      .map((c) => {
        const d = pathData(font.charToGlyph(c.ch).getPath(0, 0, t.fontSize).commands);
        const rot = Math.abs(c.rot) > 0.001 ? ` rotate(${r(c.rot)})` : "";
        const fill = c.fill !== t.fill ? ` fill="${c.fill}"` : "";
        return `<path transform="translate(${r(c.x)} ${r(c.y)})${rot}"${fill} d="${d}"/>`;
      })
      .join("");
    return `<g fill="${t.fill}" aria-label="${t.content.trim()}">${paths}</g>`;
  });
}

const read = (f) => fs.readFileSync(path.join(brand, f), "utf8");
const write = (f, data) => {
  fs.writeFileSync(path.join(brand, f), data);
  console.log("wrote", path.relative(root, path.join(brand, f)));
};
const xmlHead = '<?xml version="1.0" encoding="UTF-8"?>\n';

const patchSvg = read("stampede-patch.svg");
const lockupSvg = read("stampede-lockup.svg");

const patchOutlined = await outline(patchSvg);
write("stampede-patch-outlined.svg", xmlHead + patchOutlined);
const lockupOutlined = await outline(lockupSvg);
write("stampede-lockup-outlined.svg", xmlHead + lockupOutlined);

async function shot(file, html, w, h, scale = 1, transparent = true) {
  await setPage(html, w, h, scale);
  await page.screenshot({ path: path.join(brand, file), omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
  console.log("wrote", `public/brand/${file}`);
}

// 1. Patch PNG 1600×1600 (transparent outside the circle), rendered from the live-text SVG with fonts loaded.
const sized = (svg, w, h) => inlineable(svg).replace(/<svg\b([^>]*?)width="\d+" height="\d+"/, `<svg$1width="${w}" height="${h}"`);
await shot("stampede-patch.png", sized(patchSvg, 800, 800), 800, 800, 2);

// 2. Apple touch icon 180×180 from favicon.svg, on cream so iOS never fills the corners with black.
const fav = inlineable(read("favicon.svg")).replace(/<metadata>[\s\S]*?<\/metadata>/, "");
await shot(
  "apple-touch-icon.png",
  `<div style="width:180px;height:180px;background:#F7F1E6;display:grid;place-items:center">${fav.replace(/width="64" height="64"/, 'width="148" height="148"')}</div>`,
  180, 180, 1, false
);

// 3. Open Graph image 1200×630: patch left, wordmark + full name right, cream background.
//    Patch 400 px with ≥ 25% clear space (100 px) on every side.
await shot(
  "og-image.png",
  `<div style="width:1200px;height:630px;background:#F7F1E6;display:flex;align-items:center;box-sizing:border-box;padding:0 96px 0 100px;gap:100px">
     <div style="flex:none;width:400px;height:400px">${sized(patchSvg, 400, 400)}</div>
     <div style="flex:1;min-width:0">
       <div style="font:600 14px/1 Unbounded;letter-spacing:.18em;color:#A6192E;margin-bottom:22px;white-space:nowrap">CAN-RGX X · UNIVERSITY OF CALGARY</div>
       <div style="font:800 76px/1.05 Unbounded;letter-spacing:.02em;color:#A6192E">STAMPEDE</div>
       <div style="width:96px;height:4px;background:#C9A13B;margin:26px 0 24px"></div>
       <div style="font:500 28px/1.35 Archivo;color:#1E2A33">Spacecraft Tensor And Mass Property Estimation During Excitation</div>
     </div>
   </div>`,
  1200, 630, 1, false
);

await browser.close();
