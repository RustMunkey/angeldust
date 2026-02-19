"use client";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <span
      className="cursor-pointer text-foreground"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <HugeiconsIcon icon={Sun03Icon} className="block dark:hidden" size={20} />
      <HugeiconsIcon icon={Moon02Icon} className="hidden dark:block" size={20} />
    </span>
  );
}
