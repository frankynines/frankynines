"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/design", label: "Design" },
  { href: "/art", label: "Art" },
  { href: "/supducks", label: "SupDucks" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-concrete/90 backdrop-blur border-b-2 border-ink">
      <div className="wrap flex items-center justify-between py-3">
        <Link href="/" className="display text-2xl leading-none" onClick={() => setOpen(false)}>
          Franky<span className="text-pink">9</span>s
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = path === l.href || path.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`display text-sm px-3 py-2 border-2 ${
                  active
                    ? "bg-ink text-volt border-ink"
                    : "border-transparent hover:border-ink hover:bg-poster"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/collect"
            aria-current={path.startsWith("/collect") ? "page" : undefined}
            className={`btn ml-3 !py-2 !px-3 !text-xs ${path.startsWith("/collect") ? "" : "btn--volt"}`}
          >
            Collect
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden slap"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="md:hidden border-t-2 border-ink bg-poster">
          <ul className="wrap py-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block py-3 text-lg border-b border-ink/15"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/collect" onClick={() => setOpen(false)} className="btn btn--volt my-3">
                Collect
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
