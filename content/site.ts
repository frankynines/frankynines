export const site = {
  name: "FrankyNines",
  legalName: "Franky Aguilar",
  url: "https://www.frankynines.com",
  email: "art@frankyaguilar.com",
  tagline: "I paint, design, code, dream and innovate.",
  description:
    "FrankyNines is Franky Aguilar. Technical artist and developer, CEO of my own universe. Zynga, 99centbrains, YOSHIRT, DapperLabs, Coinbase, Monster Energy, and MegaVolt Corp., home of SupDucks. Neon acrylics, murals, NFTs since 2017. Las Vegas, soon Mexico.",
  location: "Las Vegas, NV",
  wallet: "0x2Eb9b439Ffb7dC587198e1534e465a6242192b24",
  // Older wallets you minted from (SuperRare 2018, KnownOrigin). Add any here.
  oldWallets: [] as string[],
  // Every name you have minted under. The KnownOrigin and MakersPlace scans match any of these.
  artistNames: ["Franky Aguilar", "Franky Nines", "FrankyNines"],
  ens: "frankynines.eth",
  socials: {
    instagram: "https://instagram.com/frankynines",
    x: "https://x.com/frankynines",
    tiktok: "https://tiktok.com/@frankynines",
    youtube: "https://youtube.com/@frankynines",
  },
  markets: {
    superrare: "https://superrare.com/frankynines",
    opensea: "https://opensea.io/0x2Eb9b439Ffb7dC587198e1534e465a6242192b24",
    knownorigin: "https://knownorigin.io/frankynines",
    supducks: "https://supducks.com",
  },
  decks: {
    design:
      "https://docs.google.com/presentation/d/1Znuj48XsEtBpsSaC8g58KCZADvYQJmNU_8Xh2ED0J4w/edit?usp=sharing",
    art: "https://docs.google.com/presentation/d/1MGEH2pbhzMAuyjcfwu07IKxlC86mmvhYvO-cg889DK8/edit?usp=sharing",
  },
};

/**
 * What shows on /collect, behind a SuperRare / OpenSea / Tools toggle. Order inside a
 * section is the order of the filter buttons; pieces sort newest first.
 *
 *   superrare  everything under "Creations" on your SuperRare profile, pulled
 *              from SuperRare's own API (one of ones and series)
 *   contract   a whole contract you deployed
 *   storefront OpenSea shared storefront. The storefront has no on-chain idea
 *              of "collections", so list the exact token ids (copy from the
 *              item URLs on the OpenSea collection page)
 *   knownorigin every token on a KnownOrigin contract whose metadata names
 *              you as the artist (same filter OpenSea uses)
 *   makersplace same scan on the MakersPlace contract
 */
export type Collection = {
  slug: string;
  label: string;
  section: "superrare" | "opensea" | "tools";
  source: "superrare" | "contract" | "storefront" | "knownorigin" | "makersplace";
  contract: string;
  chain: "eth" | "base";
  /** storefront only: exact token ids in this OpenSea collection */
  tokenIds?: string[];
};

export const collections: Collection[] = [
  // SuperRare section: one source, filter buttons come from the labels below
  { slug: "superrare", label: "SuperRare", section: "superrare", source: "superrare", contract: "0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0", chain: "eth" },

  // OpenSea section, in display order
  { slug: "known-origin", label: "KnownOrigin", section: "opensea", source: "knownorigin", contract: "0xfbeef911dc5821886e1dda71586d90ed28174b7d", chain: "eth" },
  { slug: "known-origin-v1", label: "KnownOrigin 2018", section: "opensea", source: "knownorigin", contract: "0xdde2d979e8d39bb8416eafcfc1758f3cab2c9c72", chain: "eth" },
  { slug: "makersplace", label: "MakersPlace", section: "opensea", source: "makersplace", contract: "0x2a46f2ffd99e19a89476e2f62270e0a35bbf0756", chain: "eth" },
  { slug: "lvl9", label: "LVL9", section: "opensea", source: "contract", contract: "0x4b85118b00d7a6ec2bab9a363677555a4e7c2c77", chain: "eth" },
  {
    slug: "pixel-abstract-expressionsims", label: "Pixel Abstract Expressionsims", section: "opensea", source: "storefront",
    contract: "0x495f947276749ce646f68ac8c248420045cb7b5e", chain: "eth",
    tokenIds: [
      "21134501619803907585733640384516900905529416450751157585870948137801382625281",
      "21134501619803907585733640384516900905529416450751157585870948135602359369729",
      "21134501619803907585733640384516900905529416450751157585870948136701870997505",
      "21134501619803907585733640384516900905529416450751157585870948134502847741953",
      "21134501619803907585733640384516900905529416450751157585870948140000405880833",
      "21134501619803907585733640384516900905529416450751157585870948133403336114177",
      "21134501619803907585733640384516900905529416450751157585870948132303824486401",
      "21134501619803907585733640384516900905529416450751157585870948141099917508609",
      "21134501619803907585733640384516900905529416450751157585870948131204312858629",
    ],
  },
  { slug: "click-here", label: "CLICK HERE", section: "opensea", source: "contract", contract: "0x35857182ed7400c2b0f780e8a929b6e97d362ac9", chain: "eth" },
  { slug: "rodeo-posts-8811", label: "Rodeo posts", section: "opensea", source: "contract", contract: "0xee0bf95675151e75f8e5bec8fcd878e20602196a", chain: "base" },
  { slug: "aztekblack", label: "AztekBlack", section: "opensea", source: "contract", contract: "0x8ec6cb2539de1cfd9bde8d245eb7c37590187ea1", chain: "eth" },

  // Tools section: art supplies you can use
  {
    slug: "brushpacks", label: "Procreate Brush Packs", section: "tools", source: "storefront",
    contract: "0x495f947276749ce646f68ac8c248420045cb7b5e", chain: "eth",
    tokenIds: [
      "21134501619803907585733640384516900905529416450751157585870948156493080297497",
      "21134501619803907585733640384516900905529416450751157585870948155393568669721",
      "21134501619803907585733640384516900905529416450751157585870948154294057041970",
      "21134501619803907585733640384516900905529416450751157585870948153194545414244",
    ],
  },
];

/** Names for the contracts SuperRare lists under your creations. */
export const superrareSeries: Record<string, { slug: string; label: string; hide?: boolean }> = {
  "0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0": { slug: "sr-1of1", label: "1 of 1s" },
  "0x0f8dc85b1d71aad51f85e08422c692a7d527bb74": { slug: "sr-bra1nr0t", label: "Bra1nR0t" },
  "0x35857182ed7400c2b0f780e8a929b6e97d362ac9": { slug: "sr-click-here", label: "CLICK HERE", hide: true }, // not rendering on SuperRare yet
  "0x8ec6cb2539de1cfd9bde8d245eb7c37590187ea1": { slug: "sr-aztekblack", label: "AztekBlack" },
  "0x15894278edd4c2cbe79605da5da1f0f39cc41ef0": { slug: "sr-behind-the-lines", label: "Behind the Lines" },
  "0xfeaf9c9afac5886f3374ec4c4189bf25da6e641d": { slug: "sr-unconscious-mind", label: "Unconscious Mind" },
};
