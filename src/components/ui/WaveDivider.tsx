'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Premium Liquid Wave Divider.
 * Features ultra-smooth, rounded organic curves for high-end section transitions.
 * Supports up/down orientation and hardware-accelerated drifting.
 */

interface WaveDividerProps {
  direction?: 'up' | 'down';
  className?: string;
  opacity?: number;
}

export function WaveDivider({ direction = 'down', className, opacity = 0.1 }: WaveDividerProps) {
  const isUp = direction === 'up';

  return (
    <div className={cn(
      "relative w-full h-[60px] md:h-[100px] overflow-hidden pointer-events-none select-none z-10",
      className
    )}>
      <motion.div
        animate={{
          x: ["-1%", "1%", "-1%"],
          scaleY: [1, 1.03, 1]
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
          {/* Smooth Organic Fluid Path */}
          <path
            d="M0,64 C240,120 480,20 720,64 C960,108 1200,20 1440,64 L1440,120 L0,120 Z"
            fill="currentColor"
            style={{ opacity }}
            className="text-white"
          />
          
          {/* Subtle Specular Accent Line */}
          <path
            d="M0,64 C240,120 480,20 720,64 C960,108 1200,20 1440,64"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
