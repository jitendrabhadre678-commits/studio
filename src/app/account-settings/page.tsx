'use client';

import { useEffect } from 'react';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Loader2, 
  IdCard,
  Mail,
  Info,
  Wallet,
  AtSign,
  ShieldCheck
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { doc } from 'firebase/firestore';

/**
 * @fileOverview Minimal User Profile page.
 * Strictly read-only info hub with verified trust signals.
 */

export default function AccountSettings() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();

  // Memoize user reference
  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  // Real-time document subscription
  const { data: userData, isLoading: isDataLoading } = useDoc(userRef);

  // Redirect unauthorized
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FA4616] animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-xl">
          <div className="mb-12 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              Account <span className="text-[#FA4616]">Identity</span>
            </h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Verified profile and payout details.</p>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/10 bg-[#0a0a0a] shadow-2xl relative min-h-[300px]">
            {isDataLoading && !userData ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm z-10 rounded-[2.5rem]">
                <Loader2 className="w-10 h-10 text-[#FA4616] animate-spin" />
                <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">Syncing with database...</p>
              </div>
            ) : (
              <div className="space-y-10 animate-in fade-in duration-500">
                
                {/* Identity Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
                    <IdCard className="w-5 h-5 text-[#FA4616]" /> User Profile
                  </h3>
                  
                  {/* Plain Text Username (Non-Editable) */}
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Username</Label>
                    <div className="flex items-center gap-2 ml-1">
                      <AtSign className="w-4 h-4 text-primary" />
                      <p className="text-2xl font-black text-white uppercase tracking-tight">
                        {userData?.username || '...'}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 mt-2 ml-1 opacity-40">
                      <Info className="w-3 h-3 mt-0.5 text-[#FA4616]" />
                      <p className="text-[9px] font-bold leading-normal uppercase tracking-wider">
                        Username cannot be changed to ensure smooth reward processing and avoid payment issues.
                      </p>
                    </div>
                  </div>

                  {/* Read-Only Login Email */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Login Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <div className="bg-white/5 border border-white/5 h-14 rounded-2xl pl-11 pr-4 flex items-center justify-between text-white/40 font-bold cursor-not-allowed">
                        <span className="truncate">{user.email}</span>
                        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full shrink-0">
                          <ShieldCheck className="w-2.5 h-2.5 text-green-500" />
                          <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payout Information Section */}
                <div className="pt-8 border-t border-white/5 space-y-6">
                  <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
                    <Wallet className="w-5 h-5 text-[#FA4616]" /> Payout Information
                  </h3>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">PayPal Email (Auto-Synced)</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <div className="bg-white/5 border border-white/5 h-14 rounded-2xl pl-11 flex items-center text-white/40 font-bold cursor-not-allowed">
                        {user.email}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-2 ml-1 opacity-60">
                      <Info className="w-3 h-3 mt-0.5 text-primary" />
                      <p className="text-[9px] font-bold leading-normal uppercase tracking-wider text-white/60">
                        Rewards are automatically sent to your verified account email.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <div className="inline-flex items-center gap-2 text-white/30 bg-white/5 px-4 py-2 rounded-full">
                    <Info className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider italic">
                      Rewards can be claimed directly from your dashboard
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
