'use client';

import { useEffect } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { doc } from 'firebase/firestore';
import { Zap, Gift, Trophy, Clock, ArrowRight, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ImageUpload } from '@/components/ui/image-upload';

export default function Dashboard() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc(userRef);

  if (isUserLoading || !user) return null;

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Welcome Header */}
          <div className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              Player <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Welcome back, {user.displayName || user.email?.split('@')[0]}! Track your rewards and progress here.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Available Points</span>
                </div>
                <div className="text-4xl font-black text-white mb-1">
                  {isUserDataLoading ? '...' : userData?.points || 0}
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Points earned this month</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Rewards Unlocked</span>
                </div>
                <div className="text-4xl font-black text-white mb-1">
                  {isUserDataLoading ? '...' : userData?.rewardsUnlocked || 0}
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Total digital keys claimed</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Player Rank</span>
                </div>
                <div className="text-4xl font-black text-white mb-1 uppercase tracking-tighter italic text-glow">
                  NOVICE
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Next rank at 100 points</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Creator Submission Tool */}
              <div className="glass-card rounded-[2.5rem] p-8 border-primary/20 bg-primary/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ImageIcon className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Submit Reward Visual</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-8 max-w-lg">
                    Design a custom gift card visual for your brand and submit it to our team. Drag and drop your mockup below.
                  </p>
                  <ImageUpload 
                    label="Drop Gift Card Mockup" 
                    onUpload={(file) => console.log('Gift card visual submitted:', file)}
                  />
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90 text-white font-black px-8 rounded-xl h-12 shadow-lg shadow-primary/20">
                      Submit Mockup
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="glass-card rounded-3xl p-8 border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" /> Daily Task Progress
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-white/60">Offers Completed</span>
                      <span className="text-primary">0 / 3</span>
                    </div>
                    <Progress value={0} className="h-2 bg-white/5" />
                  </div>
                  <Button asChild className="w-full bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl h-12 border border-white/10">
                    <Link href="/#trending">Find More Tasks <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar area */}
            <div className="space-y-8">
              <div className="glass-card rounded-3xl p-8 border-white/10">
                <h3 className="text-lg font-black text-white mb-4 uppercase tracking-widest">Earn Bonus Points</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Refer your friends to GameFlashX and earn 25 points for every successful sign up!</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black rounded-xl h-12">
                  Get Referral Link
                </Button>
              </div>

              <div className="glass-card rounded-3xl p-8 border-white/10">
                <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight">Quick Links</h3>
                <div className="space-y-2">
                  {['Browse All Cards', 'Leaderboard', 'Creator Portal', 'Help Center'].map((link) => (
                    <button key={link} className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-xl text-sm font-bold text-white/60 hover:text-white transition-all group">
                      {link}
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}