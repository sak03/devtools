"use client";

import { cn } from "@/lib/cn";
import type { TextareaHTMLAttributes } from "react";

type CodePaneProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  actions?: React.ReactNode;
};

export function CodePane({
  label,
  actions,
  className,
  ...props
}: CodePaneProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-editor">
      {(label || actions) && (
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
          {label ? (
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {label}
            </span>
          ) : (
            <span />
          )}
          {actions ? <div className="flex items-center gap-1.5">{actions}</div> : null}
        </div>
      )}
      <textarea
        spellCheck={false}
        className={cn(
          "min-h-[14rem] flex-1 resize-y bg-transparent px-3 py-3 font-mono text-[13px] leading-relaxed text-foreground outline-none placeholder:text-muted/60",
          className,
        )}
        {...props}
      />
    </div>
  );
}
