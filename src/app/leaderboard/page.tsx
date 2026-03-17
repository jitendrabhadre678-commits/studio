
'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Trophy, Medal, Globe, Zap, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Realistic list of names and countries for 100 users
const FIRST_NAMES = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Lucas", "Mia", "Benjamin", "Charlotte", "Oliver", "Amelia", "Jacob", "Harper", "Michael", "Evelyn", "Daniel", "Abigail", "Henry", "Emily", "Sebastian", "Elizabeth", "Jack", "Sofia", "Samuel", "Avery", "David", "Ella"];
const LAST_INITIALS = ["W.", "B.", "M.", "T.", "C.", "S.", "G.", "H.", "K.", "L.", "P.", "R.", "V.", "Z."];
const COUNTRIES = ["USA", "UK", "Canada", "Australia", "New Zealand", "Germany", "France", "Spain", "Italy", "Netherlands", "Brazil", "Japan", "Norway", "Sweden", "Switzerland"];

const generateStaticUsers = () => {
  const users = [];
  
  // High-value earnings generation: $100 to $1000
  // Top earner starts near 1000, and it curves down to 100
  for (let i = 0; i < 100; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastInitial = LAST_INITIALS[i % LAST_INITIALS.length];
    const country = COUNTRIES[i % COUNTRIES.length];
    
    // Calculate a realistic descending earning value
    // We use a slight curve so the top ranks have bigger gaps
    let baseEarnings = 980 - (i * 8.5);
    let variation = Math.random() * 15;
    let finalEarnings = Math.max(105, baseEarnings + variation);

    // Profile Image Logic: Use Picsum seeds for variety
    // We alternate between different "looks" based on index
    // Seeds 1-100 provide consistent but different images
    const imageId = i + 10;
    const profileImageUrl = `https://picsum.photos/seed/${imageId}/100/100`;

    users.push({
      id: String(i + 1),
      rank: i + 1,
      name: `${firstName} ${lastInitial}`,
      country,
      earnings: finalEarnings,
      photo: profileImageUrl
    });
  }
  return users;
};

const staticUsers = generateStaticUsers();

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">Monthly Elite Rankings</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              Top 100 <span className="text-primary text-glow-pomegranate">Earners</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Real players, real rewards. These top earners have successfully unlocked and claimed high-value gift cards this month.
            </p>
          </div>

          {/* Leaderboard Table */}
          <div className="glass-card rounded-[3rem] border-white/10 overflow-hidden shadow-2xl animate-fade-in-up [animation-delay:200ms]">
            {/* Table Header */}
            <div className="grid grid-cols-12 p-6 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 border-b border-white/10">
              <div className="col-span-2 text-center">Rank</div>
              <div className="col-span-6">Player Identity</div>
              <div className="col-span-4 text-right">Total Rewards</div>
            </div>

            {/* User List */}
            <div className="divide-y divide-white/5">
              {staticUsers.map((user, idx) => (
                <div 
                  key={user.id} 
                  className={cn(
                    "grid grid-cols-12 p-6 md:p-8 items-center transition-all duration-500 hover:bg-white/[0.04] group cursor-default",
                    idx === 0 && "bg-yellow-500/[0.03]",
                    idx === 1 && "bg-slate-400/[0.03]",
                    idx === 2 && "bg-amber-700/[0.03]"
                  )}
                >
                  {/* Rank Display */}
                  <div className="col-span-2 text-center relative">
                    {idx < 3 ? (
                      <div className="relative inline-block transition-transform duration-500 group-hover:scale-110">
                         <Medal className={cn(
                           "w-10 h-10 md:w-12 md:h-12",
                           idx === 0 ? "text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" : 
                           idx === 1 ? "text-slate-300 drop-shadow-[0_0_15px_rgba(203,213,225,0.5)]" : 
                           "text-amber-600 drop-shadow-[0_0_15px_rgba(180,83,9,0.5)]"
                         )} />
                         <span className="absolute inset-0 flex items-center justify-center text-[10px] md:text-xs font-black text-white mt-0.5">{idx + 1}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-black text-white/20 italic group-hover:text-white/50 transition-colors">#{idx + 1}</span>
                    )}
                  </div>
                  
                  {/* Profile Info */}
                  <div className="col-span-6 flex items-center gap-4 md:gap-6">
                    <div className="relative">
                      <div className={cn(
                        "absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500",
                        idx === 0 ? "bg-yellow-500" : "bg-primary"
                      )} />
                      <Avatar className={cn(
                        "h-12 w-12 md:h-14 md:w-14 border-2 transition-all duration-500 group-hover:scale-105",
                        idx < 3 ? "border-white/20" : "border-white/5 group-hover:border-primary/50"
                      )}>
                        <AvatarImage src={user.photo} className="object-cover" />
                        <AvatarFallback className="bg-white/5 text-white/40 font-black">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="min-w-0">
                      <p className={cn(
                        "font-bold text-white text-base md:text-xl flex items-center gap-2 truncate",
                        idx === 0 && "text-yellow-500"
                      )}>
                        {user.name}
                        {idx === 0 && <Zap className="w-4 h-4 fill-yellow-500 shrink-0" />}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1.5">
                           <Globe className="w-3 h-3" /> {user.country}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/10" />
                        <span className="text-[9px] text-green-500 font-black uppercase tracking-widest">Verified User</span>
                      </div>
                    </div>
                  </div>

                  {/* Earning Display */}
                  <div className="col-span-4 text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className="text-2xl md:text-3xl font-black text-white tabular-nums tracking-tighter">
                        ${user.earnings.toFixed(2)}
                      </span>
                      <span className={cn(
                        "text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-1",
                        idx < 5 ? "text-green-500" : "text-primary"
                      )}>
                        <ArrowUp className="w-3 h-3" /> {idx < 10 ? "Power Earner" : "Climbing"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer / CTA */}
            <div className="p-12 bg-black/40 text-center border-t border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <p className="text-base text-muted-foreground italic mb-8 relative z-10">
                Ready to see your name on the list? Every reward unlock puts you one step closer to the top.
              </p>
              <button 
                onClick={() => window.location.href = '/#trending'}
                className="relative z-10 bg-primary hover:bg-primary/90 text-white font-black px-12 py-4 rounded-2xl uppercase tracking-widest text-sm transition-all active:scale-95 shadow-2xl shadow-primary/30"
              >
                Start Earning Rewards
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
