"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";

export default function TimestampTool() {
  const [mode, setMode] = useState<"s" | "ms">("ms");
  const [timestamp, setTimestamp] = useState(() => String(Date.now()));
  const [iso, setIso] = useState(() => new Date().toISOString());

  const parsed = useMemo(() => {
    try {
      const n = Number(timestamp);
      if (!Number.isFinite(n)) throw new Error("Timestamp must be a number");
      const ms = mode === "s" ? n * 1000 : n;
      const date = new Date(ms);
      if (Number.isNaN(date.getTime())) throw new Error("Invalid timestamp");
      return {
        error: "",
        iso: date.toISOString(),
        local: date.toLocaleString(undefined, {
          dateStyle: "full",
          timeStyle: "long",
        }),
        utc: date.toUTCString(),
        relative: relativeTime(date.getTime()),
      };
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "Invalid",
        iso: "",
        local: "",
        utc: "",
        relative: "",
      };
    }
  }, [timestamp, mode]);

  const fromIso = () => {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) throw new Error("Invalid date string");
      setTimestamp(
        String(mode === "s" ? Math.floor(d.getTime() / 1000) : d.getTime()),
      );
    } catch {
      /* shown via empty parse if timestamp invalid */
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={mode === "ms" ? "primary" : "secondary"}
          onClick={() => setMode("ms")}
        >
          Milliseconds
        </Button>
        <Button
          variant={mode === "s" ? "primary" : "secondary"}
          onClick={() => setMode("s")}
        >
          Seconds
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            const t = Date.now();
            setTimestamp(String(mode === "s" ? Math.floor(t / 1000) : t));
            setIso(new Date(t).toISOString());
          }}
        >
          Now
        </Button>
      </div>
      <ErrorBanner message={parsed.error} />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-muted">
            Unix timestamp
          </label>
          <input
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-editor px-3 font-mono text-sm"
          />
          {!parsed.error ? <CopyButton value={timestamp} /> : null}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-muted">
            ISO / date string
          </label>
          <input
            value={iso}
            onChange={(e) => setIso(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-editor px-3 font-mono text-sm"
          />
          <Button size="sm" onClick={fromIso}>
            Convert to timestamp
          </Button>
        </div>
      </div>
      {!parsed.error ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            ["ISO", parsed.iso],
            ["Local", parsed.local],
            ["UTC", parsed.utc],
            ["Relative", parsed.relative],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-surface px-3 py-3"
            >
              <div className="mb-1 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-muted">
                  {label}
                </p>
                <CopyButton value={value} />
              </div>
              <p className="font-mono text-sm text-foreground">{value}</p>
            </div>
          ))}
        </div>
      ) : (
        <CodePane label="Result" value="" readOnly className="min-h-[6rem]" />
      )}
    </div>
  );
}

function relativeTime(ms: number): string {
  const diff = ms - Date.now();
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 1000 * 60 * 60 * 24 * 365],
    ["month", 1000 * 60 * 60 * 24 * 30],
    ["day", 1000 * 60 * 60 * 24],
    ["hour", 1000 * 60 * 60],
    ["minute", 1000 * 60],
    ["second", 1000],
  ];
  for (const [unit, size] of units) {
    if (abs >= size || unit === "second") {
      return rtf.format(Math.round(diff / size), unit);
    }
  }
  return "now";
}
