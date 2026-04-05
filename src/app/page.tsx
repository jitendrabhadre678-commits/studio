
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { TrendingRewards } from '@/components/sections/TrendingRewards';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/layout/Footer';
import { CommunityHub } from '@/components/sections/CommunityHub';
import { TrustBadges } from '@/components/sections/TrustBadges';
import { WaveDivider } from '@/components/ui/WaveDivider';

/**
 * @fileOverview Redesigned Homepage Layout with Liquid Wave Transitions.
 * Order: Hero -> Wave -> Trending Rewards -> Wave (Up) -> Trust Signals -> Wave (Down) -> How it Works -> Social Proof -> Community -> FAQ -> Footer.
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0f0c29] to-[#050505] selection:bg-primary selection:text-white overflow-hidden">
      <Header />
      
      {/* 1. Hero Section */}
      <Hero />
      
      <WaveDivider direction="down" className="opacity-80" />

      {/* 2. Trending Gift Cards */}
      <TrendingRewards />

      <WaveDivider direction="up" className="opacity-60" />

      {/* 3. Trust & Credibility */}
      <TrustBadges />
      
      <WaveDivider direction="down" className="opacity-40" />

      {/* 4. Education */}
      <HowItWorks />

      <WaveDivider direction="up" className="opacity-30" />

      {/* 5. Social Proof */}
      <ReviewsSection />

      <WaveDivider direction="down" className="opacity-20" />

      {/* 6. Community Engagement */}
      <CommunityHub />

      {/* 7. Support & Closure */}
      <FAQ />

      <Footer />
    </main>
  );
}
