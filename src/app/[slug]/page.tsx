import { redirect } from 'next/navigation';
import { giftCards } from '@/lib/gift-cards';

/**
 * @fileOverview Redirect route to handle root-level slugs.
 * Next.js will favor specific routes (/product/[slug]) over this one.
 * Redirects to the canonical product detail page.
 */

export async function generateStaticParams() {
  return giftCards.map((card) => ({
    slug: card.slug,
  }));
}

export default async function SlugRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // If it's a product slug, redirect to /product/slug
  const card = giftCards.find((c) => c.slug === slug);
  if (card) {
    redirect(`/product/${slug}`);
  }

  // Otherwise fallback or 404
  return <div className="min-h-screen flex items-center justify-center text-white font-black text-4xl">404 - NOT FOUND</div>;
}