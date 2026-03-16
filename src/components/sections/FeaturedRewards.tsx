"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
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

export function FeaturedRewards() {
  const [api, setApi] = useState<CarouselApi>();
  const featured = giftCards.filter((c) => c.featured);

  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

  const flags = ["🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇳🇿", "🇫🇷", "🇮🇹", "🇲🇦"];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#0f172a] to-[#020617] overflow-hidden">
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
            className="font-headline text-4xl md:text-6xl font-black text-white"
          >
            🔥 Most Popular <span className="text-primary text-glow">Gift Cards</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Join thousands of users unlocking these premium rewards daily. Global support and instant delivery guaranteed.
          </motion.p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto relative group"
        >
          <CarouselContent className="-ml-4">
            {featured.map((card, index) => {
              return (
                <CarouselItem key={card.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="glass-card rounded-[2.5rem] p-6 border-white/5 relative overflow-hidden h-full flex flex-col group/card"
                  >
                    {/* Background card style */}
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 shadow-2xl border border-white/10 bg-gradient-to-br from-black via-[#df104e] to-[#ff94b7] flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="relative z-10 font-headline font-black text-white text-2xl md:text-3xl uppercase tracking-tighter text-center [text-shadow:0_0_15px_rgba(255,255,255,0.4)]">
                        {card.brand}
                      </span>
                      <div className="absolute bottom-3 left-3 flex gap-1 z-10">
                        {flags.slice(0, 4).map((f, i) => (
                          <span key={i} className="text-sm drop-shadow-md">{f}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
                            {card.category} Reward
                          </p>
                          <h3 className="text-2xl font-black text-white">{card.brand}</h3>
                        </div>
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover/card:border-primary/50 transition-colors">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {card.values.map((val) => (
                          <div
                            key={val}
                            className="bg-white/5 border border-white/5 rounded-xl py-2 text-center text-xs font-bold text-white/80"
                          >
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      asChild
                      className="relative w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_0_20px_rgba(223,16,78,0.3)] transition-all active:scale-[0.98]"
                    >
                      <Link href={`/${card.slug}`} prefetch={true}>
                        Unlock Reward <ChevronRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          <div className="hidden lg:block">
            <CarouselPrevious className="left-[-2rem] bg-black/40 border-white/10 text-white hover:bg-primary hover:border-primary transition-all h-12 w-12" />
            <CarouselNext className="right-[-2rem] bg-black/40 border-white/10 text-white hover:bg-primary hover:border-primary transition-all h-12 w-12" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}