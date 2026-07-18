"use client";

import { useCallback, useMemo, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldlRvb2xzIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function b64urlDecode(segment: string): string {
  const padded = segment + "=".repeat((4 - (segment.length % 4)) % 4);
  const b64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function decodeJwt(token: string) {
  const parts = token.trim().split(".");
  if (parts.length < 2) {
    throw new Error("JWT must have at least header and payload");
  }
  const header = JSON.stringify(JSON.parse(b64urlDecode(parts[0])), null, 2);
  const payload = JSON.stringify(JSON.parse(b64urlDecode(parts[1])), null, 2);
  const signature = parts[2] ?? "(none)";
  return { header, payload, signature };
}

export default function JwtDecodeTool() {
  const initial = useMemo(() => decodeJwt(SAMPLE), []);
  const [input, setInput] = useState(SAMPLE);
  const [header, setHeader] = useState(initial.header);
  const [payload, setPayload] = useState(initial.payload);
  const [signature, setSignature] = useState(initial.signature);
  const [error, setError] = useState("");

  const run = useCallback(() => {
    try {
      setError("");
      const result = decodeJwt(input);
      setHeader(result.header);
      setPayload(result.payload);
      setSignature(result.signature);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JWT");
      setHeader("");
      setPayload("");
      setSignature("");
    }
  }, [input]);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">
        Decodes header and payload only — signature is not verified.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={run}>
          Decode
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setInput(SAMPLE);
            setHeader(initial.header);
            setPayload(initial.payload);
            setSignature(initial.signature);
            setError("");
          }}
        >
          Sample
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setInput("");
            setHeader("");
            setPayload("");
            setSignature("");
            setError("");
          }}
        >
          Clear
        </Button>
      </div>
      <ErrorBanner message={error} />
      <CodePane
        label="JWT"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[8rem]"
      />
      <div className="grid gap-3 lg:grid-cols-2">
        <CodePane
          label="Header"
          value={header}
          readOnly
          actions={<CopyButton value={header} />}
          className="min-h-[10rem]"
        />
        <CodePane
          label="Payload"
          value={payload}
          readOnly
          actions={<CopyButton value={payload} />}
          className="min-h-[10rem]"
        />
      </div>
      <CodePane
        label="Signature"
        value={signature}
        readOnly
        className="min-h-[4rem]"
        actions={<CopyButton value={signature} />}
      />
    </div>
  );
}
