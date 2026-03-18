
"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Zap, ChevronRight, X, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { giftCards } from '@/lib/gift-cards';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Hero() {
  const [query, setQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [results, setResults] = useState<typeof giftCards>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const popularSearches = useMemo(() => {
    return giftCards.filter(c => ['Amazon', 'Steam', 'PlayStation', 'Google Play'].includes(c.brand));
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (isSearchActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isSearchActive]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }
      const filtered = giftCards.filter(c => 
        c.brand.toLowerCase().includes(query.toLowerCase()) || 
        c.category.toLowerCase().includes(query.toLowerCase())
      );
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
    setIsSearchActive(false);
    setQuery('');
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setQuery('');
  };

  return (
    <>
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

          {/* Initial Static Search Bar (triggers Mode) */}
          {!isSearchActive && (
            <div className="w-full max-w-2xl mx-auto px-4">
              <div 
                onClick={() => setIsSearchActive(true)}
                className="relative glass-card flex items-center px-6 rounded-2xl border-white/10 shadow-2xl h-16 cursor-text hover:border-primary/40 transition-all group"
              >
                <Search className="w-6 h-6 mr-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-white/20 text-lg">Search rewards (Amazon, Steam, Roblox...)</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FULL SCREEN SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#0f0f0f] flex flex-col pt-14 md:pt-[72px]"
          >
            {/* STICKY TOP SEARCH BAR */}
            <div className="bg-[#0f0f0f] border-b border-white/5 p-4 md:p-6 sticky top-0 z-[10001]">
              <div className="container mx-auto max-w-4xl">
                <div className="relative glass-card flex items-center px-6 rounded-2xl border-primary/40 shadow-2xl bg-white/5">
                  <Search className="w-6 h-6 mr-4 shrink-0 text-primary" />
                  <Input 
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search rewards (Amazon, Steam, Roblox...)" 
                    className="bg-transparent border-none text-white text-lg h-16 focus-visible:ring-0 placeholder:text-white/20 px-0"
                  />
                  <button 
                    onClick={handleCloseSearch}
                    className="ml-2 p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white flex items-center gap-2"
                  >
                    <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Close</span>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* RESULTS AREA */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-10">
              <div className="container mx-auto max-w-4xl">
                {query.trim() === '' ? (
                  <div className="space-y-10 animate-fade-in-up">
                    <div>
                      <div className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                        <Sparkles className="w-4 h-4" /> Recommended Rewards
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {popularSearches.map((card) => (
                          <button
                            key={card.id}
                            onClick={() => handleSelectReward(card.slug)}
                            className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-left group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-black" style={{ background: card.gradient }}>
                                {card.brand[0]}
                              </div>
                              <div>
                                <p className="font-black text-white group-hover:text-primary transition-colors text-xl uppercase tracking-tighter leading-none mb-1">{card.brand}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{card.category}</p>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-primary transition-all group-hover:translate-x-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-4 animate-fade-in-up">
                    <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-4 px-2">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Found {results.length} Matches</span>
                    </div>
                    {results.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => handleSelectReward(card.slug)}
                        className="w-full flex items-center justify-between p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-primary/20 transition-all text-left group"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black shrink-0 shadow-2xl" style={{ background: card.gradient }}>
                            {card.brand[0]}
                          </div>
                          <div>
                            <h3 className="font-black text-white group-hover:text-primary transition-colors text-xl md:text-2xl uppercase tracking-tight leading-none mb-1">
                              {card.brand}
                            </h3>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{card.category}</span>
                              <div className="w-1 h-1 bg-white/10 rounded-full" />
                              <span className="text-[10px] text-primary font-black uppercase tracking-widest">{card.values[0]} - {card.values[card.values.length-1]}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="hidden md:block text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-primary transition-colors">Claim Reward</span>
                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                            <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-white/10" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">No rewards found</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      We couldn't find any gift cards matching "<span className="text-primary">{query}</span>". 
                      Try searching for <span className="text-white/60">Amazon</span>, <span className="text-white/60">Steam</span>, or <span className="text-white/60">Roblox</span>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
