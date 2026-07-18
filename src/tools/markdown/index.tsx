"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { CodePane } from "@/components/tools/code-pane";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const SAMPLE = `# DevTools

Fast **private** utilities for developers.

- JSON formatter
- Base64 encode/decode
- Regex tester

\`\`\`ts
const ready = true;
\`\`\`
`;

export default function MarkdownTool() {
  const [input, setInput] = useState(SAMPLE);

  const html = useMemo(() => {
    const raw = marked.parse(input, { async: false }) as string;
    return DOMPurify.sanitize(raw);
  }, [input]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          onClick={() => setInput(SAMPLE)}
        >
          Sample
        </Button>
        <Button variant="ghost" onClick={() => setInput("")}>
          Clear
        </Button>
        <CopyButton value={html} label="Copy HTML" />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <CodePane
          label="Markdown"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[22rem]"
        />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-editor">
          <div className="border-b border-border px-3 py-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              Preview
            </span>
          </div>
          <div
            className="prose-devtools min-h-[22rem] flex-1 overflow-auto px-4 py-3 text-sm leading-relaxed text-foreground [&_a]:text-accent [&_code]:rounded [&_code]:bg-surface [&_code]:px-1 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_p]:mb-2 [&_pre]:my-3 [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:bg-surface [&_pre]:p-3"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
