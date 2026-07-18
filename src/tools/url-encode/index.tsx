"use client";

import { useCallback, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { decodeUrl, encodeUrl } from "@/lib/tools/transforms";

const SAMPLE = "https://example.com/search?q=hello world&lang=en";

export default function UrlEncodeTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState(() => encodeUrl(SAMPLE));
  const [error, setError] = useState("");

  const run = useCallback(
    (mode: "encode" | "decode") => {
      try {
        setError("");
        setOutput(mode === "encode" ? encodeUrl(input) : decodeUrl(input));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Invalid URL encoding");
        setOutput("");
      }
    },
    [input],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => run("encode")}>
          Encode
        </Button>
        <Button onClick={() => run("decode")}>Decode</Button>
        <Button
          variant="ghost"
          onClick={() => {
            setInput(SAMPLE);
            setOutput(encodeUrl(SAMPLE));
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
