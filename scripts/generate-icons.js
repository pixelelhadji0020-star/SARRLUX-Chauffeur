/**
 * ════════════════════════════════════════════════════════════
 *  generate-icons.js
 *
 *  Redimensionne UN logo source en toutes les tailles d'icônes
 *  nécessaires pour la PWA + favicon, et génère les noms de
 *  fichiers attendus par siteConfig.js / manifest.json.
 *
 *  Usage :
 *    node scripts/generate-icons.js chemin/vers/logo.png
 *    node scripts/generate-icons.js chemin/vers/logo.svg
 *
 *  Si aucun chemin n'est fourni, le script cherche automatiquement
 *  un fichier nommé "logo-source.*" dans le dossier assets/.
 *
 *  Recommandations pour le fichier source :
 *    - Format : PNG ou SVG avec fond transparent
 *    - Taille minimale : 512×512 px (carré, sinon recadrage centré)
 *    - Logo "maskable" : garder ~10% de marge sur les bords,
 *      car Android peut rogner les coins en cercle/squircle.
 *
 *  Sortie : public/icons/icon-*.png (+ favicon.ico si possible)
 * ════════════════════════════════════════════════════════════
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "icons");
const DEFAULT_SOURCE_DIR = path.join(ROOT, "assets");

/* ──────────────────────────────────────────
   TAILLES À GÉNÉRER
   (couvre PWA manifest, Apple touch icon, favicon)
────────────────────────────────────────── */
const SIZES = [
  { name: "icon-72.png", size: 72 },
  { name: "icon-96.png", size: 96 },
  { name: "icon-128.png", size: 128 },
  { name: "icon-144.png", size: 144 },
  { name: "icon-152.png", size: 152 },
  { name: "icon-192.png", size: 192 },   // requis par manifest.json
  { name: "icon-384.png", size: 384 },
  { name: "icon-512.png", size: 512 },   // requis par manifest.json
  { name: "apple-touch-icon.png", size: 180 },
  { name: "favicon-32.png", size: 32 },
  { name: "favicon-16.png", size: 16 },
];

/* ──────────────────────────────────────────
   RÉSOLUTION DU FICHIER SOURCE
────────────────────────────────────────── */
function resolveSourcePath() {
  const argPath = process.argv[2];

  if (argPath) {
    const resolved = path.resolve(argPath);
    if (!fs.existsSync(resolved)) {
      console.error(`✗ Fichier introuvable : ${resolved}`);
      process.exit(1);
    }
    return resolved;
  }

  // Fallback : cherche assets/logo-source.{png,svg,jpg,jpeg,webp}
  const candidates = ["png", "svg", "jpg", "jpeg", "webp"].map((ext) =>
    path.join(DEFAULT_SOURCE_DIR, `logo-source.${ext}`)
  );
  const found = candidates.find((p) => fs.existsSync(p));

  if (!found) {
    console.error(
      `✗ Aucun logo source fourni.\n` +
      `  Usage : node scripts/generate-icons.js chemin/vers/logo.png\n` +
      `  Ou placez un fichier "logo-source.png/svg" dans ${path.relative(ROOT, DEFAULT_SOURCE_DIR)}/`
    );
    process.exit(1);
  }
  return found;
}

/* ──────────────────────────────────────────
   GÉNÉRATION
────────────────────────────────────────── */
async function generateIcons() {
  const sourcePath = resolveSourcePath();
  console.log(`\n🖼️  Logo source : ${path.relative(ROOT, sourcePath)}\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Vérifie les dimensions du fichier source pour avertir si trop petit
  const metadata = await sharp(sourcePath).metadata();
  const minDimension = Math.min(metadata.width || 0, metadata.height || 0);
  if (minDimension < 512 && !sourcePath.endsWith(".svg")) {
    console.warn(
      `⚠️  Attention : le logo source fait ${metadata.width}×${metadata.height}px.\n` +
      `   Recommandé : au moins 512×512px pour éviter le flou sur les grandes icônes.\n`
    );
  }

  for (const { name, size } of SIZES) {
    const outPath = path.join(OUTPUT_DIR, name);
    await sharp(sourcePath)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 }, // fond transparent
      })
      .png()
      .toFile(outPath);
    console.log(`  ✓ ${name.padEnd(22)} (${size}×${size})`);
  }

  // Génère aussi favicon.ico (multi-résolution) à partir des PNG 16/32
  try {
    const png32 = await sharp(sourcePath).resize(32, 32).png().toBuffer();
    fs.writeFileSync(path.join(OUTPUT_DIR, "..", "favicon.ico.png"), png32);
    console.log(`  ✓ favicon.ico.png      (32×32, fallback — convertir en .ico si besoin)`);
  } catch {
    // non bloquant
  }

  console.log(
    `\n✅ ${SIZES.length} icônes générées → ${path.relative(ROOT, OUTPUT_DIR)}/\n` +
    `   manifest.json et index.html utilisent déjà icon-192.png et icon-512.png\n` +
    `   (voir siteConfig.branding.favicon192 / favicon512)\n`
  );
}

generateIcons().catch((err) => {
  console.error("✗ Erreur lors de la génération des icônes :", err.message);
  process.exit(1);
});
