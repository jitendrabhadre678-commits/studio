"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Lock, CheckCircle2, Copy, Zap, ArrowRight, ShieldCheck, Loader2, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface InteractiveCouponCardProps {
  brand: string;
  value: string;
  description: string;
}

export function InteractiveCouponCard({ brand, value, description }: InteractiveCouponCardProps) {
  const [view, setView] = useState<'initial' | 'locked' | 'revealed'>('initial');
  const [isCopied, setIsCopied] = useState(false);

  const couponCode = `${brand.toUpperCase().replace(/\s+/g, '')}-${value.replace('$', '')}-FLASHX`;

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleOpenOffer = () => {
    window.open("https://gameflashx.space/cl/i/277ood", "_blank");
  };

  return (
    <div className="relative group mb-6">
      <div className={cn(
        "glass-card rounded-[2rem] overflow-hidden border-white/10 transition-all duration-500",
        view !== 'initial' ? "border-primary/40 shadow-[0_0_50px_rgba(223,16,78,0.15)]" : "hover:border-white/20"
      )}>
        {/* Main Content Area */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left Side: Info */}
            <div className="flex items-center gap-6 flex-grow">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  <Gift className="w-8 h-8 text-primary" />
                </div>
                {view === 'revealed' ? (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-black">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="absolute -top-2 -right-2 bg-primary rounded-full p-1 border-2 border-black">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Verified Reward</span>
                  <Badge variant="outline" className={cn(
                    "text-[8px] uppercase tracking-widest px-2 py-0 h-4 border-white/10",
                    view === 'revealed' ? "text-green-500 bg-green-500/10 border-green-500/20" : "text-primary bg-primary/10 border-primary/20"
                  )}>
                    Status: {view === 'revealed' ? 'Unlocked' : 'Locked'}
                  </Badge>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight truncate">
                  {value} {brand} Gift Card
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            {/* Right Side: Action (Initial) */}
            {view === 'initial' && (
              <div className="md:w-64 shrink-0">
                <Button 
                  onClick={() => setView('locked')}
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_20px_rgba(223,16,78,0.3)] group/btn"
                >
                  Reveal Gift Card Code <Zap className="ml-2 w-4 h-4 group-hover/btn:scale-125 transition-transform" />
                </Button>
              </div>
            )}

            {/* Right Side: Action (Revealed) */}
            {view === 'revealed' && (
              <div className="md:w-64 shrink-0 flex flex-col gap-2">
                <div className="bg-white/5 border border-primary/30 rounded-xl px-4 py-3 font-mono font-bold text-primary text-center tracking-tighter text-lg">
                  {couponCode}
                </div>
                <Button 
                  onClick={handleCopy}
                  className={cn(
                    "w-full h-12 font-black uppercase tracking-widest rounded-xl transition-all",
                    isCopied ? "bg-green-500 text-white" : "bg-white text-black hover:bg-white/90"
                  )}
                >
                  {isCopied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {isCopied ? "Code Copied!" : "Copy Code"}
                </Button>
              </div>
            )}
          </div>

          {/* Locked Content / Iframe Section */}
          <AnimatePresence>
            {view === 'locked' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-8 pt-8 border-t border-white/5 space-y-8">
                  <div className="text-center max-w-lg mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
                      <Lock className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-black uppercase text-primary tracking-widest">Action Required</span>
                    </div>
                    <h4 className="text-xl font-black text-white mb-2">Complete 1 offer to unlock your gift card code.</h4>
                    <p className="text-sm text-muted-foreground mb-6">
                      To prevent fraud and ensure availability, our system requires a quick verification. Complete any offer below to instantly release your unique code.
                    </p>
                    
                    <Button 
                      onClick={handleOpenOffer}
                      className="bg-primary hover:bg-primary/90 text-white font-black px-8 h-12 rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-primary/20 mb-8"
                    >
                      Complete Offer to Unlock <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>

                  {/* OGAds Iframe Integration */}
                  <div className="relative w-full max-w-3xl mx-auto glass-card rounded-3xl overflow-hidden border-white/10 bg-black/40 p-1">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/80 backdrop-blur-sm z-0">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Loading Verification Portal...</span>
                    </div>
                    <iframe 
                      src="https://gameflashx.space/cl/i/277ood"
                      className="relative z-10 w-full h-[500px] border-none rounded-2xl"
                      title="Reward Verification"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-4 pt-4 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
                        Waiting for completion status...
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setView('revealed')}
                      className="text-white/20 hover:text-primary/80 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group transition-colors"
                    >
                      Already completed? Click to manually check <Unlock className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visual Ticket Elements */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-[#000000] rounded-full border border-white/10" />
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-[#000000] rounded-full border border-white/10" />
      </div>
    </div>
  );
}
