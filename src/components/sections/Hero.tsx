'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Premium Luxury Hero.
 * Updated with powerful McDonald's reward headline for high conversion.
 */

const ICONS = {
  security: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487684/Untitled_design_20260406_202944_0000_uw8yuv.png',
  dollar: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487682/Untitled_design_20260406_202119_0000_zlzp6a.png',
  gift: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487685/Untitled_design_20260406_202010_0000_m9gses.png',
  timer: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487688/Untitled_design_20260406_202607_0000_ekztnc.png',
};

function InlineIcon({ url, className }: { url: string, className?: string }) {
  return (
    <div className={cn(
      "inline-flex items-center justify-center align-middle mx-3 md:mx-4",
      "w-10 h-10 md:w-14 md:h-14 rounded-xl",
      "bg-white/5 bg-black/20 backdrop-blur-xl border border-white/10",
      "relative shadow-[0_0_20px_rgba(0,150,255,0.15)] overflow-hidden",
      className
    )}>
      {/* Specular Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 w-6 h-6 md:w-8 md:h-8">
        <Image 
          src={url}
          alt="icon"
          fill
          className="object-contain filter drop-shadow(0 5px 15px rgba(0,0,0,0.4))"
        />
      </div>
    </div>
  );
}

function FloatingBgIcon({ url, className, delay = 0 }: { url: string, className?: string, delay?: number }) {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-3, 3, -3]
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={cn("absolute z-0 opacity-60 pointer-events-none", className)}
    >
      <div className="relative w-16 h-16 md:w-24 md:h-24">
        <Image 
          src={url}
          alt="decoration"
          fill
          className="object-contain filter drop-shadow(0 10px 20px rgba(0,0,0,0.5))"
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center text-white overflow-hidden bg-[#050b18] py-20 px-4">
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 scale-105 animate-slow-zoom opacity-20">
          <Image 
            src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775485427/b45e6a18d5c4edf0f2803f39b65c6881_cobc8c.jpg"
            alt="Cinematic Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.2)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-white/[0.02]" />
      </div>

      {/* 2. FLOATING BACKGROUND DECORATION */}
      <FloatingBgIcon url={ICONS.gift} className="top-[15%] left-[10%] md:left-[15%]" delay={0} />
      <FloatingBgIcon url={ICONS.dollar} className="top-[20%] right-[10%] md:right-[15%]" delay={2} />

      {/* 3. CORE CONTENT HUB */}
      <div className="relative z-10 w-full max-w-7xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Top Badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span className="text-[9px] font-black text-white/40 tracking-[0.2em] uppercase">Verified Reward System</span>
          </div>

          {/* Powerful Headline for US McDonald's Offer */}
          <h1 className="font-headline flex flex-col items-center justify-center text-4xl sm:text-5xl md:text-8xl font-[900] tracking-tighter uppercase leading-[1] text-white">
            <div className="flex items-center justify-center">
              <span className="text-white/90">Craving</span>
              <InlineIcon url={ICONS.security} />
            </div>
            
            <span 
              className="relative z-10 my-2 md:my-4 text-[#FFC72C] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
              style={{
                background: 'linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 20%, transparent 45%), #FFC72C',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              $100 Reward?
            </span>

            <div className="flex items-center justify-center">
              <span className="text-white/90">Claim Opportunity</span>
              <InlineIcon url={ICONS.timer} />
            </div>
          </h1>

          {/* Subtext */}
          <p className="text-white/70 text-xs sm:text-sm md:text-lg font-medium max-w-lg mx-auto leading-relaxed mt-8 px-4">
            Join our verified community and discover the simplest way to potentially secure a $100 reward for your favorite McDonald's meals.
          </p>
        </motion.div>

        {/* BUTTONS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Button 
            onClick={() => scrollTo('trending')}
            className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 bg-gradient-to-r from-[#009dff] to-[#00e0ff] text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-xl shadow-[0_0_30px_rgba(0,150,255,0.4)] transition-all hover:scale-105 active:scale-95 border-none"
          >
            Claim My Reward Opportunity ⚡
          </Button>

          <button 
            onClick={() => scrollTo('trending')}
            className="w-full sm:w-auto h-14 md:h-16 px-10 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl text-[9px] md:text-[10px] font-black text-white/60 uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
          >
            Explore More Rewards ↓
          </button>
        </motion.div>

        {/* TRUST INDICATORS */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-20 pt-10 border-t border-white/5">
          <div className="flex items-center gap-2">🔒 Secure Email Submit</div>
          <div className="flex items-center gap-2">⚡ Instant Delivery Destination</div>
          <div className="flex items-center gap-2">🌍 US Exclusive Opportunity</div>
        </div>
      </div>
    </section>
  );
}
