"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { ErrorBanner } from "@/components/tools/error-banner";
import { Button } from "@/components/ui/button";

type QrMode = "text" | "url" | "email" | "phone" | "sms" | "wifi";
type EccLevel = "L" | "M" | "Q" | "H";

const MODES: { id: QrMode; label: string }[] = [
  { id: "text", label: "Text" },
  { id: "url", label: "URL" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "sms", label: "SMS" },
  { id: "wifi", label: "Wi‑Fi" },
];

const SAMPLES: Record<QrMode, Record<string, string>> = {
  text: { text: "Hello from DevTools" },
  url: { url: "https://devtools.sartajalam.in" },
  email: {
    email: "hello@example.com",
    subject: "Hello",
    body: "Sent from a QR code",
  },
  phone: { phone: "+919876543210" },
  sms: { phone: "+919876543210", body: "Hi there" },
  wifi: { ssid: "MyNetwork", password: "secret-pass", encryption: "WPA" },
};

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function buildPayload(
  mode: QrMode,
  fields: Record<string, string>,
): string {
  switch (mode) {
    case "text":
      return fields.text ?? "";
    case "url":
      return normalizeUrl(fields.url ?? "");
    case "email": {
      const addr = (fields.email ?? "").trim();
      if (!addr) return "";
      const params = new URLSearchParams();
      if (fields.subject?.trim()) params.set("subject", fields.subject.trim());
      if (fields.body?.trim()) params.set("body", fields.body.trim());
      const q = params.toString();
      return q ? `mailto:${addr}?${q}` : `mailto:${addr}`;
    }
    case "phone": {
      const phone = (fields.phone ?? "").trim();
      return phone ? `tel:${phone.replace(/\s+/g, "")}` : "";
    }
    case "sms": {
      const phone = (fields.phone ?? "").trim().replace(/\s+/g, "");
      if (!phone) return "";
      const body = (fields.body ?? "").trim();
      return body
        ? `sms:${phone}?body=${encodeURIComponent(body)}`
        : `sms:${phone}`;
    }
    case "wifi": {
      const ssid = (fields.ssid ?? "").trim();
      if (!ssid) return "";
      const enc = fields.encryption === "nopass" ? "nopass" : fields.encryption || "WPA";
      const pass = fields.password ?? "";
      const esc = (v: string) =>
        v.replace(/([\\;,:"])/g, "\\$1");
      if (enc === "nopass") return `WIFI:T:nopass;S:${esc(ssid)};;`;
      return `WIFI:T:${enc};S:${esc(ssid)};P:${esc(pass)};;`;
    }
  }
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function QrTool() {
  const [mode, setMode] = useState<QrMode>("text");
  const [fields, setFields] = useState<Record<string, string>>(SAMPLES.text);
  const [ecc, setEcc] = useState<EccLevel>("M");
  const [size, setSize] = useState(512);
  const [dark, setDark] = useState("#0b0f14");
  const [light, setLight] = useState("#ffffff");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [debouncedPayload, setDebouncedPayload] = useState("");

  const payload = useMemo(() => buildPayload(mode, fields), [mode, fields]);
  const charCount = payload.length;
  const largePayload = charCount > 800;

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedPayload(payload), 150);
    return () => window.clearTimeout(t);
  }, [payload]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!debouncedPayload.trim()) {
          if (!cancelled) {
            setPreview("");
            setError("");
          }
          return;
        }
        const url = await QRCode.toDataURL(debouncedPayload, {
          errorCorrectionLevel: ecc,
          margin: 2,
          width: 320,
          color: { dark, light },
        });
        if (!cancelled) {
          setPreview(url);
          setError("");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "QR generation failed");
          setPreview("");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedPayload, ecc, dark, light]);

  const setField = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const switchMode = (next: QrMode) => {
    setMode(next);
    setFields(SAMPLES[next]);
  };

  const downloadPng = async () => {
    if (!payload.trim()) return;
    try {
      const dataUrl = await QRCode.toDataURL(payload, {
        errorCorrectionLevel: ecc,
        margin: 2,
        width: size,
        color: { dark, light },
      });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      downloadBlob(`qr-${mode}.png`, blob);
    } catch (e) {
      setError(e instanceof Error ? e.message : "PNG export failed");
    }
  };

  const downloadSvg = async () => {
    if (!payload.trim()) return;
    try {
      const svg = await QRCode.toString(payload, {
        type: "svg",
        errorCorrectionLevel: ecc,
        margin: 2,
        width: size,
        color: { dark, light },
      });
      downloadBlob(
        `qr-${mode}.svg`,
        new Blob([svg], { type: "image/svg+xml" }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "SVG export failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <Button
            key={m.id}
            size="sm"
            variant={mode === m.id ? "primary" : "secondary"}
            onClick={() => switchMode(m.id)}
          >
            {m.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {mode === "text" ? (
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
              Text
            </span>
            <textarea
              value={fields.text ?? ""}
              onChange={(e) => setField("text", e.target.value)}
              rows={4}
              className="w-full rounded-md border border-border bg-editor px-3 py-2 font-mono text-sm"
              placeholder="Any text — not just URLs"
            />
          </label>
        ) : null}

        {mode === "url" ? (
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
              URL
            </span>
            <input
              value={fields.url ?? ""}
              onChange={(e) => setField("url", e.target.value)}
              className="h-10 w-full rounded-md border border-border bg-editor px-3 text-sm"
              placeholder="example.com or https://…"
            />
          </label>
        ) : null}

        {mode === "email" ? (
          <>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
                Email
              </span>
              <input
                value={fields.email ?? ""}
                onChange={(e) => setField("email", e.target.value)}
                className="h-10 w-full rounded-md border border-border bg-editor px-3 text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
                Subject
              </span>
              <input
                value={fields.subject ?? ""}
                onChange={(e) => setField("subject", e.target.value)}
                className="h-10 w-full rounded-md border border-border bg-editor px-3 text-sm"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
                Body
              </span>
              <textarea
                value={fields.body ?? ""}
                onChange={(e) => setField("body", e.target.value)}
                rows={3}
                className="w-full rounded-md border border-border bg-editor px-3 py-2 text-sm"
              />
            </label>
          </>
        ) : null}

        {mode === "phone" ? (
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
              Phone
            </span>
            <input
              value={fields.phone ?? ""}
              onChange={(e) => setField("phone", e.target.value)}
              className="h-10 w-full rounded-md border border-border bg-editor px-3 text-sm"
              placeholder="+919876543210"
            />
          </label>
        ) : null}

        {mode === "sms" ? (
          <>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
                Phone
              </span>
              <input
                value={fields.phone ?? ""}
                onChange={(e) => setField("phone", e.target.value)}
                className="h-10 w-full rounded-md border border-border bg-editor px-3 text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
                Message
              </span>
              <input
                value={fields.body ?? ""}
                onChange={(e) => setField("body", e.target.value)}
                className="h-10 w-full rounded-md border border-border bg-editor px-3 text-sm"
              />
            </label>
          </>
        ) : null}

        {mode === "wifi" ? (
          <>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
                Network name (SSID)
              </span>
              <input
                value={fields.ssid ?? ""}
                onChange={(e) => setField("ssid", e.target.value)}
                className="h-10 w-full rounded-md border border-border bg-editor px-3 text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
                Encryption
              </span>
              <select
                value={fields.encryption ?? "WPA"}
                onChange={(e) => setField("encryption", e.target.value)}
                className="h-10 w-full rounded-md border border-border bg-editor px-3 text-sm"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </label>
            {fields.encryption !== "nopass" ? (
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
                  Password
                </span>
                <input
                  type="text"
                  value={fields.password ?? ""}
                  onChange={(e) => setField("password", e.target.value)}
                  className="h-10 w-full rounded-md border border-border bg-editor px-3 text-sm"
                />
              </label>
            ) : null}
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label>
          <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
            Error correction
          </span>
          <select
            value={ecc}
            onChange={(e) => setEcc(e.target.value as EccLevel)}
            className="h-9 rounded-md border border-border bg-surface px-2 text-sm"
          >
            <option value="L">L — ~7%</option>
            <option value="M">M — ~15% (default)</option>
            <option value="Q">Q — ~25%</option>
            <option value="H">H — ~30% (most reliable)</option>
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
            Download size
          </span>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="h-9 rounded-md border border-border bg-surface px-2 text-sm"
          >
            <option value={256}>256 px</option>
            <option value={512}>512 px</option>
            <option value={1024}>1024 px</option>
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
            Dark
          </span>
          <input
            type="color"
            value={dark}
            onChange={(e) => setDark(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
          />
        </label>
        <label>
          <span className="mb-1 block text-xs uppercase tracking-wide text-muted">
            Light
          </span>
          <input
            type="color"
            value={light}
            onChange={(e) => setLight(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
          />
        </label>
        <Button
          variant="ghost"
          onClick={() => {
            setFields(SAMPLES[mode]);
            setEcc("M");
            setDark("#0b0f14");
            setLight("#ffffff");
          }}
        >
          Sample
        </Button>
        <Button onClick={downloadPng} disabled={!preview}>
          Download PNG
        </Button>
        <Button onClick={downloadSvg} disabled={!payload.trim()}>
          Download SVG
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span>{charCount} characters in payload</span>
        {largePayload ? (
          <span className="text-danger">
            Large payloads can be hard to scan — prefer shorter text or higher
            ECC.
          </span>
        ) : null}
      </div>

      {payload.trim() ? (
        <p className="break-all rounded-md border border-border bg-surface px-3 py-2 font-mono text-[11px] text-muted">
          {payload}
        </p>
      ) : null}

      <ErrorBanner message={error} />

      <div className="flex justify-center rounded-xl border border-border bg-surface p-8">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Generated QR code"
            className="h-64 w-64"
          />
        ) : (
          <p className="max-w-sm text-center text-sm text-muted">
            Works with text, URLs, Wi‑Fi, email, phone, and SMS — not just
            domains. Enter content above to generate a QR code.
          </p>
        )}
      </div>
    </div>
  );
}
