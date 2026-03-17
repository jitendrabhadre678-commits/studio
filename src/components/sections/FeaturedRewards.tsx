
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
    <section className="py-24 px-4 bg-gradient-to-b from-[#0f172a] to-[#020617] overflow-visible">
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

        <div className="overflow-visible pb-10">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto relative group overflow-visible"
          >
            <CarouselContent className="-ml-4 overflow-visible">
              {featured.map((card, index) => {
                return (
                  <CarouselItem key={card.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 overflow-visible">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -6 }}
                      className="rounded-[18px] p-6 border border-white/10 transition-all duration-300 flex flex-col h-full group/card relative"
                      style={{ 
                        background: 'linear-gradient(145deg, #1a1a1a, #111)',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.4)' 
                      }}
                    >
                      {/* Glow Overlay on Hover */}
                      <div className="absolute inset-0 rounded-[18px] border border-primary/0 group-hover/card:border-primary/40 group-hover/card:shadow-[0_0_20px_rgba(250,70,22,0.25)] transition-all duration-300 pointer-events-none" />

                      {/* Unique Gradient Background Banner */}
                      <div 
                        className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 shadow-2xl border border-white/5 flex items-center justify-center p-4 transition-transform duration-500 group-hover/card:scale-[1.02]"
                        style={{ background: card.gradient }}
                      >
                        <div className="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors duration-700" />
                        <span className="relative z-10 font-headline font-black text-white text-2xl md:text-3xl uppercase tracking-tighter text-center [text-shadow:0_0_20px_rgba(255,255,255,0.4)] px-4 leading-none">
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
                        className="relative w-full h-12 rounded-[10px] bg-gradient-to-r from-[#FA4616] to-[#ff7a3d] hover:to-[#FA4616] text-white font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(250,70,22,0.5)] active:scale-[0.98]"
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
              <CarouselPrevious className="left-[-3rem] bg-black/40 border-white/10 text-white hover:bg-primary hover:border-primary transition-all h-12 w-12" />
              <CarouselNext className="right-[-3rem] bg-black/40 border-white/10 text-white hover:bg-primary hover:border-primary transition-all h-12 w-12" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
