
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Youtube, Twitter, Disc as Discord } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black/80 pt-20 pb-10 px-4 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative h-8 w-8 flex-shrink-0">
                <Image 
                  src="/logo.png"
                  alt="GameFlashX Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-headline text-2xl font-bold tracking-tight text-white">
                GAMEFLASH<span className="text-primary">X</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-8">
              The premier destination for gamers to earn premium digital rewards through simple activities. Secure, fast, and globally accessible.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram />, href: "https://instagram.com/gameflashx" },
                { icon: <Twitter />, href: "#" },
                { icon: <Youtube />, href: "#" },
                { icon: <Discord />, href: "#" },
              ].map((social, idx) => (
                <Link key={idx} href={social.href} className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-all">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Browse Rewards</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Trending</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Community</h4>
            <ul className="space-y-4">
              <li><Link href="https://whop.com/gameflashx" className="text-muted-foreground hover:text-primary transition-colors">Creator Program</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Whop Community</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/5 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-medium uppercase tracking-tighter">
          <p>© 2024 GAMEFLASHX. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span>Powered by Premium Tech</span>
            <span>Global Reward Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
