export type NftItem = {
  id: string;
  contract: string;
  tokenId: string;
  name: string;
  description: string;
  collection: string;
  slug: string;
  section: string;
  market?: string;
  chain?: string;
  image: string | null;
  thumb: string | null;
  animation: string | null;
  type: string;
  mintedAt: string | null;
  href: string;
  forSale?: boolean;
  animated?: boolean;
};

export default function NftGrid({
  items, dark = false, compact = false,
}: { items: NftItem[]; dark?: boolean; compact?: boolean }) {
  return (
    <ul className={`grid gap-6 ${compact ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
      {items.map((n, i) => (
        <li key={n.id} className={i % 7 === 3 ? "tilt-l" : i % 5 === 2 ? "tilt-r" : ""}>
          <a
            href={n.href}
            target="_blank"
            rel="noopener"
            className={`poster ${dark ? "poster--dark" : ""} block overflow-hidden group`}
          >
            <div className="aspect-square overflow-hidden bg-concrete-deep relative">
              {n.forSale && <span className="slap slap--pink absolute left-2 top-2 z-10 !text-[0.6rem]">For sale</span>}
              {n.animated && <span className="slap slap--cyan absolute right-2 top-2 z-10 !text-[0.6rem]">GIF</span>}
              {n.thumb || n.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={n.thumb || n.image || ""}
                  alt={n.name}
                  loading={i < 8 ? "eager" : "lazy"}
                  decoding="async"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              ) : null}
            </div>
            <div className="p-3">
              <p className="display text-xs md:text-sm leading-tight line-clamp-2">{n.name}</p>
              <p className={`mt-1 text-xs ${dark ? "text-poster/60" : "opacity-60"}`}>
                {n.collection}
                {n.mintedAt ? `, ${n.mintedAt.slice(0, 4)}` : ""}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
