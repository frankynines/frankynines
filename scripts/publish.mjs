// One command to ship: sync NFTs, build, commit, push. Vercel deploys from main.
//   npm run publish -- "what changed"
//   npm run publish -- "copy fix" --no-sync     skip the NFT sync
import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const noSync = args.includes("--no-sync");
const msg = args.filter((a) => !a.startsWith("--")).join(" ") || `update ${new Date().toISOString().slice(0, 10)}`;
const sh = (cmd) => execSync(cmd, { stdio: "inherit" });
const out = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const step = (s) => console.log(`\n\x1b[1;33m▶ ${s}\x1b[0m`);

if (!noSync) {
  step("Sync NFTs (SuperRare + OpenSea collections)");
  try { sh("node scripts/sync-nfts.mjs"); }
  catch { console.error("sync failed, continuing with the last data/nfts.json"); }
}

step("Build check");
sh("npx next build");

step("Commit");
sh("git add -A");
if (!out("git status --porcelain")) {
  console.log("nothing changed, nothing to push");
  process.exit(0);
}
sh(`git commit -m ${JSON.stringify(msg)}`);

step("Push");
sh("git push");
console.log("\n✔ pushed. Vercel is building frankynines.com now.\n");
