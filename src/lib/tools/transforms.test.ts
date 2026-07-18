import { describe, expect, it } from "vitest";
import {
  convertBase,
  convertCase,
  countText,
  decodeBase64,
  encodeBase64,
  encodeHtmlEntities,
  formatJson,
  minifyJson,
  parseColor,
} from "@/lib/tools/transforms";

describe("base64", () => {
  it("round-trips unicode", () => {
    const input = "Hello, DevTools! 🚀";
    expect(decodeBase64(encodeBase64(input))).toBe(input);
  });
});

describe("json", () => {
  it("formats and minifies", () => {
    const raw = '{"a":1,"b":true}';
    expect(formatJson(raw)).toContain("\n");
    expect(minifyJson(formatJson(raw))).toBe(raw);
  });

  it("throws on invalid json", () => {
    expect(() => formatJson("{")).toThrow();
  });
});

describe("case", () => {
  it("converts styles", () => {
    expect(convertCase("hello world", "camel")).toBe("helloWorld");
    expect(convertCase("hello world", "pascal")).toBe("HelloWorld");
    expect(convertCase("hello world", "snake")).toBe("hello_world");
    expect(convertCase("hello world", "kebab")).toBe("hello-world");
    expect(convertCase("hello world", "constant")).toBe("HELLO_WORLD");
  });
});

describe("counter", () => {
  it("counts words and lines", () => {
    const s = countText("one two\nthree");
    expect(s.words).toBe(3);
    expect(s.lines).toBe(2);
  });
});

describe("number base", () => {
  it("converts 255", () => {
    expect(convertBase("255", 10, 16)).toBe("ff");
    expect(convertBase("ff", 16, 10)).toBe("255");
    expect(convertBase("11111111", 2, 10)).toBe("255");
  });
});

describe("color", () => {
  it("parses hex", () => {
    const c = parseColor("#0d7a78");
    expect(c.hex).toBe("#0d7a78");
    expect(c.rgb.r).toBe(13);
  });
});

describe("html entities", () => {
  it("encodes specials", () => {
    expect(encodeHtmlEntities(`<a & "b">`)).toBe(
      "&lt;a &amp; &quot;b&quot;&gt;",
    );
  });
});
