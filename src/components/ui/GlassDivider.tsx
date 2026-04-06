'use client';

import { cn } from '@/lib/utils';

/**
 * Minimal Gradient Line Divider.
 * Replaces the old glass bar with a clean, high-tech separator line.
 */
export function GlassDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-px flex items-center justify-center", className)}>
      {/* Center Glow Core */}
      <div className="absolute w-[300px] h-[40px] bg-primary/10 blur-[20px] rounded-full pointer-events-none" />
      
      {/* Gradient Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Animated Shine Sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[20%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
      </div>
    </div>
  );
}
