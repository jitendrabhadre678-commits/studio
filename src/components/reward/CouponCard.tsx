
"use client";

import { Zap, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CouponCardProps {
  brand: string;
  value: string;
  description: string;
  slug: string;
}

/**
 * @fileOverview High-Conversion Coupon Card variation.
 * Updated with standardized "Claim Now" button and blue gradient theme.
 */

export function CouponCard({ brand, value, description }: CouponCardProps) {
  const handleClaim = () => {
    if (typeof window !== 'undefined') {
      window.location.href = "https://gameflashx.space/sl/zy1x8";
    }
  };

  return (
    <div className="relative group perspective-1000">
      <div className="relative glass-card rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(0,157,255,0.1)] shadow-lg hover:scale-[1.03]">
        
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

          <div className="flex flex-col items-center gap-3">
            <Button 
              onClick={handleClaim}
              className="w-full h-16 bg-gradient-to-r from-[#009dff] to-[#00e0ff] text-white font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(0,150,255,0.5)] active:scale-[0.97] border-none"
            >
              Claim Now ⚡
            </Button>
            <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest text-center">
              Takes 30–60 seconds • Secure process
            </p>
          </div>
        </div>

        {/* Visual Decoration */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
