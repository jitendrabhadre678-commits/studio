'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Minimal Luxury Hero.
 * Features glass-etched typography and subtle 3D orbiters for a high-end feel.
 */

const SPECIAL_NODES = [
  { 
    id: 'security', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487684/Untitled_design_20260406_202944_0000_uw8yuv.png',
    delay: 0,
  },
  { 
    id: 'dollar', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487682/Untitled_design_20260406_202119_0000_zlzp6a.png',
    delay: 1.5,
  },
  { 
    id: 'gift', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487685/Untitled_design_20260406_202010_0000_m9gses.png',
    delay: 3,
  },
  { 
    id: 'timer', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487688/Untitled_design_20260406_202607_0000_ekztnc.png',
    delay: 4.5,
  }
];

function IconNode({ url, delay, className }: { url: string, delay: number, className?: string }) {
  return (
    <motion.div
      animate={{
        y: [-4, 4, -4],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={cn(
        "w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center p-3 md:p-4",
        "shadow-lg relative group",
        className
      )}
    >
      <div className="relative z-10 w-full h-full">
        <Image 
          src={url}
          alt="node icon"
          fill
          className="object-contain filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) * 2 - 1);
      mouseY.set((clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#050b18] via-[#0a1a2f] to-[#050b18]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,157,255,0.1)_0%,transparent_70%)]" />
      </div>

      {/* 2. CORE CONTENT HUB */}
      <div className="relative z-10 w-full max-w-7xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="mb-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span className="text-[9px] font-black text-white/40 tracking-[0.2em] uppercase">Verified Reward System</span>
          </div>

          <h1 className="font-headline flex flex-col items-center justify-center text-5xl md:text-8xl font-[900] tracking-tighter uppercase leading-[0.95] text-white">
            <span className="text-white/90">Unlock</span>
            
            <div className="relative inline-flex items-center justify-center my-4 md:my-6">
              {/* Left Orbiters */}
              <div className="hidden xl:flex absolute right-[calc(100%+24px)] items-center gap-4">
                <IconNode url={SPECIAL_NODES[0].url} delay={0} />
                <IconNode url={SPECIAL_NODES[2].url} delay={1.5} />
              </div>

              {/* Main Glass Text */}
              <span 
                className="relative z-10 text-[#00aaff] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                style={{
                  background: 'linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 20%, transparent 45%), #00aaff',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Premium Rewards
              </span>

              {/* Right Orbiters */}
              <div className="hidden xl:flex absolute left-[calc(100%+24px)] items-center gap-4">
                <IconNode url={SPECIAL_NODES[1].url} delay={3} />
                <IconNode url={SPECIAL_NODES[3].url} delay={4.5} />
              </div>
            </div>

            <span className="text-white/90">in Minutes</span>
          </h1>

          <p className="text-white/60 text-sm md:text-lg font-medium max-w-md mx-auto leading-relaxed mt-10">
            Complete simple steps, engage with verified partners, and unlock real gift cards instantly.
          </p>
        </motion.div>

        {/* BUTTONS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <Button 
            onClick={() => scrollTo('trending')}
            className="w-full sm:w-auto h-16 px-12 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl shadow-[0_15px_40px_rgba(0,157,255,0.25)] transition-all hover:scale-105 active:scale-95 border-none"
          >
            Get Started ⚡
          </Button>

          <button 
            onClick={() => scrollTo('trending')}
            className="w-full sm:w-auto h-16 px-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-[10px] font-black text-white/60 uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
          >
            Explore Gift Cards ↓
          </button>
        </motion.div>

        {/* TRUST INDICATORS */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-24 pt-10 border-t border-white/5">
          <div className="flex items-center gap-2">🔒 Verified Secure</div>
          <div className="flex items-center gap-2">⚡ Instant Delivery</div>
          <div className="flex items-center gap-2">🌍 Global Access</div>
        </div>
      </div>
    </section>
  );
}
