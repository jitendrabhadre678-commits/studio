
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  const flags = ["🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇳🇿", "🇫🇷", "🇮🇹", "🇲🇦"];

  const handleLockerTrigger = () => {
    if (typeof window !== 'undefined') {
      if (!document.getElementById('ogjs')) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.id = 'ogjs';
        s.src = 'https://gameflashx.space/cl/js/277ood';
        document.head.appendChild(s);
      } else {
        const win = window as any;
        if (win.ogads_locker && typeof win.ogads_locker.lock === 'function') {
          win.ogads_locker.lock();
        }
      }
    }
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
            className="font-headline text-4xl md:text-6xl font-black text-white leading-tight"
          >
            🔥 Most Popular <span className="text-primary text-glow-pomegranate">Gift Cards</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
          >
            Join thousands of users unlocking these premium rewards daily. Global support and instant delivery guaranteed.
          </motion.p>
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
                    className="rounded-[2.5rem] p-6 border border-white/10 transition-all duration-500 flex flex-col h-full group/card relative glass-card shadow-2xl hover:shadow-primary/10"
                    style={{ 
                      background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(17,17,17,0.9))'
                    }}
                  >
                    {/* Unique Gradient Background Banner */}
                    <div 
                      className="relative aspect-[16/9] w-full rounded-[1.5rem] overflow-hidden mb-6 shadow-2xl border border-white/5 flex items-center justify-center p-4 transition-transform duration-700 group-hover/card:scale-[1.05]"
                      style={{ background: card.gradient }}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors duration-700" />
                      <span className="relative z-10 font-headline font-black text-white text-2xl md:text-3xl uppercase tracking-tighter text-center [text-shadow:0_0_25px_rgba(255,255,255,0.5)] px-4 leading-none select-none">
                        {card.brand}
                      </span>
                      <div className="absolute bottom-3 left-3 flex gap-1 z-10">
                        {flags.slice(0, 4).map((f, i) => (
                          <span key={i} className="text-sm drop-shadow-md">{f}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex-grow px-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-1">
                            {card.category} Reward
                          </p>
                          <h3 className="text-2xl font-black text-white group-hover/card:text-primary transition-colors">{card.brand}</h3>
                        </div>
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover/card:border-primary/50 transition-colors shrink-0">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-8">
                        {card.values.map((val) => (
                          <div
                            key={val}
                            className="bg-white/5 border border-white/10 rounded-xl py-2.5 text-center text-xs font-black text-white/80"
                          >
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={handleLockerTrigger}
                      className="relative w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary/20"
                    >
                      Unlock Reward <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
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
