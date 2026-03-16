
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, ArrowUpRight } from 'lucide-react';
import { giftCards } from '@/lib/gift-cards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { RewardUnlockModal } from '../reward/RewardUnlockModal';

export function TrendingRewards() {
  const [selectedCard, setSelectedCard] = useState<{card: any, value: string} | null>(null);
  const trending = giftCards.filter(c => c.trending);

  return (
    <section id="trending" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-white">Trending Rewards</h2>
            <p className="text-muted-foreground">The most popular gift cards being unlocked right now across our global community. Don't miss out on these premium rewards.</p>
          </div>
          <Button variant="link" className="text-primary font-bold group">
            View All Categories <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trending.map((card) => {
            const imageData = PlaceHolderImages.find(img => img.id === card.image) || PlaceHolderImages[0];
            return (
              <Card key={card.id} className="glass-card border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden group">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image 
                      src={imageData.imageUrl}
                      alt={card.brand}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Hot 🔥
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1 block">{card.category}</span>
                        <h3 className="text-2xl font-bold text-white">{card.brand}</h3>
                      </div>
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {card.values.map((v) => (
                        <button 
                          key={v}
                          onClick={() => setSelectedCard({card, value: v})}
                          className="bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 rounded-xl py-3 text-center text-sm font-bold text-white transition-all active:scale-95"
                        >
                          Unlock {v}
                        </button>
                      ))}
                    </div>

                    <Button 
                      className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 font-black h-12 rounded-xl transition-all"
                      onClick={() => setSelectedCard({card, value: card.values[1]})}
                    >
                      Instant Unlock
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedCard && (
        <RewardUnlockModal 
          card={selectedCard.card} 
          value={selectedCard.value}
          isOpen={!!selectedCard} 
          onClose={() => setSelectedCard(null)} 
        />
      )}
    </section>
  );
}
