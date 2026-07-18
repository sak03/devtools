"use client";

import { useMemo, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { Button } from "@/components/ui/button";
import { countText } from "@/lib/tools/transforms";

const SAMPLE =
  "DevTools keeps every everyday utility in one private workspace.\nPaste freely — nothing is uploaded.";

export default function CounterTool() {
  const [input, setInput] = useState(SAMPLE);
  const stats = useMemo(() => countText(input), [input]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" onClick={() => setInput(SAMPLE)}>
          Sample
        </Button>
        <Button variant="ghost" onClick={() => setInput("")}>
          Clear
        </Button>
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {[
          ["Characters", stats.characters],
          ["No spaces", stats.charactersNoSpaces],
          ["Words", stats.words],
          ["Lines", stats.lines],
          ["Bytes", stats.bytes],
        ].map(([label, value]) => (
          <li
            key={label as string}
            className="rounded-lg border border-border bg-surface px-3 py-3 text-center"
          >
            <p className="text-xs uppercase tracking-wide text-muted">
              {label}
            </p>
            <p className="mt-1 font-mono text-xl font-semibold text-foreground">
              {value}
            </p>
          </li>
        ))}
      </ul>
      <CodePane
        label="Text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[16rem]"
      />
    </div>
  );
}
