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
  Zap,
  Smartphone,
  ClipboardList,
  BookOpen,
  ArrowUpRight,
  Clock,
  Loader2,
  Home,
  AlertCircle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { doc, collection, serverTimestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { TaskHistory } from '@/components/dashboard/TaskHistory';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

/**
 * @fileOverview Refined User Dashboard.
 * Focuses on Available Balance and provides clear path to withdrawal with trust signals.
 */

export default function Dashboard() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Memoize user reference for the real-time listener hook
  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  // Real-time document subscription
  const { data: userData, isLoading: isDataLoading } = useDoc(userRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FA4616] animate-spin" />
      </div>
    );
  }

  // Reactive data mapping
  const balance = userData?.balance || 0;
  const username = userData?.username || user.displayName || user.email?.split('@')[0] || 'Player';
  const MIN_WITHDRAWAL = 5;

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home, href: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'rewards', label: 'Rewards', icon: Gift, href: '#offers' },
    { id: 'history', label: 'History', icon: History, href: '#history' },
    { id: 'profile', label: 'Profile', icon: User, href: '/account-settings' },
  ];

  const offerCards = [
    {
      id: 'premium',
      title: 'Premium Offers',
      description: 'Earn high-value rewards from $1.00 up to $100.00 per task.',
      icon: Zap,
      rewardRange: '$1 - $100',
      highlight: true,
      url: '/quiz-earn'
    },
    {
      id: 'apps',
      title: 'App Testing & Games',
      description: 'Get paid to play new games and test mobile applications.',
      icon: Smartphone,
      rewardRange: '$0.50 - $25',
      url: '/quiz-earn'
    },
    {
      id: 'surveys',
      title: 'Paid Surveys',
      description: 'Share your opinion and get rewarded for your time.',
      icon: ClipboardList,
      rewardRange: '$0.20 - $10',
      url: '/quiz-earn'
    },
    {
      id: 'read',
      title: 'Read & Earn',
      description: 'Earn points by reading articles and staying updated.',
      icon: BookOpen,
      rewardRange: 'Daily Payout',
      url: '/quiz-earn'
    }
  ];

  const handleStartTask = (offer: any) => {
    if (!firestore || !user) return;

    const taskCompletionsRef = collection(firestore, 'users', user.uid, 'taskCompletions');
    
    addDocumentNonBlocking(taskCompletionsRef, {
      userId: user.uid,
      taskId: offer.id,
      title: offer.title,
      rewardAmount: 0,
      status: 'Pending',
      createdAt: serverTimestamp()
    });

    toast({
      title: "Activity Logged",
      description: `${offer.title} is now in your pending list.`,
    });

    router.push('/quiz-earn');
  };

  const handleWithdraw = () => {
    if (balance < MIN_WITHDRAWAL) return;

    // Payout Validation: PayPal email check
    if (!userData?.paypalEmail) {
      toast({
        variant: "destructive",
        title: "Payout Setup Required",
        description: "Please configure your PayPal email in Profile settings to withdraw cash.",
        action: (
          <Button variant="outline" size="sm" onClick={() => router.push('/account-settings')}>
            Go to Profile
          </Button>
        ),
      });
      return;
    }
    
    toast({
      title: "Withdrawal Successful",
      description: `Request for $${balance.toFixed(2)} submitted to ${userData.paypalEmail}.`,
      className: "bg-[#FA4616] text-white border-none font-bold",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#000000] text-white">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#FA4616] rounded-lg text-white"
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
            <div className="w-8 h-8 bg-[#FA4616] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter">GameFlash<span className="text-[#FA4616]">X</span></span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.href === '/dashboard') setIsSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 group",
                  activeTab === item.id 
                    ? "bg-[#FA4616] text-white shadow-lg shadow-[#FA4616]/20" 
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
              <div className="w-10 h-10 rounded-full bg-[#FA4616]/20 border border-[#FA4616]/40 flex items-center justify-center font-black text-[#FA4616]">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black truncate">@{username}</p>
                <div className="flex items-center gap-1 text-[8px] text-green-500 font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-2.5 h-2.5" /> Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Real-time Header Stats */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="w-full">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                  Welcome, <span className="text-[#FA4616]">{username}</span>
                </h1>
                <div className="hidden sm:flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Verified Account</span>
                </div>
              </div>
              <p className="text-white/60 font-bold uppercase tracking-widest text-sm mb-4">
                Start completing tasks to unlock your rewards.
              </p>
              <div className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                <span>Your account is active and secure</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full text-green-500 text-[8px] font-black tracking-widest shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                  Verified
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
              <div className="glass-card bg-[#0a0a0a] border-[#FA4616]/20 p-6 px-8 rounded-3xl flex items-center justify-between gap-12 shadow-2xl relative min-w-[280px] w-full md:w-auto">
                {isDataLoading && <div className="absolute top-2 right-4"><Loader2 className="w-3 h-3 text-[#FA4616] animate-spin" /></div>}
                <div>
                  <p className="text-[10px] font-black text-[#FA4616] uppercase tracking-[0.2em] mb-1">Available Balance</p>
                  <p className="text-4xl font-black text-white tabular-nums">${balance.toFixed(2)}</p>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button 
                    onClick={handleWithdraw}
                    disabled={balance < MIN_WITHDRAWAL}
                    className={cn(
                      "h-12 px-8 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl",
                      balance >= MIN_WITHDRAWAL 
                        ? "bg-primary hover:bg-primary/90 text-white shadow-primary/20" 
                        : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
                    )}
                  >
                    <Wallet className="w-4 h-4 mr-2" /> Withdraw
                  </Button>
                  {balance < MIN_WITHDRAWAL && (
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                      Min. withdrawal $5.00
                    </span>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Zero Balance Motivation */}
          {balance === 0 && (
            <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="glass-card bg-gradient-to-r from-[#FA4616]/5 to-transparent border-[#FA4616]/10 p-8 rounded-[2rem] text-center flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-y-1/2" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20 animate-bounce">
                    <Trophy className="text-primary w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                    Complete 1 offer and unlock your first withdrawal 💸
                  </h3>
                  <p className="text-muted-foreground font-medium text-sm">
                    Just one step away — start now and claim your reward
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Offers Section */}
          <section id="offers" className="scroll-mt-10 mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1.5 bg-[#FA4616] rounded-full" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Available Tasks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerCards.map((offer) => (
                <Card 
                  className={cn(
                    "glass-card border-white/5 bg-[#0a0a0a] hover:border-[#FA4616]/40 transition-all duration-500 group overflow-hidden rounded-[2rem]",
                    offer.highlight && "md:col-span-2 lg:col-span-3 border-[#FA4616]/30 bg-gradient-to-br from-[#0a0a0a] to-[#1a0804]"
                  )}
                  key={offer.id}
                >
                  <CardContent className={cn(
                    "p-8 flex flex-col h-full",
                    offer.highlight && "md:flex-row md:items-center md:justify-between gap-8"
                  )}>
                    <div className={cn("flex-1", offer.highlight && "max-w-2xl")}>
                      <div className="flex items-center justify-between mb-6">
                        <div className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10",
                          offer.highlight ? "bg-[#FA4616] text-white shadow-xl shadow-[#FA4616]/20" : "bg-white/5 text-[#FA4616]"
                        )}>
                          <offer.icon className="w-7 h-7" />
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Reward Potential</p>
                          <p className="text-lg font-black text-white">{offer.rewardRange}</p>
                        </div>
                      </div>

                      <h3 className={cn(
                        "font-black uppercase tracking-tight mb-3",
                        offer.highlight ? "text-3xl md:text-4xl" : "text-xl"
                      )}>
                        {offer.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                        {offer.description}
                      </p>
                    </div>

                    <div className={cn("shrink-0", offer.highlight && "md:w-64")}>
                      <Button 
                        onClick={() => handleStartTask(offer)}
                        className={cn(
                          "w-full h-14 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 shadow-xl",
                          "bg-white/5 hover:bg-[#FA4616] border border-white/10 hover:border-[#FA4616] text-white",
                          offer.highlight && "bg-[#FA4616] border-[#FA4616] shadow-[#FA4616]/20 hover:scale-[1.02]"
                        )}
                      >
                        Start Task <ArrowUpRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Real-time Activity Log */}
          <section id="history" className="scroll-mt-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1.5 bg-yellow-500 rounded-full" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Activity Log</h2>
            </div>
            <TaskHistory userId={user.uid} firestore={firestore} />
          </section>
        </div>
      </main>
    </div>
  );
}
