
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Zap, Gift, ChevronRight, AlertCircle, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useFirestore } from '@/firebase';
import { collection, query, where, limit, getDocs, orderBy, startAt, endAt } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @fileOverview Real-time Firestore Search System.
 * Features: Debounced queries, Recent Searches (localStorage), and Glassmorphism UI.
 */

type SearchResult = {
  id: string;
  title: string;
  category: string;
  type: 'Reward' | 'Guide' | 'Feature';
  href: string;
  imageUrl?: string;
  priceHint?: string;
};

const TRENDING_KEYWORDS = ["Amazon", "Roblox", "Steam", "PayPal Cash", "Game Pass"];

export function AutoSuggestSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const firestore = useFirestore();
  const searchRef = useRef<HTMLDivElement>(null);

  // 1. Load Recent Searches from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  // 2. Real-time Search Logic with Debounce
  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const handler = setTimeout(async () => {
      setIsLoading(true);
      try {
        const term = searchQuery.trim();
        // Capitalize first letter for Firestore prefix match (since names are capitalized)
        const capitalizedTerm = term.charAt(0).toUpperCase() + term.slice(1);

        const brandsRef = collection(firestore, 'giftCardBrands');
        const q = query(
          brandsRef,
          orderBy('name'),
          startAt(capitalizedTerm),
          endAt(capitalizedTerm + '\uf8ff'),
          limit(6)
        );

        const snapshot = await getDocs(q);
        const fetchedResults: SearchResult[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name,
            category: data.category,
            type: 'Reward',
            href: `/${data.seoSlug || doc.id}`,
            imageUrl: data.imageUrl,
            priceHint: "From $10" // Default hint for marketplace feel
          };
        });

        setResults(fetchedResults);
        setIsOpen(true);
      } catch (error) {
        console.error("Search fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, firestore]);

  // 3. Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className={cn(
        "relative flex items-center bg-white/5 border rounded-xl transition-all duration-300 group",
        isOpen ? "border-primary bg-black/40 ring-2 ring-primary/10" : "border-white/10 hover:border-white/20"
      )}>
        <div className="ml-3 flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
          ) : (
            <Search className={cn(
              "w-3.5 h-3.5 transition-colors",
              isOpen ? "text-primary" : "text-white/20 group-hover:text-white/40"
            )} />
          )}
        </div>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search rewards..."
          className="w-full h-9 md:h-10 bg-transparent border-none focus:ring-0 text-white text-[12px] md:text-sm px-2 placeholder:text-white/20 font-medium"
        />
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* 1. Empty State: Trending & Recent */}
            {searchQuery.length < 2 && (
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

            {/* 2. Results List */}
            {searchQuery.length >= 2 && (
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {results.length > 0 ? (
                  <div className="p-1.5 space-y-0.5">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-all text-left group/item"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:border-primary/30 transition-colors shrink-0 overflow-hidden relative">
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
                           <ChevronRight className="w-3 h-3 text-white/10 group-hover/item:text-primary transition-colors" />
                           <span className="text-[7px] font-black text-white/10 uppercase tracking-widest group-hover/item:text-primary/40">Select</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : !isLoading && (
                  <div className="p-10 text-center flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-white/10" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white/60 uppercase tracking-widest">No results found</p>
                      <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mt-1">Try another brand or keyword</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer Status */}
            <div className="bg-white/[0.02] p-3 text-center border-t border-white/5">
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                Live Network Active
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
