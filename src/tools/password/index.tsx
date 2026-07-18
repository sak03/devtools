"use client";

import { useCallback, useState } from "react";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { generatePassword } from "@/lib/tools/transforms";

export default function PasswordTool() {
  const [length, setLength] = useState(20);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const run = useCallback(() => {
    try {
      setError("");
      setPassword(
        generatePassword(Math.max(4, Math.min(length, 128)), {
          upper,
          lower,
          digits,
          symbols,
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
      setPassword("");
    }
  }, [length, upper, lower, digits, symbols]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-muted" htmlFor="pw-length">
          Length
        </label>
        <input
          id="pw-length"
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <span className="font-mono text-sm">{length}</span>
        <Button variant="primary" onClick={run}>
          Generate
        </Button>
        <CopyButton value={password} />
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        {(
          [
            ["Uppercase", upper, setUpper],
            ["Lowercase", lower, setLower],
            ["Digits", digits, setDigits],
            ["Symbols", symbols, setSymbols],
          ] as const
        ).map(([label, value, setter]) => (
          <label key={label} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setter(e.target.checked)}
            />
            {label}
          </label>
        ))}
      </div>
      <ErrorBanner message={error} />
      <div className="rounded-xl border border-border bg-editor px-4 py-6 text-center">
        <p className="break-all font-mono text-xl tracking-wide text-foreground sm:text-2xl">
          {password || "Click Generate"}
        </p>
      </div>
      <p className="text-xs text-muted">
        Passwords are generated with crypto.getRandomValues and never stored.
      </p>
    </div>
  );
}
