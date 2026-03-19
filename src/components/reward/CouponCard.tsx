"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Ticket, Lock, ArrowRight, Copy, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CouponCardProps {
  brand: string;
  value: string;
  description: string;
  slug: string;
}

export function CouponCard({ brand, value, description, slug }: CouponCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const couponCode = `${brand.toUpperCase().replace(/\s+/g, '')}${value.replace('$', '')}-REWARD`;

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleUnlock = () => {
    // Open the verification link in a new tab
    window.open("https://gameflashx.space/sl/zy1x8", "_blank");
    // Simulate unlock state after a short delay for UX demonstration
    setTimeout(() => setIsUnlocked(true), 1500);
  };

  return (
    <div className="relative group perspective-1000">
      <div className="relative glass-card rounded-[2rem] overflow-hidden border-white/10 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(223,16,78,0.2)]">
        
        {/* Ticket Cutouts */}
        <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-black rounded-full z-20" />
        <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-black rounded-full z-20" />
        
        {/* Main Content Area */}
        <div className="p-8 md:p-10 flex flex-col min-h-[320px]">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Ticket className="w-6 h-6 text-primary" />
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 block">Value Claim</span>
              <span className="text-4xl font-black text-white">{value}</span>
            </div>
          </div>

          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{brand} Gift Card</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
            {description}
          </p>

          <Button 
            onClick={() => setIsRevealed(true)}
            className="w-full h-14 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl group/btn"
          >
            Claim Coupon <Zap className="ml-2 w-4 h-4 text-primary group-hover/btn:scale-125 transition-transform" />
          </Button>
        </div>

        {/* Slide Reveal Panel */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-30 bg-[#020617] border-l border-white/10 p-8 md:p-10 flex flex-col justify-center text-center"
            >
              <button 
                onClick={() => setIsRevealed(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest"
              >
                Close
              </button>

              {!isUnlocked ? (
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30 animate-pulse">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">Locked Coupon</h4>
                  <p className="text-sm text-muted-foreground max-w-[240px] mx-auto leading-relaxed">
                    Complete 1 quick offer to verify your session and unlock your unique code.
                  </p>
                  <Button 
                    onClick={handleUnlock}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(223,16,78,0.4)]"
                  >
                    Unlock Code <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                    <ShieldCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">Coupon Unlocked!</h4>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-lg font-bold text-primary tracking-tighter mb-6 relative group/code overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/code:opacity-100 transition-opacity" />
                    {couponCode}
                  </div>

                  <Button 
                    onClick={handleCopy}
                    className={cn(
                      "w-full h-14 font-black uppercase tracking-widest rounded-xl transition-all duration-300",
                      isCopied ? "bg-green-500 text-white" : "bg-white text-black hover:bg-white/90"
                    )}
                  >
                    {isCopied ? (
                      <span className="flex items-center gap-2">
                        Code Copied! <CheckCircle2 className="w-5 h-5" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Copy Code <Copy className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual Decoration */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
