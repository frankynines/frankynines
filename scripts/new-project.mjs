// Scaffold a portfolio project.
//   npm run new:project -- "Project Title" 2026
// Makes content/projects/<slug>.json and public/work/<slug>/ for images.
import { mkdirSync, existsSync, writeFileSync } from "node:fs";

const [title, year = String(new Date().getFullYear())] = process.argv.slice(2);
if (!title) {
  console.error('usage: npm run new:project -- "Project Title" 2026');
  process.exit(1);
}
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const json = `content/projects/${slug}.json`;
const dir = `public/work/${slug}`;
if (existsSync(json)) { console.error(`${json} already exists`); process.exit(1); }

mkdirSync("content/projects", { recursive: true });
mkdirSync(dir, { recursive: true });
writeFileSync(json, JSON.stringify({
  section: "design",
  year,
  title,
  role: "What you did on it",
  body: ["One or two short paragraphs. Your voice. What it was, what you built, what happened."],
  stats: [{ value: "10k", label: "example stat, delete if none" }],
  links: [{ label: "Live site", href: "https://" }],
  images: [],
}, null, 2) + "\n");

console.log(`
made  ${json}
made  ${dir}/

next
  1. drop jpg/png/gif into ${dir}/  (named 01.jpg, 02.jpg... they sort in order)
  2. edit ${json}
  3. npm run publish -- "add ${title}"
`);
