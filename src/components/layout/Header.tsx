"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, LayoutDashboard, Gift, Settings, Trophy } from 'lucide-react';
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
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header className={cn(
          "w-full max-w-[1200px] mt-5 pointer-events-auto transition-all duration-300",
          "bg-black/40 backdrop-blur-[16px] border border-white/10 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        )}>
          <div className="px-4 md:px-6 h-[72px] flex items-center justify-between">
            <Link href="/" className="flex items-center group shrink-0">
              <Logo className="h-[32px] md:h-[36px] lg:h-[40px] text-lg lg:text-2xl" />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-[12px] xl:text-[13px] font-black text-white/60 hover:text-primary uppercase tracking-[0.15em] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              {!isUserLoading && (
                <>
                  {!user ? (
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        className="text-white font-bold hover:text-primary hover:bg-white/5"
                        onClick={() => setAuthModal({ open: true, tab: 'login' })}
                      >
                        Login
                      </Button>
                      <Button 
                        className="bg-primary hover:bg-primary/90 text-white font-black px-6 rounded-xl shadow-[0_0_20px_rgba(250,70,22,0.3)] transition-all hover:scale-105"
                        onClick={() => setAuthModal({ open: true, tab: 'signup' })}
                      >
                        Sign Up
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer group px-2 py-1.5 rounded-full hover:bg-white/5 transition-all">
                          <div className="relative h-9 w-9 rounded-full p-0 overflow-hidden border-2 border-primary shadow-[0_0_10px_rgba(250,70,22,0.3)] group-hover:scale-105 transition-all">
                            <Avatar className="h-full w-full">
                              <AvatarImage src={user.photoURL || undefined} alt={user.email || ''} />
                              <AvatarFallback className="bg-primary/20 text-primary font-black">
                                {user.email?.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <span className="hidden xl:inline text-sm font-bold text-white/90 group-hover:text-white transition-colors">
                            {user.displayName || user.email?.split('@')[0] || 'Account'} 
                            <span className="ml-1 text-primary opacity-50 group-hover:opacity-100">⌄</span>
                          </span>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-black/95 backdrop-blur-2xl border-white/10 rounded-2xl p-2 shadow-2xl" align="end">
                        <DropdownMenuLabel className="font-bold text-white px-3 py-2">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm leading-none truncate">{user.displayName || 'Gamer'}</p>
                            <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem onClick={() => router.push('/dashboard')} className="hover:bg-white/5 rounded-xl cursor-pointer text-white/80 h-11 px-3">
                          <LayoutDashboard className="mr-2 h-4 w-4 text-primary" /> Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/leaderboard')} className="hover:bg-white/5 rounded-xl cursor-pointer text-white/80 h-11 px-3">
                          <Trophy className="mr-2 h-4 w-4 text-primary" /> Leaderboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/my-rewards')} className="hover:bg-white/5 rounded-xl cursor-pointer text-white/80 h-11 px-3">
                          <Gift className="mr-2 h-4 w-4 text-primary" /> My Rewards
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/account-settings')} className="hover:bg-white/5 rounded-xl cursor-pointer text-white/80 h-11 px-3">
                          <Settings className="mr-2 h-4 w-4 text-primary" /> Account Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:bg-red-500/10 rounded-xl cursor-pointer h-11 px-3">
                          <LogOut className="mr-2 h-4 w-4" /> Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </>
              )}
            </div>

            <button 
              className="lg:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-all" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className={cn(
            "lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-black/95 backdrop-blur-2xl rounded-b-[20px] border-t border-white/5 shadow-2xl",
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          )}>
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-black text-white/70 hover:text-primary transition-colors py-3 uppercase tracking-widest border-b border-white/5 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                {!user ? (
                  <>
                    <Button variant="outline" className="text-white border-white/10 bg-white/5 rounded-xl h-14 font-black uppercase tracking-widest text-xs" onClick={() => { setIsOpen(false); setAuthModal({ open: true, tab: 'login' }); }}>Login</Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-14 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20" onClick={() => { setIsOpen(false); setAuthModal({ open: true, tab: 'signup' }); }}>Create Account</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="text-white border-white/10 bg-white/5 rounded-xl h-14 font-black uppercase tracking-widest text-xs" onClick={() => { setIsOpen(false); router.push('/dashboard'); }}>Open Dashboard</Button>
                    <Button variant="ghost" className="text-red-500 font-black h-14 uppercase tracking-widest text-xs" onClick={() => { setIsOpen(false); handleLogout(); }}>Sign Out</Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </header>
      </div>

      <AuthModal 
        isOpen={authModal.open} 
        onClose={() => setAuthModal({ ...authModal, open: false })}
        defaultTab={authModal.tab}
      />
    </>
  );
}
