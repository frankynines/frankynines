import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Portfolio projects live in content/projects/<slug>.json and their images
 * in public/work/<slug>/. Add a file, drop images, push. That's it.
 *
 * JSON fields:
 *   section  "design"                    which page shows it (room for more later)
 *   year     "2026"                      stamp on the page; sorts oldest to newest like a timeline
 *   title, role, body[]                  copy
 *   stats    [{ value, label }]          optional
 *   links    [{ label, href }]           optional
 *   images   ["/work/<slug>/a.jpg"]      optional; defaults to every image in public/work/<slug>/
 *   order    number                      optional tie-breaker within a year (higher = first)
 *   hidden   true                        optional; keep the file, hide the project
 */
export type Project = {
  slug: string;
  section: "design";
  year: string;
  title: string;
  role?: string;
  body: string[];
  stats?: { value: string; label: string }[];
  links?: { label: string; href: string }[];
  images: string[];
  order?: number;
  hidden?: boolean;
};

const root = process.cwd();
const IMG = /\.(jpe?g|png|webp|gif|avif)$/i;

export function getProjects(section: Project["section"], newestFirst = false): Project[] {
  const dir = join(root, "content/projects");
  if (!existsSync(dir)) return [];
  const projects = readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const slug = f.replace(/\.json$/, "");
      const raw = JSON.parse(readFileSync(join(dir, f), "utf8")) as Partial<Project>;
      let images = raw.images ?? [];
      if (!images.length) {
        const imgDir = join(root, "public/work", slug);
        if (existsSync(imgDir)) {
          images = readdirSync(imgDir)
            .filter((n) => IMG.test(n))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
            .map((n) => `/work/${slug}/${n}`);
        }
      }
      return { slug, body: [], ...raw, images } as Project;
    })
    .filter((p) => p.section === section && !p.hidden);

  projects.sort((a, b) => {
    const y = Number(a.year.replace(/\D/g, "")) - Number(b.year.replace(/\D/g, ""));
    if (y !== 0) return newestFirst ? -y : y;
    return (b.order ?? 0) - (a.order ?? 0);
  });
  return projects;
}
