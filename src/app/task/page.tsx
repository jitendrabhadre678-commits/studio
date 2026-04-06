
'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, updateDocumentNonBlocking, addDocumentNonBlocking, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Loader2, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc, serverTimestamp, increment, collection } from 'firebase/firestore';

type TaskStep = 'connecting' | 'checking' | 'eligible';

/**
 * @fileOverview Premium Task Qualification Page.
 * Handles task completion logic and referral "First Task" bonuses ($1.00).
 */

export default function TaskPage() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const [step, setStep] = useState<TaskStep>('connecting');

  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData } = useDoc(userRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
      return;
    }

    const runSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('checking');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('eligible');
    };

    if (user) runSequence();
  }, [user, isUserLoading, router]);

  const handleCompleteTask = async () => {
    if (!firestore || !user || !userData) return;

    const TASK_REWARD = 1.50; 
    const rewardsRef = collection(firestore, 'users', user.uid, 'rewards');

    // 1. Pay the User for Task Completion
    updateDocumentNonBlocking(userRef!, {
      availableBalance: increment(TASK_REWARD),
      totalEarnings: increment(TASK_REWARD),
      hasCompletedFirstTask: true,
      updatedAt: serverTimestamp()
    });

    addDocumentNonBlocking(rewardsRef, {
      userId: user.uid,
      description: "Premium Task Reward",
      amount: TASK_REWARD,
      status: "completed",
      type: "taskCompletion",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // 2. Logic: Referral "First Active Task" Bonus ($1.00)
    if (userData.referredByUserId && !userData.hasCompletedFirstTask) {
      const REFERRAL_TASK_BONUS = 1.00;
      const referrerRef = doc(firestore, 'users', userData.referredByUserId);

      updateDocumentNonBlocking(referrerRef, {
        availableBalance: increment(REFERRAL_TASK_BONUS),
        referralEarnings: increment(REFERRAL_TASK_BONUS),
        updatedAt: serverTimestamp()
      });

      addDocumentNonBlocking(collection(firestore, 'users', userData.referredByUserId, 'rewards'), {
        userId: userData.referredByUserId,
        description: `Active Referral Bonus: ${userData.username}`,
        amount: REFERRAL_TASK_BONUS,
        status: "completed",
        type: "referralLifetimeCommission",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    // Redirect to final offer link
    window.location.href = "https://gameflashx.space/sl/zy1x8";
  };

  return (
    <main className="min-h-screen bg-[#050b18]">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="glass-card rounded-[3rem] p-10 md:p-16 border-white/10 text-center relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
            
            {step !== 'eligible' ? (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="relative w-24 h-24 mx-auto">
                  <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary/40 fill-primary/20" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight animate-pulse">
                    {step === 'connecting' && "Establishing Secure Node..."}
                    {step === 'checking' && "Verifying Global Reach..."}
                  </h3>
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-[900]">
                    Encrypted Session Valid
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-10 animate-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
                  <div className="relative w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <Sparkles className="w-12 h-12 text-green-500" />
                  </div>
                </div>

                <div>
                  <h2 className="text-4xl md:text-5xl font-[900] text-white uppercase tracking-tighter mb-4 leading-none">
                    QUALIFICATION <br /><span className="text-primary">PASSED!</span>
                  </h2>
                  <p className="text-white/40 text-lg max-w-sm mx-auto font-medium">
                    Your session is locked. Complete the task below to synchronize your reward.
                  </p>
                </div>

                <div className="space-y-4 w-full">
                  <Button 
                    onClick={handleCompleteTask}
                    className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-[900] uppercase tracking-[0.2em] text-xl rounded-2xl shadow-[0_0_40px_rgba(0,150,255,0.4)] transition-all hover:scale-[1.02] active:scale-95 border-none"
                  >
                    Start Final Task <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Secure Redirect
                  </div>
                </div>
              </div>
            )}

            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
