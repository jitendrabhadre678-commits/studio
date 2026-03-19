
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @fileOverview Premium Hero Search Bar.
 * High-contrast white pill design with smart auto-suggestions.
 */

const PREDEFINED_SUGGESTIONS = [
  "Amazon Gift Card",
  "How to unlock Amazon Gift Card",
  "Free PayPal Cash",
  "Play games and earn rewards",
  "Best app testing offers",
  "Google Play Gift Card",
  "Steam Gift Card",
  "Netflix Reward"
];

export function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filtering Logic
  useEffect(() => {
    if (searchQuery.length < 1) {
      setFilteredResults([]);
      setIsOpen(false);
      return;
    }

    const term = searchQuery.toLowerCase();
    const matches = PREDEFINED_SUGGESTIONS.filter(item => 
      item.toLowerCase().includes(term)
    ).slice(0, 5);

    setFilteredResults(matches);
    setIsOpen(matches.length > 0);
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

  const handleSelect = (text: string) => {
    setSearchQuery(text);
    setIsOpen(false);
    router.push('/dashboard');
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
    <div className="w-full max-w-xl mx-auto relative z-50" ref={searchRef}>
      {/* Search Input Container */}
      <div className={cn(
        "relative flex items-center bg-white rounded-full transition-all duration-500 overflow-hidden px-2",
        isOpen ? "shadow-[0_20px_40px_rgba(0,0,0,0.3)]" : "shadow-xl hover:shadow-2xl"
      )}>
        <div className="pl-5 pr-3">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search rewards (Amazon, PayPal, Games...)"
          className="w-full h-14 md:h-16 bg-transparent border-none focus:ring-0 text-gray-900 text-sm md:text-base placeholder:text-gray-400 font-medium"
        />

        <button 
          onClick={() => router.push('/dashboard')}
          className="bg-[#FA4616] text-white p-3 md:p-4 rounded-full hover:bg-[#FA4616]/90 transition-all active:scale-95 shrink-0"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden border border-gray-100"
          >
            <div className="p-3">
              <p className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recommended Rewards</p>
              {filteredResults.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-[#FA4616]/20 transition-colors">
                    <Zap className="w-4 h-4 text-gray-300 group-hover:text-[#FA4616]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {highlightMatch(result, searchQuery)}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-[#FA4616] transition-colors" />
                </button>
              ))}
            </div>
            <div className="bg-gray-50/50 p-3 text-center border-t border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                Live Reward Feed Active
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
