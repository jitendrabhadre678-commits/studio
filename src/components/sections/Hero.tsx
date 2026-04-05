"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, ChevronRight } from 'lucide-react';

/**
 * @fileOverview Redesigned Hero Section with focused messaging and primary CTA.
 */

export function Hero() {
  const handleScrollToTrending = () => {
    const element = document.getElementById('trending');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 md:pt-40 pb-20 px-4 text-center overflow-hidden">
      {/* Deep Purple/Blue Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
        >
          <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-[10px] md:text-[12px] font-black text-white/80 tracking-[0.2em] uppercase">
            Official 2026 Reward Portal
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-headline text-5xl md:text-8xl font-black mb-8 leading-[0.9] text-white uppercase tracking-tighter"
        >
          Unlock Free <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-primary bg-clip-text text-transparent">
            Gift Cards & Rewards
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto text-white/60 text-base md:text-xl mb-12 leading-relaxed font-medium"
        >
          Complete simple steps and claim premium rewards from your favorite brands. 
          The most trusted destination for gamers and shoppers.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4 px-4"
        >
          <Button 
            onClick={handleScrollToTrending}
            className="w-full sm:w-auto h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-[0_10px_40px_rgba(250,70,22,0.3)] transition-all hover:scale-[1.05] active:scale-95"
          >
            Start Earning Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto h-16 px-12 bg-white/5 border-white/10 text-white font-black uppercase tracking-widest text-lg rounded-2xl hover:bg-white/10 transition-all"
          >
            Learn More <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
