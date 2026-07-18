"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";

export default function QrTool() {
  const [text, setText] = useState("https://example.com");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!text.trim()) {
          setDataUrl("");
          setError("");
          return;
        }
        const url = await QRCode.toDataURL(text, {
          margin: 2,
          width: 320,
          color: { dark: "#0b0f14", light: "#ffffff" },
        });
        if (!cancelled) {
          setDataUrl(url);
          setError("");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "QR generation failed");
          setDataUrl("");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="QR content"
          className="h-10 min-w-[16rem] flex-1 rounded-md border border-border bg-editor px-3 text-sm"
          placeholder="Text or URL"
        />
        <Button variant="ghost" onClick={() => setText("https://example.com")}>
          Sample
        </Button>
        {dataUrl ? (
          <a
            href={dataUrl}
            download="qrcode.png"
            className="inline-flex h-9 items-center rounded-md border border-border bg-surface px-3 text-sm font-medium hover:bg-surface-hover"
          >
            Download PNG
          </a>
        ) : null}
      </div>
      <ErrorBanner message={error} />
      <div className="flex justify-center rounded-xl border border-border bg-surface p-8">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt="Generated QR code" className="h-64 w-64" />
        ) : (
          <p className="text-sm text-muted">Enter text to generate a QR code</p>
        )}
      </div>
    </div>
  );
}
