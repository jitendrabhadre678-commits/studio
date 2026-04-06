
'use client';

import { useState, useEffect, use } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Zap, 
  Gift, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { doc, serverTimestamp, increment, arrayUnion, collection } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/**
 * @fileOverview Secure Reward Claim Page.
 * Implements one-time $1 reward logic for specific offer links.
 */

export default function OfferClaimPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, isUserLoading, firestore } = useUser();
  const [status, setStatus] = useState<'verifying' | 'claiming' | 'success' | 'already_claimed' | 'error' | 'no_auth'>('verifying');
  const [progress, setProgress] = useState(0);

  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData, isLoading: isDataLoading } = useDoc(userRef);

  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
      setStatus('no_auth');
      return;
    }

    if (isDataLoading) return;

    // Check if this specific offer was already claimed
    if (userData?.claimedOffers?.includes(id)) {
      setStatus('already_claimed');
      return;
    }

    // Start verification sequence
    const startClaim = async () => {
      setStatus('claiming');
      
      // Visual progress for "Processing" feel
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);

      // Secure processing delay
      setTimeout(() => {
        if (!userRef || !firestore) return;

        const REWARD_AMOUNT = 1.00;

        // Perform atomic update
        updateDocumentNonBlocking(userRef, {
          availableBalance: increment(REWARD_AMOUNT),
          claimedOffers: arrayUnion(id),
          updatedAt: serverTimestamp()
        });

        // Add detailed reward record
        addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'rewards'), {
          userId: user.uid,
          amount: REWARD_AMOUNT,
          description: `Reward Link Claim: ${id}`,
          type: "taskCompletion",
          status: "completed",
          reward_source: `offer_link_${id}`,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        setStatus('success');
      }, 3000);
    };

    if (status === 'verifying') {
      startClaim();
    }
  }, [user, isUserLoading, isDataLoading, userData, id, status, userRef, firestore]);

  return (
    <main className="min-h-screen bg-[#050b18] text-white flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-20 px-4">
        <div className="container max-w-xl">
          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/10 relative overflow-hidden text-center shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {(status === 'verifying' || status === 'claiming') && (
                <motion.div 
                  key="claiming"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="relative w-24 h-24 mx-auto">
                    <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-primary/40" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Processing Reward...</h2>
                    <p className="text-sm text-white/40 font-medium uppercase tracking-widest">Verifying session: {id}</p>
                    
                    <div className="max-w-xs mx-auto space-y-2">
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          className="h-full bg-primary shadow-[0_0_15px_rgba(0,150,255,0.5)]" 
                          animate={{ width: `${progress}%` }} 
                        />
                      </div>
                      <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Establishing secure link</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8 py-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-[60px] rounded-full" />
                    <div className="relative w-24 h-24 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto border border-green-500/30">
                      <Sparkles className="w-12 h-12 text-green-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      🎉 REWARD <br /><span className="text-green-500">ADDED!</span>
                    </h1>
                    <p className="text-white/60 font-bold uppercase tracking-widest text-[10px] pt-2">
                      Success: 1.00 USD Synchronized
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 py-8">
                    <p className="text-2xl font-black text-white flex items-center justify-center gap-3">
                      <Zap className="w-6 h-6 text-primary fill-primary" /> $1.00 Added to Wallet
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button asChild className="h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20">
                      <Link href="/dashboard">Open Dashboard <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                    <Button asChild variant="ghost" className="h-12 text-white/40 hover:text-white uppercase font-black text-[10px] tracking-widest">
                      <Link href="/#trending">Explore More Rewards</Link>
                    </Button>
                  </div>
                </motion.div>
              )}

              {status === 'already_claimed' && (
                <motion.div 
                  key="already"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8 py-6"
                >
                  <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto border border-yellow-500/20">
                    <AlertCircle className="w-10 h-10 text-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Already Claimed</h2>
                    <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                      You have already received the reward for this specific offer link.
                    </p>
                  </div>
                  <Button asChild className="h-14 px-10 bg-white text-black font-black uppercase rounded-xl hover:bg-white/90">
                    <Link href="/dashboard">View My Balance</Link>
                  </Button>
                </motion.div>
              )}

              {status === 'no_auth' && (
                <motion.div 
                  key="no_auth"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8 py-6"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20">
                    <Gift className="w-10 h-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Claim $1.00 Reward</h2>
                    <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                      Please sign in to your GameFlashX account to receive this bonus.
                    </p>
                  </div>
                  <Button asChild className="h-16 px-12 bg-primary text-white font-black uppercase rounded-xl shadow-lg shadow-primary/20">
                    <Link href="/">Sign In to Claim</Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
