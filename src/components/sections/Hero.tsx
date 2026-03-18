
"use client";

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function Hero() {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 md:pt-32 pb-20 px-4 text-center">
      <div className="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-[10px] border border-white/10 mb-4 animate-fade-in-up">
          <span className="text-[10px] md:text-[12px] font-semibold text-white tracking-[0.5px] uppercase">
            ⚡ Premium Rewards Network
          </span>
        </div>

        <h1 className="font-headline text-4xl md:text-7xl font-black mb-6 leading-none text-white uppercase tracking-tight">
          UNLOCK FREE GIFT CARD & <br />
          <span className="text-primary">PREMIUM REWARD</span>
        </h1>

        <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-10 leading-relaxed px-4">
          The most reliable platform for gamers to earn and redeem digital gift cards. 
          Complete tasks, watch clips, and unlock rewards instantly.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-16 w-full md:w-auto px-4">
          <Button 
            onClick={() => handleScrollToSection('trending')}
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black h-16 px-12 rounded-2xl text-xl transition-all active:scale-95 shadow-2xl shadow-primary/20"
          >
            Unlock Now
          </Button>
          <Button 
            onClick={() => handleScrollToSection('how-it-works')}
            variant="outline" 
            className="w-full md:w-auto border-white/10 text-white hover:bg-white/5 bg-white/5 h-16 px-12 rounded-2xl text-xl transition-all active:scale-95"
          >
            How it Works
          </Button>
        </div>

        <div className="w-full max-w-2xl mx-auto relative px-4">
          <div className="relative glass-card flex items-center px-6 rounded-2xl border-white/10 shadow-2xl">
            <Search className="text-muted-foreground w-6 h-6 mr-4 shrink-0" />
            <Input 
              placeholder="Search rewards..." 
              className="bg-transparent border-none text-white text-lg h-16 focus-visible:ring-0 placeholder:text-white/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
