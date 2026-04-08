'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Sparkles, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * @fileOverview A scroll-triggered marketing popup optimized for the McDonald's reward.
 * Triggers at 40% scroll depth, once per session.
 */

export function ScrollTriggerPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [userCount, setUserCount] = useState(124);

  useEffect(() => {
    // Prevent showing if already seen this session
    if (typeof window !== 'undefined') {
      const hasSeenPopup = sessionStorage.getItem('mcdonalds_popup_seen');
      if (hasSeenPopup) return;
    }

    // Set randomized user count once on mount
    setUserCount(Math.floor(Math.random() * (150 - 90 + 1)) + 90);

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      if (scrolled >= 40) {
        setIsOpen(true);
        sessionStorage.setItem('mcdonalds_popup_seen', 'true');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleParticipate = () => {
    // Redirect to the McDonald's product page for email submit flow
    window.location.href = "/product/free-mcdonalds-reward-2026";
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative glass-card w-full max-w-md p-8 md:p-10 rounded-[24px] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Accent */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FFC72C]/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFC72C] to-[#E3191E] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,199,44,0.3)]">
                <Utensils className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight mb-2">
                🍔 Don't Leave <br /><span className="text-[#FFC72C]">Hungry!</span>
              </h2>
              
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-6 leading-relaxed">
                Enter your email for a chance to receive a $100 McDonald's reward. It only takes a minute!
              </p>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-8">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-white/10" />
                    ))}
                  </div>
                  <span className="text-xs font-black text-white/80">{userCount}+ US users claimed today</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#FFC72C] animate-pulse" />
                  <span className="text-[10px] font-black text-[#FFC72C] uppercase tracking-widest">Premium Opportunity Active</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleParticipate}
                  className="w-full h-14 bg-gradient-to-r from-[#FFC72C] to-[#E3191E] hover:scale-[1.02] active:scale-[0.98] text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_30px_rgba(255,199,44,0.3)]"
                >
                  Show Me How
                </Button>
                
                <button
                  onClick={handleClose}
                  className="text-xs font-bold text-white/30 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Maybe next time
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
