"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Star, ArrowUpRight, ShieldCheck, Flame } from 'lucide-react';
import { giftCards } from '@/lib/gift-cards';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

/**
 * @fileOverview Premium Trending Rewards Section.
 * Features ultra-clean glassmorphism cards with brand-specific glows and logo centers.
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
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full"
        >
          <Flame className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Trending Now</span>
        </motion.div>
        <h2 className="font-headline text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
          🔥 Premium <span className="text-primary">Reward Vault</span>
        </h2>
        <p className="text-white/40 text-sm md:text-lg max-w-xl mx-auto font-medium">
          Select a reward to view full details and unlock your unique code instantly.
        </p>
      </div>

      {/* Rewards Grid: 2 columns mobile, 4 columns desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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
                "hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(250,70,22,0.15)]",
                "transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden flex flex-col group/card shadow-lg hover:scale-[1.03]"
              )}
            >
              {/* Card Visual / Logo Container */}
              <div 
                className="relative aspect-[16/10] w-full flex items-center justify-center p-6 overflow-hidden bg-white/[0.03] backdrop-blur-xl"
              >
                {/* Brand-Specific Glow */}
                <div 
                  className="absolute inset-0 opacity-30 blur-2xl transition-all duration-500 group-hover/card:opacity-50 group-hover/card:scale-110"
                  style={{ 
                    background: card.glowColor?.includes('gradient') 
                      ? card.glowColor 
                      : `radial-gradient(circle at center, ${card.glowColor || '#FA4616'}88, transparent 70%)` 
                  }}
                />
                
                {/* Logo Image: w-16 mobile, w-20 desktop */}
                {card.logoUrl && (
                  <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover/card:scale-110">
                    <Image 
                      src={card.logoUrl}
                      alt={card.brand}
                      fill
                      className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      data-ai-hint="reward logo"
                    />
                  </div>
                )}
                
                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover/card:rotate-12 transition-transform duration-700">
                  <Zap className="w-24 h-24 text-white" />
                </div>
              </div>

              <CardContent className="p-6 md:p-8 flex flex-col flex-grow bg-[#0a0a0a]/40 backdrop-blur-sm border-t border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm md:text-lg font-black text-white group-hover/card:text-primary transition-colors leading-tight truncate">
                    {card.brand} {card.values[0]}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover/card:text-primary group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all" />
                </div>

                <p className="text-[10px] md:text-xs text-white/40 font-bold uppercase tracking-widest mb-4">
                  {card.category} Reward
                </p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                    ))}
                    <span className="text-[10px] font-black text-white/20 ml-1.5">5.0</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
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
