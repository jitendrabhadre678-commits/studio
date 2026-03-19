'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Loader2, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc, collection, query, where, getDocs, serverTimestamp, increment } from 'firebase/firestore';

type TaskStep = 'connecting' | 'checking' | 'eligible' | 'redirecting';

export default function TaskPage() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const [step, setStep] = useState<TaskStep>('connecting');
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: 'connecting', text: "Connecting to secure offer node...", time: 2000 },
    { id: 'checking', text: "Verifying your region and availability...", time: 2000 },
    { id: 'eligible', text: "Finalizing your reward access...", time: 1500 }
  ];

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
      return;
    }

    let currentStepIdx = 0;
    const runSequence = async () => {
      for (const s of steps) {
        setStep(s.id as TaskStep);
        await new Promise(r => setTimeout(runSequence, s.time));
        currentStepIdx++;
      }
      setStep('eligible');
    };

    if (user) runSequence();
  }, [user, isUserLoading, router]);

  const handleCompleteTask = async () => {
    if (!firestore || !user) return;

    // Simulate task completion data
    const rewardAmount = 1.50; // Example reward
    const userRef = doc(firestore, 'users', user.uid);
    const rewardRef = collection(firestore, 'users', user.uid, 'rewards');

    // 1. Add reward record
    addDocumentNonBlocking(rewardRef, {
      userId: user.uid,
      rewardName: "Premium Task Reward",
      amount: rewardAmount,
      status: "completed",
      createdAt: serverTimestamp()
    });

    // 2. Update user balance
    const userSnap = await getDocs(query(collection(firestore, 'users'), where('id', '==', user.uid)));
    const userData = userSnap.docs[0]?.data();

    // 3. Referral Logic: Check for referral bonus
    if (userData && userData.referredBy && !userData.hasCompletedFirstTask) {
      const referralBonus = 0.10;
      
      // Find Referrer
      const referrersQuery = query(collection(firestore, 'users'), where('referralCode', '==', userData.referredBy));
      const referrerSnap = await getDocs(referrersQuery);
      
      if (!referrerSnap.empty) {
        const referrerDoc = referrerSnap.docs[0];
        const referrerRef = doc(firestore, 'users', referrerDoc.id);

        // Award Referrer
        updateDocumentNonBlocking(referrerRef, {
          balance: increment(referralBonus),
          referralEarnings: increment(referralBonus),
          totalReferrals: increment(1),
          updatedAt: serverTimestamp()
        });

        // Add referral reward record
        addDocumentNonBlocking(collection(firestore, 'users', referrerDoc.id, 'rewards'), {
          userId: referrerDoc.id,
          rewardName: `Referral Bonus: ${userData.username}`,
          amount: referralBonus,
          status: "completed",
          createdAt: serverTimestamp()
        });
      }
    }

    // Mark task as completed for referral tracking
    updateDocumentNonBlocking(userRef, {
      balance: increment(rewardAmount),
      hasCompletedFirstTask: true,
      updatedAt: serverTimestamp()
    });

    // Redirect to final CPA link
    window.location.href = "https://gameflashx.space/sl/zy1x8";
  };

  return (
    <main className="min-h-screen bg-black">
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
                    {step === 'connecting' && "Connecting to offer..."}
                    {step === 'checking' && "Checking availability..."}
                    {step === 'eligible' && "Final step remaining..."}
                  </h3>
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">
                    Encrypted Session Active
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-10 animate-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
                  <div className="relative w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-green-500/30">
                    <Sparkles className="w-12 h-12 text-green-500" />
                  </div>
                </div>

                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                    🎉 Reward <br /><span className="text-primary">Unlocked!</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                    You have successfully passed the qualification stage. Continue to complete the task.
                  </p>
                </div>

                <div className="space-y-4 w-full">
                  <Button 
                    onClick={handleCompleteTask}
                    className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-xl rounded-2xl shadow-2xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Start Task Now <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" /> Secure Redirect Guaranteed
                  </div>
                </div>
              </div>
            )}

            {/* Decorative background accent */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}