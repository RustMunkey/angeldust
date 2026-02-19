"use client";

import Marquee from "react-fast-marquee";

const brands = [
  "Charlotte Tilbury",
  "NARS",
  "Fenty Beauty",
  "Rare Beauty",
  "MAC",
  "Urban Decay",
  "Benefit",
  "Too Faced",
  "Morphe",
  "NYX",
  "Dior Beauty",
  "Chanel Beauty",
  "YSL Beauty",
  "Lancôme",
  "Giorgio Armani Beauty",
  "Tom Ford Beauty",
  "Bobbi Brown",
  "Laura Mercier",
  "Pat McGrath",
  "Hourglass",
  "ILIA",
  "Tower 28",
  "Milk Makeup",
  "e.l.f. Cosmetics",
];

export function BrandMarquee() {
  return (
    <div className="py-12 border-y border-white/10 overflow-hidden">
      <Marquee speed={40} gradient={false} pauseOnHover>
        {brands.map((brand) => (
          <span
            key={brand}
            className="text-white/50 hover:text-white transition-colors cursor-pointer font-serif text-2xl mx-10"
          >
            {brand}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
