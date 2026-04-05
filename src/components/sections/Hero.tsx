
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Sparkles } from 'lucide-react';

/**
 * @fileOverview Premium Futuristic Hero Section.
 * Features a glowing vertical light beam, shimmering effects, and floating particles.
 */

interface Particle {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

export function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particle properties only on the client to avoid hydration mismatch
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${15 + Math.random() * 15}s`
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-20 pb-32 px-4 text-center overflow-hidden bg-[#020617]">
      
      {/* 1. LAYER: AMBIENT GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-[#020617] pointer-events-none" />

      {/* 2. LAYER: CENTRAL VERTICAL BEAM */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-full bg-blue-600/5 blur-[120px]" />
        
        {/* Main Beam Pulse Shell */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] md:w-[200px] h-full bg-blue-400/10 blur-[60px] animate-beam-shimmer" />
        
        {/* Core Sharp Light Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-200 to-transparent opacity-40 shadow-[0_0_20px_rgba(191,219,254,0.5)]" />
        
        {/* Moving Internal Shimmer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-full overflow-hidden opacity-20">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-shine -skew-y-12" style={{ animationDuration: '4s' }} />
        </div>

        {/* Surface Reflection at Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/10 blur-[100px] rounded-[100%] scale-y-[0.2] -mb-40" />
      </div>

      {/* 3. LAYER: FLOATING PARTICLES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p, i) => (
          <div 
            key={i}
            className="absolute w-[2px] h-[2px] bg-blue-300/40 rounded-full animate-float-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      {/* 4. CONTENT */}
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="text-[10px] md:text-[12px] font-black text-white/80 tracking-[0.2em] uppercase">
              The Next Generation of Rewards
            </span>
          </div>

          {/* Master Heading */}
          <h1 className="font-headline text-6xl md:text-[110px] font-black mb-10 leading-[0.8] text-white uppercase tracking-tighter drop-shadow-2xl">
            Unlock Your <br />
            <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(96,165,250,0.4)]">
              Digital Vault
            </span>
          </h1>

          {/* Subtext in Premium Glass Box */}
          <div className="max-w-xl mx-auto mb-12 p-6 md:p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium relative z-10">
              Join the elite circle of 12,800+ global earners. Complete verified activities and claim instant premium rewards for your favorite platforms.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 px-4">
            <Button 
              onClick={() => document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-[0_10px_40px_rgba(250,70,22,0.4)] transition-all hover:scale-[1.05] active:scale-95 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine -skew-x-12" style={{ animationDuration: '3s' }} />
              Start Earning <Zap className="ml-2 w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto h-16 px-12 bg-white/5 border-white/10 text-white font-black uppercase tracking-widest text-lg rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm shadow-xl"
            >
              How it works <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Futuristic Trust Signals */}
          <div className="mt-24 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2.5 group hover:text-blue-400 transition-colors duration-300">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
              Instant Delivery
            </div>
            <div className="flex items-center gap-2.5 group hover:text-blue-400 transition-colors duration-300">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
              Verified Secure
            </div>
            <div className="flex items-center gap-2.5 group hover:text-blue-400 transition-colors duration-300">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
              Global Access
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
