'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, ArrowRight, ShieldCheck, Globe, Lock } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Refined Blue-White Luxury Hero.
 * Infrastructure nodes orbit beside the core "Premium Rewards" line for maximum impact.
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
        y: [-8, 8, -8],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={cn(
        "w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center p-3.5 md:p-5",
        "shadow-[0_0_25px_rgba(0,150,255,0.3),inset_0_0_15px_rgba(255,255,255,0.05)]",
        "relative group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none rounded-2xl" />
      <div className="relative z-10 w-full h-full">
        <Image 
          src={url}
          alt="node icon"
          fill
          className="object-contain drop-shadow-[0_0_20px_rgba(0,157,255,0.5)]"
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
        <div className="absolute inset-0 scale-105 animate-slow-zoom opacity-30">
          <Image 
            src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775485427/b45e6a18d5c4edf0f2803f39b65c6881_cobc8c.jpg"
            alt="Cinematic Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#050b18] via-[#0a1a2f] to-[#050b18]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,157,255,0.2)_0%,transparent_65%)]" />
        <div className="absolute inset-0 backdrop-blur-[1px] [mask-image:radial-gradient(circle,transparent_50%,black_100%)]" />
      </div>

      {/* 2. CORE CONTENT HUB */}
      <div className="relative z-10 w-full max-w-7xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-2xl bg-blue-500/5 border border-blue-500/10 backdrop-blur-xl shadow-2xl">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-black text-blue-200/60 tracking-[0.2em] uppercase">Reward Infrastructure Active</span>
          </div>

          <h1 className="font-headline text-5xl md:text-8xl font-[900] tracking-tighter uppercase leading-[0.9] text-white">
            Unlock <br />
            
            <div className="relative inline-flex items-center justify-center my-4 md:my-6">
              {/* Left Orbiters */}
              <div className="hidden xl:flex absolute right-[calc(100%+40px)] items-center gap-6">
                <IconNode url={SPECIAL_NODES[0].url} delay={0} />
                <IconNode url={SPECIAL_NODES[2].url} delay={1.5} />
              </div>

              {/* Main Glowing Text */}
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#00aaff] to-[#00e0ff] drop-shadow-[0_0_25px_rgba(0,170,255,0.6)] [text-shadow:0_0_20px_rgba(0,150,255,0.6),0_0_40px_rgba(0,150,255,0.3)]">
                Premium Rewards
                {/* Text Aura Background */}
                <div className="absolute inset-0 -z-10 bg-[#009dff]/10 blur-[60px] rounded-full scale-150" />
              </span>

              {/* Right Orbiters */}
              <div className="hidden xl:flex absolute left-[calc(100%+40px)] items-center gap-6">
                <IconNode url={SPECIAL_NODES[1].url} delay={3} />
                <IconNode url={SPECIAL_NODES[3].url} delay={4.5} />
              </div>
            </div>

            <br />
            <span className="text-white/90">in Minutes</span>
          </h1>

          <p className="text-white/60 text-sm md:text-lg font-medium max-w-md mx-auto leading-relaxed mt-8">
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
            className="w-full sm:w-auto h-16 px-12 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black uppercase tracking-[0.2em] text-sm rounded-xl shadow-[0_15px_40px_rgba(0,157,255,0.35)] transition-all hover:scale-105 active:scale-95 border-none"
          >
            Get Started ⚡
          </Button>

          <button 
            onClick={() => scrollTo('trending')}
            className="w-full sm:w-auto h-16 px-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-[11px] font-black text-white/60 uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
          >
            Explore Gift Cards ↓
          </button>
        </motion.div>

        {/* TRUST INDICATORS */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-24 pt-10 border-t border-white/5">
          <div className="flex items-center gap-2">🔒 Verified Secure</div>
          <div className="flex items-center gap-2">⚡ Instant Delivery</div>
          <div className="flex items-center gap-2">🌍 Global Access</div>
        </div>
      </div>
    </section>
  );
}
