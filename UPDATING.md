# Updating frankynines.com

Three things change on this site. Each is one short routine.

## 1. New portfolio project (Design page)

```
npm run new:project -- "Project Title" 2026
```

That makes `content/projects/project-title.json` and `public/work/project-title/`.

1. Drop images in the folder. Name them `01.jpg`, `02.jpg`, `03.gif`. They show in that order. Any jpg/png/webp/gif works.
2. Edit the JSON. Title, role, a paragraph or two, stats, links. Delete `stats` or `links` if you don't have any.
3. Ship it (below).

Projects sort by `year` oldest to newest, like the timeline. Same year? Add `"order": 2` to bump one up.
Set `"hidden": true` to pull a project without deleting it.

## 2. New minted work (Collect page)

Mint on SuperRare or into one of the OpenSea collections listed in `content/site.ts`.
Then ship. The publish command runs the sync for you.

New collection on OpenSea? Add one line to `collections[]` in `content/site.ts` with the contract address.
New SuperRare series? Add it to `superrareSeries` with the series contract.

Hands-off option: a GitHub Action runs the sync every Monday and commits new mints.
Turn it on once by adding `ALCHEMY_API_KEY` under repo Settings → Secrets and variables → Actions.

## 3. Copy, bio, links

`content/site.ts` for email, location, socials, markets.
`app/about/page.tsx` for the bio. `content/art.ts` for the Art timeline.

## Ship

```
npm run publish -- "added project x"
```

Syncs NFTs, builds, commits, pushes. Vercel deploys in about a minute.
Add `--no-sync` for copy-only changes to skip the chain calls.

## Rules the repo keeps for you

`.env.local` (your Alchemy key), `PDFS/`, `public/decks/` and anything in `.gitignore` never leave the machine.
Only `content/`, `data/`, `public/work/`, `public/nft/` and code get pushed.
