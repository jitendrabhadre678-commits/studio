
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { RewardVerificationModal } from '@/components/reward/RewardVerificationModal';

/**
 * @fileOverview Premium Cinematic Hero Section.
 * Features floating PNG gift cards with unique staggered animations.
 */

const FLOATING_LOGOS = [
  { id: 'google', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png', pos: 'top-[10%] left-[10%]', size: 'w-12 md:w-16', delay: '0s', dur: '6s', op: 'opacity-40' },
  { id: 'roblox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', pos: 'top-[15%] right-[12%]', size: 'w-16 md:w-20', delay: '1s', dur: '7s', op: 'opacity-60' },
  { id: 'steam', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', pos: 'top-[40%] left-[5%]', size: 'w-20 md:w-24', delay: '2s', dur: '8s', op: 'opacity-100' },
  { id: 'fortnite', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png', pos: 'top-[45%] right-[8%]', size: 'w-16 md:w-20', delay: '0.5s', dur: '5s', op: 'opacity-80' },
  { id: 'walmart', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463548/7_20260406_134035_0006_qkousw.png', pos: 'bottom-[15%] left-[12%]', size: 'w-12 md:w-16', delay: '3s', dur: '6.5s', op: 'opacity-50' },
  { id: 'target', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/9_20260406_134035_0008_nnznij.png', pos: 'bottom-[10%] right-[10%]', size: 'w-16 md:w-20', delay: '1.5s', dur: '7.5s', op: 'opacity-70' },
  { id: 'bestbuy', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/8_20260406_134035_0007_jumtpc.png', pos: 'top-[5%] left-[45%]', size: 'w-14', delay: '4s', dur: '9s', op: 'opacity-30' },
  { id: 'nintendo', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463546/4_20260406_134035_0003_jvi4ke.png', pos: 'bottom-[5%] left-[40%]', size: 'w-14', delay: '2.5s', dur: '8.5s', op: 'opacity-40' },
  { id: 'ebay', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463541/5_20260406_134035_0004_nikubw.png', pos: 'top-[60%] left-[15%]', size: 'w-16', delay: '1.2s', dur: '6s', op: 'opacity-60' },
  { id: 'xbox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463539/1_20260406_134035_0000_i04tox.png', pos: 'top-[70%] right-[15%]', size: 'w-18', delay: '0.8s', dur: '7s', op: 'opacity-50' },
  { id: 'amazon', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png', pos: 'top-[25%] left-[25%]', size: 'w-20', delay: '2.2s', dur: '10s', op: 'opacity-100' },
  { id: 'psn', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463534/2_20260406_134035_0001_sf7lub.png', pos: 'bottom-[25%] right-[20%]', size: 'w-20', delay: '3.5s', dur: '9s', op: 'opacity-90' },
];

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative h-[95vh] md:h-screen flex items-center justify-center text-white overflow-hidden bg-[#000000]">
      
      {/* 1. LAYER: BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050a20] to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
        
        {/* Subtle Static Particles (Simulated via overlay) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* 2. LAYER: FLOATING LOGO CLOUD */}
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
            <div className="relative w-full aspect-square">
              <Image 
                src={logo.url} 
                alt={logo.id} 
                fill 
                className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      {/* 3. LAYER: CENTER CONTENT */}
      <div className="relative z-20 text-center px-4 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-20 shadow-2xl relative overflow-hidden group">
            {/* Inner Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-[10px] font-black text-white/80 tracking-[0.3em] uppercase">
                Trending Rewards Hub 2026
              </span>
            </div>

            <h1 className="font-headline text-5xl md:text-8xl font-black mb-6 leading-[0.9] text-white uppercase tracking-tighter">
              Trending <br /><span className="text-primary text-glow">Gift Cards</span>
            </h1>

            <p className="text-white/60 text-base md:text-xl leading-relaxed font-medium mb-12 max-w-md mx-auto">
              Unlock premium rewards instantly. Complete simple verified steps and claim your digital codes.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="h-20 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-xl rounded-2xl shadow-[0_10px_50px_rgba(250,70,22,0.4)] transition-all hover:scale-[1.05] active:scale-95 group"
              >
                Reveal Reward Code <Zap className="ml-3 w-6 h-6 fill-white group-hover:scale-125 transition-transform" />
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Verified SSL</div>
              <span className="w-1 h-1 bg-white/10 rounded-full" />
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Instant Codes</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. MODAL INTEGRATION */}
      <RewardVerificationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brand="Premium"
        value="Selected"
      />

      <style jsx global>{`
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
      `}</style>
    </section>
  );
}
