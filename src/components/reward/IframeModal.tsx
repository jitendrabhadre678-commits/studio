'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, ShieldCheck } from 'lucide-react';

/**
 * @fileOverview Glassmorphism Iframe Modal.
 * Specialized container for external content lockers with a premium transparent aesthetic.
 */

interface IframeModalProps {
  url: string;
  onClose: () => void;
}

export function IframeModal({ url, onClose }: IframeModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="relative w-full max-w-[850px] bg-white/[0.05] backdrop-blur-[20px] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] mx-auto"
    >
      {/* Modal Header - Translucent */}
      <div className="bg-white/5 border-b border-white/5 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none">Secure Reward Portal</h4>
            <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest mt-1">Verification Verified</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Iframe Container */}
      <div className="relative w-full h-[75vh] sm:h-[80vh] md:h-[600px] bg-black/20">
        {/* Loading State visible through iframe until fully loaded */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-3 opacity-20">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Accessing Vault...</span>
          </div>
        </div>
        
        <iframe
          src={url}
          className="relative z-10 w-full h-full border-none"
          title="Reward Offer"
          allow="autoplay; clipboard-write"
        />
      </div>

      {/* Footer Trust Signal - Translucent */}
      <div className="bg-white/5 border-t border-white/5 px-6 py-4 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">
            Complete 1 activity above to unlock your digital code
          </p>
        </div>
      </div>
    </motion.div>
  );
}
