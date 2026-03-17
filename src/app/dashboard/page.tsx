'use client';

import { useEffect, useState } from 'react';
import { useUser, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { doc, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { 
  Trophy, 
  DollarSign, CheckCircle, Users, Sparkles, 
  History, Wallet, Share2, Copy, Check, MousePointer2, 
  ArrowRight, Clock
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
import { Label } from '@/components/ui/label';

export default function Dashboard() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

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

  const referralLink = user ? `${origin}/?ref=${user.uid}` : '';

  const handleCopyRef = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast({ title: "Copied!", description: "Share your link to earn commissions." });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatDate = (val: any) => {
    if (!val) return '...';
    const date = val.toDate ? val.toDate() : new Date(val);
    if (isNaN(date.getTime())) return '...';
    return date.toLocaleDateString();
  };

  if (isUserLoading || !user) return null;

  const balance = userData?.balance || 0;
  const totalEarnings = userData?.totalEarnings || 0;
  const offersCompleted = userData?.offersCompleted || 0;
  const referralsCount = userData?.referralsCount || 0;
  const referralEarnings = userData?.referralEarnings || 0;
  const referralClicks = referralData?.clicks || 0;

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-[1400px]">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div className="w-full text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
                <Trophy className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Player Center</span>
              </div>
              <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tight leading-none">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest text-primary">
                Level: {offersCompleted > 50 ? 'Gamer Legend' : offersCompleted > 10 ? 'Elite Pro' : 'Rookie'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <DailyBonus userRef={userRef} userData={userData} />
              <WithdrawalModal balance={balance} userRef={userRef} />
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12 md:h-14 rounded-2xl w-full md:w-auto overflow-x-auto scrollbar-hide">
              <TabsTrigger value="overview" className="rounded-xl px-6 md:px-8 font-black uppercase tracking-widest text-[9px] md:text-[10px] data-[state=active]:bg-primary transition-all flex-grow md:flex-none">Overview</TabsTrigger>
              <TabsTrigger value="rewards" className="rounded-xl px-6 md:px-8 font-black uppercase tracking-widest text-[9px] md:text-[10px] data-[state=active]:bg-primary transition-all flex-grow md:flex-none">Activity</TabsTrigger>
              <TabsTrigger value="referrals" className="rounded-xl px-6 md:px-8 font-black uppercase tracking-widest text-[9px] md:text-[10px] data-[state=active]:bg-primary transition-all flex-grow md:flex-none">Referrals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: 'Balance', val: `$${balance.toFixed(2)}`, icon: <Wallet className="text-primary" />, sub: 'Ready to Withdraw' },
                  { label: 'Earnings', val: `$${totalEarnings.toFixed(2)}`, icon: <DollarSign className="text-primary" />, sub: 'Lifetime Total' },
                  { label: 'Offers', val: offersCompleted, icon: <CheckCircle className="text-primary" />, sub: 'Verified Tasks' },
                  { label: 'Commission', val: `$${referralEarnings.toFixed(2)}`, icon: <Users className="text-primary" />, sub: `${referralsCount} active friends` },
                ].map((stat, i) => (
                  <Card key={i} className="glass-card border-white/5 bg-white/[0.02]">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex justify-between items-start mb-4 md:mb-6">
                        <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                          {stat.icon}
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{stat.label}</span>
                      </div>
                      <div className="text-3xl md:text-5xl font-black text-white mb-1 tabular-nums">
                        {isUserDataLoading ? '...' : stat.val}
                      </div>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{stat.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="glass-card rounded-[2rem] p-8 md:p-10 border-white/5">
                    <h3 className="text-xl md:text-2xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" /> Daily XP Goal
                    </h3>
                    <p className="text-muted-foreground mb-8 text-sm md:text-base">Complete more offers to unlock a bonus payout!</p>
                    <div className="space-y-3 mb-10">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-white/40">Task Progress</span>
                        <span className="text-primary">{offersCompleted % 5} / 5</span>
                      </div>
                      <Progress value={((offersCompleted % 5) / 5) * 100} className="h-3 bg-white/5 rounded-full" />
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-black h-14 rounded-2xl shadow-xl shadow-primary/20">
                      <Link href="/#trending">Find New Tasks <ArrowRight className="ml-2 w-5 h-5" /></Link>
                    </Button>
                  </div>

                  <div className="glass-card rounded-[2rem] p-8 md:p-10 border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <History className="w-5 h-5 text-primary" /> Recent Activity
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {transactions && transactions.length > 0 ? (
                        transactions.map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "p-2.5 rounded-xl shrink-0",
                                tx.type === 'withdrawal' ? "bg-red-500/10 border border-red-500/20" : "bg-green-500/10 border border-green-500/20"
                              )}>
                                {tx.type === 'offer' && <CheckCircle className="w-4 h-4 text-green-500" />}
                                {tx.type === 'withdrawal' && <Wallet className="w-4 h-4 text-red-500" />}
                                {(tx.type === 'referral' || tx.type === 'daily_bonus') && <Sparkles className="w-4 h-4 text-green-500" />}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[11px] md:text-sm font-black text-white uppercase tracking-widest truncate">
                                  {tx.type === 'offer' ? `${tx.rewardName || 'Offer'}` : tx.type.replace('_', ' ')}
                                </p>
                                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{formatDate(tx.createdAt)}</p>
                              </div>
                            </div>
                            <span className={cn(
                              "font-black text-sm md:text-lg tabular-nums shrink-0 ml-2",
                              tx.type === 'withdrawal' ? "text-red-500" : "text-green-500"
                            )}>
                              {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <Clock className="w-10 h-10 text-white/10 mx-auto mb-4" />
                          <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">No activity detected</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-card rounded-[2rem] p-8 md:p-10 border-white/5 bg-gradient-to-b from-primary/5 to-transparent">
                    <h3 className="text-lg md:text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                      <Share2 className="w-5 h-5 text-primary" /> Invite Friends
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-8 leading-relaxed">
                      Earn <span className="text-primary font-bold">10% Lifetime Commission</span> for every user you refer.
                    </p>
                    <div className="relative mb-6">
                      <div className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-[9px] md:text-[10px] font-mono text-white/40 truncate select-all">
                        {referralLink || 'Generating link...'}
                      </div>
                      <button 
                        onClick={handleCopyRef}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-primary text-white/40 transition-colors"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button onClick={handleCopyRef} className="w-full bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl border border-white/10">
                      {isCopied ? "Link Copied!" : "Copy Link"}
                    </Button>
                  </div>

                  <div className="glass-card rounded-[2rem] p-8 md:p-10 border-white/5 bg-white/[0.01]">
                    <h3 className="text-lg md:text-xl font-black text-white mb-6 uppercase tracking-tight">Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Account</span>
                        <span className="text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Verified
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Withdrawals</span>
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="animate-in fade-in duration-500">
               <div className="glass-card rounded-[2rem] p-12 text-center border-white/5 min-h-[400px] flex flex-col items-center justify-center bg-white/[0.01]">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                    <History className="w-10 h-10 text-primary opacity-40" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">History Log</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-10 text-sm">Your detailed activity logs are being updated in real-time.</p>
                  <Button variant="outline" onClick={() => router.refresh()} className="border-white/10 hover:bg-white/5 text-white font-black h-12 rounded-xl px-10 uppercase tracking-widest text-[10px]">Refresh Logs</Button>
               </div>
            </TabsContent>

            <TabsContent value="referrals" className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { label: 'Link Clicks', val: referralClicks, icon: <MousePointer2 className="text-primary" />, sub: 'Unique Visits' },
                  { label: 'Friends Joined', val: referralsCount, icon: <Users className="text-primary" />, sub: 'Signups' },
                  { label: 'Earned', val: `$${referralEarnings.toFixed(2)}`, icon: <DollarSign className="text-primary" />, sub: 'Lifetime Pay' },
                ].map((stat, i) => (
                  <Card key={i} className="glass-card border-white/5 bg-white/[0.02]">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                          {stat.icon}
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">{stat.label}</span>
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-white mb-1 tabular-nums">
                        {isReferralLoading ? '...' : stat.val}
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{stat.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/5 text-center">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-8 uppercase tracking-tight">Your Referral Toolbox</h3>
                <div className="max-w-2xl mx-auto space-y-8">
                  <div>
                    <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4 block">Personal Invite Link</Label>
                    <div className="p-6 md:p-10 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-6">
                      <div className="text-[10px] md:text-xs font-mono text-white/60 break-all select-all leading-relaxed bg-white/5 p-4 rounded-xl">
                        {referralLink || 'Generating link...'}
                      </div>
                      <Button onClick={handleCopyRef} className="w-full bg-primary hover:bg-primary/90 text-white font-black h-14 md:h-16 rounded-2xl uppercase tracking-widest shadow-xl transition-all">
                        {isCopied ? <><Check className="mr-3 w-5 h-5" /> Copied</> : <><Copy className="mr-3 w-5 h-5" /> Copy Invite Link</>}
                      </Button>
                    </div>
                  </div>
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
