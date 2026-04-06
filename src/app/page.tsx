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
import { RadialGlowDivider } from '@/components/ui/RadialGlowDivider';

/**
 * @fileOverview Refined Homepage with Sharper Glass Panels.
 * All sections now use rounded-2xl for a more professional SaaS aesthetic.
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0f0c29] to-[#050505] selection:bg-primary selection:text-white overflow-x-hidden">
      <Header />
      
      {/* 1. Hero Section - Full Width Entry */}
      <div className="relative">
        <Hero />
      </div>
      
      {/* 2. Trending Rewards Panel */}
      <section className="container mx-auto px-4 mt-[-60px] relative z-20">
        <div className="glass-card rounded-2xl border-white/10 shadow-2xl overflow-hidden bg-white/[0.03] backdrop-blur-xl">
          <TrendingRewards />
          <WaveDivider direction="down" className="opacity-50" />
        </div>
      </section>

      {/* 3. Trust & Credibility Panel */}
      <section className="container mx-auto px-4 my-8 relative z-10">
        <div className="glass-card rounded-2xl border-white/10 shadow-2xl p-4 bg-white/[0.03] backdrop-blur-xl">
          <TrustBadges />
        </div>
      </section>

      {/* 4. Workflow Panel */}
      <section className="container mx-auto px-4 my-8 relative z-10">
        <div className="glass-card rounded-2xl border-white/10 shadow-2xl overflow-hidden bg-white/[0.03] backdrop-blur-xl">
          <WaveDivider direction="up" className="opacity-30" />
          <HowItWorks />
          <RadialGlowDivider intensity="low" />
        </div>
      </section>

      {/* 5. Social Proof Panel */}
      <section className="container mx-auto px-4 my-8 relative z-10">
        <div className="glass-card rounded-2xl border-white/10 shadow-2xl overflow-hidden bg-white/[0.03] backdrop-blur-xl">
          <ReviewsSection />
        </div>
      </section>

      {/* 6. Community Panel */}
      <section className="container mx-auto px-4 my-8 relative z-10">
        <div className="glass-card rounded-2xl border-white/10 shadow-2xl overflow-hidden bg-white/[0.03] backdrop-blur-xl">
          <CommunityHub />
          <div className="h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </section>

      {/* 7. FAQ Panel */}
      <section className="container mx-auto px-4 my-8 mb-24 relative z-10">
        <div className="glass-card rounded-2xl border-white/10 shadow-2xl p-4 bg-white/[0.03] backdrop-blur-xl">
          <FAQ />
        </div>
      </section>

      <Footer />
    </main>
  );
}
