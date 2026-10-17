import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-poster">
      <div className="wrap py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-4xl leading-none">
            Sup<span className="text-pink">.</span>
          </p>
          <p className="mt-4 max-w-sm text-poster/80">
            Collectors, collabs, questions about a piece. Email is the fastest way to reach me.
          </p>
          <a href={`mailto:${site.email}`} className="btn btn--volt mt-6">
            {site.email}
          </a>
        </div>

        <div>
          <p className="display text-sm text-volt mb-3">Find me</p>
          <ul className="space-y-2">
            <li><a className="hover:text-volt" href={site.socials.instagram}>Instagram</a></li>
            <li><a className="hover:text-volt" href={site.socials.x}>X</a></li>
            <li><a className="hover:text-volt" href={site.socials.tiktok}>TikTok</a></li>
            <li><a className="hover:text-volt" href={site.socials.youtube}>YouTube</a></li>
          </ul>
        </div>

        <div>
          <p className="display text-sm text-volt mb-3">On chain</p>
          <ul className="space-y-2">
            <li><a className="hover:text-volt" href={site.markets.superrare}>SuperRare</a></li>
            <li><a className="hover:text-volt" href={site.markets.opensea}>OpenSea</a></li>
            <li><a className="hover:text-volt" href={site.markets.supducks}>SupDucks</a></li>
            <li><Link className="hover:text-volt" href="/tools">Procreate brushes</Link></li>
            <li><Link className="hover:text-volt" href="/collect">All of it, one page</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-poster/20">
        <div className="wrap py-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-poster/60">
          <span>FrankyNines. {site.location}.</span>
          <span className="font-mono">{site.ens}</span>
          <span>I paint, design, code, dream and innovate.</span>
        </div>
      </div>
    </footer>
  );
}
