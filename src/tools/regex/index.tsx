"use client";

import { useMemo, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog.
Contact us at hello@devtools.local or visit https://example.com.`;
const SAMPLE_PATTERN = String.raw`\b\w+@[\w.-]+\.\w+\b`;

export default function RegexTool() {
  const [pattern, setPattern] = useState(SAMPLE_PATTERN);
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(SAMPLE_TEXT);
  const [replace, setReplace] = useState("[email]");

  const result = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const matches = [...text.matchAll(re)].map((m, i) => ({
        index: i,
        match: m[0],
        groups: m.slice(1),
        start: m.index ?? 0,
      }));
      const replaced = text.replace(re, replace);
      return { matches, replaced, error: "" };
    } catch (e) {
      return {
        matches: [] as { index: number; match: string; groups: string[]; start: number }[],
        replaced: "",
        error: e instanceof Error ? e.message : "Invalid regex",
      };
    }
  }, [pattern, flags, text, replace]);

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          aria-label="Regular expression"
          placeholder="Pattern"
          className="h-10 rounded-md border border-border bg-editor px-3 font-mono text-sm"
        />
        <input
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          aria-label="Flags"
          placeholder="Flags"
          className="h-10 w-full rounded-md border border-border bg-editor px-3 font-mono text-sm sm:w-24"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs text-muted" htmlFor="regex-replace">
          Replace with
        </label>
        <input
          id="regex-replace"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          className="h-9 min-w-[12rem] flex-1 rounded-md border border-border bg-surface px-2 font-mono text-sm"
        />
        <Button
          variant="ghost"
          onClick={() => {
            setPattern(SAMPLE_PATTERN);
            setFlags("g");
            setText(SAMPLE_TEXT);
            setReplace("[email]");
          }}
        >
          Sample
        </Button>
      </div>
      <ErrorBanner message={result.error} />
      <CodePane
        label="Test string"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[10rem]"
      />
      <div className="rounded-lg border border-border bg-surface px-3 py-3 text-sm">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
          Matches ({result.matches.length})
        </p>
        {result.matches.length === 0 ? (
          <p className="text-muted">No matches</p>
        ) : (
          <ul className="max-h-40 space-y-1 overflow-auto font-mono text-xs">
            {result.matches.map((m) => (
              <li key={`${m.start}-${m.index}`}>
                [{m.start}] {m.match}
                {m.groups.length > 0 ? ` · groups: ${m.groups.join(", ")}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
      <CodePane
        label="Replace preview"
        value={result.replaced}
        readOnly
        actions={<CopyButton value={result.replaced} />}
        className="min-h-[8rem]"
      />
    </div>
  );
}
