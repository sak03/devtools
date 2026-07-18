"use client";

import { useCallback, useState } from "react";
import { CodePane } from "@/components/tools/code-pane";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const MAX_BYTES = 2 * 1024 * 1024;

export default function ImageBase64Tool() {
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const readFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image larger than 2MB — consider compressing first");
      return;
    }
    setError("");
    setInfo(`${file.name} · ${(file.size / 1024).toFixed(1)} KB`);
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      setOutput(result);
      setPreview(result);
    };
    reader.onerror = () => setError("Failed to read file");
    reader.readAsDataURL(file);
  }, []);

  return (
    <div className="space-y-3">
      <div
        className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface/50 px-4 py-10 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) readFile(file);
        }}
      >
        <p className="text-sm text-foreground">Drop an image here</p>
        <p className="mt-1 text-xs text-muted">PNG, JPG, GIF, WebP · max 2MB</p>
        <label className="mt-4 inline-flex cursor-pointer items-center rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-fg">
          Choose file
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) readFile(file);
            }}
          />
        </label>
      </div>
      <ErrorBanner message={error} />
      {info ? <p className="text-xs text-muted">{info}</p> : null}
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Selected preview"
          className="max-h-48 rounded-lg border border-border"
        />
      ) : null}
      <div className="flex gap-2">
        <CopyButton value={output} />
        <Button
          variant="ghost"
          onClick={() => {
            setOutput("");
            setPreview("");
            setInfo("");
            setError("");
          }}
        >
          Clear
        </Button>
      </div>
      <CodePane
        label="Data URI"
        value={output}
        readOnly
        className="min-h-[10rem]"
      />
    </div>
  );
}
