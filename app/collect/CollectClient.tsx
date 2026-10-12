"use client";

import { useMemo, useState } from "react";
import NftGrid, { type NftItem } from "@/components/NftGrid";
import { collections, superrareSeries } from "@/content/site";

type Section = "superrare" | "opensea";

const sections: Record<Section, { title: string; blurb: string; href: string; cta: string }> = {
  superrare: {
    title: "SuperRare",
    blurb: "One of ones and series. Every piece under Creations on my SuperRare profile.",
    href: "https://superrare.com/frankynines",
    cta: "SuperRare profile",
  },
  opensea: {
    title: "OpenSea",
    blurb: "My collections and editions. KnownOrigin, MakersPlace, LVL9, Pixel Abstract, CLICK HERE, Rodeo posts, AztekBlack.",
    href: "https://opensea.io/0x2Eb9b439Ffb7dC587198e1534e465a6242192b24",
    cta: "OpenSea profile",
  },
};

export default function CollectClient({ items }: { items: NftItem[] }) {
  const [section, setSection] = useState<Section>("superrare");
  const [slug, setSlug] = useState<string>("sr-1of1");
  const [q, setQ] = useState("");

  const inSection = useMemo(() => items.filter((i) => i.section === section), [items, section]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const i of inSection) c[i.slug] = (c[i.slug] ?? 0) + 1;
    return c;
  }, [inSection]);

  // Filter buttons: series labels for SuperRare, collection order for OpenSea.
  const filters =
    section === "superrare"
      ? Object.values(superrareSeries).filter((s) => !s.hide && counts[s.slug])
      : collections.filter((c) => c.section === section && counts[c.slug]).map((c) => ({ slug: c.slug, label: c.label }));

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return inSection.filter(
      (i) =>
        (slug === "all" || i.slug === slug) &&
        (!needle || i.name.toLowerCase().includes(needle) || i.collection.toLowerCase().includes(needle))
    );
  }, [inSection, slug, q]);

  const meta = sections[section];
  const totals = {
    superrare: items.filter((i) => i.section === "superrare").length,
    opensea: items.filter((i) => i.section === "opensea").length,
  };

  function switchTo(s: Section) {
    setSection(s);
    setSlug(s === "superrare" ? "sr-1of1" : "all");
    setQ("");
  }

  return (
    <section className="wrap py-6">
      {/* Toggle */}
      <div className="flex flex-wrap gap-4" role="tablist" aria-label="Marketplace">
        <button
          type="button"
          role="tab"
          aria-selected={section === "superrare"}
          onClick={() => switchTo("superrare")}
          className={`btn !text-base !px-6 !py-4 ${section === "superrare" ? "" : "btn--ghost opacity-70"}`}
        >
          SuperRare ({totals.superrare})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={section === "opensea"}
          onClick={() => switchTo("opensea")}
          className={`btn !text-base !px-6 !py-4 ${section === "opensea" ? "btn--volt" : "btn--ghost opacity-70"}`}
        >
          OpenSea ({totals.opensea})
        </button>
      </div>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="display text-4xl md:text-6xl">{meta.title}</h2>
          <p className="mt-2 max-w-lg opacity-80">{meta.blurb}</p>
        </div>
        <a href={meta.href} className="btn btn--ghost">{meta.cta}</a>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-y-2 border-ink py-4">
        <Filter active={slug === "all"} onClick={() => setSlug("all")}>All ({inSection.length})</Filter>
        {filters.length > 1 &&
          filters.map((f) => (
            <Filter key={f.slug} active={slug === f.slug} onClick={() => setSlug(f.slug)}>
              {f.label} ({counts[f.slug]})
            </Filter>
          ))}
        <label className="ml-auto flex items-center gap-2 text-sm">
          <span className="sr-only">Search pieces</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles"
            className="px-3 py-2 w-44 border-2 bg-poster border-ink"
          />
        </label>
      </div>

      <p className="mt-4 text-sm opacity-70">
        {shown.length} piece{shown.length === 1 ? "" : "s"}, newest first
      </p>

      <div className="mt-6">
        {shown.length ? (
          <NftGrid items={shown} />
        ) : (
          <p className="poster p-6 inline-block">Nothing matches that. Clear the search or pick another collection.</p>
        )}
      </div>
    </section>
  );
}

function Filter({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`display text-xs px-3 py-2 border-2 border-ink ${active ? "bg-ink text-volt" : "bg-poster hover:bg-volt"}`}
    >
      {children}
    </button>
  );
}
