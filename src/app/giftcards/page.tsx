
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Gamepad2, 
  ShoppingBag, 
  Utensils, 
  Tv, 
  ArrowRight, 
  ShieldCheck, 
  Info,
  Filter,
  Zap,
  Globe
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Premium Reward Marketplace.
 * Displays 50+ gift card opportunities with search, filtering, and CPA compliance.
 */

type Category = 'All' | 'Gaming' | 'Shopping' | 'Food' | 'Entertainment';

interface RewardItem {
  id: string;
  brand: string;
  value: string;
  category: Category;
  logo: string;
  color: string;
}

const REWARDS: RewardItem[] = [
  // Gaming
  { id: '1', brand: 'Roblox', value: '$10', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', color: '#E3191E' },
  { id: '2', brand: 'Roblox', value: '$25', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', color: '#E3191E' },
  { id: '3', brand: 'Steam', value: '$20', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', color: '#66C0F4' },
  { id: '4', brand: 'Steam', value: '$50', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', color: '#66C0F4' },
  { id: '5', brand: 'Xbox', value: '$25', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463539/1_20260406_134035_0000_i04tox.png', color: '#107C10' },
  { id: '6', brand: 'PlayStation', value: '$25', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463534/2_20260406_134035_0001_sf7lub.png', color: '#003087' },
  { id: '7', brand: 'Nintendo', value: '$20', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463546/4_20260406_134035_0003_jvi4ke.png', color: '#E60012' },
  { id: '8', brand: 'Fortnite', value: '$10', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png', color: '#A855F7' },
  { id: '9', brand: 'Fortnite', value: '$25', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png', color: '#A855F7' },
  { id: '10', brand: 'Google Play', value: '$15', category: 'Gaming', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png', color: '#34A853' },
  
  // Shopping
  { id: '11', brand: 'Amazon', value: '$10', category: 'Shopping', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png', color: '#FF9900' },
  { id: '12', brand: 'Amazon', value: '$25', category: 'Shopping', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png', color: '#FF9900' },
  { id: '13', brand: 'Amazon', value: '$50', category: 'Shopping', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png', color: '#FF9900' },
  { id: '14', brand: 'Walmart', value: '$25', category: 'Shopping', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463548/7_20260406_134035_0006_qkousw.png', color: '#0071CE' },
  { id: '15', brand: 'Target', value: '$20', category: 'Shopping', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/9_20260406_134035_0008_nnznij.png', color: '#CC0000' },
  { id: '16', brand: 'eBay', value: '$25', category: 'Shopping', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463541/5_20260406_134035_0004_nikubw.png', color: '#E53238' },
  { id: '17', brand: 'Best Buy', value: '$50', category: 'Shopping', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/8_20260406_134035_0007_jumtpc.png', color: '#EAB308' },
  { id: '18', brand: 'Sephora', value: '$25', category: 'Shopping', logo: 'https://picsum.photos/seed/sephora/200/200', color: '#000000' },
  { id: '19', brand: 'Nike', value: '$50', category: 'Shopping', logo: 'https://picsum.photos/seed/nike/200/200', color: '#000000' },
  { id: '20', brand: 'Adidas', value: '$50', category: 'Shopping', logo: 'https://picsum.photos/seed/adidas/200/200', color: '#000000' },

  // Food
  { id: '21', brand: "McDonald's", value: '$10', category: 'Food', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775581463/1775581364370_qtkuql.png', color: '#FFC72C' },
  { id: '22', brand: "McDonald's", value: '$25', category: 'Food', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775581463/1775581364370_qtkuql.png', color: '#FFC72C' },
  { id: '23', brand: 'Starbucks', value: '$15', category: 'Food', logo: 'https://picsum.photos/seed/starbucks/200/200', color: '#00704A' },
  { id: '24', brand: 'DoorDash', value: '$25', category: 'Food', logo: 'https://picsum.photos/seed/doordash/200/200', color: '#FF3008' },
  { id: '25', brand: 'Uber Eats', value: '$25', category: 'Food', logo: 'https://picsum.photos/seed/ubereats/200/200', color: '#06C167' },
  { id: '26', brand: 'Burger King', value: '$15', category: 'Food', logo: 'https://picsum.photos/seed/bk/200/200', color: '#F5EBDC' },
  { id: '27', brand: 'Chipotle', value: '$20', category: 'Food', logo: 'https://picsum.photos/seed/chipotle/200/200', color: '#A51619' },
  { id: '28', brand: 'Domino\'s', value: '$25', category: 'Food', logo: 'https://picsum.photos/seed/dominos/200/200', color: '#006491' },
  { id: '29', brand: 'Dunkin', value: '$10', category: 'Food', logo: 'https://picsum.photos/seed/dunkin/200/200', color: '#FF6719' },
  { id: '30', brand: 'Taco Bell', value: '$15', category: 'Food', logo: 'https://picsum.photos/seed/tacobell/200/200', color: '#702082' },

  // Entertainment
  { id: '31', brand: 'Netflix', value: '$15', category: 'Entertainment', logo: 'https://picsum.photos/seed/netflix/200/200', color: '#E50914' },
  { id: '32', brand: 'Netflix', value: '$30', category: 'Entertainment', logo: 'https://picsum.photos/seed/netflix/200/200', color: '#E50914' },
  { id: '33', brand: 'Spotify', value: '$10', category: 'Entertainment', logo: 'https://picsum.photos/seed/spotify/200/200', color: '#1DB954' },
  { id: '34', brand: 'Spotify', value: '$30', category: 'Entertainment', logo: 'https://picsum.photos/seed/spotify/200/200', color: '#1DB954' },
  { id: '35', brand: 'Hulu', value: '$25', category: 'Entertainment', logo: 'https://picsum.photos/seed/hulu/200/200', color: '#1CE783' },
  { id: '36', brand: 'Disney+', value: '$20', category: 'Entertainment', logo: 'https://picsum.photos/seed/disney/200/200', color: '#113CCF' },
  { id: '37', brand: 'YouTube Premium', value: '$15', category: 'Entertainment', logo: 'https://picsum.photos/seed/yt/200/200', color: '#FF0000' },
  { id: '38', brand: 'Crunchyroll', value: '$10', category: 'Entertainment', logo: 'https://picsum.photos/seed/crunchy/200/200', color: '#F47521' },
  { id: '39', brand: 'AMC Theatres', value: '$25', category: 'Entertainment', logo: 'https://picsum.photos/seed/amc/200/200', color: '#E21F26' },
  { id: '40', brand: 'Roblox Premium', value: '$10', category: 'Entertainment', logo: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', color: '#000000' },

  // Miscellaneous / Multi-Category
  { id: '41', brand: 'PayPal', value: '$25', category: 'Shopping', logo: 'https://picsum.photos/seed/paypal/200/200', color: '#003087' },
  { id: '42', brand: 'PayPal', value: '$50', category: 'Shopping', logo: 'https://picsum.photos/seed/paypal/200/200', color: '#003087' },
  { id: '43', brand: 'PayPal', value: '$100', category: 'Shopping', logo: 'https://picsum.photos/seed/paypal/200/200', color: '#003087' },
  { id: '44', brand: 'Visa Prepaid', value: '$50', category: 'Shopping', logo: 'https://picsum.photos/seed/visa/200/200', color: '#1A1F71' },
  { id: '45', brand: 'Visa Prepaid', value: '$100', category: 'Shopping', logo: 'https://picsum.photos/seed/visa/200/200', color: '#1A1F71' },
  { id: '46', brand: 'Apple', value: '$15', category: 'Gaming', logo: 'https://picsum.photos/seed/apple/200/200', color: '#000000' },
  { id: '47', brand: 'Apple', value: '$25', category: 'Gaming', logo: 'https://picsum.photos/seed/apple/200/200', color: '#000000' },
  { id: '48', brand: 'Twitch', value: '$25', category: 'Gaming', logo: 'https://picsum.photos/seed/twitch/200/200', color: '#9146FF' },
  { id: '49', brand: 'Discord Nitro', value: '$10', category: 'Gaming', logo: 'https://picsum.photos/seed/discord/200/200', color: '#5865F2' },
  { id: '50', brand: 'Uber', value: '$50', category: 'Shopping', logo: 'https://picsum.photos/seed/uber/200/200', color: '#000000' },
  { id: '51', brand: 'Airbnb', value: '$100', category: 'Shopping', logo: 'https://picsum.photos/seed/airbnb/200/200', color: '#FF5A5F' },
  { id: '52', brand: 'Minecraft', value: '$25', category: 'Gaming', logo: 'https://picsum.photos/seed/mc/200/200', color: '#388E3C' }
];

const REDIRECT_URL = "https://gameflashx.space/cl/i/277ood";

export default function GiftCardsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredRewards = useMemo(() => {
    return REWARDS.filter((reward) => {
      const matchesSearch = reward.brand.toLowerCase().includes(search.toLowerCase()) || 
                            reward.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || reward.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const categories: { label: Category; icon: any }[] = [
    { label: 'All', icon: <Zap className="w-3.5 h-3.5" /> },
    { label: 'Gaming', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { label: 'Shopping', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { label: 'Food', icon: <Utensils className="w-3.5 h-3.5" /> },
    { label: 'Entertainment', icon: <Tv className="w-3.5 h-3.5" /> },
  ];

  const handleRewardClick = () => {
    window.location.href = REDIRECT_URL;
  };

  return (
    <main className="min-h-screen bg-[#050b18] text-white selection:bg-primary">
      <Header />
      
      {/* 1. HERO HEADER */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Reward Discovery</span>
          </motion.div>
          <h1 className="font-headline text-4xl md:text-7xl font-[900] text-white uppercase tracking-tighter leading-none mb-6">
            Explore <span className="text-primary text-glow">Reward Options</span>
          </h1>
          <p className="text-white/40 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Browse available reward opportunities and complete partner offers to qualify. Our global network is active 24/7.
          </p>
        </div>
      </section>

      {/* 2. DISCOVERY CONTROLS */}
      <section className="sticky top-[56px] md:top-[72px] z-[50] bg-[#050b18]/80 backdrop-blur-xl border-y border-white/5 py-4 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={cn(
                  "flex items-center gap-2 px-4 h-10 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border",
                  activeCategory === cat.label 
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10"
                )}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search rewards..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-11 bg-white/5 border-white/10 rounded-xl focus:ring-primary/20 focus:border-primary/40 text-xs font-bold"
            />
          </div>
        </div>
      </section>

      {/* 3. REWARDS GRID */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredRewards.map((reward, idx) => (
                <motion.div
                  key={reward.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  className="group"
                >
                  <div 
                    onClick={handleRewardClick}
                    className="h-full glass-card rounded-[24px] border-white/10 p-5 md:p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_15px_40px_rgba(0,157,255,0.1)] relative overflow-hidden"
                  >
                    {/* Visual Decor */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at center, ${reward.color}, transparent 70%)` }}
                    />

                    {/* Logo Box */}
                    <div className="relative w-16 h-16 md:w-24 md:h-24 mb-6 transition-transform duration-500 group-hover:scale-110">
                      <Image 
                        src={reward.logo} 
                        alt={reward.brand} 
                        fill 
                        className="object-contain drop-shadow-2xl" 
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-1 mb-6 flex-grow">
                      <h3 className="text-sm md:text-lg font-black text-white uppercase tracking-tight line-clamp-1">
                        {reward.value} {reward.brand}
                      </h3>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                        {reward.category} Reward
                      </p>
                    </div>

                    {/* Action */}
                    <div className="w-full space-y-3">
                      <Button className="w-full h-10 md:h-12 bg-gradient-to-r from-primary to-cyan-500 hover:scale-[1.02] active:scale-[0.98] text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] rounded-xl transition-all shadow-lg border-none">
                        Continue <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                      </Button>
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">
                        Complete offers to qualify
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredRewards.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white/10" />
              </div>
              <h3 className="text-2xl font-black text-white/40 uppercase tracking-tight">No Rewards Found</h3>
              <p className="text-white/20 text-sm mt-2">Try searching for something else or change category.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. COMPLIANCE & TRUST */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card rounded-[2rem] p-8 md:p-12 border-white/5 bg-white/[0.02] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck className="w-48 h-48 text-primary" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Info className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Mandatory Disclosure</span>
              </div>
              
              <p className="text-[11px] md:text-sm text-white/40 leading-relaxed font-medium uppercase tracking-tight max-w-2xl mx-auto">
                Users must complete promotional offers to qualify for rewards. Some offers may require payment or additional steps. Completion and verification are required. Reward availability and specific requirements may vary based on region and offer provider.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] pt-6 border-t border-white/5">
                <div className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-primary" /> Secure Network</div>
                <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-primary" /> Global Coverage</div>
                <div className="flex items-center gap-2"><Zap className="w-3 h-3 text-primary" /> Verified Users Only</div>
              </div>

              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                Available for users 18+ in supported regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
