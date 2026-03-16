"use client";

import { cn } from "@/lib/utils";

/**
 * GameFlashX Brand Logo Component
 * 
 * Features:
 * - Pure typography-based design using League Spartan (800 weight).
 * - Custom Energy Streak: The "X" features an upper-left stroke extension 
 *   that stretches back across the word toward the "G".
 * - Premium Gradient: White to Pink (#ff94b7).
 * - High-visibility neon glow effect.
 */
export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  if (!showText) return null;

  return (
    <div className={cn("relative flex items-center select-none group h-fit", className)}>
      <span className={cn(
        "font-headline font-[800] tracking-tighter uppercase leading-none italic",
        "bg-gradient-to-r from-white via-white to-[#ff94b7] bg-clip-text text-transparent",
        "drop-shadow-[0_0_12px_rgba(255,148,183,0.6)] flex items-center"
      )}>
        GAMEFLASH
        <span className="relative inline-block ml-1">
          {/* The X character */}
          X
          
          {/* 
            The Extended Energy Streak / Lightning Bolt 
            Extending from X's top-left back toward the letter G 
          */}
          <div className="absolute top-[20%] left-0 w-[500%] h-[3px] -translate-x-full pointer-events-none overflow-visible">
            <svg
              viewBox="0 0 100 10"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="streak-gradient" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#ff94b7" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Outer Glow Path */}
              <path
                d="M100 5 C85 2, 70 8, 55 4 C40 8, 20 2, 0 5"
                stroke="url(#streak-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                className="drop-shadow-[0_0_10px_rgba(255,148,183,0.9)] opacity-80"
              />
              
              {/* Inner White Core for sharpness */}
              <path
                d="M100 5 C85 2, 70 8, 55 4 C40 8, 20 2, 0 5"
                stroke="white"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
            </svg>
          </div>
        </span>
      </span>
    </div>
  );
}
