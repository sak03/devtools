import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="sm:max-w-md sm:shrink-0">
          © {new Date().getFullYear()} {SITE_NAME}. All processing stays in your
          browser.
        </p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:justify-center">
          <Link href="/terms/" className="hover:text-foreground">
            Terms of Use
          </Link>
          <span aria-hidden className="text-border-strong">
            ·
          </span>
          <Link href="/privacy/" className="hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
        <p className="sm:text-right">
          Maintained by{" "}
          <a
            href="https://sartajalam.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Sartaj Alam
          </a>
        </p>
      </div>
    </footer>
  );
}
