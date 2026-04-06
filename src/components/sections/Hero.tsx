'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, ArrowRight, ShieldCheck, Globe, Lock } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Premium Blue-White Luxury Hero.
 * Infrastructure nodes orbit BEHIND the text hub for maximum readability.
 */

const SPECIAL_NODES = [
  { 
    id: 'security', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487684/Untitled_design_20260406_202944_0000_uw8yuv.png',
    pos: 'top-[5%] left-[5%] md:top-[-10%] md:left-[15%]',
    delay: 0,
    scale: 0.9
  },
  { 
    id: 'dollar', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487682/Untitled_design_20260406_202119_0000_zlzp6a.png',
    pos: 'top-[5%] right-[5%] md:top-[-10%] md:right-[15%]',
    delay: 1.5,
    scale: 0.85
  },
  { 
    id: 'gift', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487685/Untitled_design_20260406_202010_0000_m9gses.png',
    pos: 'bottom-[5%] left-[5%] md:bottom-[-10%] md:left-[15%]',
    delay: 3,
    scale: 0.95
  },
  { 
    id: 'timer', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487688/Untitled_design_20260406_202607_0000_ekztnc.png',
    pos: 'bottom-[5%] right-[5%] md:bottom-[-10%] md:right-[15%]',
    delay: 4.5,
    scale: 0.8
  }
];

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
        
        {/* Core Navy Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050b18] via-[#0a1a2f] to-[#050b18]" />
        
        {/* Primary Blue Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,157,255,0.2)_0%,transparent_65%)]" />
        
        {/* Edge Softening */}
        <div className="absolute inset-0 backdrop-blur-[1px] [mask-image:radial-gradient(circle,transparent_50%,black_100%)]" />
      </div>

      {/* 2. INFRASTRUCTURE NODES (BACKGROUND LAYER) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {SPECIAL_NODES.map((node) => (
          <motion.div
            key={node.id}
            style={{ 
              x: useTransform(smoothX, [-1, 1], [-20, 20]),
              y: useTransform(smoothY, [-1, 1], [-20, 20])
            }}
            className={cn("absolute flex items-center justify-center opacity-50 blur-[1px]", node.pos)}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 2, -2],
                scale: [node.scale, node.scale * 1.02, node.scale]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay
              }}
              className="relative group"
            >
              <div className={cn(
                "relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 flex items-center justify-center p-5",
                "shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,157,255,0.1)]"
              )}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 pointer-events-none" />
                <div className="relative z-10 w-full h-full">
                  <Image 
                    src={node.url}
                    alt={node.id}
                    fill
                    className="object-contain drop-shadow-[0_0_20px_rgba(0,157,255,0.5)]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 3. CORE CONTENT HUB (FOREGROUND LAYER) */}
      <div className="relative z-10 w-full max-w-5xl px-4 text-center">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-400 drop-shadow-[0_0_35px_rgba(0,157,255,0.7)]">
              Premium Rewards
            </span> <br />
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
