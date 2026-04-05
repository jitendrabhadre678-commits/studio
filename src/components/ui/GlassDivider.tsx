'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Premium Glassmorphism Section Divider
 * Features deep backdrop blur, glow gradients, and an animated light sweep.
 */
export function GlassDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-[80px] md:h-[100px] overflow-hidden", className)}>
      {/* Background Layer with Deep Blur */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[20px] border-t border-white/10 border-b border-white/[0.05]" />
      
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-primary/5 pointer-events-none" />
      
      {/* Animated Light Sweep (Shine) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-[25deg] animate-shine" />
      </div>

      {/* Edge Blending Gradients (Softens hard lines) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Inner Shadow Simulation */}
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] pointer-events-none" />
    </div>
  );
}