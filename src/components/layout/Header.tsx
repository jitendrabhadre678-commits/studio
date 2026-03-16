"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/Logo';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rewards', href: '#trending' },
    { name: 'Tasks', href: '#' },
    { name: 'Giveaways', href: '#' },
    { name: 'Leaderboard', href: '#' },
    { name: 'Blog', href: '#' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <header className={cn(
        "w-full max-w-[1200px] mt-5 pointer-events-auto transition-all duration-300",
        "bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
      )}>
        <div className="px-6 h-[72px] flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo />
            <span className="font-headline text-xl lg:text-2xl font-black tracking-tighter text-white">
              GAMEFLASH<span className="text-primary">X</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[13px] font-bold text-white/70 hover:text-primary uppercase tracking-widest transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" className="text-white font-bold hover:text-primary">Login</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white font-black px-6 rounded-xl shadow-[0_0_20px_rgba(223,16,78,0.3)]">Sign Up</Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/90 backdrop-blur-2xl rounded-b-[16px] border-t border-white/5",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-white/80 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="text-white border-white/20 rounded-xl h-12 font-bold">Login</Button>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-black">Sign Up</Button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
