
'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Trophy, Medal, User, Globe, Zap, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function LeaderboardPage() {
  const firestore = useFirestore();

  const topUsersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'users'),
      orderBy('totalEarnings', 'desc'),
      limit(20)
    );
  }, [firestore]);

  const { data: topUsers, isLoading } = useCollection(topUsersQuery);

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">Global Rankings</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              Elite <span className="text-primary text-glow">Players</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Meet the top earners on GameFlashX. These players have unlocked the most rewards through dedication and activity.
            </p>
          </div>

          <div className="glass-card rounded-[3rem] border-white/10 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-12 p-6 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 border-b border-white/10">
              <div className="col-span-2 text-center">Rank</div>
              <div className="col-span-6">Player</div>
              <div className="col-span-4 text-right">Total Earnings</div>
            </div>

            <div className="divide-y divide-white/5">
              {isLoading ? (
                Array(10).fill(0).map((_, i) => (
                  <div key={i} className="grid grid-cols-12 p-8 animate-pulse">
                    <div className="col-span-2 bg-white/5 h-8 rounded-lg mx-auto w-10" />
                    <div className="col-span-6 flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-white/5" />
                      <div className="h-6 bg-white/5 rounded w-32" />
                    </div>
                    <div className="col-span-4 bg-white/5 h-8 rounded-lg ml-auto w-24" />
                  </div>
                ))
              ) : (
                topUsers?.map((user, idx) => (
                  <div key={user.id} className={cn(
                    "grid grid-cols-12 p-8 items-center transition-all hover:bg-white/[0.02] group",
                    idx === 0 && "bg-primary/5"
                  )}>
                    <div className="col-span-2 text-center relative">
                      {idx < 3 ? (
                        <div className="relative inline-block">
                           <Medal className={cn(
                             "w-10 h-10",
                             idx === 0 ? "text-yellow-500" : idx === 1 ? "text-slate-400" : "text-amber-700"
                           )} />
                           <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white mt-0.5">{idx + 1}</span>
                        </div>
                      ) : (
                        <span className="text-xl font-black text-white/20 italic">#{idx + 1}</span>
                      )}
                    </div>
                    
                    <div className="col-span-6 flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white/10 group-hover:border-primary transition-all">
                        <AvatarImage src={user.photoURL} />
                        <AvatarFallback className="bg-white/5 text-white/40 font-black">
                          {(user.displayName || user.email || '?').charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-white text-lg flex items-center gap-2">
                          {user.displayName || user.email?.split('@')[0] || 'Unknown Player'}
                          {idx === 0 && <Zap className="w-3.5 h-3.5 text-primary fill-primary" />}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                           <Globe className="w-3 h-3" /> Global Player
                        </p>
                      </div>
                    </div>

                    <div className="col-span-4 text-right">
                      <div className="inline-flex flex-col items-end">
                        <span className="text-2xl font-black text-white tabular-nums">${(user.totalEarnings || 0).toFixed(2)}</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                          <ArrowUp className="w-3 h-3" /> Trending
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-black/40 text-center border-t border-white/10">
              <p className="text-sm text-muted-foreground italic">Rankings update in real-time as offers are completed.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
