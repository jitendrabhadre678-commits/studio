"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Loader2, ArrowRight, ExternalLink, CheckCircle2, X } from 'lucide-react';
import { GiftCard } from '@/lib/gift-cards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Logo } from '@/components/brand/Logo';

type ModalStep = 'info' | 'verifying' | 'offer' | 'checking' | 'final';

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
  const [step, setStep] = useState<ModalStep>('info');
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [hasClickedOffer, setHasClickedOffer] = useState(false);

  const loadingMessages = [
    "Checking availability...",
    "Matching offers for your region...",
    "Preparing secure access..."
  ];

  useEffect(() => {
    if (!isOpen) {
      setStep('info');
      setHasClickedOffer(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'verifying') {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);

      const timeout = setTimeout(() => {
        setStep('offer');
      }, 4500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [step]);

  const handleContinue = () => setStep('verifying');
  
  const handleOpenOffer = () => {
    window.open("https://gameflashx.space/cl/i/277ood", "_blank");
    setHasClickedOffer(true);
    setTimeout(() => setStep('checking'), 1000);
  };

  const handleCheckStatus = () => {
    setStep('final');
  };

  const imageData = PlaceHolderImages.find(img => img.id === card.image) || PlaceHolderImages[0];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-[95vw] sm:max-w-md bg-[#020617] border-white/10 p-0 overflow-hidden sm:rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] outline-none">
        <div className="pt-8 px-8 flex justify-center border-b border-white/5 pb-6">
          <Logo className="h-8" />
        </div>

        <div className="p-6 md:p-10 overflow-y-auto max-h-[80vh] custom-scrollbar">
          <AnimatePresence mode="wait">
            {step === 'info' && (
              <motion.div 
                key="info"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <div className="relative w-full aspect-[16/9] md:w-48 md:h-28 mx-auto mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image 
                    src={imageData.imageUrl} 
                    alt={card.brand} 
                    fill 
                    className="object-cover" 
                    data-ai-hint="reward card"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-3xl font-black text-white text-glow-pomegranate">{value}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full mb-4 border border-primary/20">
                  <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">Step 1 of 2</span>
                </div>

                <DialogTitle className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">
                  Unlock <span className="text-primary">Reward</span>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mb-10 text-sm md:text-base leading-relaxed">
                  To maintain reward availability and prevent automated abuse, please complete a short verification activity.
                </DialogDescription>

                <Button 
                  onClick={handleContinue}
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
                >
                  Start Verification <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}

            {step === 'verifying' && (
              <motion.div 
                key="verifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-10">
                  <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-10 h-10 text-primary/40 fill-primary/20" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 animate-pulse uppercase tracking-tight">
                  {loadingMessages[loadingTextIndex]}
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Initializing Encrypted Portal</p>
              </motion.div>
            )}

            {step === 'offer' && (
              <motion.div 
                key="offer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-primary/20">
                  <ExternalLink className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 leading-none">Activity <span className="text-primary">Required</span></h3>
                <p className="text-sm text-muted-foreground mb-10 leading-relaxed px-4">
                  Please complete one quick sponsored task from the list below to validate your human session and release the digital code.
                </p>

                <div className="space-y-4">
                  <Button 
                    onClick={handleOpenOffer}
                    className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 transition-all active:scale-95"
                  >
                    Complete Offer to Unlock <Zap className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[9px] text-white/40 font-medium leading-tight">
                      Verification is processed by third-party advertisers. Rewards are delivered automatically upon successful advertiser validation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'checking' && (
              <motion.div 
                key="checking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/10 animate-pulse">
                  <ShieldCheck className="w-10 h-10 text-white/40" />
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">Checking <span className="text-primary">Status</span></h3>
                <p className="text-sm text-muted-foreground mb-12 px-2">
                  If you've completed the activity in the new tab, our system is now listening for the verification signal.
                </p>

                <Button 
                  onClick={handleCheckStatus}
                  className="w-full h-16 bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95"
                >
                  Verify Now
                </Button>
                
                <button 
                  onClick={() => setStep('offer')}
                  className="mt-8 text-[10px] font-black text-white/30 hover:text-primary uppercase tracking-[0.2em] transition-colors"
                >
                  Try Different Activity
                </button>
              </motion.div>
            )}

            {step === 'final' && (
              <motion.div 
                key="final"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Processing <span className="text-green-500">Reward</span></h3>
                <p className="text-sm text-muted-foreground mb-10 px-4">
                  Validation received! Your reward is being generated. Preview of your unique code:
                </p>

                <div className="bg-black/60 border-2 border-dashed border-primary/30 rounded-2xl p-8 mb-10 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl font-mono font-black text-primary tracking-[0.3em] [text-shadow:0_0_20px_rgba(250,70,22,0.4)]">
                    XXXX-XXXX-AB12
                  </span>
                </div>

                <Button 
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 transition-all"
                  onClick={() => window.location.reload()}
                >
                  Finalize & Reveal Full Code
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
