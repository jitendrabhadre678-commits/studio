
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { TrendingRewards } from '@/components/sections/TrendingRewards';
import { CreatorProgram } from '@/components/sections/CreatorProgram';
import { Footer } from '@/components/layout/Footer';
import { LiveActivity } from '@/components/sections/LiveActivity';
import { giftCards, categories } from '@/lib/gift-cards';
import { Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Categories Bar */}
      <section id="categories" className="py-12 border-y border-white/5 bg-black/20">
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
                <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrendingRewards />

      <CreatorProgram />

      {/* Community Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-96 h-96" />
            </div>
            
            <h2 className="font-headline text-4xl md:text-6xl font-black mb-6 text-white leading-tight max-w-4xl mx-auto">
              Ready to claim your first reward? Join our <span className="text-primary text-glow">Exclusive Community</span> today.
            </h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
              Unlock creator rewards, promotion clips, content templates, and exclusive offers. 
              Our 24/7 community support is here to help you maximize your earnings.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="https://whop.com/gameflashx" className="bg-primary hover:bg-primary/90 text-white font-black px-12 h-16 rounded-2xl text-xl flex items-center shadow-2xl shadow-primary/20 group/btn">
                Join GameFlashX on Whop
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Links Section */}
      <section className="py-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            {giftCards.map(card => (
              <Link key={card.id} href={`/${card.slug}`} className="hover:text-primary transition-colors">
                {card.brand} Rewards
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LiveActivity />
      <Footer />
    </main>
  );
}
