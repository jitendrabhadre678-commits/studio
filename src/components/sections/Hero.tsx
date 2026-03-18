"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
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
    <section className="relative pt-10 md:pt-24 pb-10 px-4 text-center">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10 flex flex-col items-center">
        {/* Top Badge (Pill Style) */}
        <div className="inline-flex items-center gap-2 px-[14px] py-[6px] rounded-full mb-4 bg-white/5 backdrop-blur-[10px] border border-white/10 transition-all hover:bg-white/10 animate-fade-in-up">
          <span className="text-[12px] font-semibold text-white tracking-[0.5px]">⚡ PREMIUM REWARDS NETWORK</span>
        </div>
        
        {/* Hero Heading */}
        <h1 className="font-headline text-[28px] md:text-[48px] font-bold mb-3 leading-[1.2] text-white uppercase tracking-tighter animate-fade-in-up [animation-delay:200ms]">
          UNLOCK FREE GIFT CARD & <br />
          <span className="text-[#FA4616]">PREMIUM REWARD</span>
        </h1>

        {/* Hero Subtext */}
        <p className="max-w-2xl mx-auto text-[#B0B0B0] text-sm md:text-base mb-8 leading-[1.6] animate-fade-in-up [animation-delay:400ms] px-4">
          The most reliable platform for gamers to earn and redeem digital gift cards. 
          Complete tasks, watch clips, and unlock rewards instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-3 mb-12 w-full md:w-auto animate-fade-in-up [animation-delay:500ms] px-4">
          <Button 
            onClick={() => handleScrollToSection('trending')}
            className="w-full md:w-auto bg-[#FA4616] hover:bg-[#FA4616]/90 text-white font-semibold h-[52px] md:h-[56px] px-10 rounded-[12px] text-base transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Unlock Now
          </Button>
          <Button 
            onClick={() => handleScrollToSection('how-it-works')}
            variant="outline" 
            className="w-full md:w-auto border-white/20 text-white hover:bg-white/10 bg-transparent h-[52px] md:h-[56px] px-10 rounded-[12px] text-base transition-all active:scale-95"
          >
            How it Works
          </Button>
        </div>

        {/* Search Suggestion Input (Integrated) */}
        <div className="w-full max-w-2xl mx-auto relative animate-fade-in-up [animation-delay:600ms] px-4" ref={dropdownRef}>
          <div className="relative group">
            <div className={cn(
              "absolute inset-0 bg-primary/10 blur-xl transition-all rounded-2xl",
              isFocused ? "bg-primary/20 opacity-100" : "opacity-0"
            )} />
            <div className="relative glass-card flex items-center px-4 rounded-[16px] border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
              <Search className="text-white/40 w-5 h-5 mr-3 shrink-0" />
              <Input 
                placeholder="Search rewards..." 
                className="bg-transparent border-none text-white text-sm md:text-base h-14 focus-visible:ring-0 placeholder:text-white/20 font-medium"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />
            </div>
          </div>

          {isFocused && searchValue.length > 0 && (
            <div className="absolute top-full left-4 right-4 mt-3 bg-[#0a0a0a] backdrop-blur-[24px] border border-white/10 rounded-2xl p-3 z-[60] shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-300">
              <div className="text-[10px] font-black text-[#FA4616] uppercase tracking-[0.25em] mb-3 px-3 text-left">Real-time Results</div>
              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {suggestions.length > 0 ? (
                  suggestions.map(card => (
                    <button 
                      key={card.id}
                      onClick={() => handleScrollToCard(card.slug)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-left text-white transition-all duration-300 border border-white/5"
                    >
                      <div 
                        className="relative w-12 aspect-[16/9] rounded-lg overflow-hidden shrink-0 border border-white/10 flex items-center justify-center p-1"
                        style={{ background: card.gradient }}
                      >
                         <span className="relative z-10 font-headline font-black text-white text-[6px] uppercase tracking-tighter text-center leading-none">
                          {card.brand}
                        </span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-bold truncate text-sm">{card.brand}</div>
                        <div className="text-[10px] text-white/40 truncate">{card.category} Reward</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/20 shrink-0" />
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-xs text-white/20">No matches found</p>
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
