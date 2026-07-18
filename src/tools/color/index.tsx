"use client";

import { useMemo, useState } from "react";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { parseColor } from "@/lib/tools/transforms";

export default function ColorTool() {
  const [input, setInput] = useState("#0d7a78");

  const result = useMemo(() => {
    try {
      return { ...parseColor(input), error: "" };
    } catch (e) {
      return {
        hex: "",
        rgb: { r: 0, g: 0, b: 0 },
        hsl: { h: 0, s: 0, l: 0 },
        error: e instanceof Error ? e.message : "Invalid color",
      };
    }
  }, [input]);

  const rgbStr = `rgb(${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b})`;
  const hslStr = `hsl(${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%)`;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="color"
          value={result.hex || "#0d7a78"}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Color picker"
          className="h-10 w-14 cursor-pointer rounded border border-border bg-transparent"
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Color value"
          className="h-10 min-w-[12rem] flex-1 rounded-md border border-border bg-editor px-3 font-mono text-sm"
          placeholder="#0d7a78"
        />
        <Button variant="ghost" onClick={() => setInput("#0d7a78")}>
          Sample
        </Button>
      </div>
      <ErrorBanner message={result.error} />
      {!result.error ? (
        <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
          <div
            className="min-h-[8rem] rounded-xl border border-border"
            style={{ background: result.hex }}
            aria-hidden
          />
          <div className="space-y-2">
            {[
              ["HEX", result.hex],
              ["RGB", rgbStr],
              ["HSL", hslStr],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted">
                    {label}
                  </p>
                  <p className="font-mono text-sm">{value}</p>
                </div>
                <CopyButton value={value} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
