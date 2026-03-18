'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp, increment } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function DailyBonus({ userRef, userData }: { userRef: any, userData: any }) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [mounted, setMounted] = useState(false);
  const firestore = useFirestore();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering time-dependent UI until mounted
  if (!mounted || !userData) {
    return <div className="h-12 w-48 bg-white/5 rounded-xl animate-pulse" />;
  }

  const lastLogin = userData?.lastLoginAt ? (userData.lastLoginAt.toDate ? userData.lastLoginAt.toDate() : new Date(userData.lastLoginAt)) : null;
  const today = new Date();
  const isAvailable = !lastLogin || lastLogin.toDateString() !== today.toDateString();
  const streak = userData?.loginStreak || 0;
  
  // Bonus scales with streak: $0.05, $0.10, $0.15, capped at $0.25
  const bonusAmount = Math.min(0.05 + (streak * 0.05), 0.25);

  const handleClaim = async () => {
    if (!isAvailable || isClaiming || !userRef || !firestore) return;

    setIsClaiming(true);
    
    try {
      // 1. Create transaction
      addDocumentNonBlocking(collection(firestore, 'transactions'), {
        userId: userData.id,
        type: 'daily_bonus',
        amount: bonusAmount,
        status: 'completed',
        createdAt: serverTimestamp()
      });

      // 2. Update user
      const isConsecutive = lastLogin && 
        new Date(lastLogin.getTime() + 86400000).toDateString() === today.toDateString();
      
      updateDocumentNonBlocking(userRef, {
        balance: increment(bonusAmount),
        totalEarnings: increment(bonusAmount),
        lastLoginAt: serverTimestamp(),
        loginStreak: isConsecutive ? increment(1) : 1
      });

      toast({ 
        title: "Daily Bonus Claimed!", 
        description: `You earned $${bonusAmount.toFixed(2)} and your streak is now ${isConsecutive ? streak + 1 : 1} days.` 
      });
    } catch (e) {
      toast({ variant: "destructive", title: "Claim Failed", description: "Something went wrong." });
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <Button 
      onClick={handleClaim}
      disabled={!isAvailable || isClaiming}
      className={cn(
        "h-12 px-6 rounded-xl font-black uppercase tracking-widest text-xs transition-all",
        isAvailable 
          ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 animate-pulse" 
          : "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
      )}
    >
      {isClaiming ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : isAvailable ? (
        <><Sparkles className="w-4 h-4 mr-2" /> Claim Daily ${bonusAmount.toFixed(2)}</>
      ) : (
        <><CheckCircle2 className="w-4 h-4 mr-2" /> Bonus Claimed</>
      )}
    </Button>
  );
}