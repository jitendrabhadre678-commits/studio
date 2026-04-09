'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * @fileOverview Mandatory Cookie Consent Banner.
 * Establish trust and compliance by informing users about data usage.
 */

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-[10001] md:left-auto md:right-6 md:max-w-md"
        >
          <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col gap-4">
              <p className="text-[11px] text-white/70 leading-relaxed font-medium uppercase tracking-tight">
                We use cookies to improve your experience and analyze site traffic. By continuing to use our platform, you agree to our <Link href="/privacy-policy" className="text-primary font-black hover:underline">Privacy Policy</Link>.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={handleAccept}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] h-10 rounded-xl transition-all active:scale-95"
                >
                  Accept & Continue
                </Button>
                <Link href="/privacy-policy" className="flex-1">
                  <Button 
                    variant="outline"
                    className="w-full border-white/10 text-white/40 hover:text-white hover:bg-white/5 font-black uppercase tracking-widest text-[10px] h-10 rounded-xl"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
