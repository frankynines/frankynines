export type Project = {
  slug: string;
  year: string;
  title: string;
  role: string;
  body: string[];
  stats?: { value: string; label: string }[];
  images: string[]; // paths under /public
  links?: { label: string; href: string }[];
};

export const designProjects: Project[] = [
  {
    slug: "art-institute",
    year: "2010",
    title: "Art Institute of California, San Francisco",
    role: "BS, Web Design and Interactive Media",
    body: [
      "Art direction and product design. Imagine going to school with that name.",
    ],
    images: ["/work/design/art-institute-1.jpg"],
  },
  {
    slug: "zynga",
    year: "2012",
    title: "Zynga, then 99centbrains",
    role: "Production illustration and design, then founder",
    body: [
      "Production illustration and UI at Zynga. Left to found 99centbrains, an iOS app company that put up millions of downloads.",
      "Client work for Upper Deck, FOX, MAD, Dim Mak, iam8bit and Zero Friends, plus a run of my own apps like Snoopify and Get Wang.",
    ],
    images: ["/work/design/zynga-1.jpg", "/work/design/zynga-2.jpg", "/work/design/apps-2012.jpg"],
  },
  {
    slug: "yoshirt",
    year: "2014",
    title: "Yoshirt",
    role: "Founder, product and interface design",
    body: [
      "On-demand apparel printing, mobile first. Design a fully sublimated garment on your phone, list it, sell it. Your phone became a tiny fashion studio.",
      "I owned product and interface. Clarity, speed, creative freedom. Idea to storefront in minutes.",
      "Featured by Apple at WWDC for Apple Pay. 500k+ downloads worldwide. Acquired in 2017. Partnerships with Neff, Agenda, Known and more.",
    ],
    stats: [
      { value: "500k+", label: "downloads" },
      { value: "WWDC", label: "featured by Apple" },
      { value: "2017", label: "acquired" },
    ],
    images: ["/work/design/yoshirt-1.jpg", "/work/design/yoshirt-2.jpg", "/work/design/yoshirt-3.jpg"],
  },
  {
    slug: "cash-money",
    year: "2015",
    title: "Cash Money Yourself",
    role: "UI design for Cash Money Records",
    body: [
      "Photobooth app for Birdman's label. The brief: make it look like rapper jewelry. So I drew custom diamond and gold gradients and iced out the whole UI.",
      "Also shipped a mobile album designer for the label.",
    ],
    images: ["/work/design/cash-money-1.jpg", "/work/design/cash-money-2.jpg"],
  },
  {
    slug: "cybrfm",
    year: "2015",
    title: "CybrFM",
    role: "Founder, design and development",
    body: [
      "One of my most successful apps. Photo composition with Tumblr as the CMS, so you could pull PNGs off any blog and collage over your photos.",
      "The audience was Windows 95 and MS Paint geeks. The design stayed true to em.",
    ],
    images: ["/work/design/cybrfm-1.jpg", "/work/design/cybrfm-2.jpg"],
  },
  {
    slug: "quotr",
    year: "2016",
    title: "QUOTR for Tony Robbins",
    role: "Product design and pitch, with Neon Roots",
    body: [
      "In 2016 I sold my app portfolio to Neon Roots and worked with the team on internal and client products.",
      "QUOTR was a typography-driven quote app I designed and pitched to the Tony Robbins team in San Diego.",
    ],
    images: ["/work/design/quotr-1.jpg", "/work/design/quotr-2.jpg"],
  },
  {
    slug: "blockchain",
    year: "2017",
    title: "Into blockchain",
    role: "Lead UI, branding, concept and production illustration",
    body: [
      "Moved to London and started minting digital art before most people knew the word. Then led UI and brand for a run of early crypto and entertainment products.",
      "DapperLabs and NBA Top Shot. NFT42. Snoop Dogg's Algorithm app. Audio.io. Lead concept for Disney's MagicPin, plus production illustration for the mouse. Brand art for Coinbase and Monster Energy.",
    ],
    images: [
      "/work/design/dapper.jpg",
      "/work/design/topshot.jpg",
      "/work/design/snoop.jpg",
      "/work/design/audio.jpg",
      "/work/design/magicpin.jpg",
      "/work/design/disney-illustration.jpg",
    ],
  },
  {
    slug: "supducks",
    year: "2021",
    title: "SupDucks",
    role: "Founder, art, brand, product",
    body: [
      "Dropped SupDucks. 10,010 PFPs, hand-drawn traits, generative assembly, my own contract. Sold out. Built an animation studio in the Arts District and shipped a cartoon pilot. Still the main project.",
    ],
    stats: [
      { value: "10,010", label: "NFTs sold out at $1.8M" },
      { value: "23,000Ξ", label: "volume traded" },
      { value: "3,500", label: "unique owners" },
      { value: "20,000", label: "community members" },
      { value: "75Ξ", label: "highest sale" },
    ],
    images: ["/work/supducks/launch.jpg", "/work/supducks/pfp-1.jpg", "/work/supducks/pilot-1.jpg", "/work/supducks/hq-1.jpg"],
    links: [{ label: "Full SupDucks story", href: "/supducks" }],
  },
  {
    slug: "recenter",
    year: "2025",
    title: "re:center",
    role: "Branding, design, illustration, typography, packaging",
    body: [
      "Brand identity and packaging for re:center out of Santa Teresa, Costa Rica. Hand-drawn botanicals, maps, custom type.",
    ],
    images: ["/work/design/recenter-1.jpg", "/work/design/recenter-2.jpg"],
  },
  {
    slug: "supducks-2026",
    year: "2026",
    title: "SupDucks refresh",
    role: "Website, iOS app, socials, merch",
    body: ["New site, iOS app, new socials, merch line. Designing and coding it myself. In progress right now."],
    images: ["/work/supducks/web-1.jpg", "/work/supducks/merch-1.jpg"],
  },
];
