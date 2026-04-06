'use client';

import { useEffect, useState } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  Wallet, 
  Loader2,
  Home,
  ShieldCheck,
  Users,
  Zap
} from 'lucide-react';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { TaskHistory } from '@/components/dashboard/TaskHistory';

export default function Dashboard() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData } = useDoc(userRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const balance = userData?.availableBalance || 0;
  const referralEarnings = userData?.referralEarnings || 0;
  const username = userData?.username || user.email?.split('@')[0] || 'Player';
  const MIN_WITHDRAWAL = 5;

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home, href: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'refer', label: 'Refer & Earn', icon: Users, href: '/refer' },
    { id: 'profile', label: 'Profile', icon: User, href: '/account-settings' },
  ];

  const handleWithdraw = () => {
    if (balance < MIN_WITHDRAWAL) return;
    
    toast({
      title: "Success!",
      description: "Withdrawal request submitted successfully 💸",
      className: "bg-green-600 text-white border-none font-bold shadow-[0_0_30px_rgba(22,163,74,0.4)]",
    });
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-[#0a0a0a] border-r border-white/5 transition-transform duration-300 lg:translate-x-0 lg:static",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="mb-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter">GameFlash<span className="text-primary">X</span></span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 group",
                  activeTab === item.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "text-white/40 group-hover:text-white")} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-black text-primary uppercase">
                {username.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black truncate">@{username}</p>
                <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                  <div className="w-1 h-1 rounded-full bg-green-500" />
                  <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-in fade-in duration-700">
            <div className="w-full">
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">
                Welcome, <span className="text-primary">{username}</span>
              </h1>
              <p className="text-white/60 font-bold uppercase tracking-widest text-sm mb-4">
                Monitor your progress and manage your earnings.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                Your account is active and secure
                <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[8px] font-black text-green-500 tracking-widest">Verified</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="glass-card bg-[#0a0a0a] border-primary/20 p-6 px-8 rounded-3xl flex items-center justify-between gap-12 shadow-2xl relative min-w-[280px]">
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Available Balance</p>
                  <p className="text-4xl font-black text-white tabular-nums">${balance.toFixed(2)}</p>
                  <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">Ref. Earnings: ${referralEarnings.toFixed(2)}</p>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button 
                    onClick={handleWithdraw}
                    disabled={balance < MIN_WITHDRAWAL}
                    className={cn(
                      "h-12 px-8 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95",
                      balance >= MIN_WITHDRAWAL 
                        ? "bg-primary hover:bg-primary/90 text-white shadow-primary/40 animate-pulse" 
                        : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
                    )}
                  >
                    <Wallet className="w-4 h-4 mr-2" /> Withdraw
                  </Button>
                  {balance < MIN_WITHDRAWAL && (
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                      Min. $5.00
                    </span>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Activity Section */}
          <section id="history" className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1.5 bg-primary rounded-full" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Recent Activity</h2>
            </div>
            {firestore && user && <TaskHistory userId={user.uid} firestore={firestore} />}
          </section>

          {/* Tips Section */}
          <div className="p-8 md:p-12 glass-card rounded-[3rem] border-white/5 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck className="w-48 h-48 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Earning Tips</h3>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Invite your friends to the platform using your unique referral link to boost your daily earnings. You earn a bonus for every active user you bring to the community!
            </p>
            <Button asChild className="mt-8 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-8 h-12 uppercase font-black text-xs tracking-widest">
              <Link href="/refer">Go to Refer & Earn</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
