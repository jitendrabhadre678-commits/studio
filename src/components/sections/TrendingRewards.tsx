
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Star, ArrowUpRight, ShieldCheck, Flame } from 'lucide-react';
import { giftCards } from '@/lib/gift-cards';
import { motion, AnimatePresence } from 'framer-motion';
import { RewardVerificationModal } from '@/components/reward/RewardVerificationModal';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Redesigned Trending Rewards Section.
 * Features: High-fidelity glassmorphism, visual ratings, and mobile-optimized grid.
 */

export function TrendingRewards() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    brand: '',
    value: ''
  });

  const handleClaimClick = (brand: string, value: string) => {
    setModalState({
      isOpen: true,
      brand,
      value
    });
  };

  return (
    <section id="trending" className="py-24 px-4 relative scroll-mt-20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full"
          >
            <Flame className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Trending Now</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
          >
            🔥 Trending <span className="text-primary">Gift Cards</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm md:text-lg max-w-xl mx-auto font-medium"
          >
            Choose a reward and complete 1 quick step to unlock your unique code instantly.
          </motion.p>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {giftCards.slice(0, 12).map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card 
                onClick={() => handleClaimClick(card.brand, card.values[0])}
                className={cn(
                  "relative h-full glass-card border-white/5 bg-white/[0.02] hover:bg-white/[0.05]",
                  "hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(250,70,22,0.15)]",
                  "transition-all duration-500 cursor-pointer rounded-[2.5rem] overflow-hidden flex flex-col group/card shadow-2xl"
                )}
              >
                {/* "FREE" Badge */}
                <div className="absolute top-6 right-6 z-20 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xl scale-90 group-hover/card:scale-100 transition-transform">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">FREE</span>
                </div>

                {/* Card Visual / Gradient */}
                <div 
                  className="relative aspect-[16/10] w-full flex items-center justify-center p-6 overflow-hidden"
                  style={{ background: card.gradient }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover/card:bg-transparent transition-colors duration-700" />
                  <span className="relative z-10 font-headline font-black text-white text-lg md:text-2xl uppercase tracking-tighter text-center [text-shadow:0_0_20px_rgba(255,255,255,0.3)] select-none">
                    {card.brand}
                  </span>
                  
                  {/* Subtle Background Icon Decoration */}
                  <div className="absolute -bottom-4 -right-4 opacity-10 group-hover/card:rotate-12 transition-transform duration-700">
                    <Zap className="w-24 h-24 text-white" />
                  </div>
                </div>

                <CardContent className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base md:text-xl font-black text-white group-hover/card:text-primary transition-colors leading-tight truncate">
                      {card.brand} {card.values[0]}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover/card:text-primary group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all" />
                  </div>

                  <p className="text-[10px] md:text-xs text-white/40 font-medium mb-4 line-clamp-1">
                    {card.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    {/* Visual Star Rating */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                      ))}
                      <span className="text-[10px] font-black text-white/20 ml-1.5">5.0</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-green-500" />
                      <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Overlay Hint */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-4">
            Security Protected Reward Network
          </p>
          <div className="flex justify-center gap-8 items-center opacity-20">
            <div className="h-px bg-white/20 flex-grow max-w-[100px]" />
            <ShieldCheck className="w-6 h-6 text-white" />
            <div className="h-px bg-white/20 flex-grow max-w-[100px]" />
          </div>
        </div>
      </div>

      <RewardVerificationModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        brand={modalState.brand}
        value={modalState.value}
      />
    </section>
  );
}
