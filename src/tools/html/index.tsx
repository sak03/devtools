"use client";

import { useCallback, useState } from "react";
import { html as beautifyHtml } from "js-beautify";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const SAMPLE =
  "<!doctype html><html><head><title>DevTools</title></head><body><main><h1>Hello</h1><p>Private utilities.</p></main></body></html>";

function minifyHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

export default function HtmlTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = useCallback(
    (mode: "pretty" | "minify") => {
      try {
        setError("");
        setOutput(
          mode === "pretty"
            ? beautifyHtml(input, { indent_size: 2, wrap_line_length: 80 })
            : minifyHtml(input),
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed");
        setOutput("");
      }
    },
    [input],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => run("pretty")}>
          Beautify
        </Button>
        <Button onClick={() => run("minify")}>Minify</Button>
        <Button
          variant="ghost"
          onClick={() => {
            setInput(SAMPLE);
            setOutput("");
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
