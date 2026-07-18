import Link from "next/link";
import type { ReactNode } from "react";
import type { ToolMeta } from "@/lib/tools/registry";
import { CATEGORY_LABELS } from "@/lib/tools/types";
import { getRelatedTools } from "@/lib/tools/registry";

type ToolShellProps = {
  tool: ToolMeta;
  children: ReactNode;
  toolbar?: ReactNode;
};

export function ToolShell({ tool, children, toolbar }: ToolShellProps) {
  const related = getRelatedTools(tool);
  const Icon = tool.icon;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/#${tool.category}`} className="hover:text-foreground">
              {CATEGORY_LABELS[tool.category]}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{tool.name}</li>
        </ol>
      </nav>

      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-accent">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {tool.name}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted sm:text-base">
              {tool.description}
            </p>
          </div>
        </div>
        {toolbar ? <div className="flex flex-wrap gap-2">{toolbar}</div> : null}
      </header>

      <p className="mb-4 text-xs text-muted">
        Processed locally in your browser — nothing is uploaded.
      </p>

      <div className="space-y-4">{children}</div>

      <section className="mt-10 space-y-4 border-t border-border pt-8">
        <h2 className="text-lg font-semibold text-foreground">
          About this tool
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          {tool.seoIntro}
        </p>
        {tool.seoFaq.length > 0 ? (
          <div>
            <h3 className="mb-3 text-base font-semibold text-foreground">
              Frequently asked questions
            </h3>
            <dl className="space-y-4">
              {tool.seoFaq.map((item) => (
                <div key={item.question}>
                  <dt className="text-sm font-medium text-foreground">
                    {item.question}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </section>

      {related.length > 0 ? (
        <aside className="mt-10 border-t border-border pt-6">
          <h2 className="mb-3 text-sm font-medium text-foreground">
            Related tools
          </h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/tools/${r.slug}/`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent/40 hover:bg-surface-hover"
                >
                  <r.icon className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </div>
  );
}
