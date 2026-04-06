
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Gift, ChevronRight, AlertCircle, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useFirestore } from '@/firebase';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { giftCards } from '@/lib/gift-cards';
import Image from 'next/image';

/**
 * @fileOverview Advanced Real-time Search System.
 * Features: Local-first filtering for zero-latency, 1-char triggering, 
 * keyboard navigation, and intelligent text highlighting.
 */

type SearchResult = {
  id: string;
  title: string;
  category: string;
  type: 'Reward';
  href: string;
  imageUrl?: string;
  priceHint?: string;
};

export function AutoSuggestSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const router = useRouter();
  const firestore = useFirestore();
  const searchRef = useRef<HTMLDivElement>(null);

  // 1. Initial Load: Seed with static data and fetch Firestore index
  useEffect(() => {
    // Start with static data to ensure search works immediately
    const staticData: SearchResult[] = giftCards.map(c => ({
      id: c.id,
      title: c.brand,
      category: c.category,
      type: 'Reward',
      href: `/product/${c.slug}`,
      imageUrl: c.logoUrl || c.imageUrl,
      priceHint: "Verified Reward"
    }));
    
    setAllProducts(staticData);

    const fetchBrands = async () => {
      try {
        const brandsRef = collection(firestore, 'giftCardBrands');
        const q = query(brandsRef, orderBy('name'), limit(100));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const dbProducts: SearchResult[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.name,
              category: data.category,
              type: 'Reward',
              href: `/product/${data.seoSlug || doc.id}`,
              imageUrl: data.imageUrl,
              priceHint: "Verified Reward"
            };
          });
          
          // Merge and remove duplicates by title
          setAllProducts(prev => {
            const combined = [...prev, ...dbProducts];
            const unique = Array.from(new Map(combined.map(item => [item.title, item])).values());
            return unique;
          });
        }
      } catch (error) {
        console.error("Failed to preload Firestore search index:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();

    // Load recent searches from localStorage
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      try { setRecentSearches(JSON.parse(saved)); } catch (e) { setRecentSearches([]); }
    }
  }, [firestore]);

  // 2. Local Filtering Logic (Triggers from 1 character)
  const results = useMemo(() => {
    if (searchQuery.length < 1) return [];

    const term = searchQuery.toLowerCase().trim();
    const matches = allProducts.filter(product => {
      const title = (product.title || "").toLowerCase();
      const category = (product.category || "").toLowerCase();
      return title.includes(term) || category.includes(term);
    });

    return matches.slice(0, 6);
  }, [searchQuery, allProducts]);

  // 3. Trending Items (Shown when input is empty)
  const trendingItems = useMemo(() => {
    return allProducts.slice(0, 4);
  }, [allProducts]);

  // Keyboard Navigation
  useEffect(() => {
    setActiveIndex(-1);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const max = searchQuery.length < 1 ? trendingItems.length - 1 : results.length - 1;
      setActiveIndex(prev => (prev < max ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      const list = searchQuery.length < 1 ? trendingItems : results;
      if (activeIndex >= 0 && list[activeIndex]) {
        handleResultClick(list[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    saveSearch(result.title);
    router.push(result.href);
    setSearchQuery('');
    setIsOpen(false);
  };

  const saveSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  const highlightMatch = (text: string, match: string) => {
    if (!match) return <span className="font-bold">{text}</span>;
    const parts = text.split(new RegExp(`(${match})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === match.toLowerCase() 
        ? <span key={i} className="text-primary font-black">{part}</span> 
        : <span key={i} className="font-bold">{part}</span>
    );
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={searchRef} onKeyDown={handleKeyDown}>
      {/* Search Input Container */}
      <div className={cn(
        "relative flex items-center bg-white/5 border rounded-xl transition-all duration-300 group",
        isOpen ? "border-primary bg-black/40 ring-2 ring-primary/10" : "border-white/10 hover:border-white/20"
      )}>
        <div className="ml-3 flex items-center justify-center">
          <Search className={cn(
            "w-3.5 h-3.5 transition-colors",
            isOpen ? "text-primary" : "text-white/20 group-hover:text-white/40"
          )} />
        </div>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search rewards..."
          className="w-full h-9 md:h-10 bg-transparent border-none focus:ring-0 text-white text-[12px] md:text-sm px-2 placeholder:text-white/20 font-medium"
        />
        {isLoading && (
          <div className="mr-3">
            <Loader2 className="w-3 h-3 text-primary animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* NO INPUT: Show Recent and Trending Reward Items */}
            {searchQuery.length < 1 && (
              <div className="p-2 space-y-4 max-h-[450px] overflow-y-auto">
                {recentSearches.length > 0 && (
                  <div>
                    <p className="px-3 text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> Recent Searches
                    </p>
                    <div className="space-y-0.5">
                      {recentSearches.map((term, i) => (
                        <button 
                          key={i}
                          onClick={() => { setSearchQuery(term); }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-white/60 hover:text-white transition-colors flex items-center justify-between"
                        >
                          {term} <ChevronRight className="w-3 h-3 opacity-20" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="px-3 text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-primary" /> Trending Rewards
                  </p>
                  <div className="space-y-1">
                    {trendingItems.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => handleResultClick(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={cn(
                          "w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left",
                          activeIndex === idx ? "bg-white/10 border-l-2 border-primary" : "hover:bg-white/5"
                        )}
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0 overflow-hidden relative backdrop-blur-md p-1.5">
                          {item.imageUrl ? (
                            <Image 
                              src={item.imageUrl} 
                              alt="" 
                              fill 
                              className="object-contain p-1" 
                            />
                          ) : (
                            <Gift className="w-4 h-4 text-white/20" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate uppercase tracking-tight">{item.title}</p>
                          <span className="text-[8px] font-black text-primary uppercase tracking-widest">{item.category}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-white/10" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* WITH INPUT: Show Filtered Results */}
            {searchQuery.length >= 1 && (
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {results.length > 0 ? (
                  <div className="p-1.5 space-y-0.5">
                    {results.map((result, idx) => (
                      <button
                        key={result.id}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => handleResultClick(result)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg transition-all text-left group/item",
                          activeIndex === idx 
                            ? "bg-white/10 border-l-2 border-primary scale-[1.02] shadow-xl" 
                            : "hover:bg-white/5"
                        )}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Premium Glass Icon Container */}
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 overflow-hidden relative backdrop-blur-lg p-2">
                            {result.imageUrl ? (
                              <Image 
                                src={result.imageUrl} 
                                alt="" 
                                fill 
                                className="object-contain p-1.5 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" 
                              />
                            ) : (
                              <Gift className="w-5 h-5 text-white/20" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] text-white/95 truncate uppercase tracking-tight">
                              {highlightMatch(result.title, searchQuery)}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[9px] font-black uppercase text-primary tracking-widest">
                                {result.category}
                              </span>
                              <span className="w-1 h-1 bg-white/10 rounded-full" />
                              <span className="text-[9px] font-bold text-white/30 uppercase">
                                {result.priceHint}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-all",
                          activeIndex === idx ? "text-primary translate-x-1" : "text-white/10"
                        )} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-white/10" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white/60 uppercase tracking-widest">No matching rewards</p>
                      <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mt-1">Try a different brand name</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer Status */}
            <div className="bg-white/[0.02] p-3 text-center border-t border-white/5">
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                Secure Reward Network Active
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
