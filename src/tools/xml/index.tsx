"use client";

import { useCallback, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { minifyXml, prettyXml } from "@/lib/tools/transforms";

const SAMPLE = `<?xml version="1.0"?><root><item id="1"><name>DevTools</name><active>true</active></item></root>`;

export default function XmlTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState(() => prettyXml(SAMPLE));
  const [error, setError] = useState("");

  const run = useCallback(
    (mode: "pretty" | "minify") => {
      try {
        setError("");
        if (!input.trim()) throw new Error("Enter XML to format");
        setOutput(mode === "pretty" ? prettyXml(input) : minifyXml(input));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Invalid XML");
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
            setOutput(prettyXml(SAMPLE));
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
