
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { blogPosts } from '@/lib/blog-posts';
import { Button } from '@/components/ui/button';
import { Zap, Clock, User, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.4 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

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
                { icon: <InstagramIcon className="w-5 h-5" />, href: "#" },
                { icon: <TwitterIcon className="w-5 h-5" />, href: "#" },
                { icon: <YoutubeIcon className="w-5 h-5" />, href: "#" },
                { icon: <DiscordIcon className="w-5 h-5" />, href: "#" },
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
