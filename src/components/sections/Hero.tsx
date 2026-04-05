
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Sparkles } from 'lucide-react';

/**
 * @fileOverview Premium Futuristic Hero Section.
 * Features a glowing vertical light beam background with floating particles.
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
    const generatedParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 10}s`
    }));
    setParticles(generatedParticles);
  }, []);

  const handleScrollToTrending = () => {
    const element = document.getElementById('trending');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 md:pt-32 pb-20 px-4 text-center overflow-hidden bg-[#020617]">
      
      {/* 1. LAYER: MAIN VERTICAL BEAM */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Core Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-blue-400 via-white to-transparent opacity-20" />
        
        {/* Glow Layer 1 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] md:w-[300px] h-full bg-blue-500/10 blur-[100px] animate-beam-shimmer" />
        
        {/* Glow Layer 2 (Wider) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-full bg-purple-600/5 blur-[150px]" />
        
        {/* Reflection at Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/10 blur-[80px] rounded-[100%] scale-y-[0.3] -mb-20" />
      </div>

      {/* 2. LAYER: FLOATING PARTICLES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      {/* 3. LAYER: GRADIENT OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-transparent to-[#020617] pointer-events-none" />

      {/* 4. CONTENT */}
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] md:text-[12px] font-black text-white/80 tracking-[0.2em] uppercase">
            Experience the Future of Rewards
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-headline text-5xl md:text-[100px] font-black mb-8 leading-[0.85] text-white uppercase tracking-tighter"
        >
          Unlock Free <br />
          <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(96,165,250,0.3)]">
            Digital Rewards
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto text-white/60 text-base md:text-xl mb-12 leading-relaxed font-medium"
        >
          Join 12,800+ global earners. Complete simple activities and claim verified gift cards for your favorite brands instantly.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4 px-4"
        >
          <Button 
            onClick={handleScrollToTrending}
            className="w-full sm:w-auto h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-[0_10px_40px_rgba(250,70,22,0.3)] transition-all hover:scale-[1.05] active:scale-95 group"
          >
            Start Earning Now <Zap className="ml-2 w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto h-16 px-12 bg-white/5 border-white/10 text-white font-black uppercase tracking-widest text-lg rounded-2xl hover:bg-white/10 transition-all"
          >
            Learn More <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* 5. TRUST LINE */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex items-center justify-center gap-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]"
        >
          <span>Instant Delivery</span>
          <div className="w-1 h-1 bg-white/10 rounded-full" />
          <span>Verified Secure</span>
          <div className="w-1 h-1 bg-white/10 rounded-full" />
          <span>Global Access</span>
        </motion.div>
      </div>
    </section>
  );
}
