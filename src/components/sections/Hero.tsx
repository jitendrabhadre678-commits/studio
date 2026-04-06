
"use client";

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, ArrowRight, ShieldCheck, Globe, Lock } from 'lucide-react';
import Image from 'next/image';

/**
 * @fileOverview Optimized Premium Luxury Hero Section.
 * Features: High-conversion typography, clean glass UI, and subtle side-floating depth.
 */

const SIDE_ICONS = [
  { id: 'amazon', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png', pos: { top: '25%', left: '8%' }, size: 'w-16', depth: 0.4, opacity: 0.4, blur: true },
  { id: 'roblox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', pos: { top: '65%', left: '85%' }, size: 'w-14', depth: 0.6, opacity: 0.3 },
  { id: 'steam', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', pos: { top: '15%', right: '10%' }, size: 'w-18', depth: 0.3, opacity: 0.2, blur: true },
];

const MAIN_HERO_LOGO = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png";

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
    <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden bg-[#050505] py-20 px-4">
      
      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050510] to-[#0a0a20]" />
        
        {/* Centralized Focus Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(0,150,255,0.2)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(255,70,22,0.08)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* 2. SUBTLE SIDE FLOATERS */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none hidden lg:block">
        {SIDE_ICONS.map((icon) => (
          <ParallaxIcon key={icon.id} icon={icon} mouseX={smoothX} mouseY={smoothY} />
        ))}
      </div>

      {/* 3. CORE CONTENT HUB */}
      <div className="relative z-20 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Subtle Top Badge - Verified Reward System */}
          <div className="mb-10 inline-flex items-center gap-2.5 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <ShieldCheck className="w-3.5 h-3.5 text-primary opacity-70" />
            <span className="text-[10px] font-black text-white/60 tracking-[0.2em] uppercase">Verified Reward System</span>
          </div>

          {/* MAIN HEADING */}
          <div className="space-y-5">
            <h1 className="font-headline text-5xl md:text-8xl font-[900] tracking-tighter uppercase leading-[0.95] text-white">
              Unlock <span className="bg-gradient-to-r from-[#FA4616] via-[#ff7a00] to-[#0095FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(250,70,22,0.2)]">Premium</span> <br />
              Rewards <span className="text-white/90">in Minutes</span>
            </h1>

            <p className="text-white/70 text-sm md:text-lg font-medium max-w-lg mx-auto leading-relaxed mt-4">
              Complete simple steps and unlock real gift cards instantly.
            </p>

            {/* ACTION BAR */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
              <Button 
                onClick={() => scrollTo('trending')}
                className="w-full sm:w-auto h-16 px-12 bg-gradient-to-r from-[#FA4616] to-[#E3191E] text-white font-black uppercase tracking-[0.2em] text-sm rounded-xl shadow-[0_15px_40px_rgba(250,70,22,0.35)] transition-all hover:scale-105 active:scale-95 group border-none"
              >
                Get Started ⚡
              </Button>

              <button 
                onClick={() => scrollTo('trending')}
                className="w-full sm:w-auto h-16 px-10 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl text-[11px] font-black text-white/80 uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
              >
                Explore Gift Cards ↓
              </button>
            </div>

            {/* TRUST INDICATORS */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pt-16 mt-12 border-t border-white/5">
              <div className="flex items-center gap-2 opacity-70">
                🔒 Verified Secure
              </div>
              <div className="flex items-center gap-2 opacity-70">
                ⚡ Instant Delivery
              </div>
              <div className="flex items-center gap-2 opacity-70">
                🌍 Global Access
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Individual Parallax Icon Component for Side Floating Elements
 */
function ParallaxIcon({ icon, mouseX, mouseY }: { icon: any, mouseX: any, mouseY: any }) {
  const x = useTransform(mouseX, [-1, 1], [icon.depth * -40, icon.depth * 40]);
  const y = useTransform(mouseY, [-1, 1], [icon.depth * -40, icon.depth * 40]);

  return (
    <motion.div
      style={{ 
        top: icon.pos.top, 
        left: icon.pos.left,
        right: icon.pos.right,
        x, 
        y, 
        zIndex: 10,
        opacity: icon.opacity
      }}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${icon.blur ? 'blur-[3px]' : ''}`}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
        className={icon.size}
      >
        <Image 
          src={icon.url} 
          alt={icon.id} 
          width={120} 
          height={120} 
          className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
        />
      </motion.div>
    </motion.div>
  );
}
