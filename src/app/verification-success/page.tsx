
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { doc, getDoc, serverTimestamp, increment, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Premium Success Page.
 * Features: Liquid glass UI, 3D icon orbiters, and high-conversion action hub.
 */

const ICONS = {
  security: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487684/Untitled_design_20260406_202944_0000_uw8yuv.png',
  dollar: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487682/Untitled_design_20260406_202119_0000_zlzp6a.png',
  gift: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487685/Untitled_design_20260406_202010_0000_m9gses.png',
  timer: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775487688/Untitled_design_20260406_202607_0000_ekztnc.png',
};

function GlassNode({ url, className, delay = 0 }: { url: string, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={cn(
        "w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center",
        "bg-white/5 bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg",
        "relative overflow-hidden group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      <div className="relative z-10 w-6 h-6 md:w-8 md:h-8">
        <Image src={url} alt="Success Node" fill className="object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)]" />
      </div>
    </motion.div>
  );
}

export default function VerificationSuccessPage() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'already_claimed' | 'error'>('verifying');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user || !firestore) {
      setStatus('error');
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

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
        const REWARD_COOLDOWN = 60 * 1000; // 1 Minute

        if (userData.lastRewardTime) {
          const lastClaim = userData.lastRewardTime.toDate 
            ? userData.lastRewardTime.toDate().getTime() 
            : new Date(userData.lastRewardTime).getTime();
            
          if (now - lastClaim < REWARD_COOLDOWN) {
            setTimeout(() => setStatus('already_claimed'), 2500);
            return;
          }
        }

        setTimeout(() => {
          const rewardAmount = 10.00; // Premium success reward
          
          updateDocumentNonBlocking(userRef, {
            availableBalance: increment(rewardAmount),
            lastRewardTime: serverTimestamp(),
            updatedAt: serverTimestamp()
          });

          addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'rewards'), {
            userId: user.uid,
            amount: rewardAmount,
            description: "Premium Verification Reward",
            type: "taskCompletion",
            status: "completed",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });

          setStatus('success');
        }, 2500);

      } catch (err) {
        setStatus('error');
      }
    };

    processReward();
    return () => clearInterval(progressInterval);
  }, [user, isUserLoading, firestore]);

  return (
    <main className="min-h-screen bg-[#050b18] text-white selection:bg-primary overflow-hidden">
      <Header />
      
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="container max-w-2xl text-center">
          
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
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Authenticating Reward...</h2>
                  <div className="max-w-xs mx-auto space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div className="h-full bg-primary shadow-[0_0_15px_rgba(0,150,255,0.5)]" animate={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.3em]">Validating Session Security</p>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                
                {/* 1. TOP GIFT HUB */}
                <div className="relative">
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-32 h-32 md:w-40 md:h-40 mx-auto"
                  >
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
                    <div className="w-full h-full glass-card rounded-[2.5rem] border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                      <div className="relative w-20 h-20 md:w-24 md:h-24">
                        <Image src={ICONS.gift} alt="Gift" fill className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* 2. SUCCESS MESSAGING */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-[900] text-white tracking-tighter uppercase leading-none">
                    SUCCESS!
                  </h1>
                  <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px]">Your verification is complete</p>
                  
                  <div className="relative inline-block mt-6">
                    <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full" />
                    <div className="relative bg-black/40 backdrop-blur-xl border border-primary/30 rounded-2xl px-8 py-5">
                      <p className="text-2xl md:text-3xl font-black text-[#00aaff] flex items-center gap-3">
                        <Zap className="w-6 h-6 fill-primary" /> $10.00 Added to Dashboard
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. INFRASTRUCTURE ICONS ROW */}
                <div className="flex items-center justify-center gap-4 md:gap-6 pt-4">
                  <GlassNode url={ICONS.security} delay={0.1} />
                  <GlassNode url={ICONS.timer} delay={0.2} />
                  <GlassNode url={ICONS.dollar} delay={0.3} />
                </div>

                {/* 4. ACTION HUB */}
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-6">
                  <Button asChild className="flex-1 h-16 bg-gradient-to-r from-[#009dff] to-[#00e0ff] text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_0_30px_rgba(0,150,255,0.4)] hover:scale-[1.03] transition-all border-none">
                    <Link href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 h-16 border-white/10 bg-white/5 backdrop-blur-xl text-white/60 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white/10 hover:text-white transition-all">
                    <Link href="/#trending">Try Another Reward</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-6 text-[9px] font-black text-white/20 uppercase tracking-[0.2em] pt-10 border-t border-white/5">
                  <div className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-primary" /> Encrypted Transaction</div>
                  <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-primary" /> Instant Credit</div>
                </div>

              </motion.div>
            )}

            {status === 'already_claimed' && (
              <motion.div key="already_claimed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-10">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto border border-yellow-500/20">
                  <Clock className="w-10 h-10 text-yellow-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">Reward on Cooldown</h2>
                  <p className="text-white/40 font-medium">To maintain network integrity, please wait 1 minute between reward claims.</p>
                </div>
                <Button asChild className="h-14 px-10 bg-white text-black font-black uppercase rounded-xl">
                  <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-10">
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto border border-red-500/20">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">System Error</h2>
                  <p className="text-white/40 font-medium">We couldn't synchronize your reward. Please ensure you are logged in correctly.</p>
                </div>
                <Button asChild className="h-14 px-10 bg-primary text-white font-black uppercase rounded-xl shadow-lg">
                  <Link href="/">Back to Home</Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <Footer />
    </main>
  );
}
