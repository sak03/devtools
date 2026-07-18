"use client";

import Link from "next/link";
import { Search, Wrench, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { searchTools } from "@/lib/tools/registry";
import { cn } from "@/lib/cn";

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listId = useId();

  const results = useMemo(() => searchTools(query).slice(0, 12), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 10);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const go = useCallback(
    (slug: string) => {
      close();
      router.push(`/tools/${slug}/`);
    },
    [close, router],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
        aria-label="Search tools"
      >
        <Search className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">Search tools…</span>
        <kbd className="ml-1 hidden rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-muted md:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Search tools"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl animate-rise">
            <div className="flex items-center gap-2 border-b border-border px-3">
              <Search className="h-4 w-4 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((i) => Math.min(i + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter" && results[active]) {
                    e.preventDefault();
                    go(results[active].slug);
                  }
                }}
                placeholder="Search JSON, Base64, regex…"
                className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
                aria-controls={listId}
                aria-autocomplete="list"
                role="combobox"
                aria-expanded
              />
              <button
                type="button"
                onClick={close}
                className="rounded-md p-1 text-muted hover:bg-surface-hover hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul id={listId} role="listbox" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  No tools match “{query}”
                </li>
              ) : (
                results.map((tool, i) => {
                  const Icon = tool.icon;
                  return (
                    <li key={tool.slug} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        onClick={() => go(tool.slug)}
                        onMouseEnter={() => setActive(i)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          i === active
                            ? "bg-accent/10 text-foreground"
                            : "text-foreground hover:bg-surface-hover",
                        )}
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>
                          <span className="block text-sm font-medium">
                            {tool.name}
                          </span>
                          <span className="block text-xs text-muted">
                            {tool.description}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
            <div className="flex items-center gap-2 border-t border-border px-3 py-2 text-[11px] text-muted">
              <Wrench className="h-3 w-3" aria-hidden />
              {results.length} tools · ↑↓ navigate · ↵ open
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function ToolLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
