
"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Globe, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

/**
 * @fileOverview Premium SaaS-Inspired Dark Hero Section.
 * Features a centered glass container with bold stacked typography and 
 * high-conversion call-to-actions.
 */

const FLOATING_LOGOS = [
  { id: 'google', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png', pos: 'top-[10%] left-[10%]', size: 'w-12 md:w-16', delay: '0s', dur: '6s', op: 'opacity-20' },
  { id: 'roblox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', pos: 'top-[15%] right-[12%]', size: 'w-16 md:w-20', delay: '1s', dur: '7s', op: 'opacity-30' },
  { id: 'steam', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', pos: 'top-[40%] left-[5%]', size: 'w-20 md:w-24', delay: '2s', dur: '8s', op: 'opacity-40' },
  { id: 'fortnite', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png', pos: 'top-[45%] right-[8%]', size: 'w-16 md:w-20', delay: '0.5s', dur: '5s', op: 'opacity-30' },
  { id: 'walmart', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463548/7_20260406_134035_0006_qkousw.png', pos: 'bottom-[15%] left-[12%]', size: 'w-12 md:w-16', delay: '3s', dur: '6.5s', op: 'opacity-20' },
  { id: 'target', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/9_20260406_134035_0008_nnznij.png', pos: 'bottom-[10%] right-[10%]', size: 'w-16 md:w-20', delay: '1.5s', dur: '7.5s', op: 'opacity-20' },
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
        {/* Subtle Mix of Orange/Blue ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
      </div>

      {/* FLOATING DECORATIVE LOGOS */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
        {FLOATING_LOGOS.map((logo) => (
          <div 
            key={logo.id}
            className={`absolute ${logo.pos} ${logo.size} ${logo.op} transition-opacity duration-1000`}
            style={{
              animation: `float-rotate ${logo.dur} ease-in-out infinite`,
              animationDelay: logo.delay
            }}
          >
            <div className="relative w-full aspect-square grayscale contrast-125 opacity-40">
              <Image src={logo.url} alt={logo.id} fill className="object-contain" />
            </div>
          </div>
        ))}
      </div>

      {/* CENTERED SAAS GLASS CONTAINER */}
      <div className="relative z-20 w-full max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-8 md:p-20 shadow-[0_0_80px_rgba(0,0,0,0.6),0_0_40px_rgba(250,70,22,0.05)] text-center relative overflow-hidden">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-white/60 tracking-[0.25em] uppercase">
                Reward Infrastructure Active 2026
              </span>
            </div>

            {/* Stacked Heading */}
            <h1 className="font-headline text-5xl md:text-8xl lg:text-9xl font-[900] mb-8 leading-[0.9] tracking-tighter uppercase">
              <span className="block text-white">Unlock</span>
              <span className="block bg-gradient-to-r from-[#FA4616] via-[#ff7a00] to-[#E3191E] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,70,22,0.2)]">
                Premium
              </span>
              <span className="block text-white">Rewards</span>
            </h1>

            {/* Description */}
            <p className="text-white/50 text-sm md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Complete simple steps, engage with verified partners, and <br className="hidden md:block" />
              earn digital gift cards instantly from our secured global network.
            </p>

            {/* CTA Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-16">
              <Button 
                onClick={() => scrollTo('trending')}
                className="w-full sm:w-auto h-16 md:h-20 px-12 bg-gradient-to-r from-[#FA4616] to-[#ff7a00] text-white font-black uppercase tracking-[0.2em] text-lg rounded-2xl shadow-[0_15px_40px_rgba(250,70,22,0.35)] transition-all hover:scale-[1.03] active:scale-95 group border-none"
              >
                Get Started <Zap className="ml-3 w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
              </Button>

              <button 
                onClick={() => scrollTo('how-it-works')}
                className="w-full sm:w-auto h-16 md:h-20 px-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-[13px] font-black text-white/80 uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center gap-3 group"
              >
                Workflow <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Footer */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] pt-8 border-t border-white/5">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-primary/40" /> Verified Secure
              </div>
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-primary/40" /> Instant Delivery
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-primary/40" /> Global Access
              </div>
            </div>

            {/* Inner Atmospheric Accents */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />
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
