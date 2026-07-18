import {
  Binary,
  CalendarClock,
  CaseSensitive,
  Clock,
  Code2,
  Diff,
  FileCode2,
  FileJson,
  FileType,
  Fingerprint,
  Hash,
  Image,
  KeyRound,
  Link2,
  Palette,
  QrCode,
  Regex,
  ScrollText,
  Shield,
  Type,
  WholeWord,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ToolCategory } from "@/lib/tools/types";
import { CATEGORY_LABELS } from "@/lib/tools/types";

export type ToolMeta = {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  category: ToolCategory;
  icon: LucideIcon;
  relatedSlugs: string[];
};

export const tools: ToolMeta[] = [
  {
    slug: "base64",
    name: "Base64 Encode / Decode",
    description:
      "Encode and decode Base64 strings with UTF-8 support. Runs entirely in your browser.",
    keywords: ["base64", "encode", "decode", "utf-8", "binary"],
    category: "encode",
    icon: Binary,
    relatedSlugs: ["url-encode", "html-entities", "image-base64"],
  },
  {
    slug: "url-encode",
    name: "URL Encode / Decode",
    description:
      "Percent-encode and decode URLs and query strings with encodeURIComponent semantics.",
    keywords: ["url", "encode", "decode", "percent", "query string"],
    category: "encode",
    icon: Link2,
    relatedSlugs: ["base64", "html-entities"],
  },
  {
    slug: "html-entities",
    name: "HTML Entity Encode / Decode",
    description:
      "Convert special characters to HTML entities and back. Supports named and numeric entities.",
    keywords: ["html", "entities", "escape", "unescape", "xss"],
    category: "encode",
    icon: Code2,
    relatedSlugs: ["url-encode", "html"],
  },
  {
    slug: "jwt-decode",
    name: "JWT Decoder",
    description:
      "Decode JWT header and payload for inspection. Does not verify signatures.",
    keywords: ["jwt", "json web token", "decode", "header", "payload"],
    category: "encode",
    icon: Shield,
    relatedSlugs: ["json", "base64", "hash"],
  },
  {
    slug: "json",
    name: "JSON Formatter & Validator",
    description:
      "Pretty-print, minify, and validate JSON with clear error messages.",
    keywords: ["json", "formatter", "validator", "pretty print", "minify"],
    category: "format",
    icon: FileJson,
    relatedSlugs: ["yaml-json", "jwt-decode", "xml"],
  },
  {
    slug: "yaml-json",
    name: "YAML ↔ JSON Converter",
    description:
      "Convert between YAML and JSON bidirectionally with validation.",
    keywords: ["yaml", "json", "converter", "yml", "config"],
    category: "format",
    icon: FileCode2,
    relatedSlugs: ["json", "xml"],
  },
  {
    slug: "xml",
    name: "XML Formatter",
    description: "Pretty-print and minify XML documents in your browser.",
    keywords: ["xml", "formatter", "pretty print", "minify"],
    category: "format",
    icon: FileType,
    relatedSlugs: ["json", "html", "yaml-json"],
  },
  {
    slug: "sql",
    name: "SQL Formatter",
    description:
      "Beautify SQL queries with dialect support for PostgreSQL, MySQL, and SQLite.",
    keywords: ["sql", "formatter", "postgres", "mysql", "sqlite"],
    category: "format",
    icon: ScrollText,
    relatedSlugs: ["json", "text-case"],
  },
  {
    slug: "css",
    name: "CSS Beautify / Minify",
    description: "Format or minify CSS stylesheets instantly.",
    keywords: ["css", "beautify", "minify", "stylesheet"],
    category: "format",
    icon: Palette,
    relatedSlugs: ["html", "json"],
  },
  {
    slug: "html",
    name: "HTML Beautify / Minify",
    description: "Pretty-print or compress HTML markup.",
    keywords: ["html", "beautify", "minify", "markup"],
    category: "format",
    icon: Code2,
    relatedSlugs: ["css", "html-entities", "markdown"],
  },
  {
    slug: "markdown",
    name: "Markdown Preview",
    description:
      "Write Markdown and preview sanitized HTML side by side.",
    keywords: ["markdown", "preview", "md", "commonmark"],
    category: "format",
    icon: FileCode2,
    relatedSlugs: ["html", "diff"],
  },
  {
    slug: "text-case",
    name: "Text Case Converter",
    description:
      "Convert text between camelCase, PascalCase, snake_case, kebab-case, and more.",
    keywords: ["case", "camelCase", "snake_case", "kebab", "pascal"],
    category: "text",
    icon: CaseSensitive,
    relatedSlugs: ["counter", "lorem"],
  },
  {
    slug: "diff",
    name: "Diff Checker",
    description:
      "Compare two texts with unified and side-by-side diff views.",
    keywords: ["diff", "compare", "text", "changes", "patch"],
    category: "text",
    icon: Diff,
    relatedSlugs: ["json", "markdown"],
  },
  {
    slug: "lorem",
    name: "Lorem Ipsum Generator",
    description:
      "Generate placeholder words, sentences, or paragraphs for mockups.",
    keywords: ["lorem", "ipsum", "placeholder", "dummy text"],
    category: "text",
    icon: Type,
    relatedSlugs: ["text-case", "counter", "password"],
  },
  {
    slug: "counter",
    name: "Word & Character Counter",
    description:
      "Count words, characters, lines, and bytes as you type.",
    keywords: ["word count", "character count", "bytes", "lines"],
    category: "text",
    icon: WholeWord,
    relatedSlugs: ["text-case", "lorem"],
  },
  {
    slug: "regex",
    name: "Regex Tester",
    description:
      "Test regular expressions with live matches and replace preview.",
    keywords: ["regex", "regexp", "regular expression", "match", "replace"],
    category: "text",
    icon: Regex,
    relatedSlugs: ["text-case", "diff"],
  },
  {
    slug: "timestamp",
    name: "Unix Timestamp Converter",
    description:
      "Convert between Unix timestamps and human-readable dates in any timezone.",
    keywords: ["unix", "timestamp", "epoch", "date", "timezone"],
    category: "time",
    icon: Clock,
    relatedSlugs: ["cron", "uuid"],
  },
  {
    slug: "cron",
    name: "Cron Expression Explainer",
    description:
      "Translate cron expressions into plain English and preview next runs.",
    keywords: ["cron", "schedule", "crontab", "expression"],
    category: "time",
    icon: CalendarClock,
    relatedSlugs: ["timestamp"],
  },
  {
    slug: "uuid",
    name: "UUID Generator",
    description: "Generate UUID v4 (and v7) identifiers in bulk.",
    keywords: ["uuid", "guid", "v4", "v7", "identifier"],
    category: "time",
    icon: Fingerprint,
    relatedSlugs: ["hash", "password"],
  },
  {
    slug: "hash",
    name: "Hash Generator",
    description:
      "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text.",
    keywords: ["hash", "md5", "sha256", "sha512", "checksum"],
    category: "time",
    icon: Hash,
    relatedSlugs: ["uuid", "password", "jwt-decode"],
  },
  {
    slug: "number-base",
    name: "Number Base Converter",
    description:
      "Convert numbers between binary, octal, decimal, and hexadecimal.",
    keywords: ["binary", "hex", "octal", "decimal", "radix"],
    category: "time",
    icon: Binary,
    relatedSlugs: ["hash", "color"],
  },
  {
    slug: "color",
    name: "Color Converter",
    description:
      "Convert colors between HEX, RGB, and HSL with a live preview.",
    keywords: ["color", "hex", "rgb", "hsl", "converter"],
    category: "visual",
    icon: Palette,
    relatedSlugs: ["css", "number-base"],
  },
  {
    slug: "qr",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs and download as PNG.",
    keywords: ["qr", "qrcode", "barcode", "generator"],
    category: "visual",
    icon: QrCode,
    relatedSlugs: ["url-encode", "image-base64"],
  },
  {
    slug: "image-base64",
    name: "Image → Base64",
    description:
      "Convert images to Base64 data URIs via drag and drop. Nothing is uploaded.",
    keywords: ["image", "base64", "data uri", "embed"],
    category: "visual",
    icon: Image,
    relatedSlugs: ["base64", "qr"],
  },
  {
    slug: "password",
    name: "Password Generator",
    description:
      "Generate strong random passwords with length and charset controls.",
    keywords: ["password", "generator", "secure", "random"],
    category: "visual",
    icon: KeyRound,
    relatedSlugs: ["uuid", "hash"],
  },
];

const bySlug = new Map(tools.map((t) => [t.slug, t]));

export function getTool(slug: string): ToolMeta | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return tools.map((t) => t.slug);
}

export function getToolsByCategory(): {
  category: ToolCategory;
  label: string;
  tools: ToolMeta[];
}[] {
  const order: ToolCategory[] = [
    "encode",
    "format",
    "text",
    "time",
    "visual",
  ];
  return order.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    tools: tools.filter((t) => t.category === category),
  }));
}

export function getRelatedTools(tool: ToolMeta): ToolMeta[] {
  return tool.relatedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((t): t is ToolMeta => Boolean(t));
}

export function searchTools(query: string): ToolMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q)) ||
      t.slug.includes(q),
  );
}
