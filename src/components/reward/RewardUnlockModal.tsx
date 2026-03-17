"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Loader2, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
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
      <DialogContent className="max-w-md bg-[#020617] border-white/10 p-0 overflow-hidden sm:rounded-[2.5rem] shadow-2xl">
        <div className="pt-8 px-8 flex justify-center">
          <Logo className="h-8" />
        </div>

        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {step === 'info' && (
              <motion.div 
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <div className="relative w-48 h-28 mx-auto mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image 
                    src={imageData.imageUrl} 
                    alt={card.brand} 
                    fill 
                    className="object-cover" 
                    data-ai-hint="gift card"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-2xl font-black text-white">{value}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-4 border border-primary/20">
                  <span className="text-[10px] font-black uppercase text-primary tracking-widest">Step 1 of 2</span>
                </div>

                <DialogTitle className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                  Unlock Your Reward
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mb-8">
                  Complete a quick offer to access your unique gift card reward code.
                </DialogDescription>

                <Button 
                  onClick={handleContinue}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20"
                >
                  Continue <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}

            {step === 'verifying' && (
              <motion.div 
                key="verifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center"
              >
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary/40" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 animate-pulse">
                  {loadingMessages[loadingTextIndex]}
                </h3>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Please do not close this window</p>
              </motion.div>
            )}

            {step === 'offer' && (
              <motion.div 
                key="offer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-primary/20">
                  <ExternalLink className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Complete to Unlock</h3>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  To prevent fraud and maintain reward availability, please complete one short activity from our partners.
                </p>

                <div className="space-y-4">
                  <Button 
                    onClick={handleOpenOffer}
                    className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl"
                  >
                    Complete Offer to Unlock <Zap className="ml-2 w-4 h-4" />
                  </Button>
                  
                  <p className="text-[10px] text-white/30 italic leading-tight">
                    Completion of an offer is required to access rewards. Rewards are not guaranteed and depend on successful verification by the advertiser.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'checking' && (
              <motion.div 
                key="checking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-4"
              >
                <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/10 animate-pulse">
                  <ShieldCheck className="w-10 h-10 text-white/40" />
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Continue to Unlock</h3>
                <p className="text-sm text-muted-foreground mb-10">
                  If you have completed the offer in the other tab, your reward is ready for verification.
                </p>

                <Button 
                  onClick={handleCheckStatus}
                  className="w-full h-14 bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest rounded-2xl"
                >
                  Check Reward Status
                </Button>
                
                <button 
                  onClick={() => setStep('offer')}
                  className="mt-6 text-[10px] font-bold text-white/20 hover:text-primary uppercase tracking-widest transition-colors"
                >
                  Didn't see any offers? Click to try again
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
                <div className="w-20 h-20 bg-green-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Verification Pending</h3>
                <p className="text-sm text-muted-foreground mb-8">
                  Your session is being processed. Here is your reward preview:
                </p>

                <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-2xl p-6 mb-8 relative group">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-2xl font-mono font-bold text-primary tracking-widest">
                    XXXX-XXXX-AB12
                  </span>
                </div>

                <Button 
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl"
                  onClick={() => window.location.reload()}
                >
                  Reveal Full Code
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}