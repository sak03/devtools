"use client";

import { useCallback, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { decodeBase64, encodeBase64 } from "@/lib/tools/transforms";

const SAMPLE = "Hello, DevTools! 🚀";

export default function Base64Tool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState(() => encodeBase64(SAMPLE));
  const [error, setError] = useState("");

  const run = useCallback((mode: "encode" | "decode") => {
    try {
      setError("");
      setOutput(mode === "encode" ? encodeBase64(input) : decodeBase64(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid Base64");
      setOutput("");
    }
  }, [input]);

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
            setOutput(encodeBase64(SAMPLE));
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
          placeholder="Text or Base64…"
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
