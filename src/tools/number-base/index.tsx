"use client";

import { useMemo, useState } from "react";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { convertBase } from "@/lib/tools/transforms";

export default function NumberBaseTool() {
  const [dec, setDec] = useState("255");

  const result = useMemo(() => {
    try {
      return {
        bin: convertBase(dec, 10, 2),
        oct: convertBase(dec, 10, 8),
        dec: convertBase(dec, 10, 10),
        hex: convertBase(dec, 10, 16),
        error: "",
      };
    } catch (e) {
      return {
        bin: "",
        oct: "",
        dec: "",
        hex: "",
        error: e instanceof Error ? e.message : "Invalid number",
      };
    }
  }, [dec]);

  const from = (value: string, fromBase: number) => {
    try {
      setDec(convertBase(value, fromBase, 10));
    } catch {
      /* keep previous */
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" onClick={() => setDec("255")}>
          Sample
        </Button>
        <Button variant="ghost" onClick={() => setDec("0")}>
          Clear
        </Button>
      </div>
      <ErrorBanner message={result.error} />
      <div className="grid gap-3 sm:grid-cols-2">
        {(
          [
            ["Binary", result.bin, 2],
            ["Octal", result.oct, 8],
            ["Decimal", result.dec || dec, 10],
            ["Hex", result.hex, 16],
          ] as const
        ).map(([label, value, base]) => (
          <label key={label} className="block rounded-lg border border-border bg-surface p-3">
            <span className="mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-muted">
              {label}
              <CopyButton value={value} />
            </span>
            <input
              value={base === 10 ? dec : value}
              onChange={(e) => {
                if (base === 10) setDec(e.target.value);
                else from(e.target.value, base);
              }}
              className="h-10 w-full rounded-md border border-border bg-editor px-3 font-mono text-sm"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
