"use client";

import { useState } from "react";

/**
 * Plain <img> with a graceful slot when the file isn't there yet, so the
 * site builds and looks intentional before every image is dropped in.
 */
export default function Figure({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/3]",
  tape = false,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  tape?: boolean;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <figure className={`${tape ? "tape " : ""}poster overflow-hidden ${aspect} ${className}`}>
      {missing ? (
        <div className="h-full w-full grid place-items-center bg-concrete-deep p-4 text-center">
          <span className="text-xs leading-relaxed opacity-70 break-all">
            drop image at
            <br />
            <code>public{src}</code>
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={() => setMissing(true)}
        />
      )}
    </figure>
  );
}
