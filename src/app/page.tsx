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
 * @fileOverview Redesigned Homepage Layout with Seamless Liquid Wave Transitions.
 * Order: Hero -> Wave -> Trending Rewards -> Wave (Up) -> Trust Signals -> Wave (Down) -> How it Works -> Social Proof -> Community -> FAQ -> Footer.
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0f0c29] to-[#050505] selection:bg-primary selection:text-white overflow-x-hidden">
      <Header />
      
      {/* 1. Hero Section */}
      <div className="relative">
        <Hero />
      </div>
      
      <WaveDivider direction="down" className="relative z-20" />

      {/* 2. Trending Gift Cards */}
      <div className="relative z-10 bg-black/5">
        <TrendingRewards />
      </div>

      <WaveDivider direction="up" className="relative z-20" />

      {/* 3. Trust & Credibility */}
      <div className="relative z-10 bg-black/10">
        <TrustBadges />
      </div>
      
      <WaveDivider direction="down" className="relative z-20" />

      {/* 4. Education */}
      <div className="relative z-10">
        <HowItWorks />
      </div>

      <WaveDivider direction="up" className="relative z-20" />

      {/* 5. Social Proof */}
      <div className="relative z-10 bg-black/5">
        <ReviewsSection />
      </div>

      <WaveDivider direction="down" className="relative z-20" />

      {/* 6. Community Engagement */}
      <div className="relative z-10">
        <CommunityHub />
      </div>

      {/* 7. Support & Closure */}
      <div className="relative z-10 bg-black/20">
        <FAQ />
      </div>

      <Footer />
    </main>
  );
}
