
"use client";

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import Image from 'next/image';

/**
 * @fileOverview Premium Luxury Hero Section.
 * Features a Liquid Glass center hub, Spotlight background, 
 * and Mouse-Tracked Parallax floating gift cards.
 */

const FLOATING_ICONS = [
  { id: 'roblox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', pos: { top: '15%', left: '15%' }, size: 'w-14', depth: 0.8, opacity: 0.6 },
  { id: 'steam', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', pos: { top: '25%', left: '80%' }, size: 'w-20', depth: 0.5, opacity: 0.4, blur: true },
  { id: 'fortnite', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png', pos: { top: '70%', left: '10%' }, size: 'w-16', depth: 0.9, opacity: 0.7 },
  { id: 'xbox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463539/1_20260406_134035_0000_i04tox.png', pos: { top: '75%', left: '85%' }, size: 'w-14', depth: 0.6, opacity: 0.5 },
  { id: 'google', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png', pos: { top: '10%', left: '70%' }, size: 'w-12', depth: 0.4, opacity: 0.3, blur: true },
  { id: 'ps', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463534/2_20260406_134035_0001_sf7lub.png', pos: { top: '60%', left: '75%' }, size: 'w-18', depth: 0.7, opacity: 0.6 },
];

const MAIN_LOGO = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png";

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
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-[#050505] py-20">
      
      {/* 1. LUXURY BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050510] to-[#0a0a20]" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Spotlight Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(0,150,255,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(250,70,22,0.06)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* 2. INTERACTIVE PARALLAX ICONS */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none">
        {FLOATING_ICONS.map((icon) => (
          <ParallaxIcon key={icon.id} icon={icon} mouseX={smoothX} mouseY={smoothY} />
        ))}
      </div>

      {/* 3. CENTER CONTENT HUB */}
      <div className="relative z-20 w-full max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* LIQUID GLASS HUB */}
          <div className="relative mx-auto mb-12 group">
            {/* Outer Glow Reflection */}
            <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-all duration-1000" />
            
            {/* Liquid Container */}
            <div className="relative glass-card aspect-[16/10] w-full max-w-[420px] mx-auto rounded-[2.5rem] border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] flex items-center justify-center p-10 overflow-hidden bg-white/[0.03] backdrop-blur-[40px]">
              
              {/* Soft Highlight (Reflections) */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
              <div className="absolute -top-[50%] -left-[50%] w-full h-full bg-white/5 rounded-full blur-[80px]" />
              
              {/* Main Hub Icon */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-24 h-24 md:w-32 md:h-32"
              >
                <Image 
                  src={MAIN_LOGO} 
                  alt="Feature Reward" 
                  fill 
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                  priority
                />
              </motion.div>

              {/* Status Badge */}
              <div className="absolute bottom-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-[9px] font-black text-white/60 tracking-[0.3em] uppercase">Verified Asset Node</span>
              </div>
            </div>
          </div>

          {/* TYPOGRAPHY */}
          <div className="space-y-6">
            <h1 className="font-headline text-5xl md:text-8xl font-[900] tracking-tighter uppercase leading-[0.9]">
              <span className="block text-white">Unlock</span>
              <span className="block bg-gradient-to-r from-[#FA4616] via-[#ff7a00] to-[#0095FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,70,22,0.2)]">
                Premium
              </span>
              <span className="block text-white">Rewards</span>
            </h1>

            <p className="text-white/40 text-sm md:text-lg font-medium max-w-lg mx-auto leading-relaxed">
              Complete simple steps, engage with verified partners, and <br className="hidden md:block" />
              unlock real digital gift cards in minutes.
            </p>

            {/* ACTION BAR */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button 
                onClick={() => scrollTo('trending')}
                className="w-full sm:w-auto h-16 px-12 bg-gradient-to-r from-[#FA4616] to-[#E3191E] text-white font-black uppercase tracking-[0.2em] text-sm rounded-xl shadow-[0_15px_40px_rgba(250,70,22,0.35)] transition-all hover:scale-[1.03] active:scale-95 group border-none"
              >
                Get Started ⚡
              </Button>

              <button 
                onClick={() => scrollTo('trending')}
                className="w-full sm:w-auto h-16 px-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-[11px] font-black text-white/80 uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
              >
                Explore Gift Cards ↓
              </button>
            </div>

            {/* TRUST INDICATORS */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] pt-12 border-t border-white/5 mt-12">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary/40" /> Secured Node
              </div>
              <div className="flex items-center gap-2.5">
                <Zap className="w-3.5 h-3.5 text-primary/40" /> Instant Unlock
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-3.5 h-3.5 text-primary/40" /> Global Network
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Individual Parallax Icon Component
 */
function ParallaxIcon({ icon, mouseX, mouseY }: { icon: any, mouseX: any, mouseY: any }) {
  const x = useTransform(mouseX, [-1, 1], [icon.depth * -50, icon.depth * 50]);
  const y = useTransform(mouseY, [-1, 1], [icon.depth * -50, icon.depth * 50]);
  const rotate = useTransform(mouseX, [-1, 1], [-5, 5]);

  return (
    <motion.div
      style={{ 
        top: icon.pos.top, 
        left: icon.pos.left, 
        x, 
        y, 
        rotate,
        zIndex: Math.floor(icon.depth * 10),
        opacity: icon.opacity
      }}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${icon.blur ? 'blur-[2px]' : ''}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
        className={icon.size}
      >
        <Image 
          src={icon.url} 
          alt={icon.id} 
          width={100} 
          height={100} 
          className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" 
        />
      </motion.div>
    </motion.div>
  );
}
