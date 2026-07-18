import type { LucideIcon } from "lucide-react";

export type ToolCategory =
  | "encode"
  | "format"
  | "text"
  | "time"
  | "visual";

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  encode: "Encode / Decode",
  format: "Format / Transform",
  text: "Text",
  time: "Time / IDs / Crypto",
  visual: "Visual / Misc",
};

export type ToolDefinition = {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  category: ToolCategory;
  icon: LucideIcon;
  relatedSlugs: string[];
};
