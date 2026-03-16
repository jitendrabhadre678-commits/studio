import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      {/* Premium Coupon Icon */}
      <div className="relative h-[32px] md:h-[36px] lg:h-[40px] aspect-[1.4/1]">
        <svg
          viewBox="0 0 140 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(223,16,78,0.5)]"
        >
          {/* Ticket Background with side cutouts */}
          <path
            d="M10 0C4.47715 0 0 4.47715 0 10V35C5.52285 35 10 39.4772 10 45C10 50.5228 5.52285 55 0 55V90C0 95.5229 4.47715 100 10 100H130C135.523 100 140 95.5229 140 90V55C134.477 55 130 50.5228 130 45C130 39.4772 134.477 35 140 35V10C140 4.47715 135.523 0 130 0H10Z"
            fill="#df104e"
          />
          {/* Lightning Bolt Symbol */}
          <path
            d="M75 25L50 55H70L65 75L90 45H70L75 25Z"
            fill="white"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Subtle Glow Effect */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </div>

      {showText && (
        <span className="font-headline font-black tracking-tighter text-white text-xl md:text-2xl lg:text-3xl drop-shadow-[0_0_10px_rgba(255,148,183,0.4)]">
          GAMEFLASH<span className="text-[#df104e]">X</span>
        </span>
      )}
    </div>
  );
}
