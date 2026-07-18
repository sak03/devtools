import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { getToolsByCategory, tools } from "@/lib/tools/registry";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function HomePage() {
  const groups = getToolsByCategory();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -right-20 top-10 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="animate-slide-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {SITE_NAME}
            </p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Every everyday utility, one private workspace.
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted sm:text-lg">
              {SITE_TAGLINE}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#tools"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-transform hover:scale-[1.02]"
              >
                Browse {tools.length} tools
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <p className="text-sm text-muted">
                Press{" "}
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs">
                  ⌘K
                </kbd>{" "}
                to search
              </p>
            </div>
          </div>

          <div
            className="animate-fade-in relative hidden min-h-[20rem] overflow-hidden rounded-2xl border border-border bg-editor shadow-2xl shadow-black/20 lg:block"
            aria-hidden
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="ml-3 font-mono text-xs text-muted">
                json · format
              </span>
            </div>
            <pre className="overflow-hidden p-5 font-mono text-[12px] leading-6 text-muted">
              <code>
                <span className="text-accent">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-foreground">&quot;status&quot;</span>
                {": "}
                <span className="text-accent">&quot;ready&quot;</span>
                {",\n"}
                {"  "}
                <span className="text-foreground">&quot;tools&quot;</span>
                {": "}
                <span className="text-accent">{tools.length}</span>
                {",\n"}
                {"  "}
                <span className="text-foreground">&quot;privacy&quot;</span>
                {": "}
                <span className="text-accent">&quot;local-only&quot;</span>
                {"\n"}
                <span className="text-accent">{"}"}</span>
              </code>
            </pre>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-editor to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Instant",
              body: "No round-trips. Transforms run as you type.",
            },
            {
              icon: ShieldCheck,
              title: "Private",
              body: "Your paste never leaves this tab.",
            },
            {
              icon: Sparkles,
              title: "Keyboard-first",
              body: "⌘K search, clear shortcuts, dense IDE feel.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex gap-3 rounded-xl border border-border/60 bg-surface/40 px-4 py-4"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-sm font-semibold text-foreground">{title}</h2>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">
          All tools
        </h2>
        <div className="space-y-12">
          {groups.map((group) => (
            <div key={group.category} id={group.category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
                {group.label}
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}/`}
                        className="group flex h-full gap-3 rounded-xl border border-border bg-surface/60 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-hover"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-bg text-accent transition-colors group-hover:border-accent/30">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            {tool.name}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-muted">
                            {tool.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
