'use client';

import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Gift, Lock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function MyRewards() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) return null;

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
                My <span className="text-primary">Reward Vault</span>
              </h1>
              <p className="text-muted-foreground">Access all your unlocked digital keys and gift card codes here.</p>
            </div>
            
            <div className="w-full md:w-80 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search your vault..." className="pl-10 bg-white/5 border-white/10" />
            </div>
          </div>

          <div className="glass-card rounded-[3rem] p-12 md:p-24 text-center border-white/5 min-h-[500px] flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mb-8 border border-primary/20">
              <Lock className="w-12 h-12 text-primary opacity-20" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Your Vault is Empty</h2>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              You haven't successfully completed any reward unlocks yet. Visit the gallery to start earning gift cards for your favorite platforms.
            </p>
            
            <div className="mt-10 flex gap-4 flex-wrap justify-center">
              <button onClick={() => router.push('/#trending')} className="bg-primary hover:bg-primary/90 text-white font-black px-10 h-14 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95">
                Browse Reward Gallery
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-8 glass-card rounded-3xl border-white/10">
              <h3 className="font-bold text-white mb-2">How to Redeem?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Once you unlock a code, simply copy it from your vault and paste it into the "Redeem" section of the respective platform (Steam, Amazon, etc.). All codes are verified and checked for validity before delivery.
              </p>
            </div>
            <div className="p-8 glass-card rounded-3xl border-white/10">
              <h3 className="font-bold text-white mb-2">Need Support?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If your code is showing as invalid or you're having trouble unlocking, our 24/7 support team is here to help. Reach out through our community portal for instant assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
