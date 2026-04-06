
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  LayoutDashboard, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useUser, updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { doc, getDoc, serverTimestamp, increment, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview Secure Reward Processing Page.
 * Handles the logic for adding CPA rewards to user accounts with abuse prevention.
 */

export default function VerificationSuccessPage() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'already_claimed' | 'error'>('verifying');
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user || !firestore) {
      setStatus('error');
      return;
    }

    // 1. Smooth Progress Bar Animation (3 seconds)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const processReward = async () => {
      try {
        const userRef = doc(firestore, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          setStatus('error');
          return;
        }

        const userData = userSnap.data();
        const now = Date.now();
        const REWARD_COOLDOWN = 2 * 60 * 1000; // 2 Minutes in ms

        // 2. Abuse Prevention Check
        if (userData.lastRewardTime) {
          const lastClaim = userData.lastRewardTime.toDate 
            ? userData.lastRewardTime.toDate().getTime() 
            : new Date(userData.lastRewardTime).getTime();
            
          if (now - lastClaim < REWARD_COOLDOWN) {
            setTimeout(() => setStatus('already_claimed'), 3000);
            return;
          }
        }

        // 3. Wait for progress to finish before final UI update
        setTimeout(() => {
          const rewardAmount = 0.10;
          
          // Atomic Updates
          updateDocumentNonBlocking(userRef, {
            availableBalance: increment(rewardAmount),
            lastRewardTime: serverTimestamp(),
            updatedAt: serverTimestamp()
          });

          addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'rewards'), {
            userId: user.uid,
            amount: rewardAmount,
            description: "CPA Reward Added",
            type: "taskCompletion",
            status: "completed",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });

          setStatus('success');
        }, 3000);

      } catch (err) {
        console.error("Reward Processing Error:", err);
        setStatus('error');
      }
    };

    processReward();
    return () => clearInterval(progressInterval);
  }, [user, isUserLoading, firestore]);

  // Handle Countdown Redirect
  useEffect(() => {
    if (status === 'success' || status === 'already_claimed') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/dashboard');
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0f0c29] to-[#050505] selection:bg-primary selection:text-white">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>

      <Header />
      
      <div className="pt-32 pb-20 px-4 flex items-center justify-center min-h-[85vh]">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 md:p-16 border-white/10 shadow-2xl relative overflow-hidden text-center bg-white/[0.03] backdrop-blur-2xl"
          >
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none ${
              status === 'success' ? 'bg-green-500/10' : 'bg-primary/10'
            }`} />

            <AnimatePresence mode="wait">
              {status === 'verifying' && (
                <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10 py-10">
                  <div className="relative w-24 h-24 mx-auto">
                    <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-primary/40" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Verifying completion...</h2>
                    <div className="max-w-xs mx-auto space-y-2">
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          className="h-full bg-primary"
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.3em]">Validating Session Security</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-8">
                    <div className="absolute inset-0 bg-green-500/20 rounded-[2.5rem] blur-xl animate-pulse" />
                    <div className="relative w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-[2.5rem] flex items-center justify-center border-4 border-black shadow-2xl">
                      <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </div>
                    <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: -60, opacity: [0, 1, 0] }} transition={{ duration: 1.5 }} className="absolute inset-0 flex items-center justify-center font-black text-green-400 text-3xl">
                      +$0.10
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <h1 className="font-headline text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      Reward <span className="text-green-500">Secured</span> ✅
                    </h1>
                    <p className="text-white/80 text-lg font-medium max-w-md mx-auto">
                      Verification Successful! You earned <span className="text-white font-black">$0.10</span>.
                    </p>
                  </div>

                  <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-left space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                        <span className="text-xs font-black text-white uppercase">Reward Added Successfully</span>
                      </div>
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">ID: OG-SECURE</span>
                    </div>
                    <div className="pt-2 border-t border-white/5 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <p className="text-[10px] text-white/40 font-medium leading-tight uppercase">
                        Redirecting to dashboard in <span className="text-white font-black">{countdown}s</span>...
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex-1 h-16 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-xl">
                      <Link href="/dashboard"><LayoutDashboard className="mr-2 w-5 h-5" /> Dashboard</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 h-16 border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-xl">
                      <Link href="/#trending">Continue Earning</Link>
                    </Button>
                  </div>
                </motion.div>
              )}

              {status === 'already_claimed' && (
                <motion.div key="already_claimed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="w-20 h-20 bg-yellow-500/20 rounded-3xl flex items-center justify-center mx-auto border border-yellow-500/30">
                    <Clock className="w-10 h-10 text-yellow-500" />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">Reward on Cooldown</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">To ensure fair distribution, rewards are limited to once every 2 minutes. Please try again shortly.</p>
                  <div className="text-[10px] text-white/20 font-black uppercase tracking-widest">Returning to dashboard in {countdown}s...</div>
                  <Button asChild className="w-full h-14 bg-white text-black font-black uppercase rounded-xl">
                    <Link href="/dashboard">Return Now</Link>
                  </Button>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto border border-red-500/30">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">System Error</h2>
                  <p className="text-muted-foreground">We couldn't synchronize your reward. Ensure you are logged in and try again.</p>
                  <Button asChild className="w-full h-14 bg-primary text-white font-black uppercase rounded-xl">
                    <Link href="/">Back to Home</Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
