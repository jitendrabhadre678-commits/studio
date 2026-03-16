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
    { name: 'Gift Cards', href: '#trending' },
    { name: 'Categories', href: '#categories' },
    { name: 'Rewards', href: '#' },
    { name: 'Creator Program', href: '#creator' },
    { name: 'Blog', href: '#' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 rounded-2xl border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-headline text-2xl font-black tracking-tighter text-white">
            GAMEFLASH<span className="text-primary">X</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-primary">Login</Button>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 rounded-xl">Unlock Now</Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 right-0 glass-card mt-2 rounded-2xl overflow-hidden transition-all duration-300 origin-top border-white/5",
        isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
      )}>
        <nav className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-white hover:text-primary p-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <Button variant="outline" className="text-white border-white/20 rounded-xl">Login</Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">Join Now</Button>
        </nav>
      </div>
    </header>
  );
}
