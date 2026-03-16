import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      {/* Gamepad Icon Badge */}
      <div className="relative shrink-0 flex items-center justify-center bg-[#df104e] rounded-xl p-1.5 shadow-[0_0_15px_rgba(223,16,78,0.4)] border border-white/10 group-hover:scale-110 transition-transform duration-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
          style={{ height: '100%' }}
        >
          {/* Wire Cable */}
          <path
            d="M12 2V5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Gamepad Body */}
          <path
            d="M6 8H18C20.2091 8 22 9.79086 22 12V14C22 16.2091 20.2091 18 18 18H17L15 21H9L7 18H6C3.79086 18 2 16.2091 2 14V12C2 9.79086 3.79086 8 6 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* D-Pad */}
          <path
            d="M7 11V15M5 13H9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Action Buttons */}
          <circle cx="16" cy="11.5" r="0.8" fill="currentColor" />
          <circle cx="18" cy="13" r="0.8" fill="currentColor" />
          <circle cx="16" cy="14.5" r="0.8" fill="currentColor" />
          <circle cx="14" cy="13" r="0.8" fill="currentColor" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span className="font-headline font-black tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,148,183,0.5)]">
          GAMEFLASH<span className="text-[#df104e]">X</span>
        </span>
      )}
    </div>
  );
}
