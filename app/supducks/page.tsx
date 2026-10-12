import type { Metadata } from "next";
import Link from "next/link";
import Figure from "@/components/Figure";
import Ticker from "@/components/Ticker";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "SupDucks by FrankyNines",
  description:
    "SupDucks: 10,010 PFP NFTs by FrankyNines, sold out in 2021 for $1.8M. 23,000 ETH traded, an animation studio in DTLA, a cartoon pilot, merch and brand work.",
  alternates: { canonical: `${site.url}/supducks` },
};

const stats = [
  { value: "10,010", label: "ducks, sold out at $1.8M" },
  { value: "23,000Ξ", label: "volume traded" },
  { value: "3,500", label: "unique owners" },
  { value: "20,000", label: "active community members" },
  { value: "75Ξ", label: "highest sale" },
];

export default function SupDucksPage() {
  return (
    <>
      <section className="bg-ink text-poster">
        <div className="wrap pt-12 pb-12 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <span className="slap slap--pink tilt-l2">2021 to now</span>
            <h1 className="display text-[clamp(3.5rem,12vw,10rem)] mt-4">
              Sup<span className="text-volt">Ducks</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-poster/85 leading-snug">
              I drew ten thousand ducks. They sold out. Then I built a studio to make em move. Still building.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={site.markets.supducks} className="btn btn--volt">supducks.com</a>
              <Link href="/collect" className="btn btn--ghost">Get a duck</Link>
            </div>
          </div>
          <Figure src="/work/supducks/hero.jpg" alt="SupDucks PFP collection" aspect="aspect-video" className="poster--dark tilt-r" />
        </div>
        <Ticker items={["Sup.", "Sup.", "Sup.", "Sup.", "Sup.", "Sup.", "Sup.", "Sup."]} />
        <div className="wrap py-12">
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((s) => (
              <li key={s.label} className="poster poster--dark p-5">
                <span className="display text-2xl md:text-3xl block text-volt">{s.value}</span>
                <span className="text-xs text-poster/70">{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-poster/50">Numbers as of Jan 2022.</p>
        </div>
      </section>
      <div className="drip" />

      <section className="wrap py-16 grid gap-10 md:grid-cols-[6rem_1fr] md:gap-10">
        <span className="stamp">2021</span>
        <div>
          <h2 className="display text-3xl md:text-5xl">The PFP collection</h2>
          <p className="mt-4 max-w-prose leading-relaxed">
            10,010 ducks. Every trait hand-drawn by me, assembled by code I wrote. Launched 2021, sold out, and turned
            into a 20,000 person community that still shows up every day.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Figure src="/work/supducks/launch.jpg" alt="SupDucks launch, 2021" aspect="aspect-video" className="tilt-l" tape />
            <Figure src="/work/supducks/pfp-1.jpg" alt="The SupDucks PFP collection" aspect="aspect-video" className="tilt-r" tape />
            <Figure src="/work/supducks/launch-party.jpg" alt="SupDucks launch party" aspect="aspect-video" className="tilt-r" />
            <Figure src="/work/supducks/panel.jpg" alt="Talking SupDucks on a conference panel" aspect="aspect-video" className="tilt-l" />
          </div>
        </div>
      </section>

      <section className="wrap py-16 grid gap-10 md:grid-cols-[6rem_1fr] md:gap-10">
        <span className="stamp">2022</span>
        <div>
          <h2 className="display text-3xl md:text-5xl">SupDucks HQ, Arts District DTLA</h2>
          <p className="mt-4 max-w-prose leading-relaxed">
            Built an animation studio in Downtown LA under MegaVolt and produced the SupDucks cartoon pilot. Storyboards, rigs, voices, the whole pipeline in house.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Figure src="/work/supducks/hq-1.jpg" alt="SupDucks HQ in the Arts District" aspect="aspect-video" className="tilt-r" tape />
            <Figure src="/work/supducks/studio.jpg" alt="Inside the SupDucks animation studio" aspect="aspect-video" className="tilt-l" tape />
            <Figure src="/work/supducks/pilot-1.jpg" alt="Frame from the SupDucks cartoon pilot" aspect="aspect-video" className="tilt-l" />
            <Figure src="/work/supducks/pilot-2.jpg" alt="SupDucks cartoon pilot storyboards" aspect="aspect-video" className="tilt-r" />
          </div>
        </div>
      </section>

      <section className="wrap py-16 grid gap-10 md:grid-cols-[6rem_1fr] md:gap-10">
        <span className="stamp">2026</span>
        <div>
          <h2 className="display text-3xl md:text-5xl">What I&apos;m building now</h2>
          <p className="mt-4 max-w-prose leading-relaxed">
            New site. A mobile iOS app. New socials. A merch line. This is the active project. We stay fly.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Figure src="/work/supducks/web-1.jpg" alt="SupDucks website refresh" aspect="aspect-video" className="tilt-l" />
            <Figure src="/work/supducks/merch-1.jpg" alt="SupDucks merch" aspect="aspect-video" className="tilt-r" />
          </div>
        </div>
      </section>

    </>
  );
}
