import type { Metadata } from "next";
import Link from "next/link";
import Figure from "@/components/Figure";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Franky Aguilar",
  description:
    "Franky Aguilar, aka FrankyNines. Technical artist and developer. Art Institute SF, Zynga, 99centbrains, YOSHIRT, DapperLabs, NFT42, Coinbase, Monster Energy, TikTok, and MegaVolt Corp., the incubator of SupDucks. Based in Vegas.",
  alternates: { canonical: `${site.url}/about` },
};

const timeline: [string, string][] = [
  ["2010", "Graduated from the Art Institute of California, San Francisco. Art direction and product design."],
  ["2012", "Production art at Zynga. Dropped CatWang, quit, started 99centbrains."],
  ["2013", "First solo art show, San Francisco."],
  ["2014", "Moved to LA, founded YOSHIRT, got my first studio."],
  ["2016", "QUOTR for Tony Robbins with Neon Roots. Pop art prints for CanvasCultures."],
  ["2017", "Sold 99centbrains to Neon Roots. Moved to London, Pillar Wallet. Started minting."],
  ["2018", "Moved to Vegas. Joined DapperLabs remote. Opened a gallery on 9th Street, neon acrylics."],
  ["2020", "Murals in Vegas. TikTok. A private studio in Puerto Vallarta."],
  ["2021", "Launched SupDucks. 10,010 sold out."],
  ["2022", "Built SupDucks HQ, an animation studio in the Arts District. Mural at NEARCON Lisbon."],
  ["2025", "re:center brand and packaging. SupDucks brand refresh starts."],
  ["2026", "SupDucks website refresh, iOS app, merch. Painting in between."],
];

export default function AboutPage() {
  return (
    <>
      <section className="wrap pt-12 pb-10 grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-start">
        <Figure src="/work/portrait.jpg" alt="Franky Aguilar" aspect="aspect-[4/5]" className="tilt-l" tape />
        <div>
          <h1 className="display text-[clamp(3rem,9vw,7rem)]">Hi, I&apos;m Franky</h1>
          <p className="mt-5 text-lg leading-snug max-w-prose">
            Technical Artist &amp; Developer&hellip; CEO of my own universe.
          </p>
          <div className="mt-6 space-y-4 leading-relaxed max-w-prose">
            <p>
              Art Institute SF, 2010. Web design degree. Went straight to Zynga drawing production art for games and
              taught myself to code on the side. In 2012 I put out CatWang from a Starbucks on a cracked MacBook.
              130k downloads the first month. I quit Zynga a few months later and started 99centbrains.
            </p>
            <p>
              Close to 40 sticker apps came out of that shop. Snoopify with Snoop Dogg. Lazergram for Major Lazer.
              Family Guy Photobomb for FOX. Apps with Sam Flores, Alex Pardee and David Choe. Ten million downloads,
              a hundred million photos. Sold it to Neon Roots in January 2017.
            </p>
            <p>
              In 2014 I moved to LA and founded YOSHIRT. Design a shirt on your phone, we print and sew it in the US.
              NEFF was the first brand on it. Kleiner Perkins led the seed. Apple put us on stage at WWDC for Apple
              Pay. I ran it through 2017.
            </p>
            <p>
              That same year I moved to London to work on Pillar Wallet and started minting art on chain before most
              people had a wallet. 2018 I joined DapperLabs. Product and brand for NBA Top Shot, NFT42, Disney, Snoop.
              Art for Coinbase and Monster Energy.
            </p>
            <p>
              When the pandemic hit I went live on TikTok painting small watercolors every day. That&apos;s where a lot
              of you found me.
            </p>
            <p>
              Then MegaVolt Corp. and SupDucks. 10,010 ducks, sold out, an animation studio in DTLA, a cartoon pilot.
              Still the main thing.
            </p>
            <p>Based in Vegas. Next stop, Mexico.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/supducks" className="btn btn--volt">What I&apos;m building</Link>
            <a href={`mailto:${site.email}`} className="btn">{site.email}</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a className="underline-marker" href={site.socials.instagram}>Instagram</a>
            <a className="underline-marker" href={site.socials.x}>X</a>
            <a className="underline-marker" href={site.socials.tiktok}>TikTok</a>
            <a className="underline-marker" href={site.socials.youtube}>YouTube</a>
          </div>
        </div>
      </section>

      <section className="wrap py-10">
        <h2 className="display text-3xl md:text-5xl">The route so far</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {timeline.map(([y, t], i) => (
            <li key={y + i} className={`poster p-5 flex gap-5 items-start ${i % 3 === 1 ? "tilt-r" : i % 3 === 2 ? "tilt-l" : ""}`}>
              <span className="display text-pink text-xl shrink-0 w-14">{y}</span>
              <span className="leading-relaxed">{t}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap py-12">
        <div className="poster poster--dark p-8 md:p-12 tilt-l grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="display text-3xl md:text-4xl">The toolkit</p>
            <p className="mt-3 text-poster/85 max-w-prose leading-relaxed">
              Mobile product design. Brand systems. Illustration and character design. Murals and large canvases.
              NFT drops end to end: art, generative traits, smart contract, mint site, community. Procreate brushes.
              All of it documented on TikTok.
            </p>
          </div>
          <a href={site.socials.tiktok} className="btn btn--volt">Watch the process</a>
        </div>
      </section>
    </>
  );
}
