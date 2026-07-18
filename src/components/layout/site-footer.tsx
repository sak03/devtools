import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. All processing stays in your
          browser.
        </p>
        <p>
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
