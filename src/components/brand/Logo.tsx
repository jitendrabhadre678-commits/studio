"use client";

import { cn } from "@/lib/utils";

/**
 * GameFlashX Blue Premium Logo
 */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 select-none group h-full", className)}>
      <div className="relative h-[80%] aspect-square flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-primary rounded-[20%] shadow-[0_0_10px_rgba(0,157,255,0.4)] transition-all group-hover:shadow-[0_0_20px_rgba(0,157,255,0.6)]" />
        
        <div className="absolute -left-[8%] top-1/2 -translate-y-1/2 w-[16%] h-[16%] bg-[#050b18] rounded-full" />
        <div className="absolute -right-[8%] top-1/2 -translate-y-1/2 w-[16%] h-[16%] bg-[#050b18] rounded-full" />
        
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[55%] h-[55%] relative z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>

      <span className={cn(
        "font-headline font-[900] tracking-tighter uppercase leading-none text-white flex items-center",
        "drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] text-sm md:text-lg"
      )}>
        GAMEFLASH
        <span className="text-primary ml-0.5">X</span>
      </span>
    </div>
  );
}
