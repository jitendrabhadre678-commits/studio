
'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, Sparkles, Trophy, AlertCircle, CheckCircle2, X } from 'lucide-react';
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
 * Premium Spin Wheel Configuration
 * 12 Segments for a professional look.
 * Probability is controlled by the distribution of values in this array.
 */
const SEGMENTS = [
  { label: 'BETTER LUCK', value: 0, color: '#0f172a' },
  { label: '$0.05', value: 0.05, color: '#df104e' },
  { label: 'TRY AGAIN', value: 0, color: '#1e293b' },
  { label: '$0.10', value: 0.10, color: '#df104e' },
  { label: 'EMPTY', value: 0, color: '#0f172a' },
  { label: '$0.25', value: 0.25, color: '#df104e' },
  { label: 'NEXT TIME', value: 0, color: '#1e293b' },
  { label: '$0.05', value: 0.05, color: '#df104e' },
  { label: 'ZERO', value: 0, color: '#0f172a' },
  { label: '$0.10', value: 0.10, color: '#df104e' },
  { label: 'NOTHING', value: 0, color: '#1e293b' },
  { label: 'JACKPOT', value: 0.50, color: '#facc15' },
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
  const isAvailable = !lastSpin || lastSpin.toDateString() !== today.toDateString();

  const handleSpin = async () => {
    if (!isAvailable || isSpinning || !userRef || !firestore) return;

    setIsSpinning(true);
    
    // Select a random segment index
    const prizeIndex = Math.floor(Math.random() * SEGMENTS.length);
    const prize = SEGMENTS[prizeIndex];
    
    // Animation math:
    // Full turns (5) + the distance to the specific slice
    // We subtract the target angle from 360 to account for clockwise rotation
    const sliceAngle = 360 / SEGMENTS.length;
    const extraRotation = (SEGMENTS.length - prizeIndex) * sliceAngle - (sliceAngle / 2);
    const newRotation = currentRotation + (360 * 5) + extraRotation;
    
    await controls.start({
      rotate: newRotation,
      transition: { duration: 5, ease: [0.15, 0, 0.15, 1] }
    });

    setCurrentRotation(newRotation % 360);
    setWinningPrize(prize);
    setIsSpinning(false);
    setShowResult(true);
  };

  const handleClaim = () => {
    if (!winningPrize || !userRef || !firestore) return;

    const { value, label } = winningPrize;

    // Only update balance if user actually won money
    if (value > 0) {
      // 1. Log Transaction
      addDocumentNonBlocking(collection(firestore, 'transactions'), {
        userId: userData.id,
        type: 'spin',
        amount: value,
        rewardName: `Daily Spin: ${label}`,
        status: 'completed',
        createdAt: serverTimestamp()
      });

      // 2. Update User Stats
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
      // Just update the last spin date so they can't spin again today
      updateDocumentNonBlocking(userRef, {
        lastSpinAt: serverTimestamp()
      });
      toast({ 
        title: "Daily Spin Used", 
        description: "Better luck tomorrow, gamer!" 
      });
    }

    setShowResult(false);
    setWinningPrize(null);
  };

  return (
    <div className="glass-card rounded-[2.5rem] p-8 border-white/10 flex flex-col items-center text-center relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mb-6">
        <h3 className="text-2xl font-black text-white flex items-center justify-center gap-3 uppercase tracking-tight">
          <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" /> Premium Wheel
        </h3>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1">Spin Daily • Win Real Cash</p>
      </div>
      
      <div className="relative w-64 h-64 mb-8">
        {/* Pointer (Top Center) */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-[0_0_10px_rgba(223,16,78,0.8)]">
          <div className="w-6 h-8 bg-primary rounded-b-full border-2 border-white relative">
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-b-full" />
          </div>
        </div>

        {/* The Actual Wheel Container */}
        <div className="w-full h-full rounded-full border-[6px] border-white/10 p-2 bg-black/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
          <motion.div 
            animate={controls}
            className="w-full h-full rounded-full overflow-hidden relative shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"
            style={{ 
              background: `conic-gradient(${
                SEGMENTS.map((s, i) => `${s.color} ${i * (100/SEGMENTS.length)}% ${(i+1) * (100/SEGMENTS.length)}%`).join(', ')
              })` 
            }}
          >
            {SEGMENTS.map((prize, idx) => (
               <div 
                 key={idx}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[9px] text-white/90 uppercase tracking-tighter"
                 style={{ 
                   transform: `rotate(${idx * (360/SEGMENTS.length) + (360/SEGMENTS.length/2)}deg) translateY(-85px)`,
                   textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                 }}
               >
                 {prize.label}
               </div>
            ))}
          </motion.div>
          
          {/* Wheel Center Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full z-20 flex items-center justify-center border-4 border-white/10 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-white animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        {!isAvailable && (
          <div className="bg-white/5 border border-white/10 rounded-xl py-3 flex items-center justify-center gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle className="w-4 h-4 text-white/40" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Available again tomorrow</span>
          </div>
        )}

        <Button 
          onClick={handleSpin}
          disabled={!isAvailable || isSpinning}
          className={cn(
            "w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all duration-500",
            isAvailable 
              ? "bg-primary hover:bg-primary/90 text-white shadow-[0_10px_20px_rgba(223,16,78,0.3)] hover:scale-[1.02] active:scale-95" 
              : "bg-white/5 text-white/20 cursor-not-allowed grayscale"
          )}
        >
          {isSpinning ? (
            <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Spinning...</>
          ) : isAvailable ? (
            "Spin Now"
          ) : (
            "Wait for Refresh"
          )}
        </Button>
      </div>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-[400px] bg-black/95 backdrop-blur-3xl border-white/10 rounded-[2.5rem] p-0 overflow-hidden shadow-[0_0_80px_rgba(223,16,78,0.2)]">
          <div className="p-10 text-center relative">
            {/* Confetti-like Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
               <Sparkles className="absolute top-10 left-10 w-8 h-8 text-primary animate-pulse" />
               <Sparkles className="absolute bottom-10 right-10 w-8 h-8 text-yellow-500 animate-pulse" />
            </div>

            <DialogHeader className="mb-8">
              <div className={cn(
                "w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center border-2",
                winningPrize?.value > 0 
                  ? "bg-green-500/10 border-green-500/30 text-green-500" 
                  : "bg-white/5 border-white/10 text-white/40"
              )}>
                {winningPrize?.value > 0 ? <Trophy className="w-10 h-10" /> : <X className="w-10 h-10" />}
              </div>
              <DialogTitle className="text-3xl font-black text-white uppercase tracking-tight">
                {winningPrize?.value > 0 ? "You Won!" : "Better Luck!"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2">
                {winningPrize?.value > 0 
                  ? `Your luck is shining today. You landed on the ${winningPrize.label} segment.` 
                  : "No luck this time, but don't give up. The wheel refreshes daily!"}
              </DialogDescription>
            </DialogHeader>

            {winningPrize?.value > 0 && (
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8 transform transition-all hover:scale-105">
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1 block">Reward Value</span>
                 <span className="text-5xl font-black text-white text-glow">${winningPrize.value.toFixed(2)}</span>
              </div>
            )}

            <Button 
              onClick={handleClaim}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20"
            >
              {winningPrize?.value > 0 ? (
                <><CheckCircle2 className="w-5 h-5 mr-2" /> Claim & Continue</>
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
