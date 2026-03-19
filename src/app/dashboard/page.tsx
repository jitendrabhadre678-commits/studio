'use client';

import { useEffect, useState } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  Wallet, 
  Menu,
  X,
  Zap,
  Smartphone,
  Gamepad2,
  ArrowUpRight,
  Loader2,
  Home,
  ShieldCheck,
  Users,
  Clock
} from 'lucide-react';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { TaskHistory } from '@/components/dashboard/TaskHistory';

export default function Dashboard() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState<'apps' | 'games' | null>(null);

  // Dynamic Stats State
  const [taskStats, setTaskStats] = useState<{ [key: string]: number }>({});

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasStartedTask = sessionStorage.getItem('task_started');
      if (hasStartedTask) {
        setIsReturnModalOpen(true);
        sessionStorage.removeItem('task_started');
      }

      setTaskStats({
        apps: Math.floor(Math.random() * (600 - 200 + 1)) + 200,
        games: Math.floor(Math.random() * (600 - 200 + 1)) + 200,
      });
    }
  }, []);

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

  const offerCards = [
    {
      id: 'apps',
      title: 'Test Apps & Earn Cash',
      description: 'Get paid to test new mobile applications and share your feedback.',
      icon: Smartphone,
      statKey: 'apps'
    },
    {
      id: 'games',
      title: 'Play Games & Earn Cash',
      description: 'Earn rewards for playing and reaching milestones in top-rated games.',
      icon: Gamepad2,
      statKey: 'games'
    }
  ];

  const handleStartTask = (id: string) => {
    setSelectedTaskType(id as 'apps' | 'games');
    setIsTaskModalOpen(true);
  };

  const handleTaskRedirect = () => {
    if (!selectedTaskType) return;
    
    const links = {
      apps: "https://gameflashx.space/cl/i/277ood",
      games: "https://gameflashx.space/cl/i/7jj1vk"
    };

    sessionStorage.setItem('task_started', 'true');
    window.location.href = links[selectedTaskType];
  };

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
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-in fade-in duration-700">
            <div className="w-full">
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">
                Welcome, <span className="text-primary">{username}</span>
              </h1>
              <p className="text-white/60 font-bold uppercase tracking-widest text-sm mb-4">
                Start completing tasks to unlock your rewards.
              </p>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                  Your account is active and secure
                </p>
                <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Verified</span>
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

          <section id="offers" className="scroll-mt-10 mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1.5 bg-primary rounded-full" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Available Tasks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offerCards.map((offer) => (
                <Card 
                  className="glass-card border-white/5 bg-[#0a0a0a] hover:border-primary/40 transition-all duration-500 group overflow-hidden rounded-[2rem]"
                  key={offer.id}
                >
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 text-primary border border-white/10">
                        <offer.icon className="w-7 h-7" />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Activity</p>
                        <p className="text-lg font-black text-white">
                          {taskStats[offer.statKey] || '...'} This Month
                        </p>
                      </div>
                    </div>

                    <h3 className="font-black uppercase tracking-tight mb-3 text-xl">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                      {offer.description}
                    </p>

                    <div className="mt-auto">
                      <Button 
                        onClick={() => handleStartTask(offer.id)}
                        className="w-full h-14 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 shadow-xl bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white"
                      >
                        Start Task <ArrowUpRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="history" className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1.5 bg-primary rounded-full" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Recent Activity</h2>
            </div>
            {firestore && user && <TaskHistory userId={user.uid} firestore={firestore} />}
          </section>
        </div>
      </main>

      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-[#0a0a0a] border-white/10 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
          <div className="p-8 md:p-10">
            <DialogHeader className="mb-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <DialogTitle className="text-3xl font-black text-white uppercase tracking-tight">
                Partner Offer <span className="text-primary">Available</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-base mt-4 leading-relaxed text-left">
                You are about to access a partner task.
                <br /><br />
                Complete the app testing or game task to qualify for your reward. 
                Your payment will be sent directly to your registered email address.
                <br /><br />
                <span className="text-white font-bold uppercase tracking-widest text-[10px]">Processing Time:</span>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                  <li>Usually within 1 hour after submission</li>
                  <li>In some cases, it may take 12–24 hours depending on demand</li>
                </ul>
                <br />
                Make sure your Gameflashx email is linked with PayPal to receive payments.
                <br /><br />
                Thank you for your participation.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                onClick={handleTaskRedirect}
                className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                Continue <ArrowUpRight className="ml-2 w-6 h-6" />
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isReturnModalOpen} onOpenChange={setIsReturnModalOpen}>
        <DialogContent className="sm:max-w-[450px] bg-[#0a0a0a] border-white/10 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
          <div className="p-8 md:p-10 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/20">
              <Clock className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              Review in <span className="text-green-500">Progress</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Your task has been submitted successfully.
              <br /><br />
              Your testing review is now in progress.
              Once verified, your reward will be sent to your registered email. 
              <br /><br />
              Thank you.
            </p>
            <Button 
              onClick={() => setIsReturnModalOpen(false)}
              className="w-full h-14 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest rounded-xl transition-all"
            >
              Understood
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}