import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";
import { CommandSearch } from "@/components/layout/command-search";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight text-foreground"
        >
          <BrandMark />
          <span className="text-base">{SITE_NAME}</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <CommandSearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
