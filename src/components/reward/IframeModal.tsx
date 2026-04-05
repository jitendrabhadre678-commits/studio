'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, ShieldCheck } from 'lucide-react';

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
      className="relative w-full max-w-[800px] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
    >
      {/* Modal Header */}
      <div className="bg-black/40 backdrop-blur-md border-b border-white/5 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none">Secure Reward Portal</h4>
            <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest mt-1">Verification Verified</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Iframe Container with fixed responsive heights */}
      <div className="relative w-full h-[80vh] sm:h-[85vh] md:h-[600px] bg-black">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-3 opacity-20">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Loading Reward Vault...</span>
          </div>
        </div>
        <iframe
          src={url}
          className="relative z-10 w-full h-full border-none"
          title="Reward Offer"
          allow="autoplay; clipboard-write"
        />
      </div>

      {/* Footer Trust Signal */}
      <div className="bg-black/40 backdrop-blur-md border-t border-white/5 px-6 py-4 flex items-center justify-center">
        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
          Complete one activity above to unlock your digital code
        </p>
      </div>
    </motion.div>
  );
}
