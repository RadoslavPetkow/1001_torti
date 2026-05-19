"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export const fallbackCakeImage =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=84";

type SafeImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
};

export function SafeImage({ src, alt, className = "", fallbackSrc = fallbackCakeImage }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#ffe4e6,transparent_42%),linear-gradient(135deg,#fff8f1,#f7e7ce)] text-rose-900 ${className}`}
      >
        <div className="grid h-16 w-16 place-items-center rounded-3xl bg-white/70 shadow-inner">
          <Icon name="cake" className="h-8 w-8" />
        </div>
      </div>
    );
  }

  return (
    // Remote demo images intentionally use a guarded native image so broken URLs can be replaced at runtime.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
