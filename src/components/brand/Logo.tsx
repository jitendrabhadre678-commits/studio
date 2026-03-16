"use client";

import { cn } from "@/lib/utils";

/**
 * GameFlashX Coupon Logo Component
 * 
 * Features:
 * - Stylized coupon/ticket icon with side cutouts.
 * - Integrated lightning bolt symbol representing rewards & speed.
 * - Bold League Spartan typography.
 * - Responsive scaling that inherits height from the parent.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 md:gap-3 select-none group h-full", className)}>
      {/* Coupon Icon Badge */}
      <div className="relative h-full aspect-square flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-primary rounded-[20%] shadow-[0_0_15px_rgba(223,16,78,0.4)] transition-all group-hover:shadow-[0_0_25px_rgba(223,16,78,0.6)]" />
        
        {/* Ticket Side Cutouts */}
        <div className="absolute -left-[8%] top-1/2 -translate-y-1/2 w-[16%] h-[16%] bg-black rounded-full" />
        <div className="absolute -right-[8%] top-1/2 -translate-y-1/2 w-[16%] h-[16%] bg-black rounded-full" />
        
        {/* Lightning Bolt Symbol */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[55%] h-[55%] relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>

      {/* Brand Text */}
      <span className={cn(
        "font-headline font-[800] tracking-tighter uppercase leading-none text-white flex items-center",
        "drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
      )}>
        GAMEFLASH
        <span className="text-primary ml-0.5">X</span>
      </span>
    </div>
  );
}
