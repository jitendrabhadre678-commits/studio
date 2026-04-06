
'use client';

import { useState, useEffect } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Users, 
  Copy, 
  CheckCircle2, 
  Zap, 
  Gift, 
  Share2,
  Loader2,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

/**
 * @fileOverview Referral Management Hub.
 * Users can grab their link and monitor their affiliate earnings.
 */

export default function ReferPage() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData } = useDoc(userRef);

  if (isUserLoading || !user) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </main>
    );
  }

  const referralCode = userData?.referralCode || '...';
  const referralLink = mounted ? `${window.location.origin}/?ref=${referralCode}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast({
      title: "Link Copied! ✅",
      description: "Share it with your community to start earning.",
    });
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <main className="min-h-screen bg-[#050b18] text-white">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          
          {/* 1. HERO SECTION */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
            >
              <Users className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Affiliate Network</span>
            </motion.div>
            <h1 className="font-headline text-5xl md:text-7xl font-[900] text-white mb-6 uppercase tracking-tighter leading-none">
              REFER & <span className="text-primary text-glow">EARN CASH</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Earn up to <span className="text-white font-black">$1.50</span> for every user you bring to the platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* 2. SHARING HUB */}
            <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 md:p-12 border-white/10 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
              
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                <Share2 className="w-6 h-6 text-primary" /> Your Affiliate Link
              </h3>
              
              <div className="space-y-6">
                <div className="relative group">
                  <div className="bg-black/40 border border-white/10 h-20 rounded-2xl px-8 flex items-center text-primary font-mono text-sm md:text-lg overflow-hidden whitespace-nowrap shadow-inner">
                    {referralLink}
                  </div>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                <Button 
                  onClick={handleCopy}
                  className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-[900] uppercase tracking-widest text-xl rounded-2xl shadow-[0_0_40px_rgba(0,150,255,0.3)] transition-all active:scale-95 border-none"
                >
                  {isCopied ? (
                    <><CheckCircle2 className="w-8 h-8 mr-3" /> Copied to Clipboard</>
                  ) : (
                    <><Copy className="w-6 h-6 mr-3" /> Copy My Link</>
                  )}
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Instant Activation</div>
                <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> No Earning Cap</div>
              </div>
            </div>

            {/* 3. PERFORMANCE STATS */}
            <div className="grid grid-cols-1 gap-6">
              <div className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.02] flex flex-col justify-between group">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Total Referrals</p>
                  <Users className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-5xl font-black text-white mt-4">{userData?.totalReferrals || 0}</p>
                <div className="h-1 w-full bg-white/5 rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-primary w-[40%] animate-pulse" />
                </div>
              </div>

              <div className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.02] flex flex-col justify-between group">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Affiliate Profits</p>
                  <DollarSign className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-5xl font-[900] text-primary mt-4 tracking-tighter">${(userData?.referralEarnings || 0).toFixed(2)}</p>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-4">Available for instant withdrawal</p>
              </div>
            </div>
          </div>

          {/* 4. REWARD PIPELINE */}
          <div className="p-10 md:p-16 glass-card rounded-[3.5rem] border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="w-64 h-64 text-primary" />
            </div>
            
            <h3 className="text-3xl font-black text-white mb-12 uppercase tracking-tight relative z-10">How It Works</h3>
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center font-black text-primary text-xl border border-white/10">1</div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight">Invite Friends</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">Post your link on TikTok, YouTube, or Discord servers.</p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center font-black text-primary text-xl border border-primary/20">2</div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight">Signup Bonus</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">Earn <span className="text-primary font-bold">$0.50</span> instantly when they create a verified account.</p>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 mx-auto flex items-center justify-center font-black text-green-500 text-xl border border-green-500/20">3</div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight">Activity Bonus</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">Earn <span className="text-green-500 font-bold">$1.00</span> more when they complete their first offer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
