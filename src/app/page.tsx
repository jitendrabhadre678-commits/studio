import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { FeaturedRewards } from '@/components/sections/FeaturedRewards';
import { TrendingRewards } from '@/components/sections/TrendingRewards';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { FAQ } from '@/components/sections/FAQ';
import { TrustBadges } from '@/components/sections/TrustBadges';
import { Footer } from '@/components/layout/Footer';
import { LiveActivity } from '@/components/sections/LiveActivity';
import { CommunityHub } from '@/components/sections/CommunityHub';
import { categories } from '@/lib/gift-cards';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      <TrustBadges />

      {/* Categories Bar */}
      <section id="categories" className="py-12 bg-black/20 overflow-hidden">
        <div className="container mx-auto px-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-between gap-8 min-w-max md:min-w-0">
            {categories.map((cat) => (
              <Link 
                key={cat} 
                href={`#${cat.toLowerCase()}`}
                className="flex items-center gap-2 group whitespace-nowrap"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                  <Zap className="w-4 h-4 text-white/40 group-hover:text-primary" />
                </div>
                <span className="text-xs font-black text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedRewards />
      
      <HowItWorks />

      <TrendingRewards />

      <ReviewsSection />

      <Testimonials />

      <CommunityHub />

      <FAQ />

      <LiveActivity />
      <Footer />
    </main>
  );
}