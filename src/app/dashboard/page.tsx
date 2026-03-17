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
  History, Wallet, Share2, Copy, Check, MousePointer2, 
  UserPlus
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

  // Get dynamic origin for referral links
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
    toast({ title: "Referral Link Copied!", description: "Share this with friends to earn rewards for their activity." });
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
      
      <div className="pt-32 pb-20 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
                <Trophy className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Player Center</span>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tight leading-none">
                Player <span className="text-primary text-glow-pomegranate">Dashboard</span>
              </h1>
              <p className="text-muted-foreground font-medium flex items-center gap-2">
                Level: <span className="text-primary font-black uppercase tracking-widest">{offersCompleted > 50 ? 'Gamer Legend' : offersCompleted > 10 ? 'Elite Pro' : 'Rookie'}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <DailyBonus userRef={userRef} userData={userData} />
              <WithdrawalModal balance={balance} userRef={userRef} />
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-10">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-14 rounded-2xl w-full md:w-auto overflow-x-auto overflow-y-hidden">
              <TabsTrigger value="overview" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary transition-all flex-grow md:flex-none h-full">Overview</TabsTrigger>
              <TabsTrigger value="rewards" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary transition-all flex-grow md:flex-none h-full">History</TabsTrigger>
              <TabsTrigger value="referrals" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary transition-all flex-grow md:flex-none h-full">Referrals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-10 animate-in fade-in duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Current Balance', val: `$${balance.toFixed(2)}`, icon: <Wallet className="text-primary" />, sub: 'Ready to Withdraw' },
                  { label: 'Total Earnings', val: `$${totalEarnings.toFixed(2)}`, icon: <DollarSign className="text-primary" />, sub: 'Lifetime Credits' },
                  { label: 'Offers Done', val: offersCompleted, icon: <CheckCircle className="text-primary" />, sub: 'Verified Tasks' },
                  { label: 'Referral Credits', val: `$${referralEarnings.toFixed(2)}`, icon: <Users className="text-primary" />, sub: `${referralsCount} active friends` },
                ].map((stat, i) => (
                  <Card key={i} className="glass-card border-white/5 hover:border-primary/20 bg-white/[0.02]">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                          {stat.icon}
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{stat.label}</span>
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-white mb-1 tabular-nums">
                        {isUserDataLoading ? '...' : stat.val}
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{stat.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                  <div className="glass-card rounded-[2.5rem] p-10 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-primary fill-primary/20" /> Daily XP Goal
                      </h3>
                      <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">Complete 5 more reward offers today to unlock a bonus <span className="text-primary font-black">$0.50</span> payout!</p>
                      <div className="space-y-3 mb-10">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                          <span className="text-white/40">Task Progress</span>
                          <span className="text-primary">{offersCompleted % 5} / 5</span>
                        </div>
                        <Progress value={((offersCompleted % 5) / 5) * 100} className="h-3 bg-white/5 rounded-full overflow-hidden" />
                      </div>
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-black h-14 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
                      <Link href="/#trending">Find New Tasks <ArrowRight className="ml-2 w-5 h-5" /></Link>
                    </Button>
                  </div>

                  {/* Recent Activity */}
                  <div className="glass-card rounded-[2.5rem] p-10 border-white/5 bg-white/[0.01]">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <History className="w-6 h-6 text-primary" /> Activity Log
                      </h3>
                      <button onClick={() => router.push('/my-rewards')} className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest border-b-2 border-primary/20 pb-1 transition-all">My Vault</button>
                    </div>
                    
                    <div className="space-y-4">
                      {transactions && transactions.length > 0 ? (
                        transactions.map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-center gap-5">
                              <div className={cn(
                                "p-3 rounded-xl shadow-lg shrink-0",
                                tx.type === 'withdrawal' ? "bg-red-500/10 border border-red-500/20" : "bg-green-500/10 border border-green-500/20"
                              )}>
                                {tx.type === 'offer' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                {tx.type === 'referral' && <Users className="w-5 h-5 text-green-500" />}
                                {tx.type === 'daily_bonus' && <Sparkles className="w-5 h-5 text-green-500" />}
                                {tx.type === 'withdrawal' && <Wallet className="w-5 h-5 text-red-500" />}
                                {tx.type === 'spin' && <Sparkles className="w-5 h-5 text-yellow-500" />}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-black text-white uppercase tracking-widest truncate">
                                  {tx.type === 'offer' ? `${tx.rewardName || 'Platform Reward'}` : tx.type.replace('_', ' ')}
                                </p>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{formatDate(tx.createdAt)}</p>
                              </div>
                            </div>
                            <span className={cn(
                              "font-black text-lg tabular-nums shrink-0",
                              tx.type === 'withdrawal' ? "text-red-500" : "text-green-500"
                            )}>
                              {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-16 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                          <Clock className="w-12 h-12 text-white/10 mx-auto mb-4" />
                          <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No recent activity detected</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="glass-card rounded-[2.5rem] p-10 border-white/5 bg-gradient-to-b from-primary/5 to-transparent">
                    <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                      <Share2 className="w-5 h-5 text-primary" /> Invite Squad
                    </h3>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-medium">
                      Earn <span className="text-primary font-bold">10% Lifetime Commission</span> for every friend you bring to the platform.
                    </p>
                    <div className="relative mb-6">
                      <div className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-[10px] font-mono text-white/40 truncate select-all">
                        {referralLink || 'Generating unique link...'}
                      </div>
                      <button 
                        onClick={handleCopyRef}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:text-primary text-white/40 transition-colors"
                        aria-label="Copy Referral Link"
                      >
                        {isCopied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <Button onClick={handleCopyRef} className="w-full bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px] h-14 rounded-xl border border-white/10 transition-all">
                      {isCopied ? "Link Copied!" : "Copy Invite Link"}
                    </Button>
                  </div>

                  <div className="glass-card rounded-[2.5rem] p-10 border-white/5 bg-white/[0.01]">
                    <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                      <LayoutDashboard className="w-5 h-5 text-primary" /> Active Status
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Account Status</span>
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Verified
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Payout Portal</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="animate-in fade-in duration-500">
               <div className="glass-card rounded-[2.5rem] p-16 text-center border-white/5 min-h-[500px] flex flex-col items-center justify-center bg-white/[0.01]">
                  <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center mb-10 border border-primary/20">
                    <History className="w-12 h-12 text-primary opacity-40" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight leading-none">Complete <span className="text-primary">Ledger</span></h2>
                  <p className="text-muted-foreground max-w-md mx-auto font-medium mb-10 leading-relaxed text-sm md:text-base">Your detailed, multi-month transaction reporting is currently being indexed for secure viewing.</p>
                  <Button variant="outline" onClick={() => router.push('/dashboard')} className="border-white/10 hover:bg-white/5 text-white font-black h-14 rounded-2xl px-10 uppercase tracking-widest text-[10px]">Refresh Logs</Button>
               </div>
            </TabsContent>

            <TabsContent value="referrals" className="space-y-10 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Referral Clicks', val: referralClicks, icon: <MousePointer2 className="text-primary" />, sub: 'Unique Visitors' },
                  { label: 'Friends Joined', val: referralsCount, icon: <Users className="text-primary" />, sub: 'Registrations' },
                  { label: 'Commission Earned', val: `$${referralEarnings.toFixed(2)}`, icon: <DollarSign className="text-primary" />, sub: 'Lifetime Pay' },
                ].map((stat, i) => (
                  <Card key={i} className="glass-card border-white/5 bg-white/[0.02]">
                    <CardContent className="p-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                          {stat.icon}
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">{stat.label}</span>
                      </div>
                      <div className="text-5xl font-black text-white mb-1 tabular-nums">
                        {isReferralLoading || isUserDataLoading ? '...' : stat.val}
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{stat.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="glass-card rounded-[2.5rem] p-10 border-white/5 bg-gradient-to-br from-primary/5 to-transparent">
                  <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tight leading-none">Referral <span className="text-primary">Toolbox</span></h3>
                  <div className="space-y-10">
                    <div>
                      <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4 block">Personal Invite Link</Label>
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-6">
                        <div className="text-[11px] font-mono text-white/60 break-all select-all leading-relaxed">
                          {referralLink || 'Generating your unique link...'}
                        </div>
                        <Button onClick={handleCopyRef} className="w-full bg-primary hover:bg-primary/90 text-white font-black h-16 rounded-2xl uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
                          {isCopied ? <><Check className="mr-3 w-5 h-5" /> Copied</> : <><Copy className="mr-3 w-5 h-5" /> Copy Invite Link</>}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="glass-card rounded-[2.5rem] p-10 border-white/5 bg-white/[0.01] flex flex-col justify-center">
                  <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">How it <span className="text-primary">Works</span></h3>
                  <ul className="space-y-6">
                    <li className="flex gap-5 items-start">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-sm font-black text-primary border border-primary/20">1</div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">Share your unique invite link via social media or direct message.</p>
                    </li>
                    <li className="flex gap-5 items-start">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-sm font-black text-primary border border-primary/20">2</div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">Friends join and start completing verified reward tasks.</p>
                    </li>
                    <li className="flex gap-5 items-start">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-sm font-black text-primary border border-primary/20">3</div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">You earn a <span className="text-primary font-black">10% lifetime payout</span> on all of their gift card earnings.</p>
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
