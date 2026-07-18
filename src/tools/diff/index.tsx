"use client";

import { useMemo, useState } from "react";
import * as DiffLib from "diff";
import { CodePane } from "@/components/tools/code-pane";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const LEFT = `function greet(name) {
  return "Hello, " + name;
}`;

const RIGHT = `function greet(name, excited) {
  const mark = excited ? "!" : ".";
  return \`Hello, \${name}\${mark}\`;
}`;

export default function DiffTool() {
  const [left, setLeft] = useState(LEFT);
  const [right, setRight] = useState(RIGHT);
  const [mode, setMode] = useState<"unified" | "words">("unified");

  const parts = useMemo(() => {
    if (mode === "words") return DiffLib.diffWords(left, right);
    return DiffLib.diffLines(left, right);
  }, [left, right, mode]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={mode === "unified" ? "primary" : "secondary"}
          onClick={() => setMode("unified")}
        >
          Line diff
        </Button>
        <Button
          variant={mode === "words" ? "primary" : "secondary"}
          onClick={() => setMode("words")}
        >
          Word diff
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setLeft(LEFT);
            setRight(RIGHT);
          }}
        >
          Sample
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setLeft("");
            setRight("");
          }}
        >
          Clear
        </Button>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <CodePane
          label="Original"
          value={left}
          onChange={(e) => setLeft(e.target.value)}
        />
        <CodePane
          label="Modified"
          value={right}
          onChange={(e) => setRight(e.target.value)}
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-editor">
        <div className="border-b border-border px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted">
          Diff
        </div>
        <pre className="max-h-[28rem] overflow-auto p-3 font-mono text-[13px] leading-relaxed">
          {parts.map((part, i) => (
            <span
              key={i}
              className={cn(
                part.added && "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
                part.removed && "bg-rose-500/20 text-rose-700 dark:text-rose-300",
              )}
            >
              {part.value}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}
