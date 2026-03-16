'use client';

import { useEffect, useState } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { doc } from 'firebase/firestore';
import { Gift, Trophy, Clock, ArrowRight, ChevronRight, DollarSign, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

  const balance = userData?.balance || 0;
  const offersCompleted = userData?.offersCompleted || 0;
  const rewardsUnlocked = userData?.rewardsUnlocked || 0;

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="glass-card border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Total Earnings</span>
                </div>
                <div className="text-4xl font-black text-white mb-1">
                  ${isUserDataLoading ? '...' : balance.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Available to withdraw</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Offers Done</span>
                </div>
                <div className="text-4xl font-black text-white mb-1">
                  {isUserDataLoading ? '...' : offersCompleted}
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Tasks successfully verified</p>
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
                  {isUserDataLoading ? '...' : rewardsUnlocked}
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
                <div className="text-3xl font-black text-white mb-1 uppercase tracking-tighter italic text-glow">
                  {offersCompleted > 10 ? 'ELITE' : 'NOVICE'}
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Next rank at 10 offers</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Section */}
              <div className="glass-card rounded-[2.5rem] p-8 border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" /> Daily Task Progress
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-white/60">Offers Completed Today</span>
                      <span className="text-primary">{offersCompleted} / 3</span>
                    </div>
                    <Progress value={(offersCompleted / 3) * 100} className="h-2 bg-white/5" />
                  </div>
                  <Button asChild className="w-full bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl h-12 border border-white/10">
                    <Link href="/#trending">Find More Tasks <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8 border-white/10">
                <h3 className="text-lg font-black text-white mb-4 uppercase tracking-widest">Earn Bonus Points</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Refer your friends to GameFlashX and earn $0.50 for every successful sign up!</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black rounded-xl h-12">
                  Get Referral Link
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card rounded-3xl p-8 border-white/10">
                <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight">Quick Links</h3>
                <div className="space-y-2">
                  {['Browse All Cards', 'Leaderboard', 'Help Center'].map((link) => (
                    <button key={link} className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-xl text-sm font-bold text-white/60 hover:text-white transition-all group text-left">
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
