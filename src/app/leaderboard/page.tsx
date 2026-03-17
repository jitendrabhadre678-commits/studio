'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Trophy, Medal, Globe, Zap, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Static data generation for visual showcase
const NAMES = ["Emma Walker", "Daniel Brooks", "Sophia Martinez", "Liam Thompson", "Olivia Carter", "Lucas Bennett", "Mia Anderson", "James Turner", "Noah Williams", "Ava Smith", "Isabella Garcia", "William Brown", "Sophia Miller", "James Davis", "Oliver Jones", "Charlotte Wilson", "Benjamin Moore", "Amelia Taylor", "Lucas Anderson", "Mia Thomas"];
const COUNTRIES = ["USA", "UK", "Canada", "Australia", "New Zealand", "France", "Italy", "Germany", "Spain", "Netherlands"];

const generateStaticUsers = () => {
  const users = [];
  // Top 3 Specifics
  users.push({ id: '1', name: 'Emma Walker', country: 'UK', earnings: 48.50 });
  users.push({ id: '2', name: 'Daniel Brooks', country: 'Canada', earnings: 45.20 });
  users.push({ id: '3', name: 'Sophia Martinez', country: 'USA', earnings: 42.80 });

  // Generate 97 more
  for (let i = 4; i <= 100; i++) {
    const name = NAMES[i % NAMES.length] + " " + String.fromCharCode(65 + (i % 26)) + ".";
    const country = COUNTRIES[i % COUNTRIES.length];
    // Scale earnings realistically from ~40 down to ~3
    let earningsNum = (40 - (i * 0.35) + Math.random() * 2);
    if (earningsNum < 3) {
      earningsNum = 2 + Math.random() * 2;
    }
    
    users.push({
      id: String(i),
      name,
      country,
      earnings: earningsNum
    });
  }
  return users;
};

const staticUsers = generateStaticUsers();

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">Monthly Elite Rankings</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              Top 100 <span className="text-primary text-glow">Earners</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See the most active reward earners this month. These players are cashing out gift cards and rewards daily.
            </p>
          </div>

          <div className="glass-card rounded-[3rem] border-white/10 overflow-hidden shadow-2xl animate-fade-in-up [animation-delay:200ms]">
            <div className="grid grid-cols-12 p-6 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 border-b border-white/10">
              <div className="col-span-2 text-center">Rank</div>
              <div className="col-span-6">Player</div>
              <div className="col-span-4 text-right">Total Earnings</div>
            </div>

            <div className="divide-y divide-white/5">
              {staticUsers.map((user, idx) => (
                <div key={user.id} className={cn(
                  "grid grid-cols-12 p-6 md:p-8 items-center transition-all hover:bg-white/[0.03] group",
                  idx === 0 && "bg-yellow-500/5",
                  idx === 1 && "bg-slate-400/5",
                  idx === 2 && "bg-amber-700/5"
                )}>
                  <div className="col-span-2 text-center relative">
                    {idx < 3 ? (
                      <div className="relative inline-block scale-110 md:scale-125">
                         <Medal className={cn(
                           "w-10 h-10",
                           idx === 0 ? "text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]" : 
                           idx === 1 ? "text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.4)]" : 
                           "text-amber-600 drop-shadow-[0_0_10px_rgba(180,83,9,0.4)]"
                         )} />
                         <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white mt-0.5">{idx + 1}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-black text-white/20 italic group-hover:text-white/40 transition-colors">#{idx + 1}</span>
                    )}
                  </div>
                  
                  <div className="col-span-6 flex items-center gap-4">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-white/10 group-hover:border-primary transition-all">
                      <AvatarFallback className="bg-white/5 text-white/40 font-black">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className={cn(
                        "font-bold text-white text-base md:text-lg flex items-center gap-2 truncate",
                        idx === 0 && "text-yellow-500"
                      )}>
                        {user.name}
                        {idx === 0 && <Zap className="w-3.5 h-3.5 fill-yellow-500 shrink-0" />}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                         <Globe className="w-3 h-3" /> {user.country}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-4 text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className="text-xl md:text-2xl font-black text-white tabular-nums">${Number(user.earnings).toFixed(2)}</span>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest flex items-center gap-1",
                        idx < 10 ? "text-green-500" : "text-primary"
                      )}>
                        <ArrowUp className="w-3 h-3" /> {idx < 5 ? "Dominating" : "Trending"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 bg-black/40 text-center border-t border-white/10">
              <p className="text-sm text-muted-foreground italic mb-6">Want to see your name here? Start completing rewards today.</p>
              <button 
                onClick={() => window.location.href = '/#trending'}
                className="bg-primary hover:bg-primary/90 text-white font-black px-8 py-3 rounded-xl uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl shadow-primary/20"
              >
                Earn Rewards Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
