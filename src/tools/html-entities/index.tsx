"use client";

import { useCallback, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import {
  decodeHtmlEntities,
  encodeHtmlEntities,
} from "@/lib/tools/transforms";

const SAMPLE = `<script>alert("xss")</script> & more`;

export default function HtmlEntitiesTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState(() => encodeHtmlEntities(SAMPLE));
  const [error, setError] = useState("");

  const run = useCallback(
    (mode: "encode" | "decode") => {
      try {
        setError("");
        setOutput(
          mode === "encode"
            ? encodeHtmlEntities(input)
            : decodeHtmlEntities(input),
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
        <Button variant="primary" onClick={() => run("encode")}>
          Encode
        </Button>
        <Button onClick={() => run("decode")}>Decode</Button>
        <Button
          variant="ghost"
          onClick={() => {
            setInput(SAMPLE);
            setOutput(encodeHtmlEntities(SAMPLE));
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
