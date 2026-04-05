'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Premium Radial Glow Divider
 * Features a semi-circle cinematic light wash (Orange -> Yellow -> Transparent).
 * Designed to sit between sections to provide atmospheric depth.
 */

interface RadialGlowDividerProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function RadialGlowDivider({ className, intensity = 'medium' }: RadialGlowDividerProps) {
  const opacityMap = {
    low: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-60'
  };

  return (
    <div className={cn(
      "relative w-full h-[150px] md:h-[200px] overflow-hidden pointer-events-none z-0 select-none",
      className
    )}>
      {/* 1. LAYER: Wide Ambient Glow */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-[160%] h-[300%] rounded-[100%] transition-opacity duration-1000",
        "bg-[radial-gradient(circle_at_top,rgba(250,70,22,0.15)_0%,rgba(234,179,8,0.05)_40%,transparent_70%)]",
        "blur-[80px] md:blur-[120px]",
        opacityMap[intensity]
      )} />

      {/* 2. LAYER: Intensified Pulse Core */}
      <motion.div 
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full rounded-[100%]",
          "bg-[radial-gradient(circle_at_top,rgba(250,70,22,0.1)_0%,rgba(234,179,8,0.02)_50%,transparent_80%)]",
          "blur-[40px] md:blur-[60px]"
        )}
      />

      {/* 3. LAYER: Horizontal Edge Blending (Smooths the horizon) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
