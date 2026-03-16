"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Loader2, ArrowRight, Lock } from 'lucide-react';
import { GiftCard } from '@/lib/gift-cards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const SESSION_DURATION = 6000; // 6 seconds in ms

export function RewardUnlockModal({ 
  card, 
  value, 
  isOpen, 
  onClose 
}: { 
  card: GiftCard; 
  value: string;
  isOpen: boolean; 
  onClose: () => void 
}) {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setTimeLeft(6);
      setIsComplete(false);
      
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / SESSION_DURATION) * 100, 100);
        const remainingSeconds = Math.max(Math.ceil((SESSION_DURATION - elapsed) / 1000), 0);
        
        setProgress(currentProgress);
        setTimeLeft(remainingSeconds);
        
        if (elapsed >= SESSION_DURATION) {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 16);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleRedirect = () => {
    window.location.href = "https://gameflashx.space/cl/i/277ood";
  };

  const imageData = PlaceHolderImages.find(img => img.id === card.image) || PlaceHolderImages[0];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (isComplete || !open) onClose();
    }}>
      <DialogContent className="max-w-md bg-[#020617]/95 backdrop-blur-3xl border-white/10 p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] sm:rounded-[2.5rem]">
        <div className="relative p-8 md:p-10 flex flex-col items-center text-center">
          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              className="h-full bg-primary shadow-[0_0_15px_rgba(223,16,78,1)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-40 h-24 rounded-2xl overflow-hidden mb-8 shadow-2xl border border-white/10"
          >
            <Image 
              src={imageData.imageUrl}
              alt={card.brand}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 flex items-end justify-center pb-2">
              <span className="text-xl font-black text-white">{value}</span>
            </div>
          </motion.div>

          <DialogTitle className="font-headline text-3xl font-black mb-2 text-white uppercase tracking-tight text-center">
            Verification Session
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-[280px] text-center">
            Please wait while we prepare your reward verification.
          </DialogDescription>

          <div className="w-full space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {!isComplete ? (
                    <motion.span 
                      key={timeLeft}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.5 }}
                      className="text-4xl font-black text-primary italic"
                    >
                      {timeLeft}
                    </motion.span>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, rotate: -45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      className="bg-green-500 rounded-full p-3"
                    >
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isComplete && (
                  <Loader2 className="absolute inset-0 w-20 h-20 text-primary/20 animate-spin" strokeWidth={1} />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
               <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                <Lock className="w-3 h-3" /> Secure Connection Established
              </div>
              <div className="text-xs font-bold text-primary animate-pulse">
                {isComplete ? "Session Verified!" : "Connecting to reward server..."}
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleRedirect}
                disabled={!isComplete}
                className={`w-full h-14 rounded-2xl font-black text-lg uppercase tracking-widest transition-all duration-500 ${
                  isComplete 
                  ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(223,16,78,0.5)] scale-100" 
                  : "bg-white/5 text-white/20 border-white/5 cursor-not-allowed scale-95"
                }`}
              >
                {isComplete ? (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    Verify & Continue <ArrowRight className="w-5 h-5" />
                  </motion.span>
                ) : (
                  "Verifying..."
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
