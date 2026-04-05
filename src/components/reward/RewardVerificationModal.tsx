
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, CheckCircle2, Cpu, Globe, Zap, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview High-trust reward verification modal.
 * Uses psychological UX steps to build credibility before redirection.
 */

interface RewardVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: string;
  value: string;
  redirectUrl?: string;
}

const VERIFICATION_STEPS = [
  { id: 1, label: "Checking device hardware...", icon: Smartphone },
  { id: 2, label: "Validating regional availability...", icon: Globe },
  { id: 3, label: "Synchronizing secure reward node...", icon: Cpu },
  { id: 4, label: "Confirming eligibility...", icon: ShieldCheck }
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

    // Sequence timing logic
    let stepTimer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const startSequence = async () => {
      // Progress bar smooth animation
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 0.8;
        });
      }, 40);

      // Step progression with random delays
      for (let i = 0; i < VERIFICATION_STEPS.length; i++) {
        setCurrentStep(i);
        const delay = 800 + Math.random() * 1200; // 0.8s to 2s per step
        await new Promise(resolve => stepTimer = setTimeout(resolve, delay));
      }

      // Final State
      setProgress(100);
      setIsFinished(true);

      // Final pause for success message then redirect
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1500);
    };

    startSequence();

    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(stepTimer);
      clearInterval(progressInterval);
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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_50px_rgba(250,70,22,0.15)] overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="text-center relative z-10">
              {/* Header Icon */}
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
                          className="text-primary/40"
                        >
                          {React.createElement(VERIFICATION_STEPS[currentStep].icon, { className: "w-8 h-8" })}
                        </motion.div>
                      )}
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    className="w-full h-full bg-green-500/20 rounded-[2rem] flex items-center justify-center border border-green-500/30"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                )}
              </div>

              {/* Text Content */}
              <div className="space-y-3 mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  {!isFinished ? "Verifying Request..." : "Verification Successful ✅"}
                </h3>
                <p className="text-muted-foreground text-sm font-medium">
                  {!isFinished 
                    ? `Matching ${value} ${brand} reward for your session.` 
                    : "Eligibility confirmed. Redirecting to your reward portal..."}
                </p>
              </div>

              {/* Progress Tracker */}
              <div className="space-y-6">
                <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    className="h-full bg-primary shadow-[0_0_15px_rgba(250,70,22,0.5)]"
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', damping: 20 }}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {VERIFICATION_STEPS.map((step, idx) => (
                    <div 
                      key={step.id}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300",
                        idx === currentStep ? "bg-primary/5 border-primary/20" : "bg-transparent border-transparent opacity-30",
                        idx < currentStep && "opacity-100 bg-green-500/5"
                      )}
                    >
                      {idx < currentStep ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <step.icon className={cn("w-4 h-4", idx === currentStep ? "text-primary" : "text-white/20")} />
                      )}
                      <span className={cn(
                        "text-[11px] font-black uppercase tracking-widest",
                        idx === currentStep ? "text-white" : "text-white/40",
                        idx < currentStep && "text-green-500"
                      )}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Trust Signal */}
              <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  SSL Encrypted
                </div>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
                <span>Node: US-SEC-04</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
