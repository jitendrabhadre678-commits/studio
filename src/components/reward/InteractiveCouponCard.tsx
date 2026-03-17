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
      <div className="glass-card rounded-2xl transition-all duration-500 hover:border-white/20">
        {/* Main Content Area */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Info Section */}
            <div className="flex items-center gap-6 flex-grow">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  <Gift className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary rounded-full p-1 border-2 border-black">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Verified Reward Portal</span>
                  <Badge variant="outline" className="text-[8px] uppercase tracking-widest px-2 py-0 h-4 border-white/10 text-primary bg-primary/10 border-primary/20">
                    Status: Locked
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

            {/* Action Button */}
            <div className="md:w-64 shrink-0">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_20px_rgba(223,16,78,0.3)] group/btn"
              >
                Reveal Gift Card Code <Zap className="ml-2 w-4 h-4 group-hover/btn:scale-125 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Visual Ticket Elements */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-[#000000] rounded-full border border-white/10" />
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-[#000000] rounded-full border border-white/10" />
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
