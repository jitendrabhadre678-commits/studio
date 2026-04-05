
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Premium Liquid Glass Wave Divider
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
      "relative w-full h-[100px] md:h-[150px] overflow-hidden z-10 pointer-events-none",
      isUp ? "-mt-[50px] md:-mt-[75px]" : "-mb-[50px] md:-mb-[75px]",
      className
    )}>
      {/* Liquid Animation Layer */}
      <motion.div
        animate={{
          x: ["-1%", "1%", "-1%"],
          scaleY: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-[110%] h-full relative left-[-5%]"
      >
        <svg
          viewBox="0 0 1440 120"
          className={cn(
            "absolute inset-0 w-full h-full preserve-3d transition-transform duration-1000",
            isUp ? "rotate-180" : ""
          )}
          preserveAspectRatio="none"
        >
          {/* Glass Path */}
          <path
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            className="fill-white/[0.03] backdrop-blur-2xl"
          />
          
          {/* Border Highlight Path */}
          <path
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Luxury Gradient Glows */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-primary/5 opacity-40 mix-blend-overlay" />
      
      {/* Light Sweep Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 bottom-0 w-[30%] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-[35deg] animate-shine" />
      </div>
    </div>
  );
}
