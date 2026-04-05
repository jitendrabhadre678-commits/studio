
"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

/**
 * @fileOverview Cinematic Hero Section.
 * Features a radial glow image background with slow-zoom effects and glassmorphism.
 */

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-20 pb-32 px-4 text-center overflow-hidden bg-black">
      
      {/* 1. LAYER: IMAGE BACKGROUND WITH ANIMATION */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 animate-slow-zoom scale-110">
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920&h=1080"
            alt="Radial Glow Background"
            fill
            priority
            className="object-cover object-center brightness-75"
            data-ai-hint="abstract glow"
          />
        </div>
        
        {/* 2. LAYER: OVERLAYS */}
        {/* Uniform Dark Wash */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        
        {/* Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80 pointer-events-none" />
        
        {/* Deep Bottom Shadow for transition */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>

      {/* 3. LAYER: CONTENT */}
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-10 shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-[10px] md:text-[12px] font-black text-white/80 tracking-[0.2em] uppercase">
              Global Reward Infrastructure 2026
            </span>
          </div>

          {/* Glassmorphism Container */}
          <div className="p-8 md:p-16 rounded-[3rem] bg-black/20 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)] relative group overflow-hidden">
            {/* Corner Decorative Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-[3rem]" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-[3rem]" />

            <h1 className="font-headline text-5xl md:text-[90px] font-black mb-8 leading-[0.9] text-white uppercase tracking-tighter">
              Unlock Your <br />
              <span className="text-primary text-glow drop-shadow-[0_0_30px_rgba(250,70,22,0.4)]">
                Digital Vault
              </span>
            </h1>

            <p className="text-white/70 text-base md:text-xl leading-relaxed font-medium mb-12 max-w-2xl mx-auto">
              Join 12,800+ global earners. Complete verified advertiser activities and claim instant premium gift cards for your favorite platforms.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-5 px-4 relative z-10">
              <Button 
                onClick={() => document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-[0_10px_40px_rgba(250,70,22,0.5)] transition-all hover:scale-[1.05] active:scale-95 group relative overflow-hidden border-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine -skew-x-12" style={{ animationDuration: '3s' }} />
                Get Started <Zap className="ml-2 w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto h-16 px-12 bg-white/5 border-white/10 text-white font-black uppercase tracking-widest text-lg rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Learn More <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Futuristic Trust Signals */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2.5 group hover:text-primary transition-colors duration-300">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Verified Secure
            </div>
            <div className="flex items-center gap-2.5 group hover:text-primary transition-colors duration-300">
              <Zap className="w-4 h-4 text-primary" />
              Instant Delivery
            </div>
            <div className="flex items-center gap-2.5 group hover:text-primary transition-colors duration-300">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(250,70,22,0.8)]" />
              Global Access
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
