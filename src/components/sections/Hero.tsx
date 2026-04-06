
"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Globe, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

/**
 * @fileOverview Premium SaaS-Inspired Dark Hero Section with Side Vault Panels.
 * Features a centered glass container flanked by vertical display columns 
 * containing floating gift card PNGs for enhanced depth.
 */

const LEFT_PANEL_LOGOS = [
  { id: 'amazon', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png', size: 'w-12', dur: '6s', delay: '0s', depth: false },
  { id: 'roblox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', size: 'w-14', dur: '7s', delay: '1s', depth: true },
  { id: 'walmart', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463548/7_20260406_134035_0006_qkousw.png', size: 'w-10', dur: '5.5s', delay: '0.5s', depth: false },
  { id: 'bestbuy', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/8_20260406_134035_0007_jumtpc.png', size: 'w-12', dur: '8s', delay: '2s', depth: true },
  { id: 'ebay', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463541/5_20260406_134035_0004_nikubw.png', size: 'w-14', dur: '6.5s', delay: '1.5s', depth: false },
];

const RIGHT_PANEL_LOGOS = [
  { id: 'steam', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', size: 'w-14', dur: '7.5s', delay: '0.2s', depth: false },
  { id: 'google', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png', size: 'w-12', dur: '6s', delay: '1.2s', depth: true },
  { id: 'ps', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463534/2_20260406_134035_0001_sf7lub.png', size: 'w-16', dur: '5s', delay: '0.8s', depth: false },
  { id: 'xbox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463539/1_20260406_134035_0000_i04tox.png', size: 'w-12', dur: '8.5s', delay: '2.5s', depth: true },
  { id: 'fortnite', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png', size: 'w-14', dur: '7s', delay: '1.8s', depth: false },
];

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-[#000000] py-20 md:py-0">
      
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050505] to-black" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
      </div>

      {/* SIDE VAULT PANELS (DESKTOP) */}
      <div className="hidden xl:flex absolute inset-y-0 left-10 items-center z-10 pointer-events-none">
        <div className="w-32 h-[70vh] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl flex flex-col items-center justify-around p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
          {LEFT_PANEL_LOGOS.map((logo) => (
            <div 
              key={logo.id}
              className={`relative ${logo.size} aspect-square ${logo.depth ? 'opacity-40 blur-[1px]' : 'opacity-100'} transition-all duration-700`}
              style={{
                animation: `hero-float ${logo.dur} ease-in-out infinite`,
                animationDelay: logo.delay
              }}
            >
              <Image src={logo.url} alt={logo.id} fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden xl:flex absolute inset-y-0 right-10 items-center z-10 pointer-events-none">
        <div className="w-32 h-[70vh] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl flex flex-col items-center justify-around p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-blue-500/5" />
          {RIGHT_PANEL_LOGOS.map((logo) => (
            <div 
              key={logo.id}
              className={`relative ${logo.size} aspect-square ${logo.depth ? 'opacity-40 blur-[1px]' : 'opacity-100'} transition-all duration-700`}
              style={{
                animation: `hero-float ${logo.dur} ease-in-out infinite`,
                animationDelay: logo.delay
              }}
            >
              <Image src={logo.url} alt={logo.id} fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            </div>
          ))}
        </div>
      </div>

      {/* CENTERED SAAS HUB */}
      <div className="relative z-20 w-full max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-card rounded-2xl p-8 md:p-16 shadow-[0_0_80px_rgba(0,0,0,0.6)] text-center relative overflow-hidden bg-white/[0.03] backdrop-blur-[40px] border-white/10">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-white/60 tracking-[0.25em] uppercase">
                Reward Infrastructure Active 2026
              </span>
            </div>

            {/* Stacked Heading */}
            <h1 className="font-headline text-5xl md:text-8xl font-[900] mb-8 leading-[0.9] tracking-tighter uppercase">
              <span className="block text-white">Unlock</span>
              <span className="block bg-gradient-to-r from-[#FA4616] via-[#ff7a00] to-[#E3191E] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,70,22,0.2)]">
                Premium
              </span>
              <span className="block text-white">Rewards</span>
            </h1>

            {/* Description */}
            <p className="text-white/50 text-sm md:text-lg font-medium mb-10 max-w-xl mx-auto leading-relaxed">
              Complete simple steps, engage with verified partners, and <br className="hidden md:block" />
              earn digital gift cards instantly from our secured global network.
            </p>

            {/* CTA Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                onClick={() => scrollTo('trending')}
                className="w-full sm:w-auto h-16 px-10 bg-gradient-to-r from-[#FA4616] to-[#ff7a00] text-white font-black uppercase tracking-[0.2em] text-sm rounded-xl shadow-[0_15px_40px_rgba(250,70,22,0.35)] transition-all hover:scale-[1.03] active:scale-95 group border-none"
              >
                Get Started <Zap className="ml-3 w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
              </Button>

              <button 
                onClick={() => scrollTo('how-it-works')}
                className="w-full sm:w-auto h-16 px-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-[11px] font-black text-white/80 uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center gap-3 group"
              >
                Workflow <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Footer */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] pt-8 border-t border-white/5">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary/40" /> Verified Secure
              </div>
              <div className="flex items-center gap-2.5">
                <Zap className="w-3.5 h-3.5 text-primary/40" /> Instant Delivery
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-3.5 h-3.5 text-primary/40" /> Global Access
              </div>
            </div>

            {/* Inner Atmospheric Accents */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
}
