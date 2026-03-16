
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { giftCards } from '@/lib/gift-cards';

export function Hero() {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = giftCards.filter(c => 
    c.brand.toLowerCase().includes(searchValue.toLowerCase())
  ).slice(0, 5);

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 animate-fade-in-up">
          <Zap className="w-4 h-4 text-primary fill-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">Trusted by 2.4M+ Global Gamers</span>
        </div>
        
        <h1 className="font-headline text-5xl md:text-8xl font-black mb-6 leading-tight animate-fade-in-up [animation-delay:200ms]">
          Unlock <span className="text-primary text-glow">Free Gift Cards</span><br />
          & <span className="text-white">Premium Rewards</span>
        </h1>

        <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-12 animate-fade-in-up [animation-delay:400ms]">
          The most reliable platform for gamers to earn and redeem digital gift cards. 
          Complete tasks, watch clips, and unlock the rewards you deserve instantly.
        </p>

        <div className="max-w-2xl mx-auto relative animate-fade-in-up [animation-delay:600ms]">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl group-focus-within:bg-primary/40 transition-all rounded-2xl" />
            <div className="relative glass-card flex items-center px-4 rounded-2xl border-white/20">
              <Search className="text-muted-foreground w-6 h-6 mr-3" />
              <Input 
                placeholder="Search rewards (Steam, Amazon, Roblox...)" 
                className="bg-transparent border-none text-white text-lg h-16 focus-visible:ring-0 placeholder:text-muted-foreground"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
              <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white font-bold h-10 px-8">
                Search
              </Button>
            </div>
          </div>

          {/* Search Suggestions */}
          {isFocused && searchValue.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-4 glass-card rounded-2xl p-4 z-50 animate-in fade-in zoom-in duration-200">
              <div className="text-xs font-bold text-muted-foreground uppercase mb-3 px-2">Top Results</div>
              <div className="flex flex-col gap-1">
                {suggestions.map(card => (
                  <button 
                    key={card.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-left text-white transition-colors"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold">{card.brand}</div>
                      <div className="text-xs text-muted-foreground">{card.category} Reward</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 animate-fade-in-up [animation-delay:800ms]">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black px-12 h-14 rounded-xl text-lg group">
            Unlock Now
            <Zap className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-12 h-14 rounded-xl text-lg">
            How it Works
          </Button>
        </div>
      </div>
    </section>
  );
}
