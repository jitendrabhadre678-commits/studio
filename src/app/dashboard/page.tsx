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
  Zap,
  ArrowLeft,
  ChevronRight,
  Copy,
  CheckCircle2,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { TaskHistory } from '@/components/dashboard/TaskHistory';
import { motion } from 'framer-motion';

/**
 * @fileOverview User Dashboard.
 * Centrally manages earnings, history, and the new Invite & Earn system.
 */

export default function Dashboard() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCopied, setIsCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData } = useDoc(userRef);

  if (isUserLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const balance = userData?.availableBalance || 0;
  const referralEarnings = userData?.referralEarnings || 0;
  const totalReferrals = userData?.totalReferrals || 0;
  const referralCode = userData?.referralCode || '...';
  const username = userData?.username || user.email?.split('@')[0] || 'Player';
  const MIN_WITHDRAWAL = 5;

  // Generate Referral Link
  const referralLink = mounted ? `${window.location.origin}/?ref=${referralCode}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast({
      title: "Copied Successfully ✅",
      description: "Your unique link is ready to share.",
      className: "bg-[#009dff] text-white border-none font-bold",
    });
    setTimeout(() => setIsCopied(false), 3000);
  };

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
    <div className="flex min-h-screen bg-[#050b18] text-white">
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
          
          {/* Navigation & Breadcrumbs */}
          <nav className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="h-10 px-4 bg-white/5 hover:bg-white/10 border border-white/5 text-white/60 hover:text-white rounded-xl flex items-center gap-2 transition-all active:scale-95 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Back to Home</span>
                </Button>
              </Link>
              
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                <Link href="/" className="text-white/30 hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 text-white/10" />
                <span className="text-white">Dashboard</span>
              </div>
            </div>
          </nav>

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

          {/* --- NEW INVITE & EARN SECTION --- */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1.5 bg-primary rounded-full shadow-[0_0_15px_rgba(0,157,255,0.5)]" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Invite & Earn 💰</h2>
            </div>

            <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border-white/10 bg-[#0a0a0a]/40 backdrop-blur-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">Earn <span className="text-primary">$1.00</span> for every successful referral</h3>
                    <p className="text-white/40 font-medium text-sm leading-relaxed max-w-md">
                      Share your unique link with friends or on social media. You earn cash instantly when they complete their first task.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch gap-3">
                    <div className="flex-1 relative group/input">
                      <input 
                        readOnly 
                        value={referralLink}
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                        className="w-full h-14 bg-black/40 border border-white/10 rounded-xl px-6 text-primary font-mono text-sm focus:outline-none focus:border-primary/40 transition-all cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none rounded-xl" />
                    </div>
                    <Button 
                      onClick={handleCopy}
                      className={cn(
                        "h-14 px-8 rounded-xl font-[900] uppercase tracking-widest transition-all duration-300 shadow-xl active:scale-95 border-none",
                        isCopied ? "bg-green-500 text-white" : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                      )}
                    >
                      {isCopied ? (
                        <><CheckCircle2 className="w-5 h-5 mr-2" /> Copied</>
                      ) : (
                        <><Copy className="w-5 h-5 mr-2" /> Copy Link</>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-6 border-white/5 bg-white/[0.02] flex flex-col justify-between group/stat">
                    <div className="flex justify-between items-start">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Total Referrals</p>
                      <Users className="w-4 h-4 text-primary/40 group-hover/stat:text-primary transition-colors" />
                    </div>
                    <p className="text-4xl font-black text-white mt-4">{totalReferrals}</p>
                    <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        animate={{ width: totalReferrals > 0 ? "100%" : "0%" }}
                      />
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6 border-white/5 bg-white/[0.02] flex flex-col justify-between group/stat">
                    <div className="flex justify-between items-start">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Earnings</p>
                      <DollarSign className="w-4 h-4 text-primary/40 group-hover/stat:text-primary transition-colors" />
                    </div>
                    <p className="text-4xl font-black text-primary mt-4 tracking-tighter">${referralEarnings.toFixed(2)}</p>
                    <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-4 flex items-center gap-1">
                      <TrendingUp className="w-2 h-2" /> Active Commissions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activity Section */}
          <section id="history" className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1.5 bg-primary rounded-full shadow-[0_0_15px_rgba(0,157,255,0.5)]" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Recent Activity</h2>
            </div>
            {firestore && user && <TaskHistory userId={user.uid} firestore={firestore} />}
          </section>

          {/* Tips Section */}
          <div className="p-8 md:p-12 glass-card rounded-[3rem] border-white/5 relative overflow-hidden text-center bg-[#0a0a0a]/40 backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck className="w-48 h-48 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Earning Tips</h3>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Consistently sharing your link on TikTok or in Discord communities is the fastest way to build passive income. Active members can earn hundreds per week.
            </p>
            <Button asChild className="mt-8 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-8 h-12 uppercase font-black text-xs tracking-widest">
              <Link href="/refer">Detailed Analytics Hub</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
