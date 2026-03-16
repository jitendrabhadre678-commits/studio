
"use client";

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Zap, Video } from 'lucide-react';
import Link from 'next/link';

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

export function CreatorProgram() {
  const tiers = [
    { views: "1,000 Views", reward: "$1.00", icon: "🥉" },
    { views: "10,000 Views", reward: "$10.00", icon: "🥈" },
    { views: "100,000 Views", reward: "$100.00", icon: "🥇" },
    { views: "1M+ Views", reward: "Custom Contract", icon: "🔥" },
  ];

  return (
    <section id="creator" className="py-20 px-4 bg-black/40 border-y border-white/5">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <Video className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Earn while you create</span>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
              GameFlashX <span className="text-primary">Creator Program</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Are you a content creator on TikTok, Instagram, or YouTube? Promote GameFlashX and earn real cash rewards based on your video performance. We support Reels, Shorts, and TikToks!
            </p>

            <div className="flex gap-8 mb-10">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center mb-2 hover:text-primary transition-colors">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white/60">Reels</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center mb-2 hover:text-primary transition-colors">
                  <YoutubeIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white/60">Shorts</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center mb-2 hover:text-primary transition-colors text-xl font-black">
                  𝕏
                </div>
                <span className="text-xs font-bold text-white/60">TikTok</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 glass-card rounded-2xl">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Weekly Payouts</h4>
                  <p className="text-sm text-muted-foreground">Withdraw your earnings directly to your PayPal or Bank account every Friday.</p>
                </div>
              </div>
            </div>

            <Button asChild className="mt-10 bg-primary hover:bg-primary/90 text-white font-black px-10 h-14 rounded-xl text-lg w-full md:w-auto shadow-lg shadow-primary/20">
              <Link href="https://whop.com/gameflashx">Join Creator Program</Link>
            </Button>
          </div>

          <div className="glass-card rounded-3xl p-8 border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <h3 className="font-headline text-2xl font-bold mb-6 text-white flex items-center gap-3">
              Earnings Structure <div className="h-px bg-white/10 flex-grow" />
            </h3>
            
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white font-bold h-14">Video Performance</TableHead>
                    <TableHead className="text-white font-bold h-14 text-right">Cash Reward</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiers.map((tier) => (
                    <TableRow key={tier.views} className="border-white/10 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-white h-16 flex items-center gap-3">
                        <span className="text-xl">{tier.icon}</span> {tier.views}
                      </TableCell>
                      <TableCell className="text-right text-primary font-black h-16 text-lg">{tier.reward}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-2xl">
              <p className="text-xs text-center text-primary-foreground/80 font-medium">
                * Rewards are calculated based on total unique views across all platforms per video submission. 
                Full terms available in the Creator Portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
