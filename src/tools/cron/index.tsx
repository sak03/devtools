"use client";

import { useMemo, useState } from "react";
import cronstrue from "cronstrue";
import { CronExpressionParser } from "cron-parser";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const SAMPLE = "0 9 * * 1-5";

export default function CronTool() {
  const [expr, setExpr] = useState(SAMPLE);

  const result = useMemo(() => {
    try {
      const human = cronstrue.toString(expr, { throwExceptionOnParseError: true });
      const interval = CronExpressionParser.parse(expr);
      const next: string[] = [];
      for (let i = 0; i < 5; i++) {
        next.push(interval.next().toDate().toString());
      }
      return { human, next, error: "" };
    } catch (e) {
      return {
        human: "",
        next: [] as string[],
        error: e instanceof Error ? e.message : "Invalid cron expression",
      };
    }
  }, [expr]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          aria-label="Cron expression"
          className="h-10 min-w-[16rem] flex-1 rounded-md border border-border bg-editor px-3 font-mono text-sm"
          placeholder="* * * * *"
        />
        <Button variant="ghost" onClick={() => setExpr(SAMPLE)}>
          Sample
        </Button>
        <CopyButton value={expr} label="Copy expression" />
      </div>
      <ErrorBanner message={result.error} />
      {result.human ? (
        <div className="rounded-lg border border-border bg-surface px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-muted">Meaning</p>
          <p className="mt-1 text-lg font-medium text-foreground">
            {result.human}
          </p>
        </div>
      ) : null}
      {result.next.length > 0 ? (
        <div className="rounded-lg border border-border bg-surface px-4 py-4">
          <p className="mb-2 text-xs uppercase tracking-wide text-muted">
            Next runs
          </p>
          <ul className="space-y-1 font-mono text-sm text-foreground">
            {result.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
