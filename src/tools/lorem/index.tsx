"use client";

import { useMemo, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { generateLorem } from "@/lib/tools/transforms";

export default function LoremTool() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<"words" | "sentences" | "paragraphs">(
    "paragraphs",
  );
  const [seed, setSeed] = useState(0);
  const output = useMemo(
    () => generateLorem(count, unit),
    // seed forces regenerate with same settings
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, unit, seed],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-muted" htmlFor="lorem-count">
          Count
        </label>
        <input
          id="lorem-count"
          type="number"
          min={1}
          max={200}
          value={count}
          onChange={(e) => setCount(Number(e.target.value) || 1)}
          className="h-9 w-20 rounded-md border border-border bg-surface px-2 text-sm"
        />
        <select
          value={unit}
          onChange={(e) =>
            setUnit(e.target.value as "words" | "sentences" | "paragraphs")
          }
          className="h-9 rounded-md border border-border bg-surface px-2 text-sm"
        >
          <option value="words">Words</option>
          <option value="sentences">Sentences</option>
          <option value="paragraphs">Paragraphs</option>
        </select>
        <Button variant="primary" onClick={() => setSeed((s) => s + 1)}>
          Generate
        </Button>
        <CopyButton value={output} />
      </div>
      <CodePane label="Output" value={output} readOnly className="min-h-[18rem]" />
    </div>
  );
}
