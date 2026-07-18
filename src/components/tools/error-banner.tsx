import { cn } from "@/lib/cn";

export function ErrorBanner({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className={cn(
        "rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger",
        className,
      )}
    >
      {message}
    </div>
  );
}
