'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Zap, ExternalLink, Gift, LayoutDashboard, User, BrainCircuit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { giftCards } from '@/lib/gift-cards';

/**
 * @fileOverview Real-time Auto-Suggest Search Bar.
 * Features debouncing, smart filtering, and #FA4616 brand highlighting.
 */

type SearchResult = {
  id: string;
  title: string;
  type: 'reward' | 'feature' | 'page';
  href: string;
  icon: any;
};

export function AutoSuggestSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Filtering logic
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchTerms = debouncedQuery.toLowerCase();

    // Mock features/pages data
    const features: SearchResult[] = [
      { id: 'f1', title: 'Premium Offers', type: 'feature', href: '/dashboard#offers', icon: Zap },
      { id: 'f2', title: 'App Testing & Games', type: 'feature', href: '/dashboard#offers', icon: LayoutDashboard },
      { id: 'f3', title: 'Paid Surveys', type: 'feature', href: '/dashboard#offers', icon: LayoutDashboard },
      { id: 'f4', title: 'Watch & Earn', type: 'feature', href: '/dashboard#offers', icon: Zap },
      { id: 'f5', title: 'Quizzes & Earn', type: 'feature', href: '/quiz-earn', icon: BrainCircuit },
      { id: 'p1', title: 'User Profile', type: 'page', href: '/account-settings', icon: User },
      { id: 'p2', title: 'My Rewards Vault', type: 'page', href: '/my-rewards', icon: Gift },
    ];

    const rewards: SearchResult[] = giftCards.map(card => ({
      id: card.id,
      title: `${card.brand} Gift Card`,
      type: 'reward',
      href: `/${card.slug}`,
      icon: Gift
    }));

    const allPool = [...features, ...rewards];
    const filtered = allPool.filter(item => 
      item.title.toLowerCase().includes(searchTerms)
    ).slice(0, 6);

    setResults(filtered);
    setIsOpen(filtered.length > 0);
  }, [debouncedQuery]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (href: string) => {
    router.push(href);
    setQuery('');
    setIsOpen(false);
  };

  const highlightMatch = (text: string, match: string) => {
    if (!match) return text;
    const parts = text.split(new RegExp(`(${match})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === match.toLowerCase() 
        ? <span key={i} className="text-[#FA4616] font-black">{part}</span> 
        : part
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0" ref={searchRef}>
      <div className={cn(
        "relative flex items-center bg-white/5 border rounded-2xl transition-all duration-300 group",
        isOpen ? "border-[#FA4616] bg-black/40 ring-4 ring-[#FA4616]/10" : "border-white/10 hover:border-white/20"
      )}>
        <Search className={cn(
          "ml-4 w-4 h-4 transition-colors",
          isOpen ? "text-[#FA4616]" : "text-white/20 group-hover:text-white/40"
        )} />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder="Search rewards, tasks, guides..."
          className="w-full h-11 bg-transparent border-none focus:ring-0 text-white text-sm px-3 placeholder:text-white/20 font-medium"
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 space-y-1">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result.href)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left group/item"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:border-[#FA4616]/30 transition-colors">
                    <result.icon className="w-4 h-4 text-white/40 group-hover/item:text-[#FA4616]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white/80 truncate">
                      {highlightMatch(result.title, debouncedQuery)}
                    </p>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-black">
                      {result.type}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/10 group-hover/item:text-[#FA4616] transition-colors" />
              </button>
            ))}
          </div>
          <div className="bg-white/5 p-3 text-center border-t border-white/5">
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">
              Showing {results.length} relevant matches
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
