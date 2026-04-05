'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ShieldCheck, Zap, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Dynamic Reward Portal with Persistent Progress.
 * Implements a step-based progress system to increase user retention and trust.
 */

interface IframeModalProps {
  url: string;
  onClose: () => void;
}

export function IframeModal({ url, onClose }: IframeModalProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Portal...');
  const [stepText, setStep] = useState('Step 1 of 3');

  // Persistence and Progress Logic
  useEffect(() => {
    // 1. Initial Load Progress
    const savedProgress = localStorage.getItem('reward_unlock_progress');
    const initialVal = savedProgress ? parseInt(savedProgress) : 15;
    setProgress(initialVal);
    
    if (initialVal < 40) {
      setTimeout(() => {
        updateProgress(40, 'Step 1 Completed: Offer Accessed', 'Step 2 of 3');
      }, 2000);
    }

    // 2. Simulated Verification Phase
    const verificationTimer = setTimeout(() => {
      updateProgress(70, 'Verifying Completion Signal...', 'Step 3 of 3');
    }, 6000);

    // 3. Return Focus Logic (Psychological UX)
    const handleFocus = () => {
      setProgress(prev => {
        if (prev >= 70 && prev < 90) {
          updateProgress(90, 'Almost done... Complete the last step', 'Final Step');
          return 90;
        }
        return prev;
      });
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      clearTimeout(verificationTimer);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const updateProgress = (val: number, statusMsg: string, stepMsg: string) => {
    setProgress(val);
    setStatus(statusMsg);
    setStep(stepMsg);
    localStorage.setItem('reward_unlock_progress', val.toString());
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="relative w-full max-w-[850px] bg-white/[0.03] backdrop-blur-[24px] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.6)] mx-auto"
    >
      {/* Dynamic Progress Header */}
      <div className="bg-black/40 border-b border-white/5 p-6">
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
              {progress >= 90 ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in" />
              ) : (
                <Zap className="w-5 h-5 text-primary animate-pulse" />
              )}
            </div>
            <div>
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em] leading-none">Unlock Progress</h4>
              <p className={cn(
                "text-[9px] font-bold uppercase tracking-widest mt-1.5 transition-colors duration-500",
                progress >= 70 ? "text-green-500" : "text-white/40"
              )}>
                {status}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-1">{stepText}</span>
            <span className="text-2xl font-black text-white tabular-nums leading-none">{progress}%</span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-primary relative"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 60 }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-white/20 blur-sm" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full bg-white/40 blur-md" />
          </motion.div>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="relative w-full h-[65vh] md:h-[550px] bg-black/40">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="flex flex-col items-center gap-4 opacity-20">
            <Loader2 className="w-10 h-10 animate-spin text-white" />
            <span className="text-xs font-black uppercase tracking-widest text-white">Loading Reward Node...</span>
          </div>
        </div>
        
        <iframe
          src={url}
          className="relative z-10 w-full h-full border-none bg-transparent"
          title="Reward Offer"
          allow="autoplay; clipboard-write"
        />
      </div>

      {/* Footer Instructions */}
      <div className="bg-black/60 border-t border-white/5 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 text-primary" />
          <p className="text-[10px] text-white/50 font-medium leading-tight max-w-sm uppercase tracking-tight">
            Complete one activity above to reach <span className="text-white font-black">100%</span> and release your digital code.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="px-6 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
        >
          Exit Portal
        </button>
      </div>
    </motion.div>
  );
}
