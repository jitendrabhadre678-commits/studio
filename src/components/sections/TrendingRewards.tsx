"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Star, ArrowUpRight, ShieldCheck, Flame } from 'lucide-react';
import { giftCards } from '@/lib/gift-cards';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Trending Rewards Section.
 * Features sharper rounded-xl cards with animated glass reflections.
 */

export function TrendingRewards() {
  const router = useRouter();

  const handleCardClick = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  return (
    <div id="trending" className="py-20 px-6 md:px-12 relative scroll-mt-20">
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
        <h2 className="font-headline text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
          🔥 Trending <span className="text-primary">Gift Cards</span>
        </h2>
        <p className="text-white/40 text-sm md:text-lg max-w-xl mx-auto font-medium">
          Select a reward to view full details and unlock your unique code instantly.
        </p>
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
              onClick={() => handleCardClick(card.slug)}
              className={cn(
                "relative h-full glass-card border-white/10 bg-white/[0.02] hover:bg-white/[0.05]",
                "hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(250,70,22,0.1)]",
                "transition-all duration-500 cursor-pointer rounded-xl overflow-hidden flex flex-col group/card shadow-lg"
              )}
            >
              {/* "FREE" Badge */}
              <div className="absolute top-4 right-4 z-20 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xl scale-90 group-hover/card:scale-100 transition-transform">
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
                
                <div className="absolute -bottom-4 -right-4 opacity-10 group-hover/card:rotate-12 transition-transform duration-700">
                  <Zap className="w-24 h-24 text-white" />
                </div>
              </div>

              <CardContent className="p-6 md:p-8 flex flex-col flex-grow bg-[#0a0a0a]/40 backdrop-blur-sm">
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
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                    ))}
                    <span className="text-[10px] font-black text-white/20 ml-1.5">5.0</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-white/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Verified</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
