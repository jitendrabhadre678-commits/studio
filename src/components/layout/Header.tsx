"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, LayoutDashboard, Gift, Settings, Trophy, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/Logo';
import { useUser, useAuth } from '@/firebase';
import { AuthModal } from '@/components/auth/AuthModal';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; tab: 'login' | 'signup' }>({ open: false, tab: 'login' });
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rewards', href: '/#trending' },
    { name: 'Quiz & Earn', href: '/quiz-earn', highlight: true },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        "bg-black/80 backdrop-blur-[12px] border-b border-white/5",
        "h-14 md:h-[72px] flex items-center px-4 md:px-8"
      )}>
        <div className="w-full flex items-center justify-between max-w-[1400px] mx-auto">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group shrink-0 h-8 md:h-10">
            <Logo className="h-full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-1.5",
                  link.highlight 
                    ? "text-primary hover:text-white bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg" 
                    : "text-white/60 hover:text-primary"
                )}
              >
                {link.highlight && <Sparkles className="w-3 h-3 animate-pulse" />}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Profile / Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {!isUserLoading && (
              <>
                {!user ? (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      className="text-white font-bold hover:text-primary hover:bg-white/5 h-10"
                      onClick={() => setAuthModal({ open: true, tab: 'login' })}
                    >
                      Login
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white font-black px-6 rounded-xl shadow-[0_0_20px_rgba(250,70,22,0.3)] h-10"
                      onClick={() => setAuthModal({ open: true, tab: 'signup' })}
                    >
                      Sign Up
                    </Button>
                  </div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-3 cursor-pointer group px-2 py-1.5 rounded-full hover:bg-white/5 transition-all">
                        <div className="relative h-9 w-9 rounded-full border-2 border-primary shadow-lg overflow-hidden">
                          <Avatar className="h-full w-full">
                            <AvatarImage src={user.photoURL || undefined} />
                            <AvatarFallback className="bg-primary/20 text-primary font-black">
                              {user.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-sm font-bold text-white/90">
                          {user.displayName || user.email?.split('@')[0]} ⌄
                        </span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-black/95 backdrop-blur-2xl border-white/10 rounded-2xl p-2 shadow-2xl" align="end">
                      <DropdownMenuItem onClick={() => router.push('/dashboard')} className="rounded-xl cursor-pointer h-11">
                        <LayoutDashboard className="mr-2 h-4 w-4 text-primary" /> Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/leaderboard')} className="rounded-xl cursor-pointer h-11">
                        <Trophy className="mr-2 h-4 w-4 text-primary" /> Leaderboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/my-rewards')} className="rounded-xl cursor-pointer h-11">
                        <Gift className="mr-2 h-4 w-4 text-primary" /> My Rewards
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/5" />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-500 rounded-xl cursor-pointer h-11">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={cn(
          "lg:hidden fixed top-14 left-0 right-0 overflow-hidden transition-all duration-500 ease-in-out bg-black/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl z-40",
          isOpen ? "max-h-screen opacity-100 py-8" : "max-h-0 opacity-0"
        )}>
          <nav className="flex flex-col px-6 gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-xl font-black transition-colors py-4 uppercase tracking-widest border-b border-white/5 last:border-0 flex items-center justify-between",
                  link.highlight ? "text-primary" : "text-white/70 hover:text-primary"
                )}
              >
                {link.name}
                {link.highlight && <Sparkles className="w-5 h-5 animate-pulse" />}
              </Link>
            ))}
            <div className="pt-8 flex flex-col gap-4">
              {!user ? (
                <>
                  <Button variant="outline" className="w-full h-14 font-black uppercase text-xs rounded-xl" onClick={() => { setIsOpen(false); setAuthModal({ open: true, tab: 'login' }); }}>Login</Button>
                  <Button className="w-full h-14 bg-primary text-white font-black uppercase text-xs rounded-xl" onClick={() => { setIsOpen(false); setAuthModal({ open: true, tab: 'signup' }); }}>Create Account</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full h-14 font-black uppercase text-xs rounded-xl" onClick={() => { setIsOpen(false); router.push('/dashboard'); }}>Open Dashboard</Button>
                  <Button variant="ghost" className="w-full h-14 text-red-500 font-black uppercase text-xs" onClick={() => { setIsOpen(false); handleLogout(); }}>Sign Out</Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <AuthModal 
        isOpen={authModal.open} 
        onClose={() => setAuthModal({ ...authModal, open: false })}
        defaultTab={authModal.tab}
      />
    </>
  );
}
