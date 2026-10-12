export type ArtEra = {
  slug: string;
  year: string;
  place: string;
  title: string;
  medium?: string;
  body: string;
  images: string[];
  dark?: boolean; // neon era sections render on black
};

export const artEras: ArtEra[] = [
  {
    slug: "sf-solo",
    year: "2013",
    place: "San Francisco",
    title: "First solo show",
    medium: "Digital works, giclée on canvas",
    body: "Had my first solo art show, CLICK HERE, at Fifty24SF Gallery on Fillmore. Digital works printed giclée on canvas.",
    images: ["/work/art/sf-2013-1.jpg", "/work/art/sf-2013-2.jpg"],
  },
  {
    slug: "la-studio",
    year: "2014",
    place: "Los Angeles",
    title: "First studio",
    medium: "Watercolor and gouache on paper",
    body: "Moved to LA and got my first art studio. Watercolor on paper, ink studies, and a 4 by 8 foot gouache eagle called Águila.",
    images: ["/work/art/la-2014-1.jpg", "/work/art/la-2014-2.jpg", "/work/art/aguila.jpg"],
  },
  {
    slug: "canvas-cultures",
    year: "2016",
    place: "Los Angeles",
    title: "Pop art prints",
    medium: "Prints for CanvasCultures.com",
    body: "Made a run of pop art prints for CanvasCultures. Scarface, Buddha, Dior lips, the whole wall.",
    images: ["/work/art/pop-2016-1.jpg", "/work/art/pop-2016-2.jpg"],
  },
  {
    slug: "london-nfts",
    year: "2017",
    place: "London",
    title: "Digital art, on chain",
    medium: "NFTs on SuperRare and KnownOrigin",
    body: "Moved to London and started minting digital art as NFTs. Early. Most of those pieces are still out there. Some are still for sale.",
    images: ["/work/art/london-2017-1.jpg", "/work/art/london-2017-2.jpg"],
    dark: true,
  },
  {
    slug: "vegas-neon",
    year: "2018",
    place: "Las Vegas",
    title: "9th Street gallery",
    medium: "Neon acrylic on canvas",
    body: "Moved to Vegas, opened a gallery on 9th Street and started painting with neon acrylics. Big canvases, hotel signs, skulls, faces, drips.",
    images: [
      "/work/art/vegas-2018-1.jpg",
      "/work/art/vegas-2018-2.jpg",
      "/work/art/vegas-2018-3.jpg",
      "/work/art/vegas-2018-4.jpg",
      "/work/art/vegas-2018-5.jpg",
      "/work/art/vegas-2018-6.jpg",
    ],
    dark: true,
  },
  {
    slug: "vegas-murals",
    year: "2020",
    place: "Las Vegas",
    title: "Murals and the pandemic",
    medium: "Murals, watercolor, TikTok",
    body: "Painted murals around Vegas. Then the world shut down, so I started making content on TikTok. Small watercolors, every day, on camera.",
    images: ["/work/art/mural-2020-1.jpg", "/work/art/tiktok-2020.jpg", "/work/art/mural-2020-2.jpg"],
  },
  {
    slug: "puerto-vallarta",
    year: "2020",
    place: "Puerto Vallarta, Mexico",
    title: "Private studio",
    medium: "Acrylic and ink on canvas",
    body: "Hopped a flight to Puerto Vallarta and got a private studio. Butterflies, faces, calaveras.",
    images: ["/work/art/pv-2020-1.jpg", "/work/art/pv-2020-2.jpg", "/work/art/pv-2020-3.jpg"],
  },
  {
    slug: "supducks",
    year: "2021",
    place: "Los Angeles",
    title: "SupDucks",
    medium: "10,010 PFPs, animation studio, cartoon pilot",
    body: "When I got back I launched SupDucks. Built an animation studio in Downtown LA and made the SupDucks cartoon pilot.",
    images: [
      "/work/supducks/launch-party.jpg",
      "/work/supducks/hero.jpg",
      "/work/supducks/studio.jpg",
      "/work/supducks/pilot-2.jpg",
    ],
    dark: true,
  },
  {
    slug: "lisbon",
    year: "2022",
    place: "Lisbon, Portugal",
    title: "NEARCON mural",
    medium: "Mural",
    body: "Painted a mural for NEARCON in Lisbon.",
    images: ["/work/art/lisbon-2022-1.jpg"],
  },
  {
    slug: "now",
    year: "Now",
    place: "Las Vegas",
    title: "Back in the studio",
    medium: "Ink, watercolor, paper",
    body: "Ink abstracts and small watercolor ducks between SupDucks sprints. New work hits Instagram first.",
    images: ["/work/art/now-1.jpg", "/work/art/now-2.jpg"],
  },
];
