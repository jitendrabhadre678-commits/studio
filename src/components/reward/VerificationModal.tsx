'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, UserCheck, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerificationModalProps {
  onSuccess: () => void;
}

const STEPS = [
  { id: 1, label: "Checking device security...", icon: Shield },
  { id: 2, label: "Verifying human activity...", icon: UserCheck },
  { id: 3, label: "Confirming reward eligibility...", icon: ShieldCheck }
];

export function VerificationModal({ onSuccess }: VerificationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Total time set to 2.5 seconds for optimal UX/Conversion balance
    const totalTime = 2500;
    const intervalSpeed = 40;
    const increment = 100 / (totalTime / intervalSpeed);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + increment, 100));
    }, intervalSpeed);

    const stepDelay = totalTime / STEPS.length;

    const runSteps = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, stepDelay));
      }
      clearInterval(progressInterval);
      setProgress(100);
      setIsFinished(true);
      // Brief pause on the checkmark before redirect
      setTimeout(onSuccess, 800);
    };

    runSteps();

    return () => {
      clearInterval(progressInterval);
    };
  }, [onSuccess]);

  return (
    <div className="text-center relative z-10 w-full">
      {/* Animated Header Icon */}
      <div className="relative w-20 h-20 mx-auto mb-8">
        {!isFinished ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-primary/60"
              >
                {React.createElement(STEPS[currentStep]?.icon || Shield, { className: "w-8 h-8" })}
              </motion.div>
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

      <div className="space-y-3 mb-10">
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
          {!isFinished ? "Security Verification" : "Verification Complete ✅"}
        </h3>
        <p className="text-muted-foreground text-sm font-medium leading-relaxed px-4">
          {!isFinished 
            ? "To protect against bots and ensure only real users can claim rewards, we need to quickly verify your request." 
            : "Eligibility confirmed. Accessing reward vault..."}
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_15px_rgba(250,70,22,0.5)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween', ease: 'linear' }}
          />
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {STEPS.map((step, idx) => (
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

      <div className="mt-10 pt-6 border-t border-white/5">
        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">
          SSL Secure • 256-bit Encryption
        </p>
      </div>
    </div>
  );
}
