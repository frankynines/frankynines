#!/usr/bin/env node
/**
 * Slices a PDF export of a Google Slides deck into page images.
 *
 *   npm run import:deck -- ~/Downloads/Design-Portfolio.pdf design
 *   npm run import:deck -- ~/Downloads/Art-Portfolio.pdf art
 *
 * Writes public/decks/<name>/01.jpg, 02.jpg ... and prints the list so you
 * can rename the ones you want into public/work/<section>/ to match the
 * filenames referenced in content/design.ts and content/art.ts.
 *
 * Needs poppler:  brew install poppler
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

const [pdf, name = "deck"] = process.argv.slice(2);
if (!pdf) {
  console.error("Usage: npm run import:deck -- <file.pdf> <design|art>");
  process.exit(1);
}
if (!existsSync(pdf)) {
  console.error(`No file at ${resolve(pdf)}`);
  console.error("Google Slides names the PDF after the deck, so check ~/Downloads for something like");
  console.error('  "Design Portfolio - FrankyNines.pdf"  and quote the path:');
  console.error('  npm run import:deck -- "$HOME/Downloads/Design Portfolio - FrankyNines.pdf" design');
  process.exit(1);
}
try {
  execSync("pdftoppm -v", { stdio: "ignore" });
} catch {
  console.error("pdftoppm not found. Install poppler:  brew install poppler");
  process.exit(1);
}

const out = resolve("public/decks", name);
mkdirSync(out, { recursive: true });
execSync(`pdftoppm -jpeg -r 150 -jpegopt quality=85 "${resolve(pdf)}" "${join(out, "p")}"`, {
  stdio: "inherit",
});

// Normalise names to 01.jpg, 02.jpg ...
const files = readdirSync(out).filter((f) => f.startsWith("p") && f.endsWith(".jpg")).sort();
files.forEach((f, i) => {
  const n = String(i + 1).padStart(2, "0") + ".jpg";
  execSync(`mv "${join(out, f)}" "${join(out, n)}"`);
});
console.log(`\n${files.length} pages -> public/decks/${name}/`);
console.log("Next: copy the slides you want into public/work/... using the filenames in content/*.ts");
