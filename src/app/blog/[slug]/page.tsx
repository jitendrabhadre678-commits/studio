import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { blogPosts } from '@/lib/blog-posts';
import { Button } from '@/components/ui/button';
import { Zap, Clock, User, Globe, Instagram, Youtube, Twitter, Disc as Discord, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <div className="min-h-screen flex items-center justify-center text-white font-black text-4xl">404 - ARTICLE NOT FOUND</div>;

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Article Header */}
          <div className="mb-12 text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">{post.category}</span>
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="font-bold text-white/80">{post.author.name}</span>
                <span className="opacity-40">—</span>
                <span className="text-[10px] uppercase tracking-widest font-black text-primary">{post.author.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/40" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/40" />
                <span>Global Access</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <article className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 mb-16 space-y-10 leading-relaxed text-white/90">
            <section>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Introduction</h2>
              <p>{post.introduction}</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">What is a {post.category} Gift Card?</h2>
              <p>{post.whatIs}</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">How Users Unlock Rewards</h2>
              <p>{post.howToUnlock}</p>
            </section>

            <section className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight flex items-center gap-2">
                <Zap className="text-primary w-5 h-5" /> Popular Reward Values
              </h2>
              <div className="flex flex-wrap gap-4">
                {post.values.map((val) => (
                  <div key={val} className="px-6 py-3 bg-primary/20 border border-primary/40 rounded-xl font-black text-primary">
                    {val}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Tips for Using Gift Cards</h2>
              <ul className="space-y-4">
                {post.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-[10px] font-black text-primary border border-primary/40">
                      {idx + 1}
                    </div>
                    <p>{tip}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Conclusion</h2>
              <p>{post.conclusion}</p>
            </section>
          </article>

          {/* CTA Section */}
          <div className="glass-card p-12 rounded-[3rem] border-primary/20 text-center relative overflow-hidden group mb-12">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-48 h-48" />
            </div>
            
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Complete tasks and unlock rewards today</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of daily active users who are already cashing out gift cards for their favorite platforms.
            </p>
            
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-black px-12 h-16 rounded-2xl text-xl shadow-2xl shadow-primary/30 group/btn">
              <Link href="/#trending">
                Earn Rewards Now <ArrowRight className="ml-2 w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Follow GameFlashX for updates and new rewards</p>
            <div className="flex justify-center gap-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, href: "#" },
                { icon: <Twitter className="w-5 h-5" />, label: "TikTok", href: "#" }, // Using Twitter icon for TikTok as placeholder
                { icon: <Youtube className="w-5 h-5" />, href: "#" },
                { icon: <Discord className="w-5 h-5" />, href: "#" },
              ].map((social, idx) => (
                <Link key={idx} href={social.href} className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-all">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
