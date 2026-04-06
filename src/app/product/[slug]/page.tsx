import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { giftCards } from '@/lib/gift-cards';
import { generateGiftCardDescription } from '@/ai/flows/generate-gift-card-description-flow';
import { Zap, ShieldCheck, Clock, Globe, Shield, Star, CheckCircle2 } from 'lucide-react';
import { InteractiveCouponCard } from '@/components/reward/InteractiveCouponCard';
import { SupportTrigger } from '@/components/support/SupportTrigger';
import { Metadata } from 'next';
import Image from 'next/image';

/**
 * @fileOverview Individual Product Detail Page.
 * Updated with premium logo visuals and brand-specific glows.
 */

export async function generateStaticParams() {
  return giftCards.map((card) => ({
    slug: card.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = giftCards.find((c) => c.slug === slug);
  
  if (!card) return { title: 'Reward Not Found' };

  return {
    title: `Unlock Free ${card.brand} Gift Card 2026 — GameFlashX`,
    description: `Claim your free ${card.brand} reward code instantly. Complete 1 simple step and unlock verified ${card.brand} credits on GameFlashX.`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = giftCards.find((c) => c.slug === slug);

  if (!card) return <div className="min-h-screen flex items-center justify-center text-white font-black text-4xl">404 - REWARD NOT FOUND</div>;
  
  let displayDescription = card.description;
  try {
    const aiDescription = await generateGiftCardDescription({
      brandName: card.brand,
      value: card.values[card.values.length - 1],
      category: card.category,
      keyFeatures: ["Instant Digital Delivery", "Secured Connection", "Global Gift Support"]
    });
    
    if (aiDescription && aiDescription.description) {
      displayDescription = aiDescription.description;
    }
  } catch (error) {
    displayDescription = card.description;
  }

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-primary selection:text-white">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Hero Content Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative animate-fade-in-up">
              <div 
                className="absolute inset-0 blur-[120px] rounded-full opacity-30" 
                style={{ background: card.glowColor || '#FA4616' }}
              />
              
              {/* Premium Logo Visual Container */}
              <div 
                className="relative glass-card aspect-[16/10] rounded-2xl overflow-hidden border-white/20 shadow-2xl flex items-center justify-center group bg-[#0a0a0a]"
              >
                <div 
                  className="absolute inset-0 opacity-20 blur-3xl"
                  style={{ background: `radial-gradient(circle at center, ${card.glowColor || '#FA4616'}88, transparent 70%)` }}
                />
                
                {card.logoUrl ? (
                  <div className="relative z-10 w-32 md:w-48 h-32 md:h-48 transition-transform duration-700 group-hover:scale-110">
                    <Image 
                      src={card.logoUrl}
                      alt={card.brand}
                      fill
                      className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                      priority
                    />
                  </div>
                ) : (
                  <span className="relative z-10 font-headline font-black text-white text-4xl md:text-6xl uppercase tracking-tighter text-center [text-shadow:0_0_30px_rgba(255,255,255,0.4)] px-8 leading-none">
                    {card.brand}
                  </span>
                )}
                
                <div className="absolute bottom-8 right-8 bg-primary/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-white/20 animate-float hidden md:block">
                  <span className="text-xl font-headline font-black text-white uppercase tracking-tighter">
                    Official Reward
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center border-white/5">
                  <ShieldCheck className="text-primary w-8 h-8 mb-3" />
                  <span className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Secured</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">SSL Encrypted</span>
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center border-white/5">
                  <Clock className="text-primary w-8 h-8 mb-3" />
                  <span className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Instant</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Global Delivery</span>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Active Regional Support</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">12,800+ Verified Claims</span>
              </div>

              <h1 className="font-headline text-5xl md:text-7xl font-black mb-6 text-white leading-none uppercase tracking-tighter">
                Unlock Your <br /><span className="text-primary text-glow">{card.brand}</span> Code
              </h1>
              
              <div className="glass-card p-8 rounded-2xl mb-10 border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Zap className="w-32 h-32" />
                </div>
                <p className="text-lg text-white/90 leading-relaxed relative z-10 font-medium">
                  {displayDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Fraud Protection Active
                </div>
                <span className="h-1 w-1 bg-white/20 rounded-full" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Verified Merchant Sourced
                </div>
              </div>
            </div>
          </div>

          {/* Value Options Section */}
          <section id="coupons" className="scroll-mt-32 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">Selection Center</span>
              <h2 className="font-headline text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Choose Your <span className="text-primary">Reward Value</span></h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-4">
                Select the denomination you wish to earn. You only need to complete one quick activity to release your unique digital code.
              </p>
            </div>

            <div className="space-y-4">
              {card.values.map((val) => (
                <InteractiveCouponCard 
                  key={val}
                  brand={card.brand}
                  value={val}
                  description={`Unlock your verified ${val} ${card.brand} gift card by completing a quick human session verification.`}
                />
              ))}
            </div>

            <div className="mt-24 p-12 glass-card rounded-[3rem] text-center border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-48 h-48 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Need Support with {card.brand}?</h3>
              <p className="text-muted-foreground mb-10 max-w-lg mx-auto">Our automated assistance network is available 24/7 to help you with the unlock process and code redemption.</p>
              <SupportTrigger />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
