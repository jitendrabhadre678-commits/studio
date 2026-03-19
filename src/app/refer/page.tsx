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
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

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
      description: "Share it with your friends to start earning.",
    });
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Affiliate Program</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">
              Refer & <span className="text-primary text-glow">Earn</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
              Earn <span className="text-white font-black">$0.10</span> for every friend you invite who completes their first task.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Sharing Card */}
            <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border-white/10 flex flex-col justify-center">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                <Share2 className="w-5 h-5 text-primary" /> Your Link
              </h3>
              
              <div className="space-y-4">
                <div className="relative group">
                  <div className="bg-white/5 border border-white/10 h-16 rounded-2xl px-6 flex items-center text-white/60 font-mono text-sm overflow-hidden whitespace-nowrap">
                    {referralLink}
                  </div>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                <Button 
                  onClick={handleCopy}
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                  {isCopied ? (
                    <><CheckCircle2 className="w-6 h-6 mr-2" /> Copied</>
                  ) : (
                    <><Copy className="w-5 h-5 mr-2" /> Copy Link</>
                  )}
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                <Zap className="w-3 h-3 text-primary" /> Instant Activation
                <span className="w-1 h-1 bg-white/10 rounded-full" />
                No Limit on Invites
              </div>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-1 gap-4">
              <div className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Total Referrals</p>
                  <p className="text-4xl font-black text-white">{userData?.totalReferrals || 0}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                  <Users className="w-7 h-7 text-primary" />
                </div>
              </div>

              <div className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Total Earnings</p>
                  <p className="text-4xl font-black text-primary">${(userData?.referralEarnings || 0).toFixed(2)}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Gift className="w-7 h-7 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* How it works simple */}
          <div className="p-8 md:p-12 glass-card rounded-[3rem] border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="w-48 h-48 text-primary" />
            </div>
            
            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">How to maximize earnings?</h3>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 mx-auto flex items-center justify-center font-black text-primary">1</div>
                <p className="text-sm font-bold text-white uppercase">Share Link</p>
                <p className="text-xs text-muted-foreground">Post your link on YouTube, Discord, or TikTok.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 mx-auto flex items-center justify-center font-black text-primary">2</div>
                <p className="text-sm font-bold text-white uppercase">Friends Signup</p>
                <p className="text-xs text-muted-foreground">They join GameFlashX using your unique link.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 mx-auto flex items-center justify-center font-black text-primary">3</div>
                <p className="text-sm font-bold text-white uppercase">Get Paid</p>
                <p className="text-xs text-muted-foreground">Earn $0.10 instantly when they finish 1 task.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}