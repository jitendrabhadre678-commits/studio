import Link from 'next/link';
import { Instagram, Youtube, Twitter, Disc as Discord } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';

export function Footer() {
  return (
    <footer className="bg-black/80 pt-16 pb-10 px-4 border-t border-white/5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-sm">
            <Link href="/" className="inline-block mb-6 group">
              <Logo className="h-8" />
            </Link>
            <p className="text-muted-foreground mb-8 text-sm">
              The premier destination for gamers to earn premium digital rewards through simple activities. Secure, fast, and globally accessible.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/gameflashx" },
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Youtube className="w-5 h-5" />, href: "#" },
                { icon: <Discord className="w-5 h-5" />, href: "#" },
              ].map((social, idx) => (
                <Link key={idx} href={social.href} className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-all">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link>
            <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link>
          </div>
        </div>

        <div className="h-px bg-white/5 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
          <p>© 2024 GAMEFLASHX. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span>Global Reward Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
