
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Sparkles, ChevronRight, Lock } from 'lucide-react';
import Image from 'next/image';

/**
 * @fileOverview Premium Cinematic Hero Section.
 * Features a high-conversion central glassmorphism hub with floating background elements.
 */

const FLOATING_LOGOS = [
  { id: 'google', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png', pos: 'top-[10%] left-[10%]', size: 'w-12 md:w-16', delay: '0s', dur: '6s', op: 'opacity-20' },
  { id: 'roblox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', pos: 'top-[15%] right-[12%]', size: 'w-16 md:w-20', delay: '1s', dur: '7s', op: 'opacity-30' },
  { id: 'steam', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', pos: 'top-[40%] left-[5%]', size: 'w-20 md:w-24', delay: '2s', dur: '8s', op: 'opacity-40' },
  { id: 'fortnite', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png', pos: 'top-[45%] right-[8%]', size: 'w-16 md:w-20', delay: '0.5s', dur: '5s', op: 'opacity-30' },
  { id: 'walmart', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463548/7_20260406_134035_0006_qkousw.png', pos: 'bottom-[15%] left-[12%]', size: 'w-12 md:w-16', delay: '3s', dur: '6.5s', op: 'opacity-20' },
  { id: 'target', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/9_20260406_134035_0008_nnznij.png', pos: 'bottom-[10%] right-[10%]', size: 'w-16 md:w-20', delay: '1.5s', dur: '7.5s', op: 'opacity-20' },
  { id: 'amazon', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png', pos: 'top-[25%] left-[25%]', size: 'w-20', delay: '2.2s', dur: '10s', op: 'opacity-40' },
  { id: 'psn', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463534/2_20260406_134035_0001_sf7lub.png', pos: 'bottom-[25%] right-[20%]', size: 'w-20', delay: '3.5s', dur: '9s', op: 'opacity-30' },
];

export function Hero() {
  return (
    <section className="relative h-[95vh] md:h-screen flex items-center justify-center text-white overflow-hidden bg-[#000000]">
      
      {/* BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(250,70,22,0.08)_0%,transparent_70%)]" />
      </div>

      {/* FLOATING LOGO CLOUD (Low Opacity for Depth) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {FLOATING_LOGOS.map((logo) => (
          <div 
            key={logo.id}
            className={`absolute ${logo.pos} ${logo.size} ${logo.op} transition-opacity duration-1000`}
            style={{
              animation: `float-rotate ${logo.dur} ease-in-out infinite`,
              animationDelay: logo.delay
            }}
          >
            <div className="relative w-full aspect-square grayscale contrast-125">
              <Image 
                src={logo.url} 
                alt={logo.id} 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      {/* CENTER GLASS HUB */}
      <div className="relative z-20 text-center px-4 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 md:p-24 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            {/* Inner Atmospheric Glow */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-10 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-[10px] font-black text-white/80 tracking-[0.35em] uppercase">
                Trending Rewards Hub 2026
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-headline text-6xl md:text-9xl font-black mb-8 leading-[0.85] text-white uppercase tracking-tighter">
              Trending <br />
              <span className="bg-gradient-to-r from-primary via-[#ff7a00] to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,70,22,0.3)]">
                GIFT CARDS
              </span>
            </h1>

            {/* Description */}
            <p className="text-white/50 text-base md:text-xl leading-relaxed font-medium mb-14 max-w-lg mx-auto">
              Unlock premium rewards instantly. <br />
              Complete simple verified steps and claim your digital codes.
            </p>

            {/* High-Contrast Button (Non-clickable as requested) */}
            <div className="relative z-10 flex justify-center">
              <Button 
                className="h-20 px-16 bg-gradient-to-r from-primary to-[#ff7a00] text-white font-black uppercase tracking-[0.25em] text-xl rounded-full shadow-[0_15px_50px_rgba(250,70,22,0.4)] transition-all hover:scale-[1.05] cursor-default active:scale-100 group border-none"
              >
                REVEAL REWARD CODE <Zap className="ml-3 w-6 h-6 fill-white group-hover:scale-125 transition-transform" />
              </Button>
            </div>

            {/* Bottom Trust Line */}
            <div className="mt-16 flex items-center justify-center gap-10 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-primary/40" /> 
                Verified SSL
              </div>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-primary/40" /> 
                Instant Codes
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
      `}</style>
    </section>
  );
}
