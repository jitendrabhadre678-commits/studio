
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Zap, Gift, BookOpen, ChevronRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { giftCards } from '@/lib/gift-cards';
import { blogPosts } from '@/lib/blog-posts';
import { Button } from '@/components/ui/button';

/**
 * @fileOverview High-Impact Hero Search.
 * Implements functional state-based filtering with typing animations and empty state.
 */

type SearchResult = {
  id: string;
  title: string;
  type: 'Reward' | 'Guide' | 'Feature';
  href: string;
  icon: any;
};

export function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const phrases = [
    'Search for Steam Gift Cards...',
    'Search for Amazon Vouchers...',
    'How to unlock rewards?',
    'Find App Testing Offers...'
  ];

  // Placeholder typing effect
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setPlaceholder(isDeleting 
        ? fullText.substring(0, placeholder.length - 1)
        : fullText.substring(0, placeholder.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && placeholder === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && placeholder === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, loopNum, typingSpeed]);

  // Filtering Logic
  useEffect(() => {
    if (searchQuery.length < 2) {
      setFilteredResults([]);
      setIsOpen(false);
      return;
    }

    const handler = setTimeout(() => {
      const term = searchQuery.toLowerCase();
      
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

      const matches = [...features, ...rewards, ...guides].filter(item => 
        item.title.toLowerCase().includes(term) || 
        item.type.toLowerCase().includes(term)
      ).slice(0, 8);

      setFilteredResults(matches);
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setIsOpen(false);
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

  const trendingTags = [
    { label: '🔥 Popular: Amazon', value: 'Amazon' },
    { label: '🎮 Steam', value: 'Steam' },
    { label: '💸 PayPal', value: 'PayPal' },
    { label: '📚 Guides', value: 'How to' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 relative" ref={searchRef}>
      <div className={cn(
        "relative flex items-center bg-[#0a0a0a]/80 backdrop-blur-2xl border-2 rounded-[2rem] p-2 transition-all duration-500 group",
        isOpen ? "border-[#FA4616] ring-[12px] ring-[#FA4616]/10" : "border-white/10 hover:border-white/20 shadow-2xl"
      )}>
        <Search className={cn(
          "ml-6 w-6 h-6 transition-colors shrink-0",
          isOpen ? "text-[#FA4616]" : "text-white/20 group-hover:text-white/40"
        )} />
        
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-16 md:h-20 bg-transparent border-none focus:ring-0 text-white text-lg md:text-2xl px-6 placeholder:text-white/10 font-bold"
        />

        <Button 
          className="hidden md:flex h-14 md:h-16 px-10 bg-[#FA4616] hover:bg-[#FA4616]/90 text-white font-black uppercase tracking-widest rounded-2xl mr-2 transition-all active:scale-95 shadow-xl shadow-[#FA4616]/20 shrink-0"
          onClick={() => searchQuery && router.push(`/dashboard#offers`)}
        >
          Find Rewards
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {trendingTags.map((tag) => (
          <button
            key={tag.value}
            onClick={() => setSearchQuery(tag.value)}
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/40 hover:text-white hover:border-[#FA4616] hover:bg-[#FA4616]/10 transition-all uppercase tracking-widest"
          >
            {tag.label}
          </button>
        ))}
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] left-0 right-0 z-[100] bg-[#0a0a0a]/98 backdrop-blur-3xl border border-[#FA4616]/20 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {filteredResults.length > 0 ? (
            <div className="p-4 space-y-2">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.href)}
                  className="w-full flex items-center justify-between p-5 rounded-[1.5rem] hover:bg-white/5 transition-all text-left group/item"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:border-[#FA4616]/40 transition-colors shadow-inner shrink-0">
                      <result.icon className="w-7 h-7 text-white/40 group-hover/item:text-[#FA4616]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xl font-black text-white group-hover/item:text-[#FA4616] transition-colors truncate">
                        {highlightMatch(result.title, searchQuery)}
                      </p>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-[0.3em] px-2 py-0.5 rounded border mt-1 inline-block",
                        result.type === 'Reward' && "text-green-500 border-green-500/20 bg-green-500/5",
                        result.type === 'Guide' && "text-blue-500 border-blue-500/20 bg-blue-500/5",
                        result.type === 'Feature' && "text-[#FA4616] border-[#FA4616]/20 bg-[#FA4616]/5"
                      )}>
                        {result.type}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/10 group-hover/item:text-[#FA4616] transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                <AlertCircle className="w-10 h-10 text-white/20" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">No matches found</h4>
                <p className="text-muted-foreground mt-1">We couldn't find anything matching "{searchQuery}"</p>
              </div>
            </div>
          )}
          <div className="bg-[#FA4616]/5 p-4 text-center border-t border-white/5">
            <p className="text-[10px] font-black text-[#FA4616] uppercase tracking-[0.4em]">
              Searching across entire network
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
