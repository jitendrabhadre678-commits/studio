
'use client';

import { useState } from 'react';
import { Gift, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RewardVerificationModal } from './RewardVerificationModal';

interface InteractiveCouponCardProps {
  brand: string;
  value: string;
  description: string;
}

export function InteractiveCouponCard({ brand, value, description }: InteractiveCouponCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative group mb-4 md:mb-6">
        <div className="glass-card rounded-2xl transition-all duration-500 bg-[#0a0a0a] shadow-lg hover:shadow-primary/5 hover:border-primary/30 overflow-hidden hover:scale-[1.01] border border-white/10">
          <div className="p-6 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-8 flex-grow">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 transition-transform group-hover:scale-105 duration-500">
                    <Gift className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 bg-primary rounded-full p-1.5 border-2 border-black shadow-lg">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="min-w-0 w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em]">Secure Node</span>
                    <Badge variant="outline" className="text-[7px] font-black uppercase tracking-widest px-2 py-0 h-4 border-white/10 text-primary bg-primary/10">
                      LOCKED
                    </Badge>
                  </div>
                  <h3 className="text-xl md:text-4xl font-black text-white uppercase tracking-tight mb-1 truncate">
                    {value} {brand} Code
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 lg:line-clamp-none max-w-2xl">
                    {description}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full lg:w-80 h-14 md:h-20 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl shadow-xl transition-all text-xs md:text-base hover:scale-[1.02] active:scale-95"
                >
                  Reveal Reward Code <Zap className="ml-2 w-4 h-4 md:w-6 md:h-6" />
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 bg-[#000000] rounded-full border border-white/10" />
          <div className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10 bg-[#000000] rounded-full border border-white/10" />
        </div>
      </div>

      <RewardVerificationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brand={brand}
        value={value}
      />
    </>
  );
}
