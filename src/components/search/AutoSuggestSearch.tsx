
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Zap, Gift, BookOpen, ChevronRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { giftCards } from '@/lib/gift-cards';
import { blogPosts } from '@/lib/blog-posts';

/**
 * @fileOverview Functional Auto-Suggest Search Bar.
 * Updated for mobile navbar integration with rounded-xl and 36-40px height.
 */

type SearchResult = {
  id: string;
  title: string;
  type: 'Reward' | 'Guide' | 'Feature';
  href: string;
  icon: any;
};

export function AutoSuggestSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Search Logic & Filtering
  useEffect(() => {
    if (searchQuery.length < 2) {
      setFilteredResults([]);
      setIsOpen(false);
      return;
    }

    setIsTyping(true);
    const handler = setTimeout(() => {
      const term = searchQuery.toLowerCase();

      // Data Pool Consolidation
      const features: SearchResult[] = [
        { id: 'f1', title: 'Premium Offers', type: 'Feature', href: '/dashboard#offers', icon: Zap },
        { id: 'f2', title: 'Quizzes & Earn', type: 'Feature', href: '/quiz-earn', icon: Zap },
      ];

      const rewards: SearchResult[] = giftCards.map(card => ({
        id: `r-${card.id}`,
        title: `${card.brand} Gift Card`,
        type: 'Reward',
        href: `/${card.slug}`,
        icon: Gift
      }));

      const guides: SearchResult[] = blogPosts.map(post => ({
        id: `b-${post.slug}`,
        title: post.title,
        type: 'Guide',
        href: `/blog/${post.slug}`,
        icon: BookOpen
      }));

      const allPool = [...features, ...rewards, ...guides];

      // Filtering Logic
      const matches = allPool.filter(item => 
        item.title.toLowerCase().includes(term) || 
        item.type.toLowerCase().includes(term)
      ).slice(0, 6);

      setFilteredResults(matches);
      setIsOpen(true);
      setIsTyping(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (href: string) => {
    router.push(href);
    setSearchQuery('');
    setIsOpen(false);
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
        <Search className={cn(
          "ml-3 w-3.5 h-3.5 transition-colors",
          isOpen ? "text-primary" : "text-white/20 group-hover:text-white/40"
        )} />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search rewards..."
          className="w-full h-9 md:h-10 bg-transparent border-none focus:ring-0 text-white text-[12px] md:text-sm px-2 placeholder:text-white/20 font-medium"
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {filteredResults.length > 0 ? (
            <div className="p-1.5 space-y-0.5">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.href)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-all text-left group/item"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:border-primary/30 transition-colors shrink-0">
                      <result.icon className="w-3.5 h-3.5 text-white/40 group-hover/item:text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white/80 truncate">
                        {highlightMatch(result.title, searchQuery)}
                      </p>
                      <span className={cn(
                        "text-[7px] font-black uppercase tracking-widest px-1 py-0.5 rounded border mt-0.5 inline-block",
                        result.type === 'Reward' && "text-green-500 border-green-500/20 bg-green-500/5",
                        result.type === 'Guide' && "text-blue-500 border-blue-500/20 bg-blue-500/5",
                        result.type === 'Feature' && "text-primary border-primary/20 bg-primary/5"
                      )}>
                        {result.type}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-3 h-3 text-white/10 group-hover/item:text-primary transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center flex flex-col items-center gap-2">
              <AlertCircle className="w-6 h-6 text-white/10" />
              <div>
                <p className="text-xs font-bold text-white/60">No results</p>
                <p className="text-[8px] text-white/20 uppercase tracking-widest mt-0.5">Try another keyword</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
