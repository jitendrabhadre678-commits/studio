"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Zap, ArrowRight, PlayCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { giftCards } from '@/lib/gift-cards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Hero() {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suggestions = giftCards.filter(c => 
    c.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
    c.category.toLowerCase().includes(searchValue.toLowerCase())
  ).slice(0, 6);

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
    <section className="relative pt-32 pb-20 px-4">
      {/* Background ambient glows */}
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

        <div className="mb-10 flex flex-wrap justify-center gap-4 animate-fade-in-up [animation-delay:500ms]">
          <Button 
            onClick={() => handleScrollToSection('trending')}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white font-black px-10 h-14 rounded-[12px] text-lg group shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
          >
            Unlock Now
            <Zap className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" />
          </Button>
          <Button 
            onClick={() => handleScrollToSection('how-it-works')}
            size="lg" 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 px-10 h-14 rounded-[12px] text-lg backdrop-blur-md transition-all active:scale-95"
          >
            How it Works
            <PlayCircle className="ml-2 w-5 h-5 opacity-60" />
          </Button>
        </div>

        <div className="max-w-2xl mx-auto relative animate-fade-in-up [animation-delay:600ms]" ref={dropdownRef}>
          <div className="relative group">
            <div className={cn(
              "absolute inset-0 bg-primary/20 blur-xl transition-all rounded-2xl",
              isFocused ? "bg-primary/40 opacity-100" : "opacity-0"
            )} />
            <div className="relative glass-card flex items-center px-4 rounded-2xl border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <Search className="text-muted-foreground w-6 h-6 mr-3" />
              <Input 
                placeholder="Search rewards (Steam, Amazon, Roblox...)" 
                className="bg-transparent border-none text-white text-lg h-16 focus-visible:ring-0 placeholder:text-muted-foreground"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />
              <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white font-bold h-10 px-8 rounded-xl shadow-lg">
                Search
              </Button>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {isFocused && searchValue.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-black/95 backdrop-blur-[20px] border border-white/10 rounded-[12px] p-2 z-[9999] shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200">
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 px-3 pt-2">Live Results</div>
              <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto pr-1 scrollbar-hide">
                {suggestions.length > 0 ? (
                  suggestions.map(card => {
                    const imageData = PlaceHolderImages.find(img => img.id === card.image) || PlaceHolderImages[0];
                    const displayImageUrl = card.imageUrl || imageData.imageUrl;

                    return (
                      <button 
                        key={card.id}
                        onClick={() => handleScrollToCard(card.slug)}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.08] text-left text-white transition-all group"
                      >
                        <div className="relative w-24 aspect-video rounded-md overflow-hidden shrink-0 border border-white/10 bg-black/40">
                          <Image 
                            src={displayImageUrl} 
                            alt={card.brand}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="96px"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="font-bold truncate text-sm flex items-center gap-2">
                            {card.brand}
                            {card.trending && <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full uppercase tracking-widest font-black">Hot</span>}
                          </div>
                          <div className="text-[11px] text-muted-foreground line-clamp-1">{card.description}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all mr-2" />
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-muted-foreground">No rewards found for "{searchValue}"</p>
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