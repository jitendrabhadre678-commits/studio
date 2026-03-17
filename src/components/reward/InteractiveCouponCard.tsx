'use client';

import { useState } from 'react';
import { Gift, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { giftCards } from '@/lib/gift-cards';
import { RewardUnlockModal } from './RewardUnlockModal';

interface InteractiveCouponCardProps {
  brand: string;
  value: string;
  description: string;
}

export function InteractiveCouponCard({ brand, value, description }: InteractiveCouponCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Find the full card object for the modal
  const cardData = giftCards.find(c => c.brand === brand) || giftCards[0];

  return (
    <div className="relative group mb-6">
      <div className="glass-card rounded-[2rem] transition-all duration-500 hover:border-primary/40 bg-[#0a0a0a]">
        {/* Main Content Area */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Info Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-grow">
              <div className="relative shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Gift className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary rounded-full p-1.5 border-2 border-black shadow-lg">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Secure Reward Node</span>
                  <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 h-5 border-white/10 text-primary bg-primary/10 border-primary/20">
                    STATUS: LOCKED
                  </Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-1 truncate">
                  {value} {brand} Code
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {description}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="w-full md:w-auto shrink-0">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-72 h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] group/btn"
              >
                Reveal Reward Code <Zap className="ml-2 w-5 h-5 group-hover/btn:scale-125 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Visual Ticket Elements (Hidden on tiny screens to avoid layout breaks) */}
        <div className="hidden sm:block absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-[#000000] rounded-full border border-white/10" />
        <div className="hidden sm:block absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-[#000000] rounded-full border border-white/10" />
      </div>

      {/* The Unlock Flow Modal */}
      <RewardUnlockModal 
        card={cardData}
        value={value}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
