'use client';

import { useEffect } from 'react';
import { useUser, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { doc, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { 
  Trophy, 
  DollarSign, CheckCircle, Wallet, 
  History, Clock, Zap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WithdrawalModal } from '@/components/dashboard/WithdrawalModal';
import { DailyBonus } from '@/components/dashboard/DailyBonus';
import { cn } from '@/lib/utils';

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

  const { data: userData } = useDoc(userRef);

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
  }, [firestore, user]);

  const { data: transactions } = useCollection(transactionsQuery);

  const formatDate = (val: any) => {
    if (!val) return '...';
    const date = val.toDate ? val.toDate() : new Date(val);
    return isNaN(date.getTime()) ? '...' : date.toLocaleDateString();
  };

  if (isUserLoading || !user) return null;

  const balance = userData?.balance || 0;
  const totalEarnings = userData?.totalEarnings || 0;
  const offersCompleted = userData?.offersCompleted || 0;

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 md:pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
                <Trophy className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">PLAYER CENTER</span>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
                Dashboard
              </h1>
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mt-2">
                {user.email}
              </p>
            </div>
            
            <div className="flex gap-3">
              <DailyBonus userRef={userRef} userData={userData} />
              <WithdrawalModal balance={balance} userRef={userRef} walletAddress={userData?.walletAddress} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card border-white/5 bg-white/[0.02]">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 rounded-xl border border-primary/20"><Wallet className="text-primary w-5 h-5" /></div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">Balance</span>
                </div>
                <div className="text-4xl font-black text-white tabular-nums">${balance.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 bg-white/[0.02]">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 rounded-xl border border-primary/20"><DollarSign className="text-primary w-5 h-5" /></div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">Total Earned</span>
                </div>
                <div className="text-4xl font-black text-white tabular-nums">${totalEarnings.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 bg-white/[0.02]">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 rounded-xl border border-primary/20"><CheckCircle className="text-primary w-5 h-5" /></div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">Offers</span>
                </div>
                <div className="text-4xl font-black text-white tabular-nums">{offersCompleted}</div>
              </CardContent>
            </Card>
          </div>

          <div className="glass-card rounded-[2rem] p-8 md:p-10 border-white/5">
            <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tight flex items-center gap-3">
              <History className="w-5 h-5 text-primary" /> Activity History
            </h3>
            <div className="space-y-3">
              {transactions && transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-2.5 rounded-xl", tx.type === 'withdrawal' ? "bg-red-500/10" : "bg-green-500/10")}>
                        {tx.type === 'withdrawal' ? <Wallet className="w-4 h-4 text-red-500" /> : <Zap className="w-4 h-4 text-green-500" />}
                      </div>
                      <div>
                        <p className="text-xs font-black text-white uppercase tracking-widest">
                          {tx.type.replace('_', ' ')}
                        </p>
                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{formatDate(tx.createdAt)}</p>
                      </div>
                    </div>
                    <span className={cn("font-black tabular-nums", tx.type === 'withdrawal' ? "text-red-500" : "text-green-500")}>
                      {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-10 h-10 text-white/10 mx-auto mb-4" />
                  <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">No activity recorded</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
