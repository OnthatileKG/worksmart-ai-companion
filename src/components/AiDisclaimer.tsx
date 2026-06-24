import { Info } from "lucide-react";

export function AiDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex gap-2.5 rounded-xl border border-warning/30 bg-warning/10 p-3 text-[11px] leading-relaxed text-foreground/70 ${className}`}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
      <p>
        AI-generated content is provided for assistance purposes only. Please review and verify
        all generated information before professional, academic, or business use.
      </p>
    </div>
  );
}
