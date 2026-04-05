
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight, Star, Gift, CreditCard, Gamepad2, Smartphone, Trophy } from 'lucide-react';
import { RewardVerificationModal } from '@/components/reward/RewardVerificationModal';

/**
 * @fileOverview Client component for the /instagram landing page.
 * Optimized for mobile-first Instagram bio link traffic.
 */

const rewards = [
  { name: 'Amazon', value: '$25', badge: 'Most Popular', icon: <Gift className="w-6 h-6" /> },
  { name: 'Steam', value: '$20', icon: <Smartphone className="w-6 h-6" /> },
  { name: 'Roblox', value: '2,500 Robux', icon: <Gamepad2 className="w-6 h-6" /> },
  { name: 'PayPal', value: '$50', badge: 'Cash Reward', icon: <CreditCard className="w-6 h-6" /> },
  { name: 'Xbox', value: '$25', icon: <Trophy className="w-6 h-6" /> },
  { name: 'PlayStation', value: '$25', icon: <Gamepad2 className="w-6 h-6" /> },
];

export default function InstagramClient() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    brand: '',
    value: ''
  });

  const handleRewardClick = (brand: string, value: string) => {
    setModalState({
      isOpen: true,
      brand,
      value
    });
  };

  const handleGlobalClaim = () => {
    handleRewardClick('Premium', 'Selected');
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white font-body selection:bg-[#ff4d00] selection:text-white">
      <Header />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          
          {/* HERO SECTION */}
          <section className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 bg-[#ff4d00] px-4 py-1.5 rounded-full mb-6 shadow-[0_0_20px_rgba(255,77,0,0.3)]">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Limited Time Rewards</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] uppercase tracking-tight">
              Claim Your <br />
              <span className="bg-gradient-to-r from-[#ff4d00] to-[#ff7a00] bg-clip-text text-transparent">FREE Gift Card Now</span>
            </h1>
            
            <p className="text-white/60 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Join <span className="text-white font-bold">12,847+ gamers</span> already claiming free rewards. Complete one simple offer — instant delivery.
            </p>

            <Button 
              onClick={handleGlobalClaim}
              className="w-full h-16 bg-gradient-to-r from-[#ff4d00] to-[#ff7a00] hover:scale-[1.02] active:scale-[0.98] text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_40px_rgba(255,77,0,0.4)] text-base md:text-lg"
            >
              CLAIM YOUR FREE REWARD NOW <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </section>

          {/* GIFT CARDS SECTION */}
          <section className="mb-16">
            <h2 className="text-xl font-black text-white text-center mb-8 uppercase tracking-widest">Choose Your Reward</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <div 
                  key={reward.name}
                  className="bg-[#1a1a1a] border border-[#ff4d00]/20 rounded-2xl p-5 flex flex-col items-center text-center relative group hover:border-[#ff4d00]/60 transition-all duration-300"
                >
                  {reward.badge && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ff4d00] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap shadow-lg">
                      {reward.badge}
                    </div>
                  )}
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 border border-white/5 group-hover:bg-[#ff4d00]/10 transition-colors">
                    <div className="text-[#ff4d00]">{reward.icon}</div>
                  </div>
                  <h3 className="text-sm font-black text-white mb-1 uppercase tracking-tight">{reward.name}</h3>
                  <p className="text-[10px] font-bold text-white/40 mb-4 uppercase tracking-widest">{reward.value}</p>
                  <Button 
                    onClick={() => handleRewardClick(reward.name, reward.value)}
                    variant="ghost"
                    className="w-full h-9 bg-transparent hover:bg-[#ff4d00] border border-[#ff4d00] text-[#ff4d00] hover:text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
                  >
                    Claim Free <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* SOCIAL PROOF SECTION */}
          <section className="grid grid-cols-1 gap-3 mb-16">
            {[
              { text: "Got my $25 Amazon reward in minutes!", author: "Alex R. 🇺🇸" },
              { text: "Free Robux actually worked!", author: "Jake M. 🇺🇸" },
              { text: "Steam wallet loaded instantly!", author: "Chris T. 🇬🇧" }
            ].map((review, i) => (
              <div key={i} className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, star) => (
                      <Star key={star} className="w-2.5 h-2.5 text-[#ff4d00] fill-[#ff4d00]" />
                    ))}
                  </div>
                  <p className="text-xs text-white/90 font-medium italic">"{review.text}"</p>
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4 shrink-0">{review.author}</span>
              </div>
            ))}
          </section>

          {/* URGENCY SECTION */}
          <section className="bg-[#1a1a1a] border border-[#ff4d00] rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Zap className="w-32 h-32 text-[#ff4d00]" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse" />
                <p className="text-base font-black text-[#ff4d00] uppercase tracking-widest">
                  ⚡ 47 rewards claimed in the last hour
                </p>
              </div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">
                Limited offers available. Claim yours before they run out.
              </p>
              
              <Button 
                onClick={handleGlobalClaim}
                className="w-full h-14 bg-gradient-to-r from-[#ff4d00] to-[#ff7a00] hover:scale-[1.02] active:scale-[0.98] text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#ff4d00]/20"
              >
                GET MY FREE GIFT CARD <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </section>

        </div>
      </div>

      <RewardVerificationModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        brand={modalState.brand}
        value={modalState.value}
      />

      <Footer />
    </main>
  );
}
