import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-accent">
        404
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-muted">
        That tool or page doesn&apos;t exist. Head back to the catalog.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
      >
        All tools
      </Link>
    </div>
  );
}
