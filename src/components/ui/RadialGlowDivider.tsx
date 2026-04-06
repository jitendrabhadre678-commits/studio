'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Clean Radial Glow Divider.
 * Pure atmosphere with no boxy containers or strips.
 */

interface RadialGlowDividerProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function RadialGlowDivider({ className, intensity = 'medium' }: RadialGlowDividerProps) {
  const opacityMap = {
    low: 'opacity-10',
    medium: 'opacity-20',
    high: 'opacity-30'
  };

  return (
    <div className={cn(
      "relative w-full h-[100px] md:h-[150px] overflow-hidden pointer-events-none z-0 select-none",
      className
    )}>
      {/* Ambient Glow */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[300%] rounded-[100%]",
        "bg-[radial-gradient(circle_at_top,rgba(250,70,22,0.2)_0%,rgba(234,179,8,0.02)_40%,transparent_70%)]",
        "blur-[60px] md:blur-[100px]",
        opacityMap[intensity]
      )} />

      {/* Pulse Core */}
      <motion.div 
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full rounded-[100%] bg-[radial-gradient(circle_at_top,rgba(250,70,22,0.1)_0%,transparent_80%)] blur-[40px]"
      />
    </div>
  );
}
