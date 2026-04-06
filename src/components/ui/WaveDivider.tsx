
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Premium Liquid Glass Wave Divider (Seamless Version).
 * Features organic SVG wave geometry, deep backdrop blur, and slow liquid movement.
 */

interface WaveDividerProps {
  direction?: 'up' | 'down';
  className?: string;
}

export function WaveDivider({ direction = 'down', className }: WaveDividerProps) {
  const isUp = direction === 'up';

  return (
    <div className={cn(
      "relative w-full h-[80px] md:h-[120px] overflow-hidden z-20 pointer-events-none select-none block",
      isUp ? "-mt-[40px] md:-mt-[60px]" : "-mb-[40px] md:-mb-[60px]",
      className
    )}>
      {/* Liquid Animation Layer */}
      <motion.div
        animate={{
          x: ["-1%", "1%", "-1%"],
          scaleY: [1, 1.02, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-[102%] h-full relative left-[-1%]"
      >
        <svg
          viewBox="0 0 1440 120"
          className={cn(
            "w-full h-full transition-transform duration-1000 block",
            isUp ? "rotate-180" : ""
          )}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Glass Path - Fills to the bottom to cover seams */}
          <path
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L0,120Z"
            className="fill-white/[0.04] backdrop-blur-3xl"
          />
          
          {/* Border Highlight Path - Adds the 'glass edge' look */}
          <path
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Luxury Gradient Glows */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-primary/10 opacity-30 mix-blend-overlay pointer-events-none" />
      
      {/* Light Sweep Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-[35deg] animate-shine" />
      </div>
    </div>
  );
}
