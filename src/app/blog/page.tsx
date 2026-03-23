import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

/**
 * @fileOverview Specialized Blog Index Page for 2026 Guides.
 * Displays only the primary 2026 reward posts in a premium grid.
 */

const customPosts = [
  {
    title: "How to Get a Free Amazon Gift Card in 2026",
    slug: "free-amazon-gift-card-2026",
    description: "Learn how to secure a free amazon gift card in 2026. Explore verified methods to claim rewards through gaming activities and simple tasks.",
    category: "Shopping",
    date: "March 2026",
    author: {
      name: "Alex Rivera",
      initials: "AR"
    }
  },
  {
    title: "Free Roblox Gift Card Codes 2026",
    slug: "free-roblox-gift-card-2026",
    description: "Unlock free roblox gift card codes and get robux 2026. Join the top-rated community for gaming rewards and digital codes.",
    category: "Gaming",
    date: "March 2026",
    author: {
      name: "Jake Thompson",
      initials: "JT"
    }
  },
  {
    title: "Free Steam Gift Card 2026",
    slug: "free-steam-gift-card-2026",
    description: "Get your free steam gift card 2026 today. Access unused steam wallet codes and free steam games by completing verified activities.",
    category: "PC Gaming",
    date: "March 2026",
    author: {
      name: "Sarah Mitchell",
      initials: "SM"
    }
  }
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white font-body selection:bg-[#ff4d00] selection:text-white">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 bg-[#ff4d00]/10 border border-[#ff4d00]/20 px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5 text-[#ff4d00]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">Exclusive Guides 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">
              Platform <span className="text-[#ff4d00]">Insights</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">
              Stay updated with the most reliable methods to unlock premium digital rewards and gaming currency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                <Card className="bg-[#1a1a1a] border-white/5 group-hover:border-[#ff4d00]/40 transition-all duration-500 overflow-hidden rounded-[2rem] h-full flex flex-col shadow-2xl">
                  <CardContent className="p-8 flex flex-col h-full relative">
                    <div className="flex justify-between items-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-[#ff4d00]/10 border border-[#ff4d00]/20 px-3 py-1 rounded-full">
                        <Zap className="w-3 h-3 text-[#ff4d00]" />
                        <span className="text-[10px] font-black uppercase text-[#ff4d00] tracking-widest">{post.category}</span>
                      </div>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{post.date}</span>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-4 group-hover:text-[#ff4d00] transition-colors leading-tight uppercase tracking-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-sm text-white/60 line-clamp-3 mb-8 flex-grow leading-relaxed">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#ff4d00] flex items-center justify-center text-white text-[10px] font-black shrink-0">
                          {post.author.initials}
                        </div>
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#ff4d00] tracking-[0.2em] transition-all group-hover:gap-3">
                        Read More <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
