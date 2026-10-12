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
  ["2012", "Production illustration and design at a big gaming company. Then started founding my own apps."],
  ["2013", "First solo art show, San Francisco."],
  ["2014", "Founded Yoshirt. Moved to LA, got my first studio."],
  ["2016", "Sold my app portfolio to Neon Roots. Designed QUOTR for Tony Robbins. Pop art prints for CanvasCultures."],
  ["2017", "Moved to London. Started minting digital art. Yoshirt was acquired."],
  ["2018", "Moved to Vegas. Opened a gallery on 9th Street. Neon acrylics."],
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
              After earning my bachelor&apos;s degree in Web Design and Interactive Media from The Art Institute of
              CA-San Francisco in 2010, I launched my career at Zynga, a leader in the gaming industry. My time at
              Zynga was instrumental in honing my skills in game design and development, laying the groundwork for
              my entrepreneurial journey.
            </p>
            <p>
              In pursuit of my passion for innovation, I founded 99centbrains, an iOS app development company, where
              I developed several successful apps, achieving millions of downloads. My entrepreneurial spirit then
              led me to Los Angeles, where in 2014, I took the helm of a VC-backed company in the apparel and
              fashion industry (YOSHIRT). This role was pivotal in teaching me how to scale operations and lead
              cross-functional teams in both engineering and design.
            </p>
            <p>
              By 2017, I turned my focus to the burgeoning blockchain industry, leveraging my expertise in product
              design and direction. I collaborated with pioneering companies such as DapperLabs, NFT42, and others,
              playing a key role in the development of innovative blockchain projects. My artistic side found
              expression through collaborations with brands like Coinbase, Monster Energy, and more, where I merged
              art with cutting-edge technology.
            </p>
            <p>
              During the pandemic, I channeled my creative energy into content creation on TikTok, where I produced
              art videos and tutorials aimed at educating and inspiring a global audience. This endeavor allowed me
              to connect with a new community and share my passion for art in an accessible, engaging format.
            </p>
            <p>
              This journey culminated in the creation of MegaVolt Corp., the incubator of SupDucks, one of the
              coolest and most vibrant NFT communities on the internet. Through MegaVolt Corp., I continue to push
              the boundaries of technology, art, and community-building, always striving to create impactful and
              innovative experiences.
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
