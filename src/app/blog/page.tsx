import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { blogPosts } from '@/lib/blog-posts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, ChevronRight, User, Clock } from 'lucide-react';
import Link from 'next/link';

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              Platform <span className="text-primary text-glow">Insights</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay updated with the latest guides, reward tips, and platform updates from the GameFlashX team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="glass-card border-white/10 hover:border-primary/40 transition-all duration-500 overflow-hidden rounded-[2rem] h-full flex flex-col">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-black uppercase text-primary tracking-widest">{post.category}</span>
                      </div>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{post.date}</span>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-8 flex-grow">
                      {post.introduction}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-bold text-white/60">{post.author.name}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
