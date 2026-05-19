import { cn } from "@/lib/utils";

type SectionDecorProps = {
  variant?: "light" | "rose" | "dark";
  className?: string;
};

export function SectionDecor({ variant = "light", className }: SectionDecorProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden="true">
      <div
        className={cn(
          "absolute -right-28 top-10 h-72 w-72 rounded-full blur-3xl",
          isDark ? "bg-rose-300/12" : "bg-rose-200/35",
        )}
      />
      <div
        className={cn(
          "absolute -left-24 bottom-6 h-80 w-80 rounded-full blur-3xl",
          isDark ? "bg-amber-200/10" : "bg-amber-100/50",
        )}
      />
      <div
        className={cn(
          "absolute right-[12%] top-[18%] h-32 w-32 rounded-full blur-2xl",
          variant === "rose" ? "bg-[#d94f70]/12" : isDark ? "bg-[#d6a85a]/10" : "bg-[#d6a85a]/16",
        )}
      />
      <div className={cn("bakery-dots absolute inset-0", isDark ? "opacity-[0.06]" : "opacity-[0.16]")} />
    </div>
  );
}

export function FloatingBakeryElements({ dark = false }: { dark?: boolean }) {
  const color = dark ? "text-white/20" : "text-rose-900/12";
  const accent = dark ? "text-amber-100/20" : "text-amber-700/14";

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <span className={cn("absolute left-[7%] top-[18%] text-2xl font-black", color)}>♡</span>
      <span className={cn("absolute right-[8%] top-[22%] text-xl", accent)}>✦</span>
      <span className={cn("absolute bottom-[18%] left-[14%] h-2 w-2 rounded-full", dark ? "bg-rose-100/25" : "bg-[#d94f70]/18")} />
      <span className={cn("absolute bottom-[24%] right-[18%] h-1.5 w-1.5 rounded-full", dark ? "bg-amber-100/30" : "bg-[#d6a85a]/28")} />
      <svg className={cn("absolute -right-12 bottom-8 h-40 w-40", dark ? "text-white/10" : "text-[#5a352a]/8")} viewBox="0 0 160 160" fill="none">
        <path d="M22 104c34-66 94 30 116-38M42 122c28-45 66 18 88-20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
