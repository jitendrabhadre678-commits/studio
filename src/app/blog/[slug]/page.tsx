
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { blogPosts } from '@/lib/blog-posts';
import { giftCards } from '@/lib/gift-cards';
import { generateProductBlog } from '@/ai/flows/generate-product-blog-flow';
import { BlogPostTemplate } from '@/components/blog/BlogPostTemplate';
import { ProductBlogView } from '@/components/blog/ProductBlogView';
import { Button } from '@/components/ui/button';
import { Zap, Clock, User, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const staticSlugs = blogPosts.map((post) => ({
    slug: post.slug,
  }));

  const dynamicSlugs = giftCards.map((card) => ({
    slug: `how-to-get-${card.slug}-2026`,
  }));

  return [...staticSlugs, ...dynamicSlugs];
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Check for Static Blog Posts
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-12 text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">{staticPost.category}</span>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
                {staticPost.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-bold text-white/80">{staticPost.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white/40" />
                  <span>{staticPost.date}</span>
                </div>
              </div>
            </div>

            <article className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 mb-16 space-y-10 leading-relaxed text-white/90">
              <section>
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Introduction</h2>
                <p>{staticPost.introduction}</p>
              </section>
              <section>
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">What is a {staticPost.category} Gift Card?</h2>
                <p>{staticPost.whatIs}</p>
              </section>
              <section>
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">How Users Unlock Rewards</h2>
                <p>{staticPost.howToUnlock}</p>
              </section>
              <section>
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Conclusion</h2>
                <p>{staticPost.conclusion}</p>
              </section>
            </article>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // 2. Check for Dynamic Product Guides
  if (slug.startsWith('how-to-get-') && slug.endsWith('-2026')) {
    const productSlug = slug.replace('how-to-get-', '').replace('-2026', '');
    const product = giftCards.find(c => c.slug === productSlug);

    if (product) {
      const aiContent = await generateProductBlog({
        productName: product.brand,
        category: product.category,
        description: product.description
      });

      if (aiContent) {
        return <ProductBlogView productName={product.brand} category={product.category} data={aiContent} />;
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="font-black text-6xl text-white mb-4">404</h1>
      <p className="text-muted-foreground uppercase tracking-widest font-bold">The guide you are looking for is currently being generated.</p>
      <Button asChild className="mt-8 bg-primary">
        <Link href="/blog">Back to Platform Insights</Link>
      </Button>
    </div>
  );
}
