
'use client';

import { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, Trophy, AlertCircle, CheckCircle2, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp, increment } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/**
 * Casino Style Wheel Configuration
 * 12 Segments for visual balance.
 */
const SEGMENTS = [
  { label: 'BAD LUCK', value: 0, color: '#ef4444', type: 'bad' }, // 0
  { label: '$0.05', value: 0.05, color: '#3b82f6', type: 'win' }, // 1
  { label: 'BAD LUCK', value: 0, color: '#ef4444', type: 'bad' }, // 2
  { label: '$0.10', value: 0.10, color: '#10b981', type: 'win' }, // 3
  { label: 'BAD LUCK', value: 0, color: '#ef4444', type: 'bad' }, // 4
  { label: '$0.25', value: 0.25, color: '#f59e0b', type: 'win' }, // 5
  { label: 'BAD LUCK', value: 0, color: '#ef4444', type: 'bad' }, // 6
  { label: '$0.50', value: 0.50, color: '#8b5cf6', type: 'win' }, // 7
  { label: 'BAD LUCK', value: 0, color: '#ef4444', type: 'bad' }, // 8
  { label: '$0.75', value: 0.75, color: '#ec4899', type: 'win' }, // 9
  { label: '$0', value: 0, color: '#64748b', type: 'zero' },      // 10
  { label: '$1.00', value: 1.00, color: '#fbbf24', type: 'jackpot' }, // 11
];

export function SpinWheel({ userRef, userData }: { userRef: any, userData: any }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winningPrize, setWinningPrize] = useState<any>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  
  const controls = useAnimation();
  const firestore = useFirestore();
  const { toast } = useToast();

  const lastSpin = userData?.lastSpinAt ? new Date(userData.lastSpinAt) : null;
  const today = new Date();
  const isAvailable = !lastSpin || lastLoginDateString(lastSpin) !== today.toDateString();

  // Helper to handle date strings safely
  function lastLoginDateString(date: any) {
    if (!date) return '';
    try {
      return typeof date === 'string' ? new Date(date).toDateString() : date.toDateString();
    } catch (e) {
      return '';
    }
  }

  // Weighted Probability Logic (strictly following requirements)
  const getTargetIndex = () => {
    const p = Math.random() * 100;
    if (p < 70) {
      const badIndices = [0, 2, 4, 6, 8];
      return badIndices[Math.floor(Math.random() * badIndices.length)];
    } else if (p < 80) return 10; // $0 (10%)
    else if (p < 87) return 1;  // $0.05 (7%)
    else if (p < 92) return 3;  // $0.10 (5%)
    else if (p < 96) return 5;  // $0.25 (4%)
    else if (p < 98) return 7;  // $0.50 (2%)
    else if (p < 99) return 9;  // $0.75 (1%)
    else return 11;             // $1.00 (1%)
  };

  const handleSpin = async () => {
    if (!isAvailable || isSpinning || !userRef || !firestore) return;

    setIsSpinning(true);
    
    const prizeIndex = getTargetIndex();
    const prize = SEGMENTS[prizeIndex];
    
    const sliceAngle = 360 / SEGMENTS.length;
    // We rotate to center of slice
    const extraRotation = (SEGMENTS.length - prizeIndex) * sliceAngle - (sliceAngle / 2);
    const newRotation = currentRotation + (360 * 8) + extraRotation; // 8 full turns for impact
    
    await controls.start({
      rotate: newRotation,
      transition: { duration: 4, ease: [0.15, 0, 0.15, 1] }
    });

    setCurrentRotation(newRotation % 360);
    setWinningPrize(prize);
    setIsSpinning(false);
    setShowResult(true);
  };

  const handleClaim = () => {
    if (!winningPrize || !userRef || !firestore) return;

    const { value, label } = winningPrize;

    if (value > 0) {
      addDocumentNonBlocking(collection(firestore, 'transactions'), {
        userId: userData.id,
        type: 'spin',
        amount: value,
        rewardName: `Casino Spin: ${label}`,
        status: 'completed',
        createdAt: serverTimestamp()
      });

      updateDocumentNonBlocking(userRef, {
        balance: increment(value),
        totalEarnings: increment(value),
        lastSpinAt: serverTimestamp()
      });

      toast({ 
        title: "Reward Claimed!", 
        description: `Successfully added $${value.toFixed(2)} to your wallet.` 
      });
    } else {
      updateDocumentNonBlocking(userRef, {
        lastSpinAt: serverTimestamp()
      });
      toast({ 
        title: "Daily Spin Used", 
        description: label === 'BAD LUCK' ? "Bad luck today! Try again tomorrow." : "You got $0. Better luck next time!" 
      });
    }

    setShowResult(false);
    setWinningPrize(null);
  };

  return (
    <div className="glass-card rounded-[2.5rem] p-8 border-white/10 flex flex-col items-center text-center relative overflow-hidden group">
      {/* Background Casino Ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />
      
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-3">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Casino Edition</span>
        </div>
        <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
          Daily <span className="text-yellow-500">Lucky Wheel</span>
        </h3>
      </div>
      
      <div className="relative w-72 h-72 mb-10">
        {/* Pointer (Casino Style Arrow) */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40">
          <div className="w-8 h-10 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-b-lg border-2 border-white shadow-2xl relative">
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/20" />
          </div>
        </div>

        {/* Golden Outer Ring with Lights */}
        <div className="absolute inset-[-12px] rounded-full border-[8px] border-yellow-600 shadow-[0_0_30px_rgba(234,179,8,0.3)] z-10 flex items-center justify-center bg-gradient-to-b from-yellow-400 to-yellow-700">
           {/* Light Bulbs */}
           {[...Array(12)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
               className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_white]"
               style={{ 
                 transform: `rotate(${i * 30}deg) translateY(-142px)` 
               }}
             />
           ))}
        </div>

        {/* The Wheel */}
        <div className="w-full h-full rounded-full border-4 border-black/40 p-1 bg-black overflow-hidden relative z-20 shadow-2xl">
          <motion.div 
            animate={controls}
            className="w-full h-full rounded-full overflow-hidden relative"
            style={{ 
              background: `conic-gradient(${
                SEGMENTS.map((s, i) => `${s.color} ${i * (100/SEGMENTS.length)}% ${(i+1) * (100/SEGMENTS.length)}%`).join(', ')
              })` 
            }}
          >
            {SEGMENTS.map((prize, idx) => (
               <div 
                 key={idx}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-headline font-black text-xs text-white uppercase tracking-tighter origin-center whitespace-nowrap"
                 style={{ 
                   transform: `rotate(${idx * (360/SEGMENTS.length) + (360/SEGMENTS.length/2)}deg) translateY(-85px) rotate(90deg)`,
                   textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.2)'
                 }}
               >
                 {prize.label}
               </div>
            ))}
          </motion.div>
          
          {/* Wheel Center Hub Button */}
          <button 
            onClick={handleSpin}
            disabled={!isAvailable || isSpinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-800 rounded-full z-30 flex items-center justify-center border-4 border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] active:scale-90 transition-transform disabled:grayscale disabled:opacity-50 group/spin"
          >
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-white leading-none uppercase tracking-widest">Spin</span>
              <Zap className="w-4 h-4 text-white fill-white mt-0.5" />
            </div>
          </button>
        </div>
      </div>

      <div className="w-full space-y-4">
        {!isAvailable && (
          <div className="bg-white/5 border border-white/10 rounded-2xl py-4 flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-white/40" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Next Spin Available In</span>
            </div>
            <p className="text-xl font-black text-white tracking-widest tabular-nums">24:00:00</p>
          </div>
        )}

        <Button 
          onClick={handleSpin}
          disabled={!isAvailable || isSpinning}
          className={cn(
            "w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-lg transition-all duration-500 shadow-2xl",
            isAvailable 
              ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white shadow-yellow-500/20 active:scale-95" 
              : "bg-white/5 text-white/20 cursor-not-allowed"
          )}
        >
          {isSpinning ? (
            <><Loader2 className="w-6 h-6 animate-spin mr-2" /> Spinning...</>
          ) : isAvailable ? (
            "Lucky Spin"
          ) : (
            "Claimed Today"
          )}
        </Button>
      </div>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-[420px] bg-[#020617] border-yellow-500/20 rounded-[2.5rem] p-0 overflow-hidden shadow-[0_0_100px_rgba(234,179,8,0.1)]">
          <div className="p-10 text-center relative">
            {/* Confetti Animation */}
            {winningPrize?.value > 0 && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * 400, opacity: 1 }}
                    animate={{ y: 500, x: Math.random() * 400, rotate: 360, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                    className="absolute w-2 h-2 rounded-sm"
                    style={{ background: ['#fbbf24', '#3b82f6', '#10b981', '#ef4444'][i % 4] }}
                  />
                ))}
              </div>
            )}

            <DialogHeader className="mb-8">
              <div className={cn(
                "w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center border-2 rotate-3 shadow-2xl transition-transform hover:rotate-0",
                winningPrize?.value > 0 
                  ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500" 
                  : "bg-white/5 border-white/10 text-white/40"
              )}>
                {winningPrize?.value > 0 ? (
                  <Trophy className="w-12 h-12 drop-shadow-lg" />
                ) : winningPrize?.label === 'BAD LUCK' ? (
                  <X className="w-12 h-12" />
                ) : (
                  <Star className="w-12 h-12" />
                )}
              </div>
              <DialogTitle className="text-4xl font-black text-white uppercase tracking-tight">
                {winningPrize?.value > 0 ? "You Won!" : winningPrize?.label === 'BAD LUCK' ? "Bad Luck!" : "Zero Win!"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2 text-lg">
                {winningPrize?.value > 0 
                  ? `Incredible! You just won a premium reward.` 
                  : winningPrize?.label === 'BAD LUCK' 
                    ? "The wheel wasn't in your favor today. Don't give up!"
                    : "A quiet spin today. Come back tomorrow for another shot!"}
              </DialogDescription>
            </DialogHeader>

            {winningPrize?.value > 0 && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-yellow-500/10 border-2 border-yellow-500/20 rounded-[2rem] p-8 mb-10 relative group"
              >
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-[#020617] text-[#020617] font-black text-[10px] animate-bounce">
                   WIN
                 </div>
                 <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em] mb-2 block">Premium Balance</span>
                 <span className="text-6xl font-black text-white text-glow">${winningPrize.value.toFixed(2)}</span>
              </motion.div>
            )}

            <Button 
              onClick={handleClaim}
              className="w-full h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-[0_10px_30px_rgba(234,179,8,0.3)] transition-all"
            >
              {winningPrize?.value > 0 ? (
                <><CheckCircle2 className="w-6 h-6 mr-2" /> Claim Cash Reward</>
              ) : (
                "Understood"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
