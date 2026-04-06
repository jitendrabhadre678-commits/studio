'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Clean Liquid Wave Divider.
 * Removed all glassmorphism blurs and overlays for a minimal, geometric transition.
 */

interface WaveDividerProps {
  direction?: 'up' | 'down';
  className?: string;
}

export function WaveDivider({ direction = 'down', className }: WaveDividerProps) {
  const isUp = direction === 'up';

  return (
    <div className={cn(
      "relative w-full h-[60px] md:h-[100px] overflow-hidden z-20 pointer-events-none select-none block",
      isUp ? "-mt-[30px] md:-mt-[50px]" : "-mb-[30px] md:-mb-[50px]",
      className
    )}>
      {/* Wave Animation Layer */}
      <motion.div
        animate={{
          x: ["-1%", "1%", "-1%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-[102%] h-full relative left-[-1%]"
      >
        <svg
          viewBox="0 0 1440 120"
          className={cn(
            "w-full h-full block transition-transform duration-1000",
            isUp ? "rotate-180" : ""
          )}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Minimal Solid Path - Syncs with deep background #050505 */}
          <path
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L0,120Z"
            fill="#050505"
          />
          
          {/* Sublte top edge line for depth */}
          <path
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
}
