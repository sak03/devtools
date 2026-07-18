"use client";

import { lazy, Suspense } from "react";

const Base64Tool = lazy(() => import("@/tools/base64"));
const UrlEncodeTool = lazy(() => import("@/tools/url-encode"));
const HtmlEntitiesTool = lazy(() => import("@/tools/html-entities"));
const JwtDecodeTool = lazy(() => import("@/tools/jwt-decode"));
const JsonTool = lazy(() => import("@/tools/json"));
const YamlJsonTool = lazy(() => import("@/tools/yaml-json"));
const XmlTool = lazy(() => import("@/tools/xml"));
const SqlTool = lazy(() => import("@/tools/sql"));
const CssTool = lazy(() => import("@/tools/css"));
const HtmlTool = lazy(() => import("@/tools/html"));
const MarkdownTool = lazy(() => import("@/tools/markdown"));
const TextCaseTool = lazy(() => import("@/tools/text-case"));
const DiffTool = lazy(() => import("@/tools/diff"));
const LoremTool = lazy(() => import("@/tools/lorem"));
const CounterTool = lazy(() => import("@/tools/counter"));
const RegexTool = lazy(() => import("@/tools/regex"));
const TimestampTool = lazy(() => import("@/tools/timestamp"));
const CronTool = lazy(() => import("@/tools/cron"));
const UuidTool = lazy(() => import("@/tools/uuid"));
const HashTool = lazy(() => import("@/tools/hash"));
const NumberBaseTool = lazy(() => import("@/tools/number-base"));
const ColorTool = lazy(() => import("@/tools/color"));
const QrTool = lazy(() => import("@/tools/qr"));
const ImageBase64Tool = lazy(() => import("@/tools/image-base64"));
const PasswordTool = lazy(() => import("@/tools/password"));

function ToolFallback() {
  return (
    <div
      className="flex min-h-[14rem] items-center justify-center rounded-lg border border-border bg-editor text-sm text-muted"
      aria-busy
    >
      Loading tool…
    </div>
  );
}

function wrap(node: React.ReactNode) {
  return <Suspense fallback={<ToolFallback />}>{node}</Suspense>;
}

export function ToolClient({ slug }: { slug: string }) {
  switch (slug) {
    case "base64":
      return wrap(<Base64Tool />);
    case "url-encode":
      return wrap(<UrlEncodeTool />);
    case "html-entities":
      return wrap(<HtmlEntitiesTool />);
    case "jwt-decode":
      return wrap(<JwtDecodeTool />);
    case "json":
      return wrap(<JsonTool />);
    case "yaml-json":
      return wrap(<YamlJsonTool />);
    case "xml":
      return wrap(<XmlTool />);
    case "sql":
      return wrap(<SqlTool />);
    case "css":
      return wrap(<CssTool />);
    case "html":
      return wrap(<HtmlTool />);
    case "markdown":
      return wrap(<MarkdownTool />);
    case "text-case":
      return wrap(<TextCaseTool />);
    case "diff":
      return wrap(<DiffTool />);
    case "lorem":
      return wrap(<LoremTool />);
    case "counter":
      return wrap(<CounterTool />);
    case "regex":
      return wrap(<RegexTool />);
    case "timestamp":
      return wrap(<TimestampTool />);
    case "cron":
      return wrap(<CronTool />);
    case "uuid":
      return wrap(<UuidTool />);
    case "hash":
      return wrap(<HashTool />);
    case "number-base":
      return wrap(<NumberBaseTool />);
    case "color":
      return wrap(<ColorTool />);
    case "qr":
      return wrap(<QrTool />);
    case "image-base64":
      return wrap(<ImageBase64Tool />);
    case "password":
      return wrap(<PasswordTool />);
    default:
      return (
        <p role="alert" className="text-sm text-danger">
          Tool not found
        </p>
      );
  }
}
