'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Zap, ExternalLink, Gift, LayoutDashboard, User, BrainCircuit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { giftCards } from '@/lib/gift-cards';
import { Button } from '@/components/ui/button';

/**
 * @fileOverview High-impact Hero Search Bar with typing animation and trending chips.
 */

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
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
    'Find App Testing Offers...',
    'Unlock Roblox Rewards...',
    'Earn PayPal Cash...'
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

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Search Logic
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchTerms = debouncedQuery.toLowerCase();
    const features = [
      { id: 'f1', title: 'Premium Offers', type: 'feature', href: '/dashboard#offers', icon: Zap },
      { id: 'f2', title: 'App Testing & Games', type: 'feature', href: '/dashboard#offers', icon: LayoutDashboard },
      { id: 'f3', title: 'Paid Surveys', type: 'feature', href: '/dashboard#offers', icon: LayoutDashboard },
      { id: 'f4', title: 'Watch & Earn', type: 'feature', href: '/dashboard#offers', icon: Zap },
      { id: 'f5', title: 'Quizzes & Earn', type: 'feature', href: '/quiz-earn', icon: BrainCircuit },
    ];

    const rewards = giftCards.map(card => ({
      id: card.id,
      title: `${card.brand} Gift Card`,
      type: 'reward',
      href: `/${card.slug}`,
      icon: Gift
    }));

    const filtered = [...features, ...rewards].filter(item => 
      item.title.toLowerCase().includes(searchTerms)
    ).slice(0, 8);

    setResults(filtered);
    setIsOpen(filtered.length > 0);
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (href: string) => {
    router.push(href);
    setQuery('');
    setIsOpen(false);
  };

  const trendingTags = [
    { label: '🔥 Popular: Amazon', value: 'Amazon' },
    { label: '🎮 Steam', value: 'Steam' },
    { label: '💸 PayPal', value: 'PayPal' },
    { label: '📦 Roblox', value: 'Roblox' }
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-16 md:h-20 bg-transparent border-none focus:ring-0 text-white text-lg md:text-2xl px-6 placeholder:text-white/10 font-bold"
        />

        <Button 
          className="hidden md:flex h-14 md:h-16 px-10 bg-[#FA4616] hover:bg-[#FA4616]/90 text-white font-black uppercase tracking-widest rounded-2xl mr-2 transition-all active:scale-95 shadow-xl shadow-[#FA4616]/20 shrink-0"
          onClick={() => query && router.push(`/dashboard#offers`)}
        >
          Find Rewards
        </Button>
      </div>

      {/* Trending Suggestion Chips */}
      <div className="flex flex-wrap justify-center gap-3">
        {trendingTags.map((tag) => (
          <button
            key={tag.value}
            onClick={() => setQuery(tag.value)}
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/40 hover:text-white hover:border-[#FA4616] hover:bg-[#FA4616]/10 transition-all uppercase tracking-widest"
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* High-Impact Results Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] left-0 right-0 z-[100] bg-[#0a0a0a]/98 backdrop-blur-3xl border border-[#FA4616]/20 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-4 space-y-2">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result.href)}
                className="w-full flex items-center justify-between p-5 rounded-[1.5rem] hover:bg-white/5 transition-all text-left group/item"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:border-[#FA4616]/40 transition-colors shadow-inner">
                    <result.icon className="w-7 h-7 text-white/40 group-hover/item:text-[#FA4616]" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-white group-hover/item:text-[#FA4616] transition-colors">
                      {result.title}
                    </p>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black mt-1">
                      {result.type} Available
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all">
                  <ExternalLink className="w-4 h-4 text-[#FA4616]" />
                </div>
              </button>
            ))}
          </div>
          <div className="bg-[#FA4616]/5 p-4 text-center border-t border-white/5">
            <p className="text-[10px] font-black text-[#FA4616] uppercase tracking-[0.4em] animate-pulse">
              Found {results.length} Matches for "{query}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
