
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
      <div className="relative glass-card rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(250,70,22,0.1)] shadow-lg hover:scale-[1.03]">
        
        {/* Ticket Cutouts */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-black rounded-full z-20 border border-white/10" />
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-black rounded-full z-20 border border-white/10" />
        
        {/* Main Content Area */}
        <div className="p-8 md:p-12 flex flex-col min-h-[360px] bg-[#0a0a0a]/40 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Ticket className="w-7 h-7 text-primary" />
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 block">Value Claim</span>
              <span className="text-5xl font-black text-white">{value}</span>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">{brand} Gift Card</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10 flex-grow">
            {description}
          </p>

          <Button 
            onClick={() => setIsRevealed(true)}
            className="w-full h-16 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl group/btn transition-all"
          >
            Claim Coupon <Zap className="ml-2 w-5 h-5 text-primary group-hover/btn:scale-125 transition-transform" />
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
              className="absolute inset-0 z-30 bg-[#020617] border-l border-white/10 p-8 md:p-12 flex flex-col justify-center text-center"
            >
              <button 
                onClick={() => setIsRevealed(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest"
              >
                Close
              </button>

              {!isUnlocked ? (
                <div className="space-y-8">
                  <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary/30 animate-pulse shadow-xl">
                    <Lock className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">Locked Coupon</h4>
                  <p className="text-sm text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
                    Complete 1 quick offer to verify your session and unlock your unique code.
                  </p>
                  <Button 
                    onClick={handleUnlock}
                    className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-[0_0_40px_rgba(250,70,22,0.4)]"
                  >
                    Unlock Code <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-xl">
                    <ShieldCheck className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">Coupon Unlocked!</h4>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 font-mono text-xl font-bold text-primary tracking-tighter mb-8 relative group/code overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/code:opacity-100 transition-opacity" />
                    {couponCode}
                  </div>

                  <Button 
                    onClick={handleCopy}
                    className={cn(
                      "w-full h-16 font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl",
                      isCopied ? "bg-green-500 text-white" : "bg-white text-black hover:bg-white/90"
                    )}
                  >
                    {isCopied ? (
                      <span className="flex items-center gap-2">
                        Code Copied! <CheckCircle2 className="w-6 h-6" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Copy Code <Copy className="w-6 h-6" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual Decoration */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
