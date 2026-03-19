"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, LayoutDashboard, Gift, Trophy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/Logo';
import { useUser, useAuth } from '@/firebase';
import { AuthModal } from '@/components/auth/AuthModal';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AutoSuggestSearch } from '@/components/search/AutoSuggestSearch';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' as const });
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Communities', href: '/communities' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300",
        "bg-black/85 backdrop-blur-[10px] border-b border-white/5",
        "h-14 md:h-[72px] flex items-center px-4 md:px-8"
      )}>
        <div className="w-full flex items-center justify-between max-w-[1400px] mx-auto gap-8">
          <Link href="/" className="flex items-center group shrink-0 h-8 md:h-10">
            <Logo className="h-full" />
          </Link>

          {/* New prominent search bar */}
          <div className="hidden md:block flex-1 max-w-sm">
            <AutoSuggestSearch />
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[11px] font-black uppercase tracking-[0.2em] transition-all text-white/60 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
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
                      className="bg-[#FA4616] hover:bg-[#FA4616]/90 text-white font-black px-6 rounded-xl shadow-[0_0_20px_rgba(250,70,22,0.3)] h-10 border-none"
                      onClick={() => setAuthModal({ open: true, tab: 'signup' })}
                    >
                      Sign Up
                    </Button>
                  </div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-3 cursor-pointer group px-2 py-1 rounded-full hover:bg-white/5 transition-all">
                        <Avatar className="h-9 w-9 border-2 border-[#FA4616]">
                          <AvatarImage src={user.photoURL || undefined} />
                          <AvatarFallback className="bg-[#FA4616]/20 text-[#FA4616] font-black uppercase">
                            {user.email?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                          <span className="text-[10px] font-black text-white uppercase tracking-tighter truncate max-w-[100px]">
                            {user.displayName || user.email?.split('@')[0]}
                          </span>
                          <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Account ⌄</span>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-black/95 backdrop-blur-2xl border-white/10 rounded-2xl p-2 shadow-2xl" align="end">
                      <DropdownMenuItem onClick={() => router.push('/dashboard')} className="rounded-xl cursor-pointer h-11">
                        <LayoutDashboard className="mr-2 h-4 w-4 text-[#FA4616]" /> Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/account-settings')} className="rounded-xl cursor-pointer h-11">
                        <Trophy className="mr-2 h-4 w-4 text-[#FA4616]" /> Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/my-rewards')} className="rounded-xl cursor-pointer h-11">
                        <Gift className="mr-2 h-4 w-4 text-[#FA4616]" /> My Rewards
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

          <button 
            className="lg:hidden text-white p-2" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={cn(
          "lg:hidden fixed top-14 left-0 right-0 overflow-hidden transition-all duration-500 ease-in-out bg-black/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl z-40",
          isOpen ? "max-h-screen opacity-100 py-8" : "max-h-0 opacity-0"
        )}>
          <nav className="flex flex-col px-6 gap-2">
            <div className="mb-6">
              <AutoSuggestSearch />
            </div>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-black transition-colors py-4 uppercase tracking-widest border-b border-white/5 last:border-0"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-8 flex flex-col gap-4">
              {!user ? (
                <>
                  <Button variant="outline" className="w-full h-14 font-black uppercase text-xs rounded-xl" onClick={() => { setIsOpen(false); setAuthModal({ open: true, tab: 'login' }); }}>Login</Button>
                  <Button className="w-full h-14 bg-[#FA4616] text-white font-black uppercase text-xs rounded-xl" onClick={() => { setIsOpen(false); setAuthModal({ open: true, tab: 'signup' }); }}>Create Account</Button>
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
      />
    </>
  );
}
