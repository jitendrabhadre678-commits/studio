'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Zap, ExternalLink, Gift, LayoutDashboard, User, BrainCircuit, BookOpen, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { giftCards } from '@/lib/gift-cards';
import { blogPosts } from '@/lib/blog-posts';

/**
 * @fileOverview Upgraded Real-time Auto-Suggest Search Bar.
 * Features dual-source searching (Rewards & Blogs), categorized results,
 * and direct page routing with #FA4616 brand highlighting.
 */

type SearchResult = {
  id: string;
  title: string;
  type: 'Reward' | 'Guide' | 'Feature';
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

  // Debounce logic to optimize performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Dual-Source Filtering Logic
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchTerms = debouncedQuery.toLowerCase();

    // 1. Source: Platform Features
    const features: SearchResult[] = [
      { id: 'f1', title: 'Premium Offers', type: 'Feature', href: '/dashboard#offers', icon: Zap },
      { id: 'f2', title: 'Quizzes & Earn', type: 'Feature', href: '/quiz-earn', icon: BrainCircuit },
      { id: 'f3', title: 'My Rewards Vault', type: 'Feature', href: '/my-rewards', icon: Gift },
    ];

    // 2. Source: Rewards Gallery
    const rewards: SearchResult[] = giftCards.map(card => ({
      id: `r-${card.id}`,
      title: `${card.brand} Gift Card`,
      type: 'Reward',
      href: `/${card.slug}`,
      icon: Gift
    }));

    // 3. Source: Blogs & Guides
    const guides: SearchResult[] = blogPosts.map(post => ({
      id: `b-${post.slug}`,
      title: post.title,
      type: 'Guide',
      href: `/blog/${post.slug}`,
      icon: BookOpen
    }));

    const allPool = [...features, ...rewards, ...guides];
    const filtered = allPool.filter(item => 
      item.title.toLowerCase().includes(searchTerms)
    ).slice(0, 8);

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
          placeholder="Search rewards, guides, tasks..."
          className="w-full h-11 bg-transparent border-none focus:ring-0 text-white text-sm px-3 placeholder:text-white/20 font-medium"
        />
      </div>

      {/* Categorized Results Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 space-y-1">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result.href)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left group/item"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:border-[#FA4616]/30 transition-colors shrink-0">
                    <result.icon className="w-4 h-4 text-white/40 group-hover/item:text-[#FA4616]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white/80 truncate">
                      {highlightMatch(result.title, debouncedQuery)}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={cn(
                        "text-[8px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded border",
                        result.type === 'Reward' && "text-green-500 border-green-500/20 bg-green-500/5",
                        result.type === 'Guide' && "text-blue-500 border-blue-500/20 bg-blue-500/5",
                        result.type === 'Feature' && "text-[#FA4616] border-[#FA4616]/20 bg-[#FA4616]/5"
                      )}>
                        {result.type}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/10 group-hover/item:text-[#FA4616] transition-colors" />
              </button>
            ))}
          </div>
          <div className="bg-white/5 p-3 text-center border-t border-white/5">
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">
              Direct routing enabled for {results.length} results
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
