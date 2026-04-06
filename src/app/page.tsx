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
import { GlassDivider } from '@/components/ui/GlassDivider';

/**
 * @fileOverview Redesigned Homepage Layout with Orchestrated Minimal Dividers.
 * Visual Rhythm: Hero -> Wave -> Trending -> Radial Glow -> Trust -> Wave (Up) -> How it Works -> Radial Glow -> Reviews -> Wave -> Community -> Minimal Line -> FAQ -> Footer.
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
      <div className="relative z-10 bg-[#050505]">
        <TrendingRewards />
      </div>

      {/* Cinematic Transition: Trending -> Trust */}
      <RadialGlowDivider intensity="high" className="z-20 -mt-10" />

      {/* 3. Trust & Credibility */}
      <div className="relative z-10 bg-[#050505]">
        <TrustBadges />
      </div>
      
      <WaveDivider direction="up" className="relative z-20" />

      {/* 4. Education (Horizontal Wire Flow) */}
      <div className="relative z-10 bg-transparent">
        <HowItWorks />
      </div>

      {/* Cinematic Transition: How it Works -> Reviews */}
      <RadialGlowDivider intensity="medium" className="z-20" />

      {/* 5. Social Proof */}
      <div className="relative z-10 bg-[#050505]">
        <ReviewsSection />
      </div>

      <WaveDivider direction="down" className="relative z-20" />

      {/* 6. Community Engagement */}
      <div className="relative z-10 bg-[#050505]">
        <CommunityHub />
      </div>

      {/* 7. Logic Break: Minimal Separator */}
      <div className="py-10">
        <GlassDivider className="z-20" />
      </div>

      {/* 8. Support & Closure */}
      <div className="relative z-10 bg-black/20">
        <FAQ />
      </div>

      <Footer />
    </main>
  );
}
