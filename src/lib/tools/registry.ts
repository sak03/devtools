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
import type { ToolCategory } from "@/lib/tools/types";
import { CATEGORY_LABELS } from "@/lib/tools/types";
import { toolSeoContent, type SeoFaq } from "@/lib/tools/seo-content";
import type { LucideIcon } from "lucide-react";

export type ToolMeta = {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  category: ToolCategory;
  icon: LucideIcon;
  relatedSlugs: string[];
  seoTitle: string;
  seoIntro: string;
  seoFaq: SeoFaq[];
};

type ToolBase = Omit<ToolMeta, "seoTitle" | "seoIntro" | "seoFaq">;

function withSeo(tool: ToolBase): ToolMeta {
  const seo = toolSeoContent[tool.slug];
  if (!seo) {
    throw new Error(`Missing SEO content for tool: ${tool.slug}`);
  }
  return { ...tool, ...seo };
}

const toolBases: ToolBase[] = [
  {
    slug: "base64",
    name: "Base64 Encode / Decode",
    description:
      "Free online Base64 encoder and decoder with UTF-8 support. Runs entirely in your browser—nothing is uploaded.",
    keywords: ["base64", "encode", "decode", "utf-8", "binary", "free"],
    category: "encode",
    icon: Binary,
    relatedSlugs: ["url-encode", "html-entities", "image-base64"],
  },
  {
    slug: "url-encode",
    name: "URL Encode / Decode",
    description:
      "Free URL encode and decode tool for query strings and percent-encoding. Private, instant, browser-only.",
    keywords: ["url", "encode", "decode", "percent", "query string", "free"],
    category: "encode",
    icon: Link2,
    relatedSlugs: ["base64", "html-entities"],
  },
  {
    slug: "html-entities",
    name: "HTML Entity Encode / Decode",
    description:
      "Convert special characters to HTML entities and back. Free, private, and runs in your browser.",
    keywords: ["html", "entities", "escape", "unescape", "xss", "free"],
    category: "encode",
    icon: Code2,
    relatedSlugs: ["url-encode", "html"],
  },
  {
    slug: "jwt-decode",
    name: "JWT Decoder",
    description:
      "Free online JWT decoder to inspect header and payload. Does not verify signatures. Fully client-side.",
    keywords: ["jwt", "json web token", "decode", "header", "payload", "free"],
    category: "encode",
    icon: Shield,
    relatedSlugs: ["json", "base64", "hash"],
  },
  {
    slug: "json",
    name: "JSON Formatter & Validator",
    description:
      "Free online JSON formatter, validator, and minifier with clear errors. Pretty-print API responses in your browser.",
    keywords: ["json", "formatter", "validator", "pretty print", "minify", "free"],
    category: "format",
    icon: FileJson,
    relatedSlugs: ["yaml-json", "jwt-decode", "xml"],
  },
  {
    slug: "yaml-json",
    name: "YAML ↔ JSON Converter",
    description:
      "Free YAML to JSON and JSON to YAML converter with validation. Ideal for configs—processed locally.",
    keywords: ["yaml", "json", "converter", "yml", "config", "free"],
    category: "format",
    icon: FileCode2,
    relatedSlugs: ["json", "xml"],
  },
  {
    slug: "xml",
    name: "XML Formatter",
    description:
      "Free online XML beautifier and minifier. Format documents privately in your browser.",
    keywords: ["xml", "formatter", "pretty print", "minify", "free"],
    category: "format",
    icon: FileType,
    relatedSlugs: ["json", "html", "yaml-json"],
  },
  {
    slug: "sql",
    name: "SQL Formatter",
    description:
      "Free SQL formatter with PostgreSQL, MySQL, and SQLite dialects. Beautify queries in your browser.",
    keywords: ["sql", "formatter", "postgres", "mysql", "sqlite", "free"],
    category: "format",
    icon: ScrollText,
    relatedSlugs: ["json", "text-case"],
  },
  {
    slug: "css",
    name: "CSS Beautify / Minify",
    description:
      "Free CSS beautify and minify tool. Format or compress stylesheets instantly in your browser.",
    keywords: ["css", "beautify", "minify", "stylesheet", "free"],
    category: "format",
    icon: Palette,
    relatedSlugs: ["html", "json"],
  },
  {
    slug: "html",
    name: "HTML Beautify / Minify",
    description:
      "Free HTML beautifier and minifier. Pretty-print or compress markup locally.",
    keywords: ["html", "beautify", "minify", "markup", "free"],
    category: "format",
    icon: Code2,
    relatedSlugs: ["css", "html-entities", "markdown"],
  },
  {
    slug: "markdown",
    name: "Markdown Preview",
    description:
      "Free online Markdown preview with sanitized HTML. Write and preview side by side—nothing uploaded.",
    keywords: ["markdown", "preview", "md", "commonmark", "free"],
    category: "format",
    icon: FileCode2,
    relatedSlugs: ["html", "diff"],
  },
  {
    slug: "text-case",
    name: "Text Case Converter",
    description:
      "Free case converter for camelCase, PascalCase, snake_case, kebab-case, and more.",
    keywords: ["case", "camelCase", "snake_case", "kebab", "pascal", "free"],
    category: "text",
    icon: CaseSensitive,
    relatedSlugs: ["counter", "lorem"],
  },
  {
    slug: "diff",
    name: "Diff Checker",
    description:
      "Free online text diff checker with line and word views. Compare snippets privately.",
    keywords: ["diff", "compare", "text", "changes", "patch", "free"],
    category: "text",
    icon: Diff,
    relatedSlugs: ["json", "markdown"],
  },
  {
    slug: "lorem",
    name: "Lorem Ipsum Generator",
    description:
      "Free lorem ipsum generator for words, sentences, or paragraphs. Instant placeholder copy.",
    keywords: ["lorem", "ipsum", "placeholder", "dummy text", "free"],
    category: "text",
    icon: Type,
    relatedSlugs: ["text-case", "counter", "password"],
  },
  {
    slug: "counter",
    name: "Word & Character Counter",
    description:
      "Free word and character counter with lines and byte size. Updates as you type.",
    keywords: ["word count", "character count", "bytes", "lines", "free"],
    category: "text",
    icon: WholeWord,
    relatedSlugs: ["text-case", "lorem"],
  },
  {
    slug: "regex",
    name: "Regex Tester",
    description:
      "Free online regex tester with live matches and replace preview. JavaScript flavor, browser-only.",
    keywords: ["regex", "regexp", "regular expression", "match", "replace", "free"],
    category: "text",
    icon: Regex,
    relatedSlugs: ["text-case", "diff"],
  },
  {
    slug: "timestamp",
    name: "Unix Timestamp Converter",
    description:
      "Free Unix timestamp converter for epoch seconds/milliseconds to dates and back.",
    keywords: ["unix", "timestamp", "epoch", "date", "timezone", "free"],
    category: "time",
    icon: Clock,
    relatedSlugs: ["cron", "uuid"],
  },
  {
    slug: "cron",
    name: "Cron Expression Explainer",
    description:
      "Free cron expression explainer with plain-English meaning and next run times.",
    keywords: ["cron", "schedule", "crontab", "expression", "free"],
    category: "time",
    icon: CalendarClock,
    relatedSlugs: ["timestamp"],
  },
  {
    slug: "uuid",
    name: "UUID Generator",
    description:
      "Free online UUID generator for v4 and v7, including bulk generation.",
    keywords: ["uuid", "guid", "v4", "v7", "identifier", "free"],
    category: "time",
    icon: Fingerprint,
    relatedSlugs: ["hash", "password"],
  },
  {
    slug: "hash",
    name: "Hash Generator",
    description:
      "Free hash generator for MD5, SHA-1, SHA-256, and SHA-512. Checksums computed locally.",
    keywords: ["hash", "md5", "sha256", "sha512", "checksum", "free"],
    category: "time",
    icon: Hash,
    relatedSlugs: ["uuid", "password", "jwt-decode"],
  },
  {
    slug: "number-base",
    name: "Number Base Converter",
    description:
      "Free binary, octal, decimal, and hex converter for developers.",
    keywords: ["binary", "hex", "octal", "decimal", "radix", "free"],
    category: "time",
    icon: Binary,
    relatedSlugs: ["hash", "color"],
  },
  {
    slug: "color",
    name: "Color Converter",
    description:
      "Free HEX, RGB, and HSL color converter with live preview.",
    keywords: ["color", "hex", "rgb", "hsl", "converter", "free"],
    category: "visual",
    icon: Palette,
    relatedSlugs: ["css", "number-base"],
  },
  {
    slug: "qr",
    name: "QR Code Generator",
    description:
      "Free online QR code generator for text, URLs, Wi‑Fi, email, phone, and SMS. Download PNG or SVG—private and reliable.",
    keywords: ["qr", "qr code", "qrcode", "generator", "wifi qr", "free", "svg"],
    category: "visual",
    icon: QrCode,
    relatedSlugs: ["url-encode", "image-base64"],
  },
  {
    slug: "image-base64",
    name: "Image → Base64",
    description:
      "Free image to Base64 converter with drag and drop. Creates data URIs locally—nothing uploaded.",
    keywords: ["image", "base64", "data uri", "embed", "free"],
    category: "visual",
    icon: Image,
    relatedSlugs: ["base64", "qr"],
  },
  {
    slug: "password",
    name: "Password Generator",
    description:
      "Free strong password generator with length and charset controls. Uses crypto.getRandomValues—never stored.",
    keywords: ["password", "generator", "secure", "random", "free"],
    category: "visual",
    icon: KeyRound,
    relatedSlugs: ["uuid", "hash"],
  },
];

export const tools: ToolMeta[] = toolBases.map(withSeo);

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
