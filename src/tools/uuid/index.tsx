"use client";

import { useCallback, useState } from "react";
import { v4 as uuidv4, v7 as uuidv7 } from "uuid";
import { CodePane } from "@/components/tools/code-pane";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

export default function UuidTool() {
  const [version, setVersion] = useState<"v4" | "v7">("v4");
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState(() =>
    Array.from({ length: 5 }, () => uuidv4()).join("\n"),
  );

  const generate = useCallback(() => {
    const n = Math.max(1, Math.min(count, 100));
    const fn = version === "v4" ? uuidv4 : uuidv7;
    setOutput(Array.from({ length: n }, () => fn()).join("\n"));
  }, [count, version]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={version === "v4" ? "primary" : "secondary"}
          onClick={() => setVersion("v4")}
        >
          UUID v4
        </Button>
        <Button
          variant={version === "v7" ? "primary" : "secondary"}
          onClick={() => setVersion("v7")}
        >
          UUID v7
        </Button>
        <label className="text-sm text-muted" htmlFor="uuid-count">
          Count
        </label>
        <input
          id="uuid-count"
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Number(e.target.value) || 1)}
          className="h-9 w-20 rounded-md border border-border bg-surface px-2 text-sm"
        />
        <Button variant="primary" onClick={generate}>
          Generate
        </Button>
        <CopyButton value={output} />
      </div>
      <CodePane label="UUIDs" value={output} readOnly className="min-h-[14rem]" />
    </div>
  );
}
