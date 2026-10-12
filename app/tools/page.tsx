import type { Metadata } from "next";
import Link from "next/link";
import NftGrid from "@/components/NftGrid";
import Figure from "@/components/Figure";
import { site } from "@/content/site";
import { nfts } from "@/data/nfts";
import type { NftItem } from "@/components/NftGrid";

export const metadata: Metadata = {
  title: "Procreate brushes by FrankyNines",
  description:
    "Custom Procreate brush packs by FrankyNines. Pixel brushes, street brushes, the Turntles pack. The same brushes behind the art. Buy the pack, download the brushes, go make something.",
  alternates: { canonical: `${site.url}/tools` },
  keywords: ["Procreate brushes", "Procreate brush pack", "pixel brushes Procreate", "street art brushes", "FrankyNines brushes"],
};

export default function ToolsPage() {
  const packs = (nfts.items as NftItem[]).filter((n) => n.section === "tools");

  return (
    <>
      <section className="wrap pt-12 pb-8 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <span className="slap slap--pink tilt-l2">Art supplies</span>
          <h1 className="display text-[clamp(3rem,10vw,8rem)] mt-4">Tools</h1>
          <p className="mt-4 max-w-xl text-lg leading-snug">
            Custom Procreate brushes. The same ones behind the ducks, the pixel abstracts and the neon work.
            Not art. Supplies. Buy a pack, download the brushes, go make something.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://opensea.io/collection/brushpacks" className="btn btn--volt">Get a pack on OpenSea</a>
            <a href={site.socials.tiktok} className="btn btn--ghost">See them in use</a>
          </div>
        </div>
        <Figure src="/work/tools/hero.jpg" alt="Brush strokes from the FrankyNines Procreate packs" aspect="aspect-square" className="tilt-r" tape />
      </section>

      <section className="wrap py-10">
        {packs.length ? (
          <NftGrid items={packs} />
        ) : (
          <div className="poster p-8 max-w-xl tilt-l">
            <p className="display text-xl">Packs not synced yet</p>
            <p className="mt-2 leading-relaxed">
              Run <code className="font-mono">npm run sync:nfts</code> and the brush packs show up here. Until then,
              they&apos;re on OpenSea.
            </p>
          </div>
        )}
      </section>

      <section className="wrap py-12 grid gap-6 md:grid-cols-3">
        <Step n="1" title="Grab a pack" body="Each pack is an NFT on OpenSea. One wallet, one click." />
        <Step n="2" title="Download" body="The .brushset file comes with the NFT. Open it on your iPad and Procreate installs it." />
        <Step n="3" title="Use em" body="Paint, draw, post. Tag @frankynines so I can see what you made." />
      </section>

      <section className="wrap py-12">
        <div className="poster poster--dark p-8 md:p-12 tilt-l flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="display text-3xl md:text-4xl">Want the art, not the tools?</p>
            <p className="mt-2 text-poster/80 max-w-md">One of ones, series and editions. SuperRare and OpenSea, one page.</p>
          </div>
          <Link href="/collect" className="btn btn--volt">Collect</Link>
        </div>
      </section>
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="poster p-6">
      <span className="stamp !w-14 !h-14 !text-base">{n}</span>
      <p className="display text-2xl mt-4">{title}</p>
      <p className="mt-2 leading-relaxed opacity-80">{body}</p>
    </div>
  );
}
