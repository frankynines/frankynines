import Link from "next/link";
import Ticker from "@/components/Ticker";
import Figure from "@/components/Figure";
import NftGrid from "@/components/NftGrid";
import { site } from "@/content/site";
import { nfts } from "@/data/nfts";

export default function Home() {
  const featured = nfts.items.slice(0, 8); // already newest first

  return (
    <>
      {/* Hero */}
      <section className="wrap pt-10 md:pt-16 pb-10 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <h1 className="display text-[clamp(4.5rem,15vw,13rem)]">
            Franky
            <br />
            <span className="text-pink">Nines</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-snug">
            Technical Artist &amp; Developer&hellip; CEO of my own universe. I draw it, design it, code it, ship it.
            Murals on real walls. Art you can own on chain.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/design" className="btn">Design work</Link>
            <Link href="/collect" className="btn btn--volt">Collect</Link>
          </div>
        </div>

        <div className="relative md:pb-8">
          <Figure src="/work/hero.jpg" alt="FrankyNines 9s mark" aspect="aspect-video" className="tilt-r" tape />
          <span className="slap slap--pink absolute -left-2 bottom-4 md:bottom-12 tilt-l2">Est. 2010</span>
          <span className="slap absolute right-2 -top-3 tilt-r">{site.location}</span>
        </div>
      </section>

      <Ticker items={["Paint.", "Design.", "Code.", "Dream.", "Innovate.", "Sup."]} />

      {/* Three doors */}
      <section className="wrap py-16 grid gap-8 md:grid-cols-3">
        <Door
          href="/design"
          kicker="2010 to now"
          title="Design"
          body="Fifteen years of product. Founded Yoshirt, got it acquired. Cash Money, Disney, NBA Top Shot, Snoop. Then built SupDucks from scratch."
          tilt="tilt-l"
        />
        <Door
          href="/art"
          kicker="2013 to now"
          title="Art"
          body="Gallery shows in SF. Neon acrylic in Vegas. Murals in Vegas and Lisbon. A studio in Puerto Vallarta. Minting since 2017."
          tilt=""
        />
        <Door
          href="/supducks"
          kicker="2021 to now"
          title="SupDucks"
          body="10,010 ducks. Sold out. An animation studio in DTLA, a cartoon pilot, and a 2026 roadmap I'm building right now."
          tilt="tilt-r"
          dark
        />
      </section>

      {/* Art for sale */}
      <section className="bg-ink text-poster">
        <div className="wrap py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display text-5xl md:text-7xl">
                Latest <span className="text-volt">drops</span>
              </h2>
              <p className="mt-3 max-w-md text-poster/80">
                The eight newest pieces, straight off chain. SuperRare one of ones, KnownOrigin editions, my own contracts.
              </p>
            </div>
            <Link href="/collect" className="btn btn--volt">Everything on chain</Link>
          </div>
          <div className="mt-10">
            {featured.length ? (
              <NftGrid items={featured} dark compact />
            ) : (
              <EmptyShop />
            )}
          </div>
        </div>
      </section>
      <div className="drip" />

      {/* Short bio */}
      <section className="wrap py-16 grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
        <div className="poster p-8 tilt-l">
          <p className="display text-2xl">About</p>
          <p className="mt-4 leading-relaxed">
            Art Institute SF. Zynga. Founded 99centbrains, millions of downloads. Ran YOSHIRT. Blockchain since
            2017 with DapperLabs and NFT42, art for Coinbase and Monster Energy. Then MegaVolt Corp. and SupDucks,
            still building it. Based in Vegas, Mexico on the horizon.
          </p>
          <Link href="/about" className="btn mt-6">The whole route</Link>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          <Stat value="10,010" label="SupDucks sold out" />
          <Stat value="500k+" label="Yoshirt downloads" />
          <Stat value="23,000Ξ" label="volume traded" />
          <Stat value="2017" label="first NFT minted" />
        </ul>
      </section>
    </>
  );
}

function Door({
  href, kicker, title, body, tilt, dark,
}: { href: string; kicker: string; title: string; body: string; tilt: string; dark?: boolean }) {
  return (
    <Link href={href} className={`poster ${dark ? "poster--dark" : ""} ${tilt} p-7 flex flex-col gap-3 group`}>
      <span className="text-sm opacity-70">{kicker}</span>
      <span className="display text-5xl group-hover:text-pink transition-colors">{title}</span>
      <span className="leading-relaxed">{body}</span>
      <span className={`display text-sm mt-auto pt-4 self-start ${dark ? "text-volt" : "underline-marker"}`}>Open</span>
    </Link>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <li className="poster p-5">
      <span className="display text-3xl md:text-4xl block">{value}</span>
      <span className="text-sm opacity-70">{label}</span>
    </li>
  );
}

function EmptyShop() {
  return (
    <div className="poster poster--dark p-8 max-w-xl">
      <p className="display text-xl text-volt">Shop not synced yet</p>
      <p className="mt-2 text-poster/80">
        Run <code className="font-mono">npm run sync:nfts</code> and redeploy. The marketplaces are linked in the footer.
      </p>
    </div>
  );
}
