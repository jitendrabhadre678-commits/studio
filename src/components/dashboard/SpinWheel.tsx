
'use client';

import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Zap, Loader2, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp, increment } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const PRIZES = [
  { label: '$0.05', value: 0.05, color: '#1e293b' },
  { label: '$0.10', value: 0.10, color: '#df104e' },
  { label: '$0.05', value: 0.05, color: '#1e293b' },
  { label: '$0.25', value: 0.25, color: '#df104e' },
  { label: '$0.05', value: 0.05, color: '#1e293b' },
  { label: '$0.50', value: 0.50, color: '#df104e' },
  { label: '$0.05', value: 0.05, color: '#1e293b' },
  { label: 'JACKPOT', value: 1.00, color: '#facc15' },
];

export function SpinWheel({ userRef, userData }: { userRef: any, userData: any }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();
  const firestore = useFirestore();
  const { toast } = useToast();

  const lastSpin = userData?.lastSpinAt ? new Date(userData.lastSpinAt) : null;
  const today = new Date();
  const isAvailable = !lastSpin || lastSpin.toDateString() !== today.toDateString();

  const handleSpin = async () => {
    if (!isAvailable || isSpinning || !userRef || !firestore) return;

    setIsSpinning(true);
    
    // Calculate a random rotation (minimum 5 full turns)
    const randomPrizeIndex = Math.floor(Math.random() * PRIZES.length);
    const rotationPerPrize = 360 / PRIZES.length;
    const finalRotation = (360 * 5) + (randomPrizeIndex * rotationPerPrize);
    const prize = PRIZES[randomPrizeIndex];

    await controls.start({
      rotate: finalRotation,
      transition: { duration: 4, ease: [0.15, 0, 0.15, 1] }
    });

    try {
      // 1. Create transaction
      addDocumentNonBlocking(collection(firestore, 'transactions'), {
        userId: userData.id,
        type: 'spin',
        amount: prize.value,
        rewardName: prize.label,
        status: 'completed',
        createdAt: serverTimestamp()
      });

      // 2. Update user
      updateDocumentNonBlocking(userRef, {
        balance: increment(prize.value),
        totalEarnings: increment(prize.value),
        lastSpinAt: serverTimestamp()
      });

      toast({ 
        title: "You won!", 
        description: `Congratulations! You landed on ${prize.label}.` 
      });
    } catch (e) {
      toast({ variant: "destructive", title: "Update Failed", description: "Could not save spin result." });
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="glass-card rounded-[2.5rem] p-8 border-white/10 flex flex-col items-center text-center">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Trophy className="w-5 h-5 text-yellow-500" /> Daily Spin
      </h3>
      
      <div className="relative w-48 h-48 mb-8">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-4 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(223,16,78,0.5)] border-2 border-white" />
        </div>

        {/* Wheel */}
        <motion.div 
          animate={controls}
          className="w-full h-full rounded-full border-4 border-white/10 overflow-hidden relative"
          style={{ background: 'conic-gradient(#1e293b 0% 12.5%, #df104e 12.5% 25%, #1e293b 25% 37.5%, #df104e 37.5% 50%, #1e293b 50% 62.5%, #df104e 62.5% 75%, #1e293b 75% 87.5%, #facc15 87.5% 100%)' }}
        >
          {PRIZES.map((prize, idx) => (
             <div 
               key={idx}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[10px] text-white"
               style={{ transform: `rotate(${idx * (360/PRIZES.length) + (360/PRIZES.length/2)}deg) translateY(-60px)` }}
             >
               {prize.label}
             </div>
          ))}
        </motion.div>
        
        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full z-10 flex items-center justify-center shadow-2xl">
          <Zap className="w-4 h-4 text-primary fill-primary" />
        </div>
      </div>

      <Button 
        onClick={handleSpin}
        disabled={!isAvailable || isSpinning}
        className={cn(
          "w-full h-12 rounded-xl font-black uppercase tracking-widest transition-all",
          isAvailable ? "bg-primary hover:bg-primary/90 text-white" : "bg-white/5 text-white/40 cursor-not-allowed"
        )}
      >
        {isSpinning ? <Loader2 className="w-4 h-4 animate-spin" /> : isAvailable ? "Spin to Win!" : "Next spin tomorrow"}
      </Button>
    </div>
  );
}
