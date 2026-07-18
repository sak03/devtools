import { cn } from "@/lib/cn";

type BrandMarkProps = {
  className?: string;
  size?: "sm" | "md";
};

export function BrandMark({ className, size = "sm" }: BrandMarkProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-accent font-mono font-bold text-accent-fg transition-transform group-hover:scale-105",
        size === "sm" && "h-7 w-7 text-[10px] leading-none",
        size === "md" && "h-10 w-10 text-sm leading-none",
        className,
      )}
    >
      {"</>"}
    </span>
  );
}
