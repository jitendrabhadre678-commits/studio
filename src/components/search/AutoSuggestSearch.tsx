
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Zap, Gift, BookOpen, ChevronRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { giftCards } from '@/lib/gift-cards';
import { blogPosts } from '@/lib/blog-posts';

/**
 * @fileOverview Functional Auto-Suggest Search Bar.
 * Implements state-based filtering, highlighting, and empty state handling.
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search rewards, guides..."
          className="w-full h-11 bg-transparent border-none focus:ring-0 text-white text-sm px-3 placeholder:text-white/20 font-medium"
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {filteredResults.length > 0 ? (
            <div className="p-2 space-y-1">
              {filteredResults.map((result) => (
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
                        {highlightMatch(result.title, searchQuery)}
                      </p>
                      <span className={cn(
                        "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border mt-1 inline-block",
                        result.type === 'Reward' && "text-green-500 border-green-500/20 bg-green-500/5",
                        result.type === 'Guide' && "text-blue-500 border-blue-500/20 bg-blue-500/5",
                        result.type === 'Feature' && "text-[#FA4616] border-[#FA4616]/20 bg-[#FA4616]/5"
                      )}>
                        {result.type}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white/10 group-hover/item:text-[#FA4616] transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center flex flex-col items-center gap-3">
              <AlertCircle className="w-8 h-8 text-white/10" />
              <div>
                <p className="text-sm font-bold text-white/60">No results found</p>
                <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1">Try a different keyword</p>
              </div>
            </div>
          )}
          <div className="bg-white/5 p-3 text-center border-t border-white/5">
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">
              Direct routing enabled
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
