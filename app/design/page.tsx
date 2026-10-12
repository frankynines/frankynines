import type { Metadata } from "next";
import Link from "next/link";
import Figure from "@/components/Figure";
import { designProjects } from "@/content/design";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Product design portfolio",
  description:
    "Product and brand design by FrankyNines: Yoshirt (acquired), Cash Money Records, CybrFM, QUOTR for Tony Robbins, blockchain products and SupDucks.",
  alternates: { canonical: `${site.url}/design` },
};

export default function DesignPage() {
  return (
    <>
      <section className="wrap pt-12 pb-8">
        <h1 className="display text-[clamp(3rem,10vw,8rem)]">Design</h1>
        <p className="mt-4 max-w-xl text-lg leading-snug">
          Fifteen years of product. I founded most of these, designed all of them, coded a lot of them,
          and shipped every one to real people.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="slap">Product design</span>
          <span className="slap slap--pink">Art direction</span>
          <span className="slap slap--cyan">Branding</span>
          <span className="slap">iOS</span>
          <span className="slap slap--ink">Code</span>
        </div>
      </section>

      <ol className="wrap space-y-20 py-8">
        {designProjects.map((p, i) => (
          <li key={p.slug} id={p.slug} className="grid gap-6 md:grid-cols-[6rem_1fr] md:gap-10">
            <div className="md:pt-2">
              <span className="stamp">{p.year}</span>
            </div>
            <article className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="display text-3xl md:text-5xl">{p.title}</h2>
                <p className="mt-2 text-sm opacity-70">{p.role}</p>
                <div className="mt-5 space-y-3 leading-relaxed max-w-prose">
                  {p.body.map((t, k) => (
                    <p key={k}>{t}</p>
                  ))}
                </div>
                {p.stats && (
                  <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {p.stats.map((s) => (
                      <li key={s.label} className="poster p-3">
                        <span className="display text-xl block">{s.value}</span>
                        <span className="text-xs opacity-70">{s.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {p.links && (
                  <div className="mt-6 flex gap-3">
                    {p.links.map((l) => (
                      <Link key={l.href} href={l.href} className="btn">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>
              <div className={`grid gap-6 ${p.images.length > 2 ? "sm:grid-cols-2" : ""}`}>
                {p.images.map((src, k) => (
                  <Figure
                    key={src}
                    src={src}
                    alt={`${p.title}, slide ${k + 1}`}
                    aspect="aspect-video"
                    className={k % 2 === (i % 2) ? "tilt-l" : "tilt-r"}
                    tape={k === 0}
                  />
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <section className="wrap py-12">
        <div className="poster poster--dark p-8 md:p-12 tilt-l flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="display text-3xl md:text-4xl">Right now: SupDucks</p>
            <p className="mt-2 text-poster/80 max-w-md">
              Website refresh, iOS app, merch. That's where the design hours go in 2026.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/supducks" className="btn btn--volt">See the build</Link>
            <a href={site.decks.design} className="btn btn--ghost">Deck version</a>
          </div>
        </div>
      </section>
    </>
  );
}
