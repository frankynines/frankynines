import type { Metadata } from "next";
import Link from "next/link";
import Figure from "@/components/Figure";
import { artEras } from "@/content/art";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "The art of FrankyNines, 2013 to now",
  description:
    "Paintings, murals and digital art by FrankyNines. Neon acrylics from Vegas, gouache and watercolor from LA, murals in Vegas and Lisbon, NFTs since 2017.",
  alternates: { canonical: `${site.url}/art` },
};

export default function ArtPage() {
  return (
    <>
      <section className="wrap pt-12 pb-8">
        <h1 className="display text-[clamp(3rem,10vw,8rem)]">Art</h1>
        <p className="mt-4 max-w-xl text-lg leading-snug">
          Canvas, walls, paper, chain. Every city I lived in handed me a new medium.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/collect" className="btn btn--volt">Collect</Link>
          <a href={site.socials.instagram} className="btn btn--ghost">Studio feed</a>
        </div>
      </section>

      <div className="space-y-0">
        {artEras.map((e, i) => (
          <section
            key={e.slug}
            id={e.slug}
            className={e.dark ? "bg-ink text-poster" : ""}
          >
            <div className="wrap py-16 grid gap-8 md:grid-cols-[6rem_1fr] md:gap-10">
              <div><span className="stamp">{e.year}</span></div>
              <div>
                <p className="text-sm opacity-70">{e.place}</p>
                <h2 className="display text-3xl md:text-5xl mt-1">{e.title}</h2>
                {e.medium && <p className={`mt-2 ${e.dark ? "text-volt" : "text-pink"} display text-sm`}>{e.medium}</p>}
                <p className="mt-4 max-w-prose leading-relaxed">{e.body}</p>
                <div className={`mt-8 grid gap-6 ${e.images.length >= 2 ? "sm:grid-cols-2" : "max-w-3xl"}`}>
                  {e.images.map((src, k) => (
                    <Figure
                      key={src}
                      src={src}
                      alt={`${e.title}, ${e.place} ${e.year}`}
                      aspect="aspect-video"
                      className={`${e.dark ? "poster--dark" : ""} ${k % 2 === i % 2 ? "tilt-l" : "tilt-r"}`}
                      tape={!e.dark && k === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
            {e.dark && <div className="drip" />}
          </section>
        ))}
      </div>

      <section className="wrap py-12">
        <div className="poster p-8 md:p-12 tilt-r flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="display text-3xl md:text-4xl">Got a wall?</p>
            <p className="mt-2 max-w-md opacity-80">Murals and large canvases happen a few times a year. Send the wall size and the city.</p>
          </div>
          <a href={`mailto:${site.email}?subject=Wall`} className="btn">Send it</a>
        </div>
      </section>
    </>
  );
}
