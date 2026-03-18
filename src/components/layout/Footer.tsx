import Link from 'next/link';
import { Video } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.4 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export function Footer() {
  const socials = [
    { 
      icon: <InstagramIcon className="w-5 h-5" />, 
      href: "https://www.instagram.com/gameflashx",
      glow: "hover:shadow-[0_0_15px_rgba(220,39,67,0.5)]",
      hoverColor: "hover:text-[#dc2743]"
    },
    { 
      icon: <YoutubeIcon className="w-5 h-5" />, 
      href: "https://youtube.com/@gameflashx",
      glow: "hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]",
      hoverColor: "hover:text-[#FF0000]"
    },
    { 
      icon: <DiscordIcon className="w-5 h-5" />, 
      href: "https://discord.gg/mBjte9tthg",
      glow: "hover:shadow-[0_0_15px_rgba(88,101,242,0.5)]",
      hoverColor: "hover:text-[#5865F2]"
    },
    { 
      icon: <Video className="w-5 h-5" />, 
      href: "https://whop.com/gameflashx",
      glow: "hover:shadow-[0_0_15px_rgba(0,163,255,0.5)]",
      hoverColor: "hover:text-[#00A3FF]"
    },
  ];

  return (
    <footer className="bg-transparent pt-16 pb-10 px-4">
      <div className="container mx-auto">
        <div className="bg-black/80 backdrop-blur-2xl border border-white/5 rounded-[32px] overflow-hidden p-8 md:p-16">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-16">
            <div className="max-w-sm">
              <Link href="/" className="inline-block mb-8 group">
                <Logo className="h-8 md:h-10" />
              </Link>
              <p className="text-muted-foreground mb-10 text-base leading-relaxed font-medium">
                The premier destination for gamers to earn premium digital rewards through simple activities. Secure, fast, and globally accessible.
              </p>
              <div className="flex flex-wrap gap-4">
                {socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                      "w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-white/60 transition-all duration-300",
                      "hover:scale-110 hover:border-white/20 hover:bg-white/5",
                      social.glow,
                      social.hoverColor
                    )}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-6">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-6">Platform</h4>
                <Link href="/privacy-policy" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest">Privacy</Link>
                <Link href="/terms-of-service" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest">Terms</Link>
                <Link href="/cookie-policy" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest">Cookies</Link>
                <Link href="/disclaimer" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest">Disclaimer</Link>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-6">Community</h4>
                <Link href="/blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest">Blog</Link>
                <Link href="/reviews" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest">Reviews</Link>
                <Link href="/leaderboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest">Winners</Link>
                <Link href="/#faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest">Support</Link>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5 mb-10" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
            <p>© 2024 GAMEFLASHX. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-6">
              <span className="text-primary/60 border border-primary/20 px-3 py-1 rounded-full bg-primary/5">Global Reward Network</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}