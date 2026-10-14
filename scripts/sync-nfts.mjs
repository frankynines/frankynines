#!/usr/bin/env node
/**
 * Pulls exactly the collections listed in content/site.ts, stamps each piece
 * with its on-chain mint date, and writes data/nfts.json sorted newest first.
 *
 *   npm run sync:nfts
 *
 * Needs ALCHEMY_API_KEY in .env.local (free, https://dashboard.alchemy.com).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

try {
  for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {}

const KEY = process.env.ALCHEMY_API_KEY;
if (!KEY) {
  console.error("Missing ALCHEMY_API_KEY in .env.local");
  process.exit(1);
}

// ---- config from content/site.ts -------------------------------------------
const siteSrc = readFileSync(join(root, "content/site.ts"), "utf8");
const WALLET = siteSrc.match(/wallet:\s*"(0x[0-9a-fA-F]{40})"/)[1].toLowerCase();
const OLD = [...(siteSrc.match(/oldWallets:\s*\[([^\]]*)\]/)?.[1] ?? "").matchAll(/0x[0-9a-fA-F]{40}/g)].map((m) => m[0].toLowerCase());
const WALLETS = [WALLET, ...OLD];
const ARTISTS = [...(siteSrc.match(/artistNames:\s*\[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1].toLowerCase().replace(/\s+/g, ""));
const collections = [];
for (const m of siteSrc.matchAll(
  /\{\s*slug:\s*"([^"]+)",\s*label:\s*"([^"]+)",\s*section:\s*"([^"]+)",\s*source:\s*"([^"]+)",\s*contract:\s*"(0x[0-9a-fA-F]{40})",\s*chain:\s*"([^"]+)"/g
)) {
  collections.push({ slug: m[1], label: m[2], section: m[3], source: m[4], contract: m[5].toLowerCase(), chain: m[6] });
}
if (!collections.length) {
  console.error("No collections found in content/site.ts");
  process.exit(1);
}

// ---- alchemy helpers -------------------------------------------------------
const host = (chain) => (chain === "base" ? "base-mainnet" : "eth-mainnet");
const RPC = (chain) => `https://${host(chain)}.g.alchemy.com/v2/${KEY}`;
const NFT = (chain) => `https://${host(chain)}.g.alchemy.com/nft/v3/${KEY}`;
const ZERO = "0x0000000000000000000000000000000000000000";

async function rpc(chain, method, params) {
  const r = await fetch(RPC(chain), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const j = await r.json();
  if (j.error) throw new Error(`${method}: ${j.error.message}`);
  return j.result;
}
async function getJSON(url, init) {
  const r = await fetch(url, init);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}
async function transfers(chain, filter) {
  const out = [];
  let pageKey;
  do {
    const res = await rpc(chain, "alchemy_getAssetTransfers", [{
      fromBlock: "0x0", toBlock: "latest", withMetadata: true, excludeZeroValue: false, maxCount: "0x3e8",
      ...filter, ...(pageKey ? { pageKey } : {}),
    }]);
    out.push(...res.transfers);
    pageKey = res.pageKey;
  } while (pageKey);
  return out;
}
function tokenIdsOf(t) {
  if (t.erc1155Metadata) return t.erc1155Metadata.map((m) => BigInt(m.tokenId).toString());
  const id = t.tokenId ?? t.erc721TokenId;
  return id ? [BigInt(id).toString()] : [];
}
async function call(chain, to, data) {
  return rpc(chain, "eth_call", [{ to, data }, "latest"]);
}
const pad = (hex) => hex.replace(/^0x/, "").padStart(64, "0");
const word = (hex, i) => hex.replace(/^0x/, "").slice(i * 64, i * 64 + 64);
function decodeUintArray(hex) {
  const len = Number(BigInt("0x" + word(hex, 1)));
  return Array.from({ length: len }, (_, i) => BigInt("0x" + word(hex, 2 + i)));
}
function decodeStringAt(hex, offsetWords) {
  const len = Number(BigInt("0x" + word(hex, offsetWords)));
  return Buffer.from(hex.replace(/^0x/, "").slice((offsetWords + 1) * 64, (offsetWords + 1) * 64 + len * 2), "hex").toString("utf8");
}

// Mint dates: first transfer from 0x0 per token on a contract.
async function mintDates(chain, contract, category) {
  const map = new Map();
  const ts = await transfers(chain, { contractAddresses: [contract], category });
  for (const t of ts) for (const id of tokenIdsOf(t)) {
    const when = t.metadata?.blockTimestamp ?? null;
    if (when && (!map.has(id) || when < map.get(id))) map.set(id, when);
  }
  return map;
}

async function metadataBatch(col, tokenIds) {
  const out = [];
  for (let i = 0; i < tokenIds.length; i += 100) {
    const chunk = tokenIds.slice(i, i + 100);
    const res = await getJSON(`${NFT(col.chain)}/getNFTMetadataBatch`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ tokens: chunk.map((t) => ({ contractAddress: col.contract, tokenId: t })) }),
    });
    for (const n of res.nfts) out.push(normalize(n, col));
  }
  return out;
}

// ---- sources ---------------------------------------------------------------

// Whole contract, plus mint dates.
async function wholeContract(col) {
  const out = [];
  let pageKey;
  do {
    const url = new URL(`${NFT(col.chain)}/getNFTsForContract`);
    url.searchParams.set("contractAddress", col.contract);
    url.searchParams.set("withMetadata", "true");
    url.searchParams.set("limit", "100");
    if (pageKey) url.searchParams.set("pageKey", pageKey);
    const res = await getJSON(url);
    for (const n of res.nfts) out.push(normalize(n, col));
    pageKey = res.pageKey;
  } while (pageKey);
  const dates = await mintDates(col.chain, col.contract, ["erc721", "erc1155"]);
  for (const it of out) it.mintedAt = it.mintedAt ?? dates.get(it.tokenId) ?? null;
  return out;
}

// SuperRare: the same list your profile shows under Creations, from
// SuperRare's own API. Pieces without an image there get metadata from Alchemy.
const SR_SERIES = {};
for (const m of siteSrc.matchAll(/"(0x[0-9a-fA-F]{40})":\s*\{\s*slug:\s*"([^"]+)",\s*label:\s*"([^"]+)"(,\s*hide:\s*true)?/g)) {
  SR_SERIES[m[1].toLowerCase()] = { slug: m[2], label: m[3], hide: !!m[4] };
}
async function superrare(col) {
  const username = (siteSrc.match(/superrare:\s*"https:\/\/superrare\.com\/([^"\/]+)"/) ?? [])[1] ?? "frankynines";
  const arts = [];
  let cursor = null;
  for (let i = 0; i < 20; i++) {
    const input = { creatorUsername: username, orderBy: "DATE_MINTED_DESC", take: 50, skip: 0, chainId: 1 };
    if (cursor != null) input.cursor = cursor;
    const r = await fetch("https://superrare.com/api/trpc/profile.getCreations?batch=1", {
      method: "POST",
      headers: { "content-type": "application/json", "user-agent": "Mozilla/5.0 frankynines-site-sync" },
      body: JSON.stringify({ 0: { json: input } }),
    });
    const j = await r.json();
    const d = j?.[0]?.result?.data?.json;
    if (!d) throw new Error(`SuperRare API: ${JSON.stringify(j).slice(0, 200)}`);
    arts.push(...(d.artworks ?? []));
    if (!d.hasNextPage) break;
    cursor = d.nextCursor;
  }
  const out = arts.filter((a) => !SR_SERIES[a.contractAddress.toLowerCase()]?.hide).map((a) => {
    const contract = a.contractAddress.toLowerCase();
    const series = SR_SERIES[contract] ?? { slug: "sr-" + contract.slice(2, 8), label: "SuperRare" };
    const md = a.metadata ?? {};
    const image = ipfs(md.mediaDetails?.imageUri) ?? null;
    const listing = a.state?.listings?.[0] ?? null;
    const auction = a.state?.auctions?.[0] ?? null;
    return {
      id: `${contract}:${a.tokenId}`,
      contract, tokenId: String(a.tokenId), chain: "eth",
      name: md.name || "", description: (md.description || "").trim(),
      collection: series.label, slug: series.slug, section: "superrare",
      image, thumb: image, mime: md.mediaDetails?.mediaType ?? null, animation: /video/.test(md.mediaDetails?.mediaType ?? "") ? image : null,
      type: a.type || "ERC721",
      mintedAt: a.createdAt ? new Date(a.createdAt * 1000).toISOString() : null,
      href: `https://superrare.com/artwork/eth/${contract}/${a.tokenId}`,
      forSale: !!(listing || auction),
    };
  });
  // Fill names and images SuperRare didn't return (its ERC1155 series).
  const missing = out.filter((i) => !i.image || !i.name || i.animation);
  const byContract = new Map();
  for (const i of missing) byContract.set(i.contract, [...(byContract.get(i.contract) ?? []), i]);
  for (const [contract, items] of byContract) {
    const meta = await metadataBatch({ ...col, contract }, items.map((i) => i.tokenId));
    const byId = new Map(meta.map((m) => [m.tokenId, m]));
    for (const i of items) {
      const m = byId.get(i.tokenId);
      if (!m) continue;
      i.name ||= m.name; i.image ||= m.image; i.thumb ||= m.thumb; i.remoteThumb ||= m.remoteThumb; i.description ||= m.description;
      i.mintedAt ||= m.mintedAt;
    }
  }
  for (const i of out) i.name ||= `${i.collection} #${i.tokenId}`;
  return out;
}

// OpenSea shared storefront: token id = creator (160 bits) | index | supply.
async function storefront(col) {
  const ids = new Set();
  const dates = new Map();
  const pinned = [...(siteSrc.match(new RegExp(`slug:\\s*"${col.slug}"[\\s\\S]*?tokenIds:\\s*\\[([^\\]]*)\\]`))?.[1] ?? "").matchAll(/"(\d+)"/g)].map((m) => m[1]);
  for (const dir of [{ fromAddress: WALLET }, { toAddress: WALLET }]) {
    const ts = await transfers(col.chain, { contractAddresses: [col.contract], category: ["erc1155"], ...dir });
    for (const t of ts) for (const id of tokenIdsOf(t)) {
      const big = BigInt(id);
      if (((big >> 96n) & ((1n << 160n) - 1n)) !== BigInt(WALLET)) continue;
      if (pinned.length && !pinned.includes(id)) continue;
      ids.add(id);
      const when = t.metadata?.blockTimestamp ?? null;
      if (when && (!dates.has(id) || when < dates.get(id))) dates.set(id, when);
    }
  }
  // Pinned ids are the source of truth; transfers only supply dates.
  const wanted = pinned.length ? pinned : [...ids];
  const out = await metadataBatch(col, wanted);
  for (const it of out) it.mintedAt = it.mintedAt ?? dates.get(it.tokenId) ?? null;
  return out;
}

// KnownOrigin: walk the whole contract and keep tokens whose metadata names
// you as the artist. Slow the first time (tens of thousands of tokens), but it
// does not depend on which wallet you minted from.
function artistOf(n) {
  const raw = n.raw?.metadata ?? {};
  const a = raw.attributes;
  const names = [];
  if (a && typeof a === "object" && !Array.isArray(a)) names.push(a.artist, a.Artist);
  if (Array.isArray(a)) for (const t of a) if (/artist/i.test(t?.trait_type ?? "")) names.push(t.value);
  names.push(raw.artist, raw.createdBy, raw.created_by, raw.creator, raw.artistName, raw.author);
  return names.filter((x) => typeof x === "string").map((x) => x.toLowerCase().replace(/\s+/g, ""));
}
async function knownorigin(col) {
  const out = [];
  let pageKey, seen = 0;
  do {
    const url = new URL(`${NFT(col.chain)}/getNFTsForContract`);
    url.searchParams.set("contractAddress", col.contract);
    url.searchParams.set("withMetadata", "true");
    url.searchParams.set("limit", "100");
    if (pageKey) url.searchParams.set("pageKey", pageKey);
    const res = await getJSON(url);
    for (const n of res.nfts) if (artistOf(n).some((a) => ARTISTS.some((me) => a.includes(me)))) out.push(normalize(n, col));
    seen += res.nfts.length;
    process.stdout.write(`\r${col.label} ... scanned ${seen}, found ${out.length}   `);
    pageKey = res.pageKey;
  } while (pageKey);
  process.stdout.write(`\r${col.label} ... `);
  // Dates: KODA V2 knows the edition's start date on chain. V1 falls back to
  // the token's first transfer.
  for (const it of out) {
    if (it.mintedAt) continue;
    try {
      const ed = await call(col.chain, col.contract, "0x824eec3b" + pad(BigInt(it.tokenId).toString(16)));
      if (ed && ed !== "0x" && BigInt(ed) > 0n) {
        const d = await call(col.chain, col.contract, KO.detailsOfEdition + pad(BigInt(ed).toString(16)));
        const start = Number(BigInt("0x" + word(d, 2)));
        if (start > 1_400_000_000) it.mintedAt = new Date(start * 1000).toISOString();
      }
    } catch {}
  }
  if (out.some((i) => !i.mintedAt)) {
    const ids = new Set(out.filter((i) => !i.mintedAt).map((i) => i.tokenId));
    const dates = new Map();
    try {
      const ts = await transfers(col.chain, { contractAddresses: [col.contract], category: ["erc721"], toAddress: WALLET });
      for (const t of ts) for (const id of tokenIdsOf(t)) if (ids.has(id) && !dates.has(id)) dates.set(id, t.metadata?.blockTimestamp ?? null);
    } catch {}
    for (const it of out) it.mintedAt = it.mintedAt ?? dates.get(it.tokenId) ?? null;
  }
  // Collapse editions: KO V2 token ids are edition*? no, keep one card per edition name.
  const byName = new Map();
  for (const it of out) {
    const k = it.name.toLowerCase();
    const prev = byName.get(k);
    if (!prev || (it.mintedAt ?? "") < (prev.mintedAt ?? "")) byName.set(k, { ...it, editionCount: (prev?.editionCount ?? 0) + 1 });
    else prev.editionCount = (prev.editionCount ?? 1) + 1;
  }
  return [...byName.values()];
}

// ---- shaping ---------------------------------------------------------------
function openseaItem(col, tokenId) {
  return `https://opensea.io/item/${col.chain === "base" ? "base" : "ethereum"}/${col.contract}/${tokenId}`;
}
function buyLink(col, tokenId) {
  return col.section === "superrare"
    ? `https://superrare.com/artwork/eth/${col.contract}/${tokenId}`
    : openseaItem(col, tokenId);
}
function ipfs(u) {
  if (!u || typeof u !== "string") return null;
  return u.replace(/^ipfs:\/\/(ipfs\/)?/, "https://ipfs.io/ipfs/");
}
function normalize(n, col) {
  const tokenId = String(n.tokenId);
  const img = n.image ?? {};
  const raw = n.raw?.metadata ?? {};
  const image = img.cachedUrl || img.originalUrl || ipfs(raw.image) || null;
  return {
    id: `${col.contract}:${tokenId}`,
    contract: col.contract, tokenId, chain: col.chain,
    name: n.name || raw.name || `${col.label} #${tokenId}`,
    description: (n.description || raw.description || "").trim(),
    collection: col.label, slug: col.slug, section: col.section,
    image, thumb: img.thumbnailUrl || image, remoteThumb: img.thumbnailUrl || null, mime: img.contentType ?? null, animation: ipfs(raw.animation_url) || null,
    type: n.tokenType || "ERC721",
    mintedAt: n.mint?.timestamp ?? null,
    href: buyLink(col, tokenId),
  };
}

// ---- local thumbnails --------------------------------------------------------
// Downloads each piece once, resizes to 800px WebP into public/nft/, and points
// the card at that file. Re-runs skip anything already on disk.
async function localThumbnails(items) {
  let sharp;
  try { sharp = (await import("sharp")).default; }
  catch { console.log("\nsharp not installed, run `npm install` to get local thumbnails. Using remote images."); return; }
  const dir = join(root, "public/nft");
  mkdirSync(dir, { recursive: true });
  let made = 0, cached = 0, failed = 0;
  const queue = [...items];
  const worker = async () => {
    for (let it = queue.shift(); it; it = queue.shift()) {
      const name = createHash("md5").update(it.id).digest("hex").slice(0, 16) + ".webp";
      const file = join(dir, name);
      const looksAnimated = /gif/i.test(it.mime ?? "") || /\.gif(\?|$)/i.test(it.image ?? "") || /gif/i.test(it.image ?? "");
      if (existsSync(file)) {
        let isAnim = false;
        try { isAnim = readFileSync(file).subarray(0, 64).includes(Buffer.from("ANIM")); } catch {}
        if (isAnim || !looksAnimated) {
          it.thumb = `/nft/${name}`;
          it.animated = isAnim;
          cached++;
          continue;
        }
        // Cached as a still but the source is a GIF: rebuild it animated.
      }
      const candidates = [it.image, it.remoteThumb].filter(Boolean).flatMap((u) => {
        const m = u.match(/^https?:\/\/[^/]+\/ipfs\/(.+)$/);
        return m ? [u, `https://cloudflare-ipfs.com/ipfs/${m[1]}`, `https://gateway.pinata.cloud/ipfs/${m[1]}`, `https://dweb.link/ipfs/${m[1]}`] : [u];
      });
      let ok = false;
      for (const url of candidates) {
        try {
          const ctl = new AbortController();
          const t = setTimeout(() => ctl.abort(), 45000);
          const r = await fetch(url, { signal: ctl.signal, headers: { "user-agent": "Mozilla/5.0 frankynines-site-sync" } });
          clearTimeout(t);
          if (!r.ok) throw new Error(r.status);
          const type = r.headers.get("content-type") ?? "";
          if (/video|mp4|webm/.test(type)) throw new Error("video");
          const buf = Buffer.from(await r.arrayBuffer());
          const isGif = /gif/.test(type) || buf.subarray(0, 3).toString() === "GIF" || looksAnimated;
          const isAnimatedWebp = /webp/.test(type) && buf.includes(Buffer.from("ANIM"));
          const animated = isGif || isAnimatedWebp;
          const img = sharp(buf, { animated, limitInputPixels: false });
          const meta = await img.metadata();
          if (animated && (meta.pages ?? 1) > 1) {
            // Keep the loop. Smaller frame size keeps the file sane.
            await img
              .resize({ width: 600, height: 600, fit: "inside", withoutEnlargement: true })
              .webp({ quality: 75, effort: 4, loop: 0 })
              .toFile(file);
            it.animated = true;
          } else {
            await sharp(buf, { animated: false, limitInputPixels: false })
              .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
              .webp({ quality: 82 })
              .toFile(file);
          }
          const { size } = await import("node:fs").then((fs) => fs.statSync(file));
          if (size < 1500) throw new Error("suspiciously small output");
          it.thumb = `/nft/${name}`;
          ok = true; made++;
          break;
        } catch {}
      }
      if (!ok) { failed++; it.thumb = it.remoteThumb ?? null; console.log(`\n  no still image for ${it.collection} / ${it.name} (${it.image?.slice(0, 60)})`); }
      process.stdout.write(`\rthumbnails: ${made} made, ${cached} cached, ${failed} failed   `);
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  console.log();
}

// ---- run -------------------------------------------------------------------
(async () => {
  const items = [];
  for (const col of collections) {
    process.stdout.write(`${col.label} ... `);
    let got = [];
    try {
      if (col.source === "contract") got = await wholeContract(col);
      else if (col.source === "superrare") got = await superrare(col);
      else if (col.source === "storefront") got = await storefront(col);
      else if (col.source === "knownorigin" || col.source === "makersplace") got = await knownorigin(col);
    } catch (e) {
      console.log(`failed: ${e.message}`);
      continue;
    }
    const hide = [...(siteSrc.match(new RegExp(`slug:\\s*"${col.slug}"[^}]*?hideTitles:\\s*\\[([^\\]]*)\\]`))?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1].toLowerCase());
    const kept = hide.length ? got.filter((i) => !hide.some((h) => i.name.toLowerCase().startsWith(h))) : got;
    const clean = kept.filter((i) => i.image || i.remoteThumb);
    const undated = clean.filter((i) => !i.mintedAt).length;
    console.log(`${clean.length} pieces${got.length !== kept.length ? `, ${got.length - kept.length} hidden by title` : ""}${kept.length !== clean.length ? `, ${kept.length - clean.length} without images skipped` : ""}${undated ? `, ${undated} without a mint date` : ""}`);
    items.push(...clean);
  }
  await localThumbnails(items);
  items.sort((a, b) => (b.mintedAt ?? "").localeCompare(a.mintedAt ?? ""));
  writeFileSync(
    join(root, "data/nfts.json"),
    JSON.stringify({ updatedAt: new Date().toISOString(), wallet: WALLET, items }, null, 2)
  );
  const newest = items.find((i) => i.mintedAt);
  console.log(`\nWrote data/nfts.json with ${items.length} pieces. Newest: ${newest ? `${newest.name} (${newest.collection}, ${newest.mintedAt.slice(0, 10)})` : "unknown"}`);
})().catch((e) => { console.error(e); process.exit(1); });
