/**
 * ════════════════════════════════════════════════════════════
 *  generate-pwa.js
 *
 *  Génère automatiquement, à partir de src/config/siteConfig.js :
 *    - public/manifest.json
 *    - index.html (à partir de index.template.html)
 *
 *  Usage :
 *    node scripts/generate-pwa.js
 *
 *  Branché automatiquement avant chaque build/dev via package.json
 *  (scripts "predev" et "prebuild") — voir package.json fourni.
 *
 *  → Pour livrer un nouveau client : modifier UNIQUEMENT
 *    siteConfig.js, puis lancer `npm run dev` ou `npm run build`.
 *    Ce script s'exécute automatiquement et régénère tout.
 * ════════════════════════════════════════════════════════════
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import siteConfig from "../src/config/siteConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/* ──────────────────────────────────────────
   1. GÉNÉRATION DE public/manifest.json
────────────────────────────────────────── */
function generateManifest() {
  const { branding, pwa } = siteConfig;

  const manifest = {
    name: `${branding.brandName} ${branding.brandSuffix}`,
    short_name: pwa.shortName,
    description: branding.siteDescription,
    start_url: pwa.startUrl,
    scope: "/",
    display: pwa.display,
    orientation: pwa.orientation,
    background_color: pwa.backgroundColor,
    theme_color: pwa.themeColor,
    lang: pwa.lang,
    categories: pwa.categories,
    icons: [
      {
        src: branding.favicon192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: branding.favicon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    shortcuts: [
      {
        name: pwa.shortcut.name,
        short_name: pwa.shortcut.shortName,
        description: pwa.shortcut.name,
        url: pwa.shortcut.url,
        icons: [{ src: branding.favicon192, sizes: "192x192" }],
      },
    ],
    screenshots: [],
  };

  const outPath = path.join(ROOT, "public", "manifest.json");
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`✓ manifest.json généré → ${path.relative(ROOT, outPath)}`);
}

/* ──────────────────────────────────────────
   2. GÉNÉRATION DE index.html
      (à partir de index.template.html)
────────────────────────────────────────── */
function generateIndexHtml() {
  const { branding, pwa } = siteConfig;

  const templatePath = path.join(ROOT, "index.template.html");
  if (!fs.existsSync(templatePath)) {
    console.error(`✗ Fichier introuvable : ${templatePath}`);
    process.exit(1);
  }

  let html = fs.readFileSync(templatePath, "utf-8");

  const replacements = {
    __LANG__: pwa.lang,
    __THEME_COLOR__: pwa.themeColor,
    __SHORT_NAME__: pwa.shortName,
    __SITE_TITLE__: branding.siteTitle,
    __SITE_DESCRIPTION__: branding.siteDescription,
    __FAVICON_192__: branding.favicon192,
  };

  Object.entries(replacements).forEach(([key, value]) => {
    html = html.split(key).join(value);
  });

  const outPath = path.join(ROOT, "index.html");
  fs.writeFileSync(outPath, html, "utf-8");
  console.log(`✓ index.html généré       → ${path.relative(ROOT, outPath)}`);
}

/* ──────────────────────────────────────────
   EXÉCUTION
────────────────────────────────────────── */
function run() {
  console.log(`\n🔧 Génération PWA pour "${siteConfig.branding.brandName} ${siteConfig.branding.brandSuffix}"...\n`);
  generateManifest();
  generateIndexHtml();
  console.log("\n✅ Terminé. Le site reflète maintenant siteConfig.js.\n");
}

run();
