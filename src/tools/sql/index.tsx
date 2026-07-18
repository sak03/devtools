"use client";

import { useCallback, useState } from "react";
import { format } from "sql-formatter";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const SAMPLE =
  "select u.id,u.name,count(o.id) as orders from users u left join orders o on o.user_id=u.id where u.active=true group by u.id,u.name order by orders desc";

type Dialect = "postgresql" | "mysql" | "sqlite";

export default function SqlTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState<Dialect>("postgresql");
  const [error, setError] = useState("");

  const run = useCallback(() => {
    try {
      setError("");
      setOutput(
        format(input, {
          language: dialect,
          tabWidth: 2,
          keywordCase: "upper",
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not format SQL");
      setOutput("");
    }
  }, [input, dialect]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs text-muted" htmlFor="sql-dialect">
          Dialect
        </label>
        <select
          id="sql-dialect"
          value={dialect}
          onChange={(e) => setDialect(e.target.value as Dialect)}
          className="h-9 rounded-md border border-border bg-surface px-2 text-sm text-foreground"
        >
          <option value="postgresql">PostgreSQL</option>
          <option value="mysql">MySQL</option>
          <option value="sqlite">SQLite</option>
        </select>
        <Button variant="primary" onClick={run}>
          Format
        </Button>
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
