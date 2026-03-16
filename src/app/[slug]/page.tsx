
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { giftCards } from '@/lib/gift-cards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { generateGiftCardDescription } from '@/ai/flows/generate-gift-card-description-flow';
import Image from 'next/image';
import { Zap, ShieldCheck, Clock, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    keyFeatures: ["Instant Delivery", "Digital Rewards", "Global Region Support"]
  });

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-fade-in-up">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative glass-card aspect-video rounded-3xl overflow-hidden border-white/20 shadow-2xl group">
                <Image 
                  src={imageData.imageUrl}
                  alt={card.brand}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
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
                  <span className="text-sm font-bold text-white mb-1">Secure</span>
                  <span className="text-xs text-muted-foreground">Encrypted Delivery</span>
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <Clock className="text-primary w-8 h-8 mb-3" />
                  <span className="text-sm font-bold text-white mb-1">Fast</span>
                  <span className="text-xs text-muted-foreground">Instant Processing</span>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Available in USA, UK, CA, AU</span>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl font-black mb-6 text-white leading-none">
                Get Free <br /><span className="text-primary text-glow">{card.brand}</span> Gift Cards
              </h1>
              
              <div className="glass-card p-8 rounded-3xl mb-10 border-white/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Zap className="w-32 h-32" />
                </div>
                <p className="text-lg text-white/90 leading-relaxed relative z-10">
                  {aiDescription.description}
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Select Reward Value</h3>
                <div className="flex flex-wrap gap-4">
                  {card.values.map(val => (
                    <button key={val} className="w-24 h-24 glass-card rounded-2xl flex flex-col items-center justify-center border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all group">
                      <span className="text-xs font-bold text-muted-foreground group-hover:text-primary mb-1 uppercase">Claim</span>
                      <span className="text-2xl font-black text-white">{val}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button asChild className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black px-16 h-16 rounded-2xl text-xl shadow-2xl shadow-primary/20">
                <Link href="/">Unlock Reward Now <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
