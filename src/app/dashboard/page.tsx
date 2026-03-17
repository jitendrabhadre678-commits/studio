
'use client';

import { useEffect, useState } from 'react';
import { useUser, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { doc, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { 
  Gift, Trophy, Clock, ArrowRight, ChevronRight, 
  DollarSign, CheckCircle, Users, Sparkles, 
  History, Wallet, Share2, Copy, Check, MousePointer2 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DailyBonus } from '@/components/dashboard/DailyBonus';
import { WithdrawalModal } from '@/components/dashboard/WithdrawalModal';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const referralStatsRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'referrals', user.uid);
  }, [firestore, user]);

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
  }, [firestore, user]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc(userRef);
  const { data: referralData, isLoading: isReferralLoading } = useDoc(referralStatsRef);
  const { data: transactions } = useCollection(transactionsQuery);

  const handleCopyRef = () => {
    const refLink = `${window.location.origin}/?ref=${user?.uid}`;
    navigator.clipboard.writeText(refLink);
    setIsCopied(true);
    toast({ title: "Referral Link Copied!", description: "Share this with friends to earn rewards for their activity." });
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isUserLoading || !user) return null;

  const balance = userData?.balance || 0;
  const totalEarnings = userData?.totalEarnings || 0;
  const offersCompleted = userData?.offersCompleted || 0;
  const referralsCount = userData?.referralsCount || 0;
  const referralEarnings = userData?.referralEarnings || 0;
  const referralClicks = referralData?.clicks || 0;

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
                Player <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-muted-foreground italic">
                Rank: <span className="text-primary font-bold">{offersCompleted > 50 ? 'Gamer Legend' : offersCompleted > 10 ? 'Elite Pro' : 'Level 1 Rookie'}</span>
              </p>
            </div>
            
            <div className="flex gap-3">
              <DailyBonus userRef={userRef} userData={userData} />
              <WithdrawalModal balance={balance} userRef={userRef} />
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-14 rounded-2xl">
              <TabsTrigger value="overview" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary">Overview</TabsTrigger>
              <TabsTrigger value="rewards" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary">Activity</TabsTrigger>
              <TabsTrigger value="referrals" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary">Referrals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Current Balance', val: `$${balance.toFixed(2)}`, icon: <Wallet className="text-primary" />, sub: 'Available to withdraw' },
                  { label: 'Lifetime Earnings', val: `$${totalEarnings.toFixed(2)}`, icon: <DollarSign className="text-primary" />, sub: 'Total cash earned' },
                  { label: 'Offers Done', val: offersCompleted, icon: <CheckCircle className="text-primary" />, sub: 'Verified tasks' },
                  { label: 'Referral Credits', val: `$${referralEarnings.toFixed(2)}`, icon: <Users className="text-primary" />, sub: `${referralsCount} friends joined` },
                ].map((stat, i) => (
                  <Card key={i} className="glass-card border-white/10 overflow-hidden relative group">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                          {stat.icon}
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <div className="text-4xl font-black text-white mb-1">
                        {isUserDataLoading ? '...' : stat.val}
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Activities */}
                  <div className="grid grid-cols-1 gap-8">
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/10 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-primary" /> Daily Goal
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">Complete 5 offers today to unlock a bonus $0.50 reward!</p>
                        <div className="space-y-2 mb-8">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                            <span className="text-white/60">Progress</span>
                            <span className="text-primary">{offersCompleted % 5} / 5</span>
                          </div>
                          <Progress value={((offersCompleted % 5) / 5) * 100} className="h-2 bg-white/5" />
                        </div>
                      </div>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-black h-12 rounded-xl">
                        <Link href="/#trending">Start New Tasks <ArrowRight className="ml-2 w-4 h-4" /></Link>
                      </Button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="glass-card rounded-[2.5rem] p-8 border-white/10">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <History className="w-5 h-5 text-primary" /> Recent History
                      </h3>
                      <Link href="/dashboard/transactions" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View All</Link>
                    </div>
                    
                    <div className="space-y-4">
                      {transactions && transactions.length > 0 ? (
                        transactions.map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "p-2 rounded-lg",
                                tx.type === 'withdrawal' ? "bg-red-500/10" : "bg-green-500/10"
                              )}>
                                {tx.type === 'offer' && <CheckCircle className="w-4 h-4 text-green-500" />}
                                {tx.type === 'referral' && <Users className="w-4 h-4 text-green-500" />}
                                {tx.type === 'daily_bonus' && <Sparkles className="w-4 h-4 text-green-500" />}
                                {tx.type === 'withdrawal' && <Wallet className="w-4 h-4 text-red-500" />}
                                {tx.type === 'spin' && <Sparkles className="w-4 h-4 text-yellow-500" />}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white uppercase tracking-tight">
                                  {tx.type === 'offer' ? `Offer: ${tx.rewardName || 'OGAds'}` : tx.type.replace('_', ' ')}
                                </p>
                                <p className="text-[10px] text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <span className={cn(
                              "font-black",
                              tx.type === 'withdrawal' ? "text-red-500" : "text-green-500"
                            )}>
                              {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-muted-foreground italic">No transactions found.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-card rounded-[2.5rem] p-8 border-white/10">
                    <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-primary" /> Invite Friends
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      Earn rewards for every person you bring to GameFlashX. Start sharing your link now!
                    </p>
                    <div className="relative mb-6">
                      <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white/40 truncate">
                        {`${window.location.origin}/?ref=${user?.uid}`}
                      </div>
                      <button 
                        onClick={handleCopyRef}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-primary transition-colors"
                      >
                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button onClick={handleCopyRef} className="w-full bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl h-12 border border-white/10">
                      Copy Link
                    </Button>
                  </div>

                  <div className="glass-card rounded-[2.5rem] p-8 border-white/10 bg-primary/5">
                    <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tight">Need Support?</h3>
                    <p className="text-xs text-muted-foreground mb-6 leading-relaxed">Our 24/7 automated support system handles reward inquiries instantly.</p>
                    <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10 text-primary font-bold rounded-xl h-11">
                      Open Help Desk
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rewards">
               <div className="glass-card rounded-[2.5rem] p-12 text-center border-white/5 min-h-[400px] flex flex-col items-center justify-center">
                  <History className="w-16 h-16 text-primary/20 mb-6" />
                  <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Full Transaction Log</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">Detailed reporting of your account activity is coming soon to this view.</p>
               </div>
            </TabsContent>

            <TabsContent value="referrals" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Referral Clicks', val: referralClicks, icon: <MousePointer2 className="text-primary" />, sub: 'Unique visitors tracked' },
                  { label: 'Friends Joined', val: referralsCount, icon: <Users className="text-primary" />, sub: 'Account registrations' },
                  { label: 'Total Commission', val: `$${referralEarnings.toFixed(2)}`, icon: <DollarSign className="text-primary" />, sub: 'Lifetime earnings' },
                ].map((stat, i) => (
                  <Card key={i} className="glass-card border-white/10 overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                          {stat.icon}
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <div className="text-4xl font-black text-white mb-1">
                        {isReferralLoading || isUserDataLoading ? '...' : stat.val}
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card rounded-[2.5rem] p-10 border-white/10">
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Your Referral Link</h3>
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Share this unique URL with your friends or on social media. You'll receive a 10% lifetime commission on every offer they complete!
                    </p>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-4">
                      <div className="text-xs font-mono text-white/60 break-all select-all">
                        {`${window.location.origin}/?ref=${user?.uid}`}
                      </div>
                      <Button onClick={handleCopyRef} className="w-full bg-primary hover:bg-primary/90 text-white font-black h-12 rounded-xl">
                        {isCopied ? <><Check className="mr-2 w-4 h-4" /> Link Copied</> : <><Copy className="mr-2 w-4 h-4" /> Copy My Link</>}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="glass-card rounded-[2.5rem] p-10 border-white/10 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-4">How it works?</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">1</div>
                      <p className="text-sm text-muted-foreground">Share your unique referral link with friends or on social media.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">2</div>
                      <p className="text-sm text-muted-foreground">Friends sign up and start completing tasks in the Reward Gallery.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">3</div>
                      <p className="text-sm text-muted-foreground">You automatically receive a 10% lifetime commission on their earnings.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  );
}
