"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap, Users, Filter } from 'lucide-react';
import { giftCards, categories } from '@/lib/gift-cards';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function TrendingRewards() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredCards = activeCategory === 'All' 
    ? giftCards 
    : giftCards.filter(c => c.category === activeCategory);

  return (
    <section id="trending" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4"
            >
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Popular Rewards</span>
            </motion.div>
            <h2 className="font-headline text-4xl md:text-6xl font-black mb-6 text-white leading-tight uppercase tracking-tight">
              Explore Our <span className="text-primary text-glow-pomegranate">Reward Gallery</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Browse through our massive collection of premium gift cards. Choose your brand, select your value, and start unlocking rewards instantly.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1 px-1">
              <Filter className="w-3 h-3" /> Filter by Category
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                onClick={() => setActiveCategory('All')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border ${activeCategory === 'All' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border-white/5'}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border ${activeCategory === cat ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, idx) => {
              const unlockedToday = 100 + (parseInt(card.id) * 45) + (idx * 12);
              
              return (
                <motion.div
                  key={card.id}
                  id={card.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group scroll-mt-32 h-full"
                >
                  <Card className="glass-card border-white/5 hover:border-primary/40 transition-all duration-500 rounded-3xl h-full flex flex-col group/card shadow-2xl overflow-hidden bg-[#0a0a0a]">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div 
                        className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center p-4 transition-transform duration-700 group-hover/card:scale-[1.05]"
                        style={{ background: card.gradient }}
                      >
                        <div className="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors duration-700" />
                        <span className="relative z-10 font-headline font-black text-white text-xl md:text-2xl uppercase tracking-tighter text-center [text-shadow:0_0_20px_rgba(255,255,255,0.4)] leading-none select-none">
                          {card.brand}
                        </span>
                        {card.trending && (
                          <div className="absolute top-4 right-4 bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl animate-pulse z-20">
                            Trending 🔥
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="min-w-0">
                            <span className="text-[9px] font-black text-primary uppercase tracking-[0.25em] mb-1 block">
                              {card.category} Reward
                            </span>
                            <h3 className="text-2xl font-black text-white group-hover/card:text-primary transition-colors truncate">{card.brand}</h3>
                          </div>
                          <div className="flex flex-col items-end shrink-0">
                             <div className="flex items-center gap-1 text-[10px] font-black text-green-500 uppercase tracking-widest">
                               <Users className="w-3 h-3" /> {unlockedToday}
                             </div>
                             <span className="text-[8px] text-muted-foreground uppercase tracking-widest">Today</span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem]">
                          {card.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {card.values.map((v) => (
                            <div 
                              key={v}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[9px] font-black text-white/60"
                            >
                              {v}
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto">
                          <Button 
                            asChild
                            className="w-full h-12 rounded-xl bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white font-black uppercase tracking-widest shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Link href={`/${card.slug}`} prefetch={true}>
                              Claim Reward <ChevronRight className="ml-2 w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
