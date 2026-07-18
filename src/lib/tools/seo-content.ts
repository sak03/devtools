export type SeoFaq = {
  question: string;
  answer: string;
};

export type ToolSeoContent = {
  seoTitle: string;
  seoIntro: string;
  seoFaq: SeoFaq[];
};

export const toolSeoContent: Record<string, ToolSeoContent> = {
  base64: {
    seoTitle: "Free Online Base64 Encode / Decode",
    seoIntro:
      "Base64 encodes binary or text data into ASCII-safe strings for APIs, data URIs, and configs. This free tool encodes and decodes UTF-8 Base64 entirely in your browser—nothing is uploaded.",
    seoFaq: [
      {
        question: "Is Base64 encryption?",
        answer:
          "No. Base64 is encoding for transport, not encryption. Anyone can decode it. Do not use it to hide secrets.",
      },
      {
        question: "Does this support Unicode?",
        answer:
          "Yes. Input is treated as UTF-8, so emoji and non-Latin characters round-trip correctly.",
      },
      {
        question: "Is my data uploaded?",
        answer:
          "No. Encoding and decoding run locally in your browser tab.",
      },
    ],
  },
  "url-encode": {
    seoTitle: "Free URL Encode / Decode Tool",
    seoIntro:
      "URL (percent) encoding makes strings safe for query parameters and path segments. Use this free encoder/decoder with encodeURIComponent-style semantics—private and instant in the browser.",
    seoFaq: [
      {
        question: "When should I URL-encode?",
        answer:
          "Whenever you put user input or special characters into a query string, fragment, or form body that expects application/x-www-form-urlencoded style values.",
      },
      {
        question: "Is + treated as a space?",
        answer:
          "On decode, + is treated as a space (common form encoding). Encode uses encodeURIComponent, which encodes spaces as %20.",
      },
    ],
  },
  "html-entities": {
    seoTitle: "Free HTML Entity Encode / Decode",
    seoIntro:
      "Escape HTML special characters to entities (and back) to safely display markup as text. Useful when debugging templates or preventing accidental HTML injection in plain-text contexts.",
    seoFaq: [
      {
        question: "Does this prevent XSS?",
        answer:
          "Encoding helps when inserting untrusted text into HTML, but XSS prevention also depends on context (attributes, JS, URLs). Prefer a trusted sanitizer for rich HTML.",
      },
    ],
  },
  "jwt-decode": {
    seoTitle: "Free Online JWT Decoder",
    seoIntro:
      "Inspect JSON Web Token headers and payloads instantly. This decoder does not verify signatures—use it for debugging claims, expiry, and structure. Everything stays in your browser.",
    seoFaq: [
      {
        question: "Does this verify the JWT signature?",
        answer:
          "No. It only base64url-decodes the header and payload for inspection. Signature verification needs the signing secret or public key on a trusted backend.",
      },
      {
        question: "Is pasting a JWT safe here?",
        answer:
          "Processing is local. Still avoid pasting production tokens with sensitive claims into any shared screen or recording.",
      },
    ],
  },
  json: {
    seoTitle: "Free Online JSON Formatter & Validator",
    seoIntro:
      "Pretty-print, minify, and validate JSON with clear error messages. Ideal for debugging API responses and config files—runs entirely offline in your browser.",
    seoFaq: [
      {
        question: "What happens if JSON is invalid?",
        answer:
          "The tool shows the parser error message so you can fix syntax issues like trailing commas or missing quotes.",
      },
      {
        question: "Can I minify JSON?",
        answer:
          "Yes. Use Minify to remove whitespace for compact payloads.",
      },
    ],
  },
  "yaml-json": {
    seoTitle: "Free YAML to JSON Converter",
    seoIntro:
      "Convert YAML to JSON and JSON to YAML with validation. Handy for Kubernetes, CI configs, and API examples—processed locally with no upload.",
    seoFaq: [
      {
        question: "Which direction is supported?",
        answer:
          "Both. Paste YAML and convert to JSON, or paste JSON and convert to YAML.",
      },
    ],
  },
  xml: {
    seoTitle: "Free Online XML Formatter",
    seoIntro:
      "Beautify or minify XML documents in your browser. Useful for SOAP responses, feeds, and config files without sending data to a server.",
    seoFaq: [
      {
        question: "Does this validate against an XSD?",
        answer:
          "No. It focuses on pretty-print and minify. Schema validation is out of scope for this tool.",
      },
    ],
  },
  sql: {
    seoTitle: "Free Online SQL Formatter",
    seoIntro:
      "Beautify SQL with dialect support for PostgreSQL, MySQL, and SQLite. Format messy queries for reviews and docs—privately in your browser.",
    seoFaq: [
      {
        question: "Which SQL dialects are supported?",
        answer: "PostgreSQL, MySQL, and SQLite via the dialect selector.",
      },
    ],
  },
  css: {
    seoTitle: "Free CSS Beautify & Minify Tool",
    seoIntro:
      "Format or minify CSS stylesheets instantly. Great for cleaning copied CSS or shrinking assets before a quick test—client-side only.",
    seoFaq: [
      {
        question: "Will minify break my CSS?",
        answer:
          "Basic minification removes comments and extra whitespace. Unusual hacks may need manual review.",
      },
    ],
  },
  html: {
    seoTitle: "Free HTML Beautify & Minify Tool",
    seoIntro:
      "Pretty-print or compress HTML markup in the browser. Useful for reading minified pages or preparing compact snippets.",
    seoFaq: [
      {
        question: "Is the HTML sanitized?",
        answer:
          "This tool formats text; it does not execute or sanitize scripts. Treat untrusted HTML carefully.",
      },
    ],
  },
  markdown: {
    seoTitle: "Free Online Markdown Preview",
    seoIntro:
      "Write Markdown and preview sanitized HTML side by side. Ideal for README drafts and docs—preview stays local to your tab.",
    seoFaq: [
      {
        question: "Is the preview safe from XSS?",
        answer:
          "Rendered HTML is sanitized with DOMPurify before display.",
      },
    ],
  },
  "text-case": {
    seoTitle: "Free Text Case Converter (camelCase, snake_case…)",
    seoIntro:
      "Convert between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more. Speeds up renaming variables and API fields.",
    seoFaq: [
      {
        question: "Which cases are supported?",
        answer:
          "camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, lower, and upper.",
      },
    ],
  },
  diff: {
    seoTitle: "Free Online Text Diff Checker",
    seoIntro:
      "Compare two texts with line or word highlighting. Spot changes in configs, snippets, and drafts without uploading files.",
    seoFaq: [
      {
        question: "Line diff or word diff?",
        answer:
          "Line diff is best for code blocks; word diff highlights smaller edits inside paragraphs.",
      },
    ],
  },
  lorem: {
    seoTitle: "Free Lorem Ipsum Generator",
    seoIntro:
      "Generate placeholder words, sentences, or paragraphs for mockups and wireframes. Copy instantly—no account required.",
    seoFaq: [
      {
        question: "Can I control length?",
        answer:
          "Yes. Choose a count and unit (words, sentences, or paragraphs).",
      },
    ],
  },
  counter: {
    seoTitle: "Free Word & Character Counter",
    seoIntro:
      "Count words, characters, lines, and UTF-8 bytes as you type. Handy for meta descriptions, tweets, and form limits.",
    seoFaq: [
      {
        question: "Are spaces counted?",
        answer:
          "Characters include spaces. A separate “no spaces” count excludes whitespace.",
      },
    ],
  },
  regex: {
    seoTitle: "Free Online Regex Tester",
    seoIntro:
      "Test JavaScript regular expressions with live matches and replace preview. Debug patterns safely in your browser.",
    seoFaq: [
      {
        question: "Which regex flavor is this?",
        answer:
          "JavaScript RegExp (ECMAScript), including flags like g, i, m, s, and u when supported.",
      },
    ],
  },
  timestamp: {
    seoTitle: "Free Unix Timestamp Converter",
    seoIntro:
      "Convert Unix epoch timestamps to human-readable dates and back. Supports seconds and milliseconds with local and UTC views.",
    seoFaq: [
      {
        question: "Seconds or milliseconds?",
        answer:
          "Toggle the mode. JavaScript Date uses milliseconds; many APIs use seconds.",
      },
    ],
  },
  cron: {
    seoTitle: "Free Cron Expression Explainer",
    seoIntro:
      "Translate cron expressions into plain English and preview upcoming runs. Debug schedules for CI, cron jobs, and cloud schedulers.",
    seoFaq: [
      {
        question: "What cron format is used?",
        answer:
          "Standard 5-field cron (minute hour day-of-month month day-of-week), as commonly used on Linux.",
      },
    ],
  },
  uuid: {
    seoTitle: "Free Online UUID Generator",
    seoIntro:
      "Generate UUID v4 and v7 identifiers in bulk. Useful for database keys, correlation IDs, and test data—created locally.",
    seoFaq: [
      {
        question: "v4 vs v7?",
        answer:
          "v4 is random. v7 is time-ordered, which can improve database index locality.",
      },
    ],
  },
  hash: {
    seoTitle: "Free Online Hash Generator (MD5, SHA-256…)",
    seoIntro:
      "Generate MD5, SHA-1, SHA-256, and SHA-512 digests from text. Checksums stay in your browser—nothing is sent to a server.",
    seoFaq: [
      {
        question: "Is MD5 secure for passwords?",
        answer:
          "No. MD5 and SHA-1 are unsuitable for password storage. Prefer a password hashing scheme like Argon2 or bcrypt on a server.",
      },
    ],
  },
  "number-base": {
    seoTitle: "Free Binary Hex Decimal Converter",
    seoIntro:
      "Convert numbers between binary, octal, decimal, and hexadecimal. Helpful for bitmasks, colors, and low-level debugging.",
    seoFaq: [
      {
        question: "How large can numbers be?",
        answer:
          "Conversions use BigInt-style parsing for large integer values within typical JS safe handling for digit strings.",
      },
    ],
  },
  color: {
    seoTitle: "Free HEX RGB HSL Color Converter",
    seoIntro:
      "Convert colors between HEX, RGB, and HSL with a live preview. Built for designers and front-end developers.",
    seoFaq: [
      {
        question: "What formats can I paste?",
        answer:
          "HEX (#rgb or #rrggbb), rgb(...), and hsl(...) strings are supported.",
      },
    ],
  },
  qr: {
    seoTitle: "Free Online QR Code Generator",
    seoIntro:
      "Create QR codes for text, URLs, email, phone, SMS, and Wi‑Fi. Download PNG or SVG—generated locally with adjustable error correction for reliable scanning.",
    seoFaq: [
      {
        question: "Can I encode more than a website URL?",
        answer:
          "Yes. Use Text, Email, Phone, SMS, or Wi‑Fi modes, or paste any plain text payload.",
      },
      {
        question: "PNG or SVG?",
        answer:
          "PNG is ideal for chat and web. SVG scales cleanly for print and high-DPI designs.",
      },
      {
        question: "What is error correction?",
        answer:
          "Higher levels (Q/H) recover from damage or partial cover but make denser codes. M is a solid default; use H for print that may get scuffed.",
      },
    ],
  },
  "image-base64": {
    seoTitle: "Free Image to Base64 Converter",
    seoIntro:
      "Convert images to Base64 data URIs via drag and drop. Embed small assets in CSS or HTML without uploading files to a server.",
    seoFaq: [
      {
        question: "Is there a size limit?",
        answer:
          "Yes. Large images bloat HTML/CSS. This tool warns above ~2MB and keeps processing local.",
      },
    ],
  },
  password: {
    seoTitle: "Free Strong Password Generator",
    seoIntro:
      "Generate strong random passwords with length and charset controls using crypto.getRandomValues. Passwords are never stored or uploaded.",
    seoFaq: [
      {
        question: "Are passwords saved?",
        answer:
          "No. They exist only in memory until you copy or leave the page.",
      },
    ],
  },
};
