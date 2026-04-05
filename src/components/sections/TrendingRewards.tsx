
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap, Users, Filter } from 'lucide-react';
import { giftCards, categories } from '@/lib/gift-cards';
import { motion, AnimatePresence } from 'framer-motion';
import { RewardVerificationModal } from '@/components/reward/RewardVerificationModal';

export function TrendingRewards() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [modalState, setModalState] = useState({
    isOpen: false,
    brand: '',
    value: ''
  });

  const filteredCards = activeCategory === 'All' 
    ? giftCards 
    : giftCards.filter(c => c.category === activeCategory);

  const handleClaimClick = (brand: string, value: string) => {
    setModalState({
      isOpen: true,
      brand,
      value
    });
  };

  return (
    <section id="trending" className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl text-center lg:text-left w-full">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4"
            >
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Popular Rewards</span>
            </motion.div>
            <h2 className="font-headline text-3xl md:text-6xl font-black mb-6 text-white leading-tight uppercase tracking-tight">
              Explore Our <span className="text-primary text-glow-pomegranate">Reward Gallery</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-4">
              Choose from a wide range of digital gift cards and premium rewards. Complete simple tasks and unlock your favorite brands in just a few steps.
            </p>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">
              Trusted platform • Fast rewards • Easy steps
            </p>
          </div>
          
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1 px-1 justify-center lg:justify-start">
              <Filter className="w-3 h-3" /> Filter Categories
            </div>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start overflow-x-auto pb-2 scrollbar-hide">
              <button 
                onClick={() => setActiveCategory('All')}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border ${activeCategory === 'All' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border-white/5'}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border ${activeCategory === cat ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, idx) => {
              const unlockedThisMonth = 100 + (parseInt(card.id) * 45) + (idx * 12);
              const displayValue = card.values[0];
              
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
                        className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center p-4 transition-transform duration-700 md:group-hover/card:scale-[1.05]"
                        style={{ background: card.gradient }}
                      >
                        <div className="absolute inset-0 bg-black/10 transition-colors" />
                        <span className="relative z-10 font-headline font-black text-white text-xl md:text-2xl uppercase tracking-tighter text-center [text-shadow:0_0_20px_rgba(255,255,255,0.4)] leading-none select-none">
                          {card.brand}
                        </span>
                        {card.trending && (
                          <div className="absolute top-3 right-3 bg-primary text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-xl z-20">
                            Hot 🔥
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="min-w-0">
                            <span className="text-[9px] font-black text-primary uppercase tracking-[0.25em] mb-1 block">
                              {card.category} Reward
                            </span>
                            <h3 className="text-xl md:text-2xl font-black text-white truncate">{card.brand}</h3>
                          </div>
                          <div className="flex flex-col items-end shrink-0">
                             <div className="flex items-center gap-1 text-[10px] font-black text-green-500 uppercase tracking-widest">
                               <Users className="w-3 h-3" /> {unlockedThisMonth}
                             </div>
                             <span className="text-[8px] text-muted-foreground uppercase tracking-widest">This Month</span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                          {card.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-8">
                          {card.values.slice(0, 3).map((v) => (
                            <div 
                              key={v}
                              className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-[9px] font-black text-white/60"
                            >
                              {v}
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto">
                          <Button 
                            onClick={() => handleClaimClick(card.brand, displayValue)}
                            className="w-full h-12 rounded-xl bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white font-black uppercase tracking-widest shadow-lg transition-all duration-300"
                          >
                            Claim Reward <ChevronRight className="ml-2 w-4 h-4" />
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

      <RewardVerificationModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        brand={modalState.brand}
        value={modalState.value}
      />
    </section>
  );
}
