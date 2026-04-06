'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, ArrowRight, ShieldCheck, Globe, Lock, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Ultra-Premium 3D Glass Hero Section.
 * Features realistic glass text, orbiting liquid nodes, and a luxury blue spotlight design.
 */

const SPECIAL_NODES = [
  { 
    id: 'security', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487684/Untitled_design_20260406_202944_0000_uw8yuv.png',
    pos: 'top-[-15%] left-[5%] md:top-[-25%] md:left-[10%]',
    delay: 0,
    scale: 1
  },
  { 
    id: 'dollar', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487682/Untitled_design_20260406_202119_0000_zlzp6a.png',
    pos: 'top-[-15%] right-[5%] md:top-[-25%] md:right-[10%]',
    delay: 1.5,
    scale: 0.95
  },
  { 
    id: 'gift', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487685/Untitled_design_20260406_202010_0000_m9gses.png',
    pos: 'bottom-[-15%] left-[5%] md:bottom-[-25%] md:left-[10%]',
    delay: 3,
    scale: 1.05
  },
  { 
    id: 'timer', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487688/Untitled_design_20260406_202607_0000_ekztnc.png',
    pos: 'bottom-[-15%] right-[5%] md:bottom-[-25%] md:right-[10%]',
    delay: 4.5,
    scale: 0.9
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
    <section className="relative min-h-[95vh] flex items-center justify-center text-white overflow-hidden bg-[#050505] py-20 px-4">
      
      {/* 1. CINEMATIC BACKGROUND IMAGE & GRADIENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 scale-105 animate-slow-zoom opacity-40">
          <Image 
            src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775485427/b45e6a18d5c4edf0f2803f39b65c6881_cobc8c.jpg"
            alt="Cinematic Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Core Luxury Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#020617] to-black" />
        
        {/* Primary Blue Spotlight Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.25)_0%,transparent_65%)]" />
        
        {/* Particle/Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Edge Softening */}
        <div className="absolute inset-0 backdrop-blur-[1px] [mask-image:radial-gradient(circle,transparent_50%,black_100%)]" />
      </div>

      {/* 2. CORE CONTENT HUB */}
      <div className="relative z-30 w-full max-w-5xl px-4">
        
        {/* HEADING & ORBITING NODES WRAPPER */}
        <div className="relative mb-12">
          
          {/* ORBITING 3D GLASS NODES */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {SPECIAL_NODES.map((node) => (
              <motion.div
                key={node.id}
                style={{ 
                  x: useTransform(smoothX, [-1, 1], [-30, 30]),
                  y: useTransform(smoothY, [-1, 1], [-30, 30])
                }}
                className={cn("absolute flex items-center justify-center", node.pos)}
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [-3, 3, -3],
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
                  {/* Liquid Glass Container */}
                  <div className={cn(
                    "relative w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 flex items-center justify-center p-5 md:p-7",
                    "shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,150,255,0.15)]",
                    "animate-pulse-glow"
                  )}>
                    
                    {/* Diagonal Shine Overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-30 pointer-events-none" />
                    
                    {/* Outer Blue-White Glow */}
                    <div className="absolute -inset-1 rounded-3xl bg-blue-500/5 blur-lg pointer-events-none" />

                    {/* Icon Content */}
                    <div className="relative z-10 w-full h-full">
                      <Image 
                        src={node.url}
                        alt={node.id}
                        fill
                        className="object-contain drop-shadow-[0_0_20px_rgba(0,150,255,0.5)]"
                      />
                    </div>

                    {/* Internal Depth Glow */}
                    <div className="absolute inset-4 rounded-full bg-blue-400/5 blur-xl pointer-events-none" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* MAIN HEADING - 3D GLASS STYLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative z-10"
          >
            <div className="mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-2xl bg-blue-500/5 border border-blue-500/10 backdrop-blur-xl shadow-2xl">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] font-black text-blue-200/60 tracking-[0.2em] uppercase">Verified Reward Node</span>
            </div>

            <h1 className="font-headline text-5xl md:text-8xl font-[900] tracking-tighter uppercase leading-[0.9] text-white">
              Unlock <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-400 drop-shadow-[0_0_35px_rgba(0,150,255,0.7)] filter">
                Premium Rewards
              </span> <br />
              <span className="text-white/90">in Minutes</span>
            </h1>

            <p className="text-white/50 text-sm md:text-lg font-medium max-w-md mx-auto leading-relaxed mt-8">
              Complete simple steps, engage with verified partners, and unlock real gift cards instantly.
            </p>
          </motion.div>
        </div>

        {/* BUTTONS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <Button 
            onClick={() => scrollTo('trending')}
            className="w-full sm:w-auto h-16 px-12 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black uppercase tracking-[0.2em] text-sm rounded-xl shadow-[0_15px_40px_rgba(0,150,255,0.35)] transition-all hover:scale-105 active:scale-95 group border-none"
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

        {/* TRUST INDICATORS BASEBAR */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-24 pt-10 border-t border-white/5">
          <div className="flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> Verified SSL</div>
          <div className="flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> Instant Codes</div>
          <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> Global Access</div>
        </div>
      </div>

      {/* SUBTLE BACKGROUND FLOATERS (FAR DEPTH) */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none opacity-20 hidden lg:block">
        <div className="absolute top-[20%] left-[5%] w-12 animate-float blur-[2px]">
          <Image src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png" alt="bg" width={100} height={100} className="object-contain" />
        </div>
        <div className="absolute bottom-[20%] right-[5%] w-14 animate-float blur-[3px]" style={{ animationDelay: '2s' }}>
          <Image src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png" alt="bg" width={100} height={100} className="object-contain" />
        </div>
      </div>
    </section>
  );
}
