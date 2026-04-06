"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { giftCards } from "@/lib/gift-cards";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/**
 * @fileOverview Premium Featured Rewards Carousel.
 * Uses high-fidelity logos and brand-specific glows for maximum impact.
 */

export function FeaturedRewards() {
  const [api, setApi] = useState<CarouselApi>();
  const router = useRouter();
  const featured = giftCards.filter((c) => c.featured);

  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  const handleCardClick = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  return (
    <section className="py-24 px-4 bg-black/20 overflow-hidden border-y border-white/5">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full"
          >
            <Zap className="w-4 h-4 text-primary fill-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">Hot This Week</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-headline text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight"
          >
            🔥 Most Popular <span className="text-primary">Rewards</span>
          </motion.h2>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative group"
          >
            <CarouselContent className="-ml-4">
              {featured.map((card, index) => (
                <CarouselItem key={card.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => handleCardClick(card.slug)}
                    className="rounded-2xl border border-white/10 transition-all duration-500 flex flex-col h-full group/card relative glass-card shadow-lg hover:shadow-primary/20 hover:scale-[1.03] overflow-hidden cursor-pointer"
                  >
                    {/* Visual Container */}
                    <div className="relative aspect-[16/10] w-full flex items-center justify-center p-8 bg-white/[0.03] overflow-hidden">
                      {/* Brand-Specific Glow */}
                      <div 
                        className="absolute inset-0 opacity-30 blur-2xl transition-opacity group-hover/card:opacity-50"
                        style={{ background: `radial-gradient(circle at center, ${card.glowColor || '#FA4616'}88, transparent 70%)` }}
                      />

                      {card.logoUrl ? (
                        <div className="relative z-10 w-24 h-24 transition-transform duration-700 group-hover/card:scale-110">
                          <Image 
                            src={card.logoUrl}
                            alt={card.brand}
                            fill
                            className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            data-ai-hint="reward logo"
                          />
                        </div>
                      ) : (
                        <span className="relative z-10 font-headline font-black text-white text-3xl uppercase tracking-tighter text-center select-none">
                          {card.brand}
                        </span>
                      )}
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-grow bg-[#0a0a0a]/60 backdrop-blur-md border-t border-white/5">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-2">
                        {card.category} Reward
                      </p>
                      <h3 className="text-2xl font-black text-white mb-6 group-hover/card:text-primary transition-colors truncate">
                        {card.brand}
                      </h3>

                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        {card.values.slice(0, 2).map((val) => (
                          <div
                            key={val}
                            className="bg-white/5 border border-white/10 rounded-lg py-2 text-center text-[10px] font-black text-white/60 uppercase tracking-widest"
                          >
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden xl:block">
              <CarouselPrevious className="-left-16 bg-black/60 border-white/10 text-white hover:bg-primary hover:border-primary transition-all h-14 w-14 rounded-full" />
              <CarouselNext className="-right-16 bg-black/60 border-white/10 text-white hover:bg-primary hover:border-primary transition-all h-14 w-14 rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
