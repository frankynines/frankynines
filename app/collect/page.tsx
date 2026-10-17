import type { Metadata } from "next";
import CollectClient from "./CollectClient";
import { site } from "@/content/site";
import { nfts } from "@/data/nfts";
import type { NftItem } from "@/components/NftGrid";

export const metadata: Metadata = {
  title: "Buy art by FrankyNines",
  description:
    "Every NFT by FrankyNines in one place: SuperRare one of ones, Bra1nR0t, AztekBlack, LVL9, Rodeo posts, Pixel Abstract Expressionsims, CLICK HERE and KnownOrigin editions. Click through to collect.",
  alternates: { canonical: `${site.url}/collect` },
};

export default function CollectPage() {
  const items = nfts.items as NftItem[];
  const updated = nfts.updatedAt ? new Date(nfts.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null;

  return (
    <>
      <section className="wrap pt-12 pb-6">
        <h1 className="display text-[clamp(3rem,10vw,8rem)]">Collect</h1>
        <p className="mt-4 max-w-xl text-lg leading-snug">
          Everything I minted, newest first. Flip between SuperRare and OpenSea. Each piece links to where
          it lives.
        </p>
        <p className="mt-6 text-xs opacity-60 font-mono break-all">
          {site.ens} · {site.wallet}
          {updated ? ` · synced ${updated}` : ""}
        </p>
      </section>

      {items.length ? (
        <CollectClient items={items} />
      ) : (
        <section className="wrap py-10">
          <div className="poster p-8 max-w-xl tilt-l">
            <p className="display text-xl">Nothing synced yet</p>
            <p className="mt-2 leading-relaxed">
              Run <code className="font-mono">npm run sync:nfts</code> to pull every piece off chain, commit{" "}
              <code className="font-mono">data/nfts.json</code>, deploy. The marketplace links above work right now.
            </p>
          </div>
        </section>
      )}

      <section className="wrap py-12">
        <div className="poster poster--dark p-8 md:p-10 tilt-r max-w-3xl">
          <p className="display text-2xl text-volt">Physical pieces</p>
          <p className="mt-2 text-poster/80">
            Originals and giclée prints come straight from me. Email me what you&apos;re after and I&apos;ll tell you what&apos;s in the studio.
          </p>
          <a href={`mailto:${site.email}?subject=Originals`} className="btn btn--volt mt-5">Ask about originals</a>
        </div>
      </section>
    </>
  );
}
