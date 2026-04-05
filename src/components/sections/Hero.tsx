
"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

/**
 * @fileOverview Redesigned Hero Section with Radial Glow Image Background.
 * Features a cinematic slow-zoom animation and premium glassmorphism.
 */

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg') || {
    imageUrl: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775372153/34ced28077ef3b3c8f4fd932a9b422eb_ldfobb.jpg",
    imageHint: "gaming futuristic"
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-black">
      
      {/* 1. LAYER: BACKGROUND IMAGE WITH ANIMATION */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-slow-zoom scale-105">
          <Image
            src={heroImage.imageUrl}
            alt="Cinematic Glow Background"
            fill
            priority
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        </div>
        
        {/* 2. LAYER: OVERLAYS */}
        {/* Uniform Dark Wash */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* 3. LAYER: CONTENT */}
      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glassmorphism Container */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
            {/* Ambient Inner Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-[10px] font-black text-white/80 tracking-[0.2em] uppercase">
                Reward Infrastructure Active 2026
              </span>
            </div>

            <h1 className="font-headline text-4xl md:text-7xl font-black mb-6 leading-none text-white uppercase tracking-tighter">
              Unlock <span className="text-primary text-glow">Premium</span> <br className="hidden md:block" /> Rewards
            </h1>

            <p className="text-white/70 text-base md:text-xl leading-relaxed font-medium mb-10 max-w-lg mx-auto">
              Complete simple steps, engage with verified partners, and earn digital gift cards instantly.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Button 
                onClick={() => document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-16 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-95 group"
              >
                Get Started <Zap className="ml-2 w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-16 px-10 bg-white/5 border-white/10 text-white font-black uppercase tracking-widest text-lg rounded-2xl hover:bg-white/10 transition-all"
              >
                Workflow <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> Verified Secure
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Instant Delivery
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" /> Global Access
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
