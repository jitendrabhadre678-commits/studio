'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Trophy, Medal, Globe, Zap, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

const FIRST_NAMES = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Lucas", "Mia", "Benjamin", "Charlotte", "Oliver", "Amelia", "Jacob", "Harper", "Michael", "Evelyn", "Daniel", "Abigail", "Henry", "Emily", "Sebastian", "Elizabeth", "Jack", "Sofia", "Samuel", "Avery", "David", "Ella"];
const LAST_INITIALS = ["W.", "B.", "M.", "T.", "C.", "S.", "G.", "H.", "K.", "L.", "P.", "R.", "V.", "Z."];
const COUNTRIES = ["USA", "UK", "Canada", "Australia", "New Zealand", "Germany", "France", "Spain", "Italy", "Netherlands", "Brazil", "Japan", "Norway", "Sweden", "Switzerland"];

export default function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const generateStaticUsers = () => {
      const generated = [];
      for (let i = 0; i < 100; i++) {
        const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
        const lastInitial = LAST_INITIALS[i % LAST_INITIALS.length];
        const country = COUNTRIES[i % COUNTRIES.length];
        
        let baseEarnings = 980 - (i * 8.5);
        let finalEarnings = Math.max(105, baseEarnings + (Math.random() * 15));

        const imageId = i + 10;
        const profileImageUrl = `https://picsum.photos/seed/${imageId}/100/100`;

        generated.push({
          id: String(i + 1),
          rank: i + 1,
          name: `${firstName} ${lastInitial}`,
          country,
          earnings: finalEarnings,
          photo: profileImageUrl
        });
      }
      return generated;
    };

    setUsers(generateStaticUsers());
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">Monthly Rankings</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              Top 100 <span className="text-primary">Earners</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Real players, real rewards. These top earners have successfully unlocked and claimed rewards this month.
            </p>
          </div>

          <div className="glass-card rounded-[2rem] border-white/10 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-12 p-6 bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10">
                <div className="col-span-2 text-center">Rank</div>
                <div className="col-span-6 pl-4">Player</div>
                <div className="col-span-4 text-right">Earnings</div>
              </div>

              <div className="divide-y divide-white/5">
                {users.map((user, idx) => (
                  <div key={user.id} className="grid grid-cols-12 items-center hover:bg-white/[0.04] transition-all">
                    <div className="col-span-2 text-center py-6">
                      {idx < 3 ? (
                        <div className="relative inline-block">
                           <Medal className={cn(
                             "w-10 h-10",
                             idx === 0 ? "text-yellow-500" : idx === 1 ? "text-slate-300" : "text-amber-600"
                           )} />
                           <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white mt-0.5">{idx + 1}</span>
                        </div>
                      ) : (
                        <span className="text-xl font-black text-white/20 italic">#{idx + 1}</span>
                      )}
                    </div>
                    
                    <div className="col-span-6 flex items-center gap-4 py-6 pl-4">
                      <Avatar className="h-12 w-12 border-2 border-white/5">
                        <AvatarImage src={user.photo} className="object-cover" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-lg truncate">{user.name}</p>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                           <Globe className="w-3 h-3" /> {user.country}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-4 text-right py-6 pr-8">
                      <span className="text-2xl font-black text-white tabular-nums">
                        ${user.earnings.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}