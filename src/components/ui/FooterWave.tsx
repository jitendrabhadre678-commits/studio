
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Premium Footer Wave Divider.
 * Features deep organic SVG curves, backdrop blurs, and localized glow.
 */

export function FooterWave({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative w-full h-[120px] md:h-[180px] overflow-hidden z-10 pointer-events-none select-none -mb-px",
      className
    )}>
      {/* Liquid Animation Layer */}
      <motion.div
        animate={{
          x: ["-2%", "2%", "-2%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-[104%] h-full relative left-[-2%]"
      >
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full block"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="footer-glow" cx="50%" cy="100%" r="50%">
              <stop offset="0%" stopColor="rgba(250, 70, 22, 0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            className="fill-[#050505]"
          />
          
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <rect width="100%" height="100%" fill="url(#footer-glow)" opacity="0.5" />
        </svg>
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-[2px] pointer-events-none" />
    </div>
  );
}
