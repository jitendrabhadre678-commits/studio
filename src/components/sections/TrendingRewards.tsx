
"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowUpRight, ShieldCheck, Flame } from 'lucide-react';
import { giftCards } from '@/lib/gift-cards';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

/**
 * @fileOverview Premium Blue-Themed Trending Rewards.
 * Updated with transparent background, radial glows, and background iconography.
 */

export function TrendingRewards() {
  const router = useRouter();

  const handleCardClick = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  return (
    <div id="trending" className="py-24 px-6 md:px-12 relative overflow-hidden bg-transparent">
      {/* 1. ATMOSPHERIC OVERLAYS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.08),transparent_70%)] pointer-events-none" />
      
      {/* 2. GHOST BACKGROUND ICONS (Subtle Depth) */}
      <motion.div 
        animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -left-20 w-64 h-64 opacity-[0.03] blur-[2px] pointer-events-none select-none hidden lg:block"
      >
        <Image 
          src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png" 
          alt="" 
          fill 
          className="object-contain"
        />
      </motion.div>

      <motion.div 
        animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 w-80 h-80 opacity-[0.03] blur-[2px] pointer-events-none select-none hidden lg:block"
      >
        <Image 
          src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png" 
          alt="" 
          fill 
          className="object-contain"
        />
      </motion.div>

      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full"
          >
            <Flame className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Vault</span>
          </motion.div>
          
          <h2 className="font-headline text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none">
            Verified <span className="text-primary text-glow">Reward Catalog</span>
          </h2>
          
          <p className="text-white/40 text-sm md:text-lg max-w-xl mx-auto font-medium">
            Select a reward to view secure unlock steps and claim your digital code.
          </p>
        </div>

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
                  "relative h-full glass-card border-white/10 hover:bg-white/[0.05]",
                  "hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(0,157,255,0.15)]",
                  "transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden flex flex-col group/card shadow-lg hover:scale-[1.03]"
                )}
              >
                <div className="relative aspect-[16/10] w-full flex items-center justify-center p-6 overflow-hidden bg-white/[0.03] backdrop-blur-xl">
                  <div 
                    className="absolute inset-0 opacity-20 blur-2xl transition-all duration-500 group-hover/card:opacity-40 group-hover/card:scale-125"
                    style={{ background: `radial-gradient(circle at center, ${card.glowColor || '#009dff'}cc, transparent 70%)` }}
                  />
                  
                  {card.logoUrl && (
                    <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover/card:scale-110">
                      <Image 
                        src={card.logoUrl}
                        alt={card.brand}
                        fill
                        className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      />
                    </div>
                  )}
                </div>

                <CardContent className="p-6 md:p-8 flex flex-col flex-grow bg-[#0a1a2f]/40 backdrop-blur-sm border-t border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm md:text-lg font-black text-white group-hover/card:text-primary transition-colors leading-tight truncate">
                      {card.brand} {card.values[0]}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover/card:text-primary transition-all" />
                  </div>

                  <p className="text-[10px] md:text-xs text-white/40 font-bold uppercase tracking-widest mb-4">
                    {card.category} Reward
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-blue-400 fill-blue-400" />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-1 text-white/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">Secure</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
