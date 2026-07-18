export function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

export function decodeBase64(input: string): string {
  const cleaned = input.replace(/\s/g, "");
  const binary = atob(cleaned);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeUrl(input: string): string {
  return encodeURIComponent(input);
}

export function decodeUrl(input: string): string {
  return decodeURIComponent(input.replace(/\+/g, " "));
}

const ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function encodeHtmlEntities(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => ENTITY_MAP[ch] ?? ch);
}

export function decodeHtmlEntities(input: string): string {
  if (typeof document !== "undefined") {
    const el = document.createElement("textarea");
    el.innerHTML = input;
    return el.value;
  }
  return input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

export function formatJson(input: string, space = 2): string {
  return JSON.stringify(JSON.parse(input), null, space);
}

export function minifyJson(input: string): string {
  return JSON.stringify(JSON.parse(input));
}

function toWords(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-.]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

export type CaseStyle =
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"
  | "title"
  | "lower"
  | "upper";

export function convertCase(input: string, style: CaseStyle): string {
  const words = toWords(input);
  if (words.length === 0) return "";
  switch (style) {
    case "camel":
      return words
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
    case "pascal":
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
    case "snake":
      return words.join("_");
    case "kebab":
      return words.join("-");
    case "constant":
      return words.join("_").toUpperCase();
    case "title":
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    case "lower":
      return words.join(" ").toLowerCase();
    case "upper":
      return words.join(" ").toUpperCase();
  }
}

export function countText(input: string) {
  const trimmed = input.trim();
  return {
    characters: input.length,
    charactersNoSpaces: input.replace(/\s/g, "").length,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    lines: input.length === 0 ? 0 : input.split(/\r\n|\r|\n/).length,
    bytes: new TextEncoder().encode(input).length,
  };
}

export function convertBase(
  value: string,
  from: number,
  to: number,
): string {
  const cleaned = value.trim().replace(/\s/g, "");
  if (!cleaned) return "";
  if (from < 2 || from > 36 || to < 2 || to > 36) {
    throw new Error("Base must be between 2 and 36");
  }
  return bigIntToBase(parseBig(cleaned, from), to);
}

function parseBig(value: string, from: number): bigint {
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = 0n;
  const base = BigInt(from);
  for (const ch of value.toLowerCase()) {
    const d = BigInt(digits.indexOf(ch));
    if (d < 0n || d >= base) throw new Error(`Invalid digit '${ch}'`);
    result = result * base + d;
  }
  return result;
}

function bigIntToBase(n: bigint, to: number): string {
  if (n === 0n) return "0";
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  const base = BigInt(to);
  let x = n < 0n ? -n : n;
  let out = "";
  while (x > 0n) {
    out = digits[Number(x % base)] + out;
    x = x / base;
  }
  return n < 0n ? `-${out}` : out;
}

export function parseColor(input: string): {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
} {
  const raw = input.trim();
  let r = 0,
    g = 0,
    b = 0;

  const hexMatch = raw.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  const rgbMatch = raw.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i,
  );
  const hslMatch = raw.match(
    /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%/i,
  );

  if (hexMatch) {
    let h = hexMatch[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    r = parseInt(h.slice(0, 2), 16);
    g = parseInt(h.slice(2, 4), 16);
    b = parseInt(h.slice(4, 6), 16);
  } else if (rgbMatch) {
    r = clamp255(+rgbMatch[1]);
    g = clamp255(+rgbMatch[2]);
    b = clamp255(+rgbMatch[3]);
  } else if (hslMatch) {
    const hsl = {
      h: ((+hslMatch[1]) % 360 + 360) % 360,
      s: clamp100(+hslMatch[2]),
      l: clamp100(+hslMatch[3]),
    };
    ({ r, g, b } = hslToRgb(hsl.h, hsl.s, hsl.l));
  } else {
    throw new Error("Unrecognized color. Try #0d7a78, rgb(13,122,120), or hsl(178,81%,26%).");
  }

  const hsl = rgbToHsl(r, g, b);
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return { hex, rgb: { r, g, b }, hsl };
}

function clamp255(n: number) {
  return Math.max(0, Math.min(255, n));
}
function clamp100(n: number) {
  return Math.max(0, Math.min(100, n));
}
function toHex(n: number) {
  return n.toString(16).padStart(2, "0");
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rp = 0,
    gp = 0,
    bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
];

export function generateLorem(
  count: number,
  unit: "words" | "sentences" | "paragraphs",
): string {
  const n = Math.max(1, Math.min(count, 200));
  if (unit === "words") {
    return Array.from({ length: n }, (_, i) => LOREM_WORDS[i % LOREM_WORDS.length]).join(" ");
  }
  const sentence = () => {
    const len = 8 + (n % 7);
    const words = Array.from(
      { length: len },
      (_, i) => LOREM_WORDS[(i + n) % LOREM_WORDS.length],
    );
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return `${words.join(" ")}.`;
  };
  if (unit === "sentences") {
    return Array.from({ length: n }, () => sentence()).join(" ");
  }
  return Array.from({ length: n }, () =>
    Array.from({ length: 3 + (n % 3) }, () => sentence()).join(" "),
  ).join("\n\n");
}

export function generatePassword(
  length: number,
  opts: { upper: boolean; lower: boolean; digits: boolean; symbols: boolean },
): string {
  const pools: string[] = [];
  if (opts.upper) pools.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (opts.lower) pools.push("abcdefghijklmnopqrstuvwxyz");
  if (opts.digits) pools.push("0123456789");
  if (opts.symbols) pools.push("!@#$%^&*()-_=+[]{};:,.<>?");
  if (pools.length === 0) throw new Error("Select at least one character set");
  const all = pools.join("");
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  const chars = Array.from(bytes, (b) => all[b % all.length]);
  // guarantee one from each selected pool
  pools.forEach((pool, i) => {
    if (i < length) {
      const b = new Uint32Array(1);
      crypto.getRandomValues(b);
      chars[i] = pool[b[0] % pool.length];
    }
  });
  // shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const b = new Uint32Array(1);
    crypto.getRandomValues(b);
    const j = b[0] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

export function prettyXml(xml: string): string {
  const cleaned = xml.replace(/>\s+</g, "><").trim();
  let formatted = "";
  let indent = 0;
  const parts = cleaned.split(/(<[^>]+>)/g).filter(Boolean);
  for (const part of parts) {
    if (part.startsWith("</")) {
      indent = Math.max(indent - 1, 0);
      formatted += `${"  ".repeat(indent)}${part}\n`;
    } else if (part.startsWith("<") && !part.startsWith("<?") && !part.startsWith("<!")) {
      const selfClosing = part.endsWith("/>") || /^<[^>]+\/>$/.test(part);
      formatted += `${"  ".repeat(indent)}${part}\n`;
      if (!selfClosing && !part.startsWith("</")) indent += 1;
    } else if (part.startsWith("<")) {
      formatted += `${"  ".repeat(indent)}${part}\n`;
    } else {
      const text = part.trim();
      if (text) formatted += `${"  ".repeat(indent)}${text}\n`;
    }
  }
  return formatted.trim();
}

export function minifyXml(xml: string): string {
  return xml.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
}
