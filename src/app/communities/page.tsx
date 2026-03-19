'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Video, Radio, Gift, ArrowRight, Users, Sparkles, Flame, Coins, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Communities Hub page.
 * Displays specialized community cards for clipping, streaming, and giveaways.
 */

const communities = [
  {
    name: "Clipster Clipping Campaign",
    description: "Join the campaign and earn from viral clips with one of the highest payouts available.",
    highlight: "Top Earning Campaign",
    extraInfo: "Earn up to $1000 per 1M views",
    budgetInfo: "$10,000 Campaign Budget",
    members: "6,000 members",
    icon: <Trophy className="w-8 h-8" />,
    link: "https://discord.gg/vyro",
    btnText: "Join Now",
    isHighestPaying: true,
    gradient: "from-[#FA4616]/30 to-orange-600/20",
    shadow: "shadow-[#FA4616]/30"
  },
  {
    name: "Razed Casino Clipping",
    description: "Create casino clips and earn high payouts from viral content. High-converting offers ready for you.",
    highlight: "High Earnings",
    extraInfo: "Up to $350 per million views",
    members: "2,231 members",
    icon: <Coins className="w-8 h-8" />,
    link: "https://discord.gg/at4Xc6wbf9",
    btnText: "Join Now",
    isTrending: true,
    gradient: "from-[#FA4616]/20 to-orange-600/10",
    shadow: "shadow-[#FA4616]/10"
  },
  {
    name: "Clipping Community",
    description: "Connect with thousands of creators and earn money by uploading viral GameFlashX clips.",
    highlight: "Earn from clips",
    members: "12.4k members",
    icon: <Video className="w-8 h-8" />,
    link: "https://whop.com/gameflashx",
    btnText: "Join Now",
    gradient: "from-blue-500/10 to-cyan-500/5"
  },
  {
    name: "Streaming Community",
    description: "Learn how to dominate streaming platforms and grow your audience with expert guides.",
    highlight: "Grow your stream",
    members: "8.2k members",
    icon: <Radio className="w-8 h-8" />,
    link: "https://whop.com/streamingclips-temp",
    btnText: "Join Now",
    gradient: "from-purple-500/10 to-pink-500/5"
  },
  {
    name: "Giveaway Community",
    description: "Gain exclusive access to high-value giveaways, promo codes, and special reward events.",
    highlight: "Exclusive Access",
    members: "15.9k members",
    icon: <Gift className="w-8 h-8" />,
    link: "https://whop.com/gameflashx",
    btnText: "Join Now",
    gradient: "from-[#FA4616]/10 to-orange-500/5"
  }
];

export default function CommunitiesPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F]">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-[#FA4616]/10 border border-[#FA4616]/20 px-4 py-1.5 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#FA4616]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FA4616]">Global Network Hub</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-headline text-4xl md:text-7xl font-black text-white mb-4 uppercase tracking-tight leading-none"
            >
              Join Our <span className="text-[#FA4616] text-glow">Communities</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
            >
              Choose your path and connect with the right community to maximize your rewards.
            </motion.p>
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community, idx) => (
              <motion.div
                key={community.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={cn("group h-full", (community.isTrending || community.isHighestPaying) && "md:col-span-2 lg:col-span-1")}
              >
                <div className={cn(
                  "bg-[#1A1A1A] border border-white/5 p-8 md:p-10 rounded-[2.5rem] h-full flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group/card shadow-2xl",
                  (community.isTrending || community.isHighestPaying) ? "border-[#FA4616]/30 bg-[#1c1412]" : "hover:border-[#FA4616]/40",
                  community.shadow
                )}>
                  {/* Badge */}
                  {community.isHighestPaying && (
                    <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 bg-[#FA4616] text-white px-3 py-1 rounded-full shadow-xl">
                      <Trophy className="w-3 h-3 fill-white" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Highest Paying</span>
                    </div>
                  )}
                  {community.isTrending && !community.isHighestPaying && (
                    <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 bg-[#FA4616] text-white px-3 py-1 rounded-full shadow-xl">
                      <Flame className="w-3 h-3 fill-white" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Trending</span>
                    </div>
                  )}

                  {/* Decorative Gradient Background */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-500 bg-gradient-to-br", 
                    community.gradient,
                    (community.isTrending || community.isHighestPaying) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )} />
                  
                  <div className={cn(
                    "w-20 h-20 bg-white/5 rounded-[1.5rem] flex items-center justify-center mb-8 border transition-all duration-500 relative z-10",
                    (community.isTrending || community.isHighestPaying) ? "text-[#FA4616] border-[#FA4616]/20 bg-[#FA4616]/10" : "border-white/10 text-white group-hover:text-[#FA4616] group-hover:bg-[#FA4616]/10 group-hover:border-[#FA4616]/20 group-hover:scale-110"
                  )}>
                    {community.icon}
                  </div>

                  <div className="relative z-10 w-full">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border mb-6",
                      community.isHighestPaying ? "bg-[#FA4616]/20 border-[#FA4616]/40" : "bg-[#FA4616]/10 border-[#FA4616]/20"
                    )}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FA4616] animate-pulse" />
                      <span className="text-[10px] font-black uppercase text-[#FA4616] tracking-widest">{community.highlight}</span>
                    </div>

                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight leading-tight">{community.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow min-h-[60px]">
                      {community.description}
                    </p>

                    <div className="space-y-2 mb-8">
                      {community.extraInfo && (
                        <div className="p-3 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20">
                          <span className="text-[11px] font-black text-[#FA4616] uppercase tracking-widest">
                            {community.extraInfo}
                          </span>
                        </div>
                      )}

                      {community.budgetInfo && (
                        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                          <span className="text-[11px] font-black text-green-500 uppercase tracking-widest">
                            {community.budgetInfo}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-10 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                      <Users className="w-3.5 h-3.5" /> {community.members}
                    </div>

                    <Button 
                      asChild
                      className="w-full h-16 rounded-2xl bg-[#FA4616] hover:bg-[#FA4616]/90 text-white font-black uppercase tracking-widest transition-all shadow-xl shadow-[#FA4616]/20 active:scale-95 text-sm"
                    >
                      <a href={community.link} target="_blank" rel="noopener noreferrer">
                        {community.btnText} <ArrowRight className="ml-2 w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Support Section */}
          <div className="mt-24 p-12 glass-card rounded-[3rem] text-center border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-32 h-32 text-[#FA4616]" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Need custom assistance?</h3>
            <p className="text-muted-foreground mb-8">Our moderators are available 24/7 in our Discord server.</p>
            <Button asChild variant="outline" className="h-14 px-10 rounded-xl border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/5">
              <a href="https://discord.gg/mBjte9tthg" target="_blank" rel="noopener noreferrer">Contact Moderator</a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
