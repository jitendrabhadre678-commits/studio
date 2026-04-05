
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Zap, Gift, ChevronRight, AlertCircle, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useFirestore } from '@/firebase';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

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

const TRENDING_KEYWORDS = ["Amazon", "Roblox", "Steam", "PayPal Cash", "Xbox"];

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

  // 1. Initial Load: Pre-fetch all searchable brands for local filtering
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsRef = collection(firestore, 'giftCardBrands');
        const q = query(brandsRef, orderBy('name'), limit(100));
        const snapshot = await getDocs(q);
        
        const products: SearchResult[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name,
            category: data.category,
            type: 'Reward',
            href: `/${data.seoSlug || doc.id}`,
            imageUrl: data.imageUrl,
            priceHint: "Verified Reward"
          };
        });
        
        setAllProducts(products);
      } catch (error) {
        console.error("Failed to preload search index:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();

    // Load recent searches
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      try { setRecentSearches(JSON.parse(saved)); } catch (e) { setRecentSearches([]); }
    }
  }, [firestore]);

  // 2. Intelligent Local Filtering Logic
  const results = useMemo(() => {
    if (searchQuery.length < 1) return [];

    const term = searchQuery.toLowerCase().trim();
    
    // Split into prefix matches and partial matches for better UX ranking
    const prefixMatches: SearchResult[] = [];
    const partialMatches: SearchResult[] = [];

    allProducts.forEach(product => {
      const title = product.title.toLowerCase();
      if (title.startsWith(term)) {
        prefixMatches.push(product);
      } else if (title.includes(term)) {
        partialMatches.push(product);
      }
    });

    return [...prefixMatches, ...partialMatches].slice(0, 6);
  }, [searchQuery, allProducts]);

  // 3. Interactions & State Management
  useEffect(() => {
    setActiveIndex(-1);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        handleResultClick(results[activeIndex]);
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
    if (!match) return text;
    const parts = text.split(new RegExp(`(${match})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === match.toLowerCase() 
        ? <span key={i} className="text-primary font-black">{part}</span> 
        : part
    );
  };

  // Click Outside
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

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* NO INPUT: Show Recent and Trending */}
            {searchQuery.length < 1 && (
              <div className="p-4 space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <p className="px-2 text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> Recent Searches
                    </p>
                    <div className="space-y-1">
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
                  <p className="px-2 text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> Trending Now
                  </p>
                  <div className="flex flex-wrap gap-2 px-2">
                    {TRENDING_KEYWORDS.map((kw) => (
                      <button 
                        key={kw}
                        onClick={() => setSearchQuery(kw)}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-white/60 hover:text-primary hover:border-primary/30 transition-all"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* WITH INPUT: Show Dynamic Results */}
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
                          "w-full flex items-center justify-between p-2.5 rounded-lg transition-all text-left group/item",
                          activeIndex === idx ? "bg-white/10" : "hover:bg-white/5"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0 overflow-hidden relative">
                            {result.imageUrl ? (
                              <img src={result.imageUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Gift className="w-4 h-4 text-white/20" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[12px] font-black text-white/90 truncate uppercase tracking-tight">
                              {highlightMatch(result.title, searchQuery)}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[8px] font-black uppercase text-primary tracking-widest">
                                {result.category}
                              </span>
                              <span className="w-1 h-1 bg-white/10 rounded-full" />
                              <span className="text-[8px] font-bold text-white/30 uppercase">
                                {result.priceHint}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                           <ChevronRight className={cn(
                             "w-3 h-3 transition-colors",
                             activeIndex === idx ? "text-primary" : "text-white/10"
                           )} />
                        </div>
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
                Live Network Active
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
