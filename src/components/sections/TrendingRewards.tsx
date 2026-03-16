
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap } from 'lucide-react';
import { giftCards, categories } from '@/lib/gift-cards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function TrendingRewards() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredCards = activeCategory === 'All' 
    ? giftCards 
    : giftCards.filter(c => c.category === activeCategory);

  return (
    <section id="trending" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4"
            >
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Popular Rewards</span>
            </motion.div>
            <h2 className="font-headline text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
              Explore Our <span className="text-primary text-glow">Reward Gallery</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Browse through our massive collection of premium gift cards. Choose your brand, select your value, and start unlocking rewards instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === 'All' ? 'bg-primary text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCards.map((card, idx) => {
            const imageData = PlaceHolderImages.find(img => img.id === card.image) || PlaceHolderImages[0];
            return (
              <motion.div
                key={card.id}
                id={card.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: (idx % 4) * 0.05 }}
                className="group scroll-mt-32"
              >
                <Card className="glass-card border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden rounded-[16px] h-full flex flex-col group/card shadow-2xl">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image 
                        src={imageData.imageUrl}
                        alt={card.brand}
                        fill
                        className="object-cover group-hover/card:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                      {card.trending && (
                        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
                          Trending 🔥
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 block">
                          {card.category} Reward
                        </span>
                        <h3 className="text-2xl font-black text-white group-hover/card:text-primary transition-colors">{card.brand}</h3>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                        {card.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {card.values.map((v) => (
                          <div 
                            key={v}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold text-white/60"
                          >
                            {v}
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <Button 
                          asChild
                          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-lg transition-all active:scale-[0.98]"
                        >
                          <Link href={`/${card.slug}`} prefetch={true}>
                            Unlock Reward <ChevronRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
