"use client";

import { useCallback, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { formatJson, minifyJson } from "@/lib/tools/transforms";

const SAMPLE = `{"name":"DevTools","tools":24,"private":true,"nested":{"ok":true}}`;

export default function JsonTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState(() => formatJson(SAMPLE));
  const [error, setError] = useState("");

  const run = useCallback(
    (mode: "pretty" | "minify") => {
      try {
        setError("");
        setOutput(mode === "pretty" ? formatJson(input) : minifyJson(input));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Invalid JSON");
        setOutput("");
      }
    },
    [input],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => run("pretty")}>
          Format
        </Button>
        <Button onClick={() => run("minify")}>Minify</Button>
        <Button
          variant="ghost"
          onClick={() => {
            setInput(SAMPLE);
            setOutput(formatJson(SAMPLE));
            setError("");
          }}
        >
          Sample
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
        >
          Clear
        </Button>
      </div>
      <ErrorBanner message={error} />
      <div className="grid gap-3 lg:grid-cols-2">
        <CodePane
          label="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              run("pretty");
            }
          }}
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
