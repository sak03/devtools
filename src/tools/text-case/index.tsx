"use client";

import { useMemo, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { convertCase, type CaseStyle } from "@/lib/tools/transforms";

const SAMPLE = "hello world from DevTools";

const STYLES: { id: CaseStyle; label: string }[] = [
  { id: "camel", label: "camelCase" },
  { id: "pascal", label: "PascalCase" },
  { id: "snake", label: "snake_case" },
  { id: "kebab", label: "kebab-case" },
  { id: "constant", label: "CONSTANT_CASE" },
  { id: "title", label: "Title Case" },
  { id: "lower", label: "lower case" },
  { id: "upper", label: "UPPER CASE" },
];

export default function TextCaseTool() {
  const [input, setInput] = useState(SAMPLE);
  const [style, setStyle] = useState<CaseStyle>("camel");
  const output = useMemo(() => convertCase(input, style), [input, style]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {STYLES.map((s) => (
          <Button
            key={s.id}
            variant={style === s.id ? "primary" : "secondary"}
            size="sm"
            onClick={() => setStyle(s.id)}
          >
            {s.label}
          </Button>
        ))}
        <Button variant="ghost" onClick={() => setInput(SAMPLE)}>
          Sample
        </Button>
        <Button variant="ghost" onClick={() => setInput("")}>
          Clear
        </Button>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <CodePane
          label="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <CodePane
          label="Output"
          value={output}
          readOnly
          actions={<CopyButton value={output} />}
        />
      </div>
    </div>
  );
}
