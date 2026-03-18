'use client';

import { useEffect, useState } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Gift, 
  History, 
  User, 
  Wallet, 
  Trophy, 
  CheckCircle,
  Menu,
  X,
  ChevronRight,
  Zap
} from 'lucide-react';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { giftCards } from '@/lib/gift-cards';
import Link from 'next/link';

export default function Dashboard() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

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

  if (isUserLoading || !user) return null;

  const balance = userData?.balance || 0;
  const totalEarnings = userData?.totalEarnings || 0;
  const offersCompleted = userData?.offersCompleted || 0;

  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'rewards', label: 'Rewards', icon: Gift, href: '#rewards' },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User, href: '/account-settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#000000] text-white">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary rounded-lg text-white"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Navigation */}
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
                href={item.href || '#'}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'home') setIsSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all",
                  activeTab === item.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-black text-primary">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black truncate">{userData?.username || user.email?.split('@')[0]}</p>
                <p className="text-[10px] text-white/40 font-bold uppercase">Player Level 1</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">
              Dashboard <span className="text-primary">Overview</span>
            </h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
              Welcome back, your session is secure and encrypted.
            </p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Available Balance', value: `$${balance.toFixed(2)}`, icon: Wallet, color: 'text-primary' },
              { label: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, icon: Trophy, color: 'text-yellow-500' },
              { label: 'Tasks Completed', value: offersCompleted, icon: CheckCircle, color: 'text-green-500' },
            ].map((stat, i) => (
              <Card key={i} className="glass-card border-white/5 bg-[#0a0a0a] shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-3 rounded-2xl bg-white/5 border border-white/10", stat.color)}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div className="text-4xl font-black text-white tabular-nums">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Available Tasks Section */}
          <section id="rewards" className="scroll-mt-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <Gift className="text-primary w-6 h-6" /> Available Tasks
              </h2>
              <Link href="/#trending" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All Gallery</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {giftCards.slice(0, 6).map((card) => (
                <Card key={card.id} className="glass-card border-white/5 bg-[#0a0a0a] hover:border-primary/20 transition-all group overflow-hidden">
                  <div 
                    className="h-24 w-full flex items-center justify-center p-4 relative"
                    style={{ background: card.gradient }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="relative z-10 font-black text-white uppercase tracking-tighter text-lg">{card.brand}</span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{card.category}</p>
                        <h3 className="font-bold text-white uppercase tracking-tight">{card.brand} Reward</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] text-white/40 font-bold uppercase">Up to</p>
                        <p className="text-sm font-black text-white">{card.values[card.values.length-1]}</p>
                      </div>
                    </div>
                    <Button asChild className="w-full h-12 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-xl">
                      <Link href={`/${card.slug}`}>
                        Unlock <ChevronRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
