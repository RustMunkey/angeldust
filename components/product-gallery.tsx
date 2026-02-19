"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  thumbnail: string | null;
  name: string;
}

export function ProductGallery({ images, thumbnail, name }: Props) {
  const all = [thumbnail, ...images.filter((img) => img !== thumbnail)].filter(Boolean) as string[];
  const [active, setActive] = useState(0);

  if (all.length === 0) {
    return (
      <div className="lg:w-[55%] flex-none">
        <div className="aspect-[3/4] rounded-xl bg-stone-900" />
      </div>
    );
  }

  return (
    <div className="lg:w-[55%] flex-none">
      {/* Main image */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-900 mb-4">
        <Image
          key={all[active]}
          src={all[active]}
          alt={name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
      </div>

      {/* Thumbnail strip — only show if more than one image */}
      {all.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {all.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative flex-none w-16 aspect-square rounded-md overflow-hidden border transition-colors ${
                i === active ? "border-white/60" : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
