"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Zap, ArrowRight, PlayCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { giftCards } from '@/lib/gift-cards';
import { cn } from '@/lib/utils';

export function Hero() {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suggestions = giftCards.filter(c => 
    c.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
    c.category.toLowerCase().includes(searchValue.toLowerCase())
  ).slice(0, 8);

  const handleScrollToCard = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setSearchValue('');
      setIsFocused(false);
    }
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 overflow-visible">
      <div className="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 md:mb-8 animate-fade-in-up">
          <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-white/80">Premium Rewards Network</span>
        </div>
        
        <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight md:leading-[1.1] animate-fade-in-up [animation-delay:200ms] text-white tracking-tighter uppercase">
          UNLOCK FREE GIFT CARD & <span className="text-primary text-glow-pomegranate">PREMIUM REWARD</span>
        </h1>

        <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-xl mb-10 md:mb-12 animate-fade-in-up [animation-delay:400ms] font-medium leading-relaxed px-2">
          The most reliable platform for gamers to earn and redeem digital gift cards. 
          Complete tasks and unlock the rewards you deserve instantly.
        </p>

        <div className="mb-12 md:mb-16 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up [animation-delay:500ms]">
          <Button 
            onClick={() => handleScrollToSection('trending')}
            size="lg" 
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black px-10 h-14 md:h-16 rounded-xl text-base md:text-lg group shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
          >
            Unlock Now
            <Zap className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" />
          </Button>
          <Button 
            onClick={() => handleScrollToSection('how-it-works')}
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-10 h-14 md:h-16 rounded-xl text-base md:text-lg backdrop-blur-md transition-all active:scale-95"
          >
            How it Works
            <PlayCircle className="ml-2 w-5 h-5 opacity-60" />
          </Button>
        </div>

        <div className="max-w-2xl mx-auto relative animate-fade-in-up [animation-delay:600ms] px-0" ref={dropdownRef}>
          <div className="relative group">
            <div className={cn(
              "absolute inset-0 bg-primary/10 blur-xl transition-all rounded-2xl",
              isFocused ? "bg-primary/20 opacity-100" : "opacity-0"
            )} />
            <div className="relative glass-card flex items-center px-4 rounded-2xl border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <Search className="text-muted-foreground w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 shrink-0" />
              <Input 
                placeholder="Search rewards..." 
                className="bg-transparent border-none text-white text-sm md:text-lg h-14 md:h-16 focus-visible:ring-0 placeholder:text-muted-foreground font-medium"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />
              <Button className="hidden sm:flex bg-primary hover:bg-primary/90 text-white font-black h-10 px-6 rounded-xl shadow-lg uppercase tracking-widest text-[10px]">
                Search
              </Button>
            </div>
          </div>

          {isFocused && searchValue.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-[#0a0a0a] backdrop-blur-[24px] border border-white/10 rounded-2xl p-3 z-[60] shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-300">
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-3 px-3 text-left">Live Results</div>
              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {suggestions.length > 0 ? (
                  suggestions.map(card => (
                    <button 
                      key={card.id}
                      onClick={() => handleScrollToCard(card.slug)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-left text-white transition-all duration-300 border border-white/5"
                    >
                      <div 
                        className="relative w-14 aspect-[16/9] rounded-lg overflow-hidden shrink-0 border border-white/10 flex items-center justify-center p-1"
                        style={{ background: card.gradient }}
                      >
                         <span className="relative z-10 font-headline font-black text-white text-[6px] uppercase tracking-tighter text-center leading-none">
                          {card.brand}
                        </span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-bold truncate text-sm">{card.brand}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{card.category} Reward</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/20 shrink-0" />
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-xs text-muted-foreground">No matches found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
