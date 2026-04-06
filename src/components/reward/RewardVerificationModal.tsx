'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerificationModal } from './VerificationModal';
import { Loader2, ShieldCheck } from 'lucide-react';

/**
 * @fileOverview Orchestrator for Reward Verification.
 * Redirects user to OGAds smart link after successful security check.
 */

interface RewardVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: string;
  value: string;
}

export function RewardVerificationModal({ 
  isOpen, 
  onClose, 
  brand, 
  value
}: RewardVerificationModalProps) {
  const [view, setView] = useState<'verifying' | 'redirecting'>('verifying');

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setView('verifying'), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    document.body.style.overflow = 'hidden';
  }, [isOpen]);

  const handleVerificationSuccess = () => {
    setView('redirecting');
    
    // Smooth automated redirect to OGAds Smart Link
    // Using window.location.href for maximum reliability across browsers
    const REDIRECT_DELAY = 1200;
    const TARGET_URL = "https://gameflashx.space/sl/zy1x8";

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = TARGET_URL;
      }
    }, REDIRECT_DELAY);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-[8px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {view === 'verifying' ? (
                <VerificationModal key="verify" onSuccess={handleVerificationSuccess} />
              ) : (
                <motion.div key="redirect" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10 space-y-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto border border-primary/30 animate-pulse">
                    <ShieldCheck className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">
                    Security Check <br /><span className="text-primary">Passed!</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">Accessing your verified reward portal...</p>
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Establishing SSL Link</span>
                    </div>
                    <p className="text-[9px] text-white/10 font-bold uppercase tracking-[0.2em]">Redirecting to gameflashx.space</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
