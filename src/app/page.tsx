import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { TrendingRewards } from '@/components/sections/TrendingRewards';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/layout/Footer';
import { CommunityHub } from '@/components/sections/CommunityHub';
import { TrustBadges } from '@/components/sections/TrustBadges';

/**
 * @fileOverview Redesigned Homepage Layout.
 * Order: Hero -> Trending Rewards (Primary Goal) -> Trust Signals -> How it Works -> Social Proof -> Support.
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0f0c29] to-[#050505] selection:bg-primary selection:text-white">
      <Header />
      
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Trending Gift Cards (Immediate conversion) */}
      <TrendingRewards />

      {/* 3. Trust & Credibility */}
      <TrustBadges />
      
      {/* 4. Education */}
      <HowItWorks />

      {/* 5. Social Proof */}
      <ReviewsSection />

      {/* 6. Community Engagement */}
      <CommunityHub />

      {/* 7. Support & Closure */}
      <FAQ />

      <Footer />
    </main>
  );
}
