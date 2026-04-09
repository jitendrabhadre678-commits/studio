'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Loader2, ShieldCheck, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * @fileOverview Optimized Redirect Flow Portal.
 * Features: Email lead capture followed by a high-trust redirect bridge.
 * Refined for compliance with clear process expectations and premium UI.
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
}: RewardVerificationModalProps) {
  const [view, setView] = useState<'email' | 'redirecting'>('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const REDIRECT_URL = "https://gameflashx.space/cl/i/277ood";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset states on open
      setView('email');
      setEmail('');
      setEmailError('');
      
      const savedEmail = localStorage.getItem('captured_user_email');
      if (savedEmail) {
        setEmail(savedEmail);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle automatic redirect after security delay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (view === 'redirecting' && isOpen) {
      timer = setTimeout(() => {
        window.location.href = REDIRECT_URL;
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [view, isOpen]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    localStorage.setItem('captured_user_email', email);
    setView('redirecting');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4">
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
            "w-full h-full md:h-auto md:max-w-[550px] md:rounded-[2.5rem] md:border"
          )}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/20 hover:text-white transition-all border border-white/5 z-50"
          >
            <X className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            {view === 'email' ? (
              /* --- STEP 1: EMAIL CAPTURE --- */
              <motion.div 
                key="email-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 w-full py-6 flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-[2rem] border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Mail className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
                    Enter Your Email
                  </h2>
                  
                  <p className="mt-3 text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    Continue to Verification
                  </p>

                  <p className="mt-[10px] text-[13px] md:text-sm text-white/70 leading-relaxed max-w-[90%] mx-auto font-medium">
                    Your reward will be delivered after completing partner offers and verification.
                  </p>

                  <form onSubmit={handleEmailSubmit} className="mt-4 w-full max-w-sm mx-auto space-y-4">
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
                            "h-14 pl-12 bg-white/5 border-white/20 rounded-2xl text-base font-medium text-white placeholder:text-white/20 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all",
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
                      className="w-full mt-[14px] h-14 bg-primary hover:bg-primary/90 text-white font-semibold text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 border-none"
                    >
                      Continue <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>

                  <footer className="mt-10 pt-6 border-t border-white/5 w-full">
                    <div className="flex items-center justify-center gap-2 text-[10px] font-medium text-white/20 uppercase tracking-widest">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500/50" /> Secure & Verified Process
                    </div>
                  </footer>
                </div>
              </motion.div>
            ) : (
              /* --- STEP 2: REDIRECT LOADING --- */
              <motion.div 
                key="redirect-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-16 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 w-full space-y-12">
                  <div className="relative w-24 h-24 mx-auto">
                    <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-primary/40" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
                      Preparing Secure <br /><span className="text-primary">Verification...</span>
                    </h2>
                    <p className="text-white/40 text-sm font-black uppercase tracking-[0.2em] animate-pulse">
                      Manual Human Verification Required
                    </p>
                  </div>

                  <div className="space-y-8">
                    <a 
                      href={REDIRECT_URL}
                      className="inline-flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:text-white transition-colors group"
                    >
                      Click here if not redirected <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    <div className="pt-10 border-t border-white/5">
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
                        Secure • Fast • Verified Users Only
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
