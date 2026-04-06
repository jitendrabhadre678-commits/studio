'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Clean Footer Wave.
 * Removed blurs and glass effects for a minimal grounding transition.
 */

export function FooterWave({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative w-full h-[100px] md:h-[150px] overflow-hidden z-10 pointer-events-none select-none",
      className
    )}>
      <motion.div
        animate={{
          x: ["-1%", "1%", "-1%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-[102%] h-full relative left-[-1%]"
      >
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full block"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="#050505"
          />
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
}
