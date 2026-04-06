'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, ArrowRight, ShieldCheck, Globe, Lock } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Cinematic Premium Hero Section.
 * Enhanced with 3D liquid glass nodes containing specialized infrastructure icons.
 */

const SIDE_ICONS = [
  { id: 'amazon', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png', pos: { top: '25%', left: '5%' }, size: 'w-12', depth: 0.4, opacity: 0.3, blur: true },
  { id: 'roblox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', pos: { top: '65%', left: '90%' }, size: 'w-10', depth: 0.6, opacity: 0.2 },
  { id: 'steam', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', pos: { top: '15%', right: '5%' }, size: 'w-14', depth: 0.3, opacity: 0.1, blur: true },
];

const SPECIAL_NODES = [
  { 
    id: 'security', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487684/Untitled_design_20260406_202944_0000_uw8yuv.png',
    pos: 'top-[12%] left-[8%] md:top-[18%] md:left-[12%]',
    delay: 0,
    scale: 1
  },
  { 
    id: 'dollar', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487682/Untitled_design_20260406_202119_0000_zlzp6a.png',
    pos: 'top-[12%] right-[8%] md:top-[18%] md:right-[12%]',
    delay: 1.2,
    scale: 0.95
  },
  { 
    id: 'gift', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487685/Untitled_design_20260406_202010_0000_m9gses.png',
    pos: 'bottom-[12%] left-[8%] md:bottom-[18%] md:left-[12%]',
    delay: 2.4,
    scale: 1.05
  },
  { 
    id: 'timer', 
    url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487688/Untitled_design_20260406_202607_0000_ekztnc.png',
    pos: 'bottom-[12%] right-[8%] md:bottom-[18%] md:right-[12%]',
    delay: 3.6,
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
      
      {/* 1. CINEMATIC BACKGROUND ARCHITECTURE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 scale-105 animate-slow-zoom">
          <Image 
            src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775485427/b45e6a18d5c4edf0f2803f39b65c6881_cobc8c.jpg"
            alt="Cinematic Reward Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.08),transparent_70%)]" />
        <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:radial-gradient(circle,transparent_40%,black_100%)]" />
      </div>

      {/* 2. SUBTLE SIDE FLOATERS (Depth of Field) */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none hidden lg:block">
        {SIDE_ICONS.map((icon) => (
          <ParallaxIcon key={icon.id} icon={icon} mouseX={smoothX} mouseY={smoothY} />
        ))}
      </div>

      {/* 3. SPECIALIZED 3D LIQUID GLASS NODES */}
      <div className="absolute inset-0 z-20 pointer-events-none select-none overflow-hidden">
        {SPECIAL_NODES.map((node) => (
          <motion.div
            key={node.id}
            style={{ 
              x: useTransform(smoothX, [-1, 1], [-25, 25]),
              y: useTransform(smoothY, [-1, 1], [-25, 25])
            }}
            className={cn("absolute flex items-center justify-center z-20", node.pos)}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [-2, 2, -2],
                scale: [node.scale, node.scale * 1.03, node.scale]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay
              }}
              className="relative"
            >
              {/* Liquid Glass Container */}
              <div className={cn(
                "relative w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center p-6",
                "shadow-[inset_0_0_25px_rgba(255,255,255,0.05),0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,150,255,0.1)]",
                "opacity-80 md:opacity-100"
              )}>
                
                {/* Specular Highlight */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-40 pointer-events-none" />
                
                {/* Outer Glow */}
                <div className="absolute -inset-1 rounded-3xl bg-white/5 blur-md pointer-events-none" />

                {/* Icon Container */}
                <div className="relative z-10 w-full h-full">
                  <Image 
                    src={node.url}
                    alt={node.id}
                    fill
                    className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                  />
                </div>

                {/* Internal Refraction Glow */}
                <div className="absolute inset-6 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 4. CORE CONTENT HUB */}
      <div className="relative z-30 w-full max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="mb-10 inline-flex items-center gap-2.5 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl opacity-70">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black text-white/80 tracking-[0.2em] uppercase">Verified Reward System</span>
          </div>

          <div className="space-y-5">
            <h1 className="font-headline text-5xl md:text-8xl font-[900] tracking-tighter uppercase leading-[0.95] text-white">
              Unlock <span className="bg-gradient-to-r from-[#FA4616] to-[#0095FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(250,70,22,0.2)]">Premium</span> <br />
              Rewards <span className="text-white/90">in Minutes</span>
            </h1>

            <p className="text-white/70 text-sm md:text-lg font-medium max-w-md mx-auto leading-relaxed mt-4">
              Complete simple steps and unlock real gift cards instantly.
            </p>

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

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pt-16 mt-12 border-t border-white/5">
              <div className="flex items-center gap-2">🔒 Verified Secure</div>
              <div className="flex items-center gap-2">⚡ Instant Delivery</div>
              <div className="flex items-center gap-2">🌍 Global Access</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
      className={cn("absolute transform -translate-x-1/2 -translate-y-1/2", icon.blur ? 'blur-[3px]' : '')}
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
