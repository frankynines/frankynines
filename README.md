# frankynines.com

Portfolio hub for FrankyNines. Next.js, static, no backend. Deploys to Vercel as is.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Put your work in

Content lives in two files you edit by hand:

- `content/design.ts`  design case studies (title, year, copy, stats, image paths)
- `content/art.ts`     art timeline by era
- `content/site.ts`    links, email, wallet, contract addresses

Images go in `public/work/...` using the exact filenames referenced in those files.
Any image that is missing renders as a labelled slot so the site never breaks.

To get images out of the two Google Slides decks fast:

```bash
brew install poppler
# In Google Slides: File > Download > PDF Document
npm run import:deck -- ~/Downloads/Design-Portfolio.pdf design
npm run import:deck -- ~/Downloads/Art-Portfolio.pdf art
```

That writes `public/decks/design/01.jpg ...` and `public/decks/art/01.jpg ...`.
Copy the pages you want into `public/work/design/`, `public/work/art/`, `public/work/supducks/`
with the filenames from `content/*.ts` (or change the paths in the content files).

Also needed: `public/work/hero.jpg` (home) and `public/work/portrait.jpg` (about).

## Pull your NFTs

```bash
cp .env.example .env.local   # add a free Alchemy key (Ethereum mainnet)
npm run sync:nfts
git add data/nfts.json && git commit -m "sync nfts"
```

It pulls everything ever minted to your wallet (SuperRare, KnownOrigin, anything else)
plus the full contents of the contracts marked `collection: true` in `content/site.ts`.
Re-run whenever you mint. The `/collect` page, the home shop strip and the SupDucks drops
section all read from `data/nfts.json`.

## Deploy

Push to GitHub, import the repo in Vercel, done. No env vars are needed at build time.
Point the frankynines.com domain at Vercel and turn off the Squarespace site.
