"use client";

import { useCallback, useState } from "react";
import SparkMD5 from "spark-md5";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const SAMPLE = "DevTools";

async function sha(algo: "SHA-1" | "SHA-256" | "SHA-512", text: string) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashTool() {
  const [input, setInput] = useState(SAMPLE);
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const run = useCallback(async () => {
    try {
      setError("");
      const [sha1, sha256, sha512] = await Promise.all([
        sha("SHA-1", input),
        sha("SHA-256", input),
        sha("SHA-512", input),
      ]);
      setHashes({
        MD5: SparkMD5.hash(input),
        "SHA-1": sha1,
        "SHA-256": sha256,
        "SHA-512": sha512,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hash failed");
      setHashes({});
    }
  }, [input]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={run}>
          Hash
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setInput(SAMPLE);
            setHashes({});
            setError("");
          }}
        >
          Sample
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setInput("");
            setHashes({});
            setError("");
          }}
        >
          Clear
        </Button>
      </div>
      <ErrorBanner message={error} />
      <CodePane
        label="Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[8rem]"
      />
      <div className="space-y-2">
        {Object.keys(hashes).length === 0 ? (
          <p className="text-sm text-muted">Click Hash to generate digests.</p>
        ) : (
          Object.entries(hashes).map(([name, value]) => (
            <div
              key={name}
              className="rounded-lg border border-border bg-surface px-3 py-3"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {name}
                </p>
                <CopyButton value={value} />
              </div>
              <p className="break-all font-mono text-xs text-foreground sm:text-sm">
                {value}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
