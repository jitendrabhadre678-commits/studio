
"use client";

import { motion } from 'framer-motion';
import { Video, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const socialPlatforms = [
  {
    name: "Instagram",
    icon: <InstagramIcon className="w-8 h-8" />,
    description: "Follow GameFlashX for reward updates, announcements, and winner showcases.",
    link: "https://www.instagram.com/gameflashx",
    cta: "Follow on Instagram",
    color: "from-[#f09433] via-[#dc2743] to-[#bc1888]",
    glow: "rgba(220, 39, 67, 0.3)"
  },
  {
    name: "YouTube",
    icon: <YoutubeIcon className="w-8 h-8" />,
    description: "Watch exclusive tutorials, reward guides, and platform updates from our team.",
    link: "https://youtube.com/@gameflashx",
    cta: "Subscribe on YouTube",
    color: "from-[#FF0000] to-[#CC0000]",
    glow: "rgba(255, 0, 0, 0.3)"
  },
  {
    name: "Discord",
    icon: <DiscordIcon className="w-8 h-8" />,
    description: "Chat with other users, share your earnings, and get instant help from the community.",
    link: "https://discord.gg/mBjte9tthg",
    cta: "Join Discord",
    color: "from-[#5865F2] to-[#404EED]",
    glow: "rgba(88, 101, 242, 0.3)"
  },
  {
    name: "Whop Community",
    icon: <Video className="w-8 h-8" />,
    description: "Join Clip & Earn and start earning real cash by posting GameFlashX content.",
    link: "https://whop.com/gameflashx",
    cta: "Join Clip & Earn",
    color: "from-[#00A3FF] to-[#0066FF]",
    glow: "rgba(0, 163, 255, 0.3)"
  }
];

export function CommunityHub() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-primary fill-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">Global Network</span>
          </motion.div>
          <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            Join the <span className="text-primary text-glow">GameFlashX</span> Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Follow us for reward updates, tutorials, and exclusive earning opportunities you won't find anywhere else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialPlatforms.map((platform, idx) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div 
                className={cn(
                  "relative h-full glass-card p-8 rounded-[18px] border-white/[0.12] backdrop-blur-[14px]",
                  "transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
                )}
                style={{ 
                  boxShadow: `0 0 0 rgba(0,0,0,0)` 
                }}
              >
                {/* Border Glow on Hover */}
                <div 
                  className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `0 0 30px ${platform.glow}` }}
                />

                <div className={cn(
                  "w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6",
                  "border border-white/10 group-hover:scale-110 transition-all duration-300 relative overflow-hidden"
                )}>
                  <div className={cn("absolute inset-0 opacity-20 bg-gradient-to-br", platform.color)} />
                  <div className={cn("relative z-10 text-white transition-colors duration-300", 
                    platform.name === "Instagram" && "group-hover:text-[#dc2743]",
                    platform.name === "YouTube" && "group-hover:text-[#FF0000]",
                    platform.name === "Discord" && "group-hover:text-[#5865F2]",
                    platform.name === "Whop Community" && "group-hover:text-[#00A3FF]"
                  )}>
                    {platform.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{platform.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {platform.description}
                </p>

                <Button 
                  asChild
                  className={cn(
                    "w-full h-12 rounded-xl font-black uppercase tracking-widest text-[10px]",
                    "bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all shadow-lg"
                  )}
                >
                  <a href={platform.link} target="_blank" rel="noopener noreferrer">
                    {platform.cta} <ArrowRight className="ml-2 w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
