import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { giftCards } from '@/lib/gift-cards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { generateGiftCardDescription } from '@/ai/flows/generate-gift-card-description-flow';
import Image from 'next/image';
import { Zap, ShieldCheck, Clock, Globe, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InteractiveCouponCard } from '@/components/reward/InteractiveCouponCard';

export async function generateStaticParams() {
  return giftCards.map((card) => ({
    slug: card.slug,
  }));
}

export default async function GiftCardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = giftCards.find((c) => c.slug === slug);

  if (!card) return <div>Not Found</div>;

  const imageData = PlaceHolderImages.find(img => img.id === card.image) || PlaceHolderImages[0];
  
  // Use the AI flow to generate a description for the specific card
  const aiDescription = await generateGiftCardDescription({
    brandName: card.brand,
    value: card.values[card.values.length - 1],
    category: card.category,
    keyFeatures: ["Instant Digital Delivery", "Secured Connection", "Global Gift Support"]
  });

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative animate-fade-in-up">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative glass-card aspect-video rounded-3xl overflow-hidden border-white/20 shadow-2xl group">
                <Image 
                  src={imageData.imageUrl}
                  alt={card.brand}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-primary/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl border border-white/20 animate-float">
                    <span className="text-4xl font-headline font-black text-white uppercase tracking-tighter">
                      {card.brand} Rewards
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <ShieldCheck className="text-primary w-8 h-8 mb-3" />
                  <span className="text-sm font-bold text-white mb-1">Secured</span>
                  <span className="text-xs text-muted-foreground">SSL Encrypted</span>
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <Clock className="text-primary w-8 h-8 mb-3" />
                  <span className="text-sm font-bold text-white mb-1">Instant</span>
                  <span className="text-xs text-muted-foreground">Global Delivery</span>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Active Regional Support</span>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl font-black mb-6 text-white leading-none">
                Claim Your <br /><span className="text-primary text-glow">{card.brand}</span> Reward
              </h1>
              
              <div className="glass-card p-8 rounded-3xl mb-10 border-white/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Zap className="w-32 h-32" />
                </div>
                <p className="text-lg text-white/90 leading-relaxed relative z-10">
                  {aiDescription.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                <Shield className="w-4 h-4 text-primary" />
                Fraud Protection Active
                <span className="h-1 w-1 bg-white/20 rounded-full" />
                256-bit AES Encryption
              </div>
            </div>
          </div>

          {/* Coupon Gallery Section */}
          <section id="coupons" className="scroll-mt-32 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">Claim Center</span>
              <h2 className="font-headline text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Available <span className="text-primary">Reward Values</span></h2>
            </div>

            <div className="space-y-4">
              {card.values.map((val) => (
                <InteractiveCouponCard 
                  key={val}
                  brand={card.brand}
                  value={val}
                  description={`Generate a unique digital reward code for ${card.brand} valued at ${val}.`}
                />
              ))}
            </div>

            <div className="mt-20 p-8 glass-card rounded-[2.5rem] text-center border-white/5">
              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-6">Our automated support system is available 24/7 for gift card inquiries.</p>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white font-bold rounded-xl px-8 h-12">
                Contact Support
              </Button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}