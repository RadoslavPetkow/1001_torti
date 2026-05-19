import { cn } from "@/lib/utils";

type BackgroundConfettiProps = {
  density?: "low" | "medium";
  variant?: "soft" | "celebration";
  className?: string;
};

type Piece = {
  className: string;
  motion?: boolean;
};

type SymbolPiece = {
  mark: string;
  className: string;
  motion?: boolean;
};

const lowPieces: Piece[] = [
  { className: "left-[5%] top-[18%] h-2 w-2 rounded-full bg-[#FB7185]/45", motion: true },
  { className: "left-[16%] bottom-[22%] h-1.5 w-8 rotate-[24deg] rounded-full bg-[#FBBF24]/40" },
  { className: "left-[31%] top-[74%] h-2.5 w-2.5 rounded-full bg-[#86EFAC]/38" },
  { className: "left-[48%] top-[16%] h-1.5 w-7 -rotate-[18deg] rounded-full bg-[#FDBA74]/42", motion: true },
  { className: "right-[8%] top-[24%] h-2 w-2 rounded-full bg-[#C084FC]/38" },
  { className: "right-[18%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-[#F472B6]/40" },
  { className: "right-[34%] top-[64%] h-1.5 w-6 rotate-[38deg] rounded-full bg-[#7C2D12]/30" },
  { className: "left-[72%] top-[42%] h-2 w-2 rounded-full bg-[#D97706]/34" },
  { className: "left-[9%] top-[58%] h-2 w-3 rotate-45 rounded-[3px] bg-[#FDE68A]/48" },
  { className: "right-[5%] bottom-[42%] h-2 w-3 -rotate-12 rounded-[3px] bg-[#FB7185]/38" },
];

const mediumPieces: Piece[] = [
  ...lowPieces,
  { className: "left-[23%] top-[36%] h-2 w-2 rounded-full bg-[#FBBF24]/45", motion: true },
  { className: "left-[38%] top-[52%] h-1.5 w-9 -rotate-[35deg] rounded-full bg-[#F472B6]/34" },
  { className: "left-[57%] bottom-[12%] h-2.5 w-2.5 rounded-full bg-[#FDBA74]/45" },
  { className: "left-[64%] top-[28%] h-2 w-3 rotate-[18deg] rounded-[3px] bg-[#86EFAC]/36" },
  { className: "right-[28%] top-[10%] h-2.5 w-2.5 rounded-full bg-[#FB7185]/44" },
  { className: "right-[40%] bottom-[32%] h-1.5 w-7 rotate-[55deg] rounded-full bg-[#D97706]/32" },
  { className: "left-[82%] top-[70%] h-2 w-2 rounded-full bg-[#C084FC]/36", motion: true },
  { className: "left-[12%] top-[8%] h-1.5 w-5 -rotate-[12deg] rounded-full bg-[#FDE68A]/50" },
  { className: "right-[14%] top-[58%] h-2 w-4 rotate-[28deg] rounded-[3px] bg-[#FBBF24]/36" },
  { className: "left-[44%] bottom-[26%] h-2 w-2 rounded-full bg-[#7C2D12]/28" },
];

const softSymbols: SymbolPiece[] = [
  { mark: "✦", className: "left-[11%] top-[31%] text-[#D97706]/40 text-xl", motion: true },
  { mark: "♡", className: "right-[13%] top-[36%] text-[#F472B6]/42 text-2xl" },
  { mark: "+", className: "left-[61%] top-[20%] text-[#7C2D12]/32 text-xl" },
  { mark: "✧", className: "right-[30%] bottom-[28%] text-[#C084FC]/36 text-xl", motion: true },
  { mark: "✦", className: "left-[78%] bottom-[18%] text-[#FBBF24]/40 text-lg" },
];

const celebrationSymbols: SymbolPiece[] = [
  ...softSymbols,
  { mark: "♡", className: "left-[26%] bottom-[18%] text-[#FB7185]/44 text-xl", motion: true },
  { mark: "✦", className: "left-[36%] top-[24%] text-[#FBBF24]/44 text-lg" },
  { mark: "+", className: "left-[50%] top-[42%] text-[#86EFAC]/36 text-lg" },
  { mark: "✧", className: "right-[9%] bottom-[17%] text-[#FDBA74]/42 text-xl" },
  { mark: "♡", className: "right-[44%] top-[72%] text-[#C084FC]/34 text-lg" },
];

export function BackgroundConfetti({
  density = "low",
  variant = "soft",
  className,
}: BackgroundConfettiProps) {
  const pieces = density === "medium" ? mediumPieces : lowPieces;
  const symbols = variant === "celebration" ? celebrationSymbols : softSymbols;
  const mobilePieceCount = density === "medium" ? 9 : 6;
  const mobileSymbolCount = density === "medium" ? 5 : 3;

  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden="true">
      <div className="hidden sm:block">
        {pieces.map((piece, index) => (
          <span
            key={`${piece.className}-${index}`}
            className={cn("absolute shadow-sm", piece.motion && "motion-safe:animate-[confettiFloat_11s_ease-in-out_infinite]")}
          />
        ))}
        {symbols.map((symbol, index) => (
          <span
            key={`${symbol.mark}-${symbol.className}-${index}`}
            className={cn(
              "absolute font-serif leading-none drop-shadow-sm",
              symbol.className,
              symbol.motion && "motion-safe:animate-[confettiFloat_13s_ease-in-out_infinite]",
            )}
          >
            {symbol.mark}
          </span>
        ))}
      </div>

      <div className="sm:hidden">
        {pieces.slice(0, mobilePieceCount).map((piece, index) => (
          <span key={`mobile-${piece.className}-${index}`} className={cn("absolute shadow-sm", piece.className)} />
        ))}
        {symbols.slice(0, mobileSymbolCount).map((symbol, index) => (
          <span key={`mobile-${symbol.mark}-${index}`} className={cn("absolute font-serif leading-none", symbol.className)}>
            {symbol.mark}
          </span>
        ))}
      </div>
    </div>
  );
}
