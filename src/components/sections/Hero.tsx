
"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Zap, ChevronRight, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { giftCards } from '@/lib/gift-cards';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Hero() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<typeof giftCards>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const popularSearches = useMemo(() => {
    return giftCards.filter(c => ['Amazon', 'Steam', 'PlayStation', 'Google Play'].includes(c.brand));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }
      const filtered = giftCards.filter(c => 
        c.brand.toLowerCase().includes(query.toLowerCase()) || 
        c.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setResults(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectReward = (slug: string) => {
    router.push(`/${slug}`);
    setIsFocused(false);
    setQuery('');
  };

  return (
    <section className="relative pt-12 md:pt-20 pb-20 px-4 text-center">
      <div className="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-[10px] border border-white/10 mb-6 animate-fade-in-up">
          <span className="text-[10px] md:text-[12px] font-semibold text-white tracking-[0.5px] uppercase">
            ⚡ Premium Rewards Network
          </span>
        </div>

        <h1 className="font-headline text-4xl md:text-7xl font-black mb-6 leading-none text-white uppercase tracking-tight">
          UNLOCK FREE GIFT CARD & <br />
          <span className="premium-text">PREMIUM REWARDS</span>
        </h1>

        <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-lg mb-10 leading-relaxed px-4">
          The most reliable platform for gamers to earn and redeem digital gift cards. 
          Complete tasks, watch clips, and unlock rewards instantly.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-16 w-full md:w-auto px-4">
          <Button 
            onClick={() => handleScrollToSection('trending')}
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black h-16 px-12 rounded-2xl text-lg md:text-xl transition-all active:scale-95 shadow-2xl shadow-primary/20"
          >
            Unlock Now
          </Button>
          <Button 
            onClick={() => handleScrollToSection('how-it-works')}
            variant="outline" 
            className="w-full md:w-auto border-white/10 text-white hover:bg-white/5 bg-white/5 h-16 px-12 rounded-2xl text-lg md:text-xl transition-all active:scale-95"
          >
            How it Works
          </Button>
        </div>

        {/* Smart Search Bar Container */}
        <div className="w-full max-w-2xl mx-auto relative px-4" ref={dropdownRef}>
          <div className={cn(
            "relative glass-card flex items-center px-6 rounded-2xl border-white/10 shadow-2xl transition-all duration-300 z-[100]",
            isFocused && "border-primary/40 ring-1 ring-primary/20 bg-black/40"
          )}>
            <Search className={cn("w-6 h-6 mr-4 shrink-0 transition-colors", isFocused ? "text-primary" : "text-muted-foreground")} />
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search rewards (Amazon, Steam, Roblox...)" 
              className="bg-transparent border-none text-white text-lg h-16 focus-visible:ring-0 placeholder:text-white/20 px-0"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown - Absolute Positioned Floating Result */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-4 right-4 mt-3 bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-[9999] overflow-hidden backdrop-blur-3xl"
              >
                <div className="p-2 max-h-[350px] overflow-y-auto custom-scrollbar">
                  {query.trim() === '' ? (
                    <div className="py-4 px-4">
                      <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                        <Sparkles className="w-3 h-3" /> Popular Rewards
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {popularSearches.map((card) => (
                          <button
                            key={card.id}
                            onClick={() => handleSelectReward(card.slug)}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left group border-b border-white/5 last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ background: card.gradient }}>
                                {card.brand[0]}
                              </div>
                              <span className="font-bold text-white group-hover:text-primary transition-colors">{card.brand}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-all group-hover:translate-x-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="py-2">
                      <div className="grid grid-cols-1 gap-1">
                        {results.map((card) => (
                          <button
                            key={card.id}
                            onClick={() => handleSelectReward(card.slug)}
                            className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all text-left group border-b border-white/5 last:border-0"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{ background: card.gradient }}>
                                {card.brand[0]}
                              </div>
                              <div>
                                <p className="font-bold text-white group-hover:text-primary transition-colors">{card.brand}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{card.category}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-white/20 uppercase group-hover:text-primary/40 transition-colors">Claim Now</span>
                              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-all group-hover:translate-x-1" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-6 h-6 text-white/20" />
                      </div>
                      <p className="text-white font-bold mb-1">No rewards found</p>
                      <p className="text-xs text-muted-foreground">Try searching for <span className="text-primary/60">Amazon</span>, <span className="text-primary/60">Steam</span>, or <span className="text-primary/60">PlayStation</span></p>
                    </div>
                  )}
                </div>
                
                <div className="bg-white/5 p-3 flex justify-center border-t border-white/5">
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                    Verified Digital Codes Released 24/7
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
