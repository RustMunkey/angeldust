"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FavouriteIcon, Search01Icon, ShoppingBasket02Icon, UserIcon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { RegionFlags } from "@/components/region-flags";
import { useCart } from "@/components/cart-provider";
import { MobileNav } from "@/components/mobile-nav";

export function Header() {
  const { setOpen } = useCart();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-8 inset-x-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center px-4 sm:px-20 md:px-32 h-18">

        {/* Search — left side, desktop only */}
        <div className="absolute left-10 sm:left-20 md:left-32 hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-52">
          <HugeiconsIcon icon={Search01Icon} size={14} className="text-white/40 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
          />
        </div>

        {/* Hamburger — mobile only */}
        <HugeiconsIcon icon={Menu01Icon} size={22} className="absolute left-4 md:hidden cursor-pointer text-foreground" onClick={() => setMobileNavOpen(true)} />

        <a href="/" className="font-serif text-2xl md:text-3xl tracking-wide">ANGELDUST</a>

        <div className="absolute right-4 sm:right-20 md:right-32 flex items-center gap-3 md:gap-4">
          {/* Favourites icon — mobile only */}
          <HugeiconsIcon icon={FavouriteIcon} size={20} className="md:hidden cursor-pointer text-foreground" />
          <div className="hidden md:block"><RegionFlags /></div>
          <HugeiconsIcon icon={FavouriteIcon} size={20} className="hidden md:block cursor-pointer text-foreground" />
          <HugeiconsIcon icon={UserIcon} size={20} className="hidden md:block cursor-pointer text-foreground" />
          <HugeiconsIcon icon={ShoppingBasket02Icon} size={20} className="cursor-pointer text-foreground" onClick={() => setOpen(true)} />
        </div>

      </div>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </header>
  );
}
