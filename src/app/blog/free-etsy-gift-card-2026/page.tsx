import type { Metadata } from 'next';
import EtsyBlogClient from './EtsyBlogClient';

/**
 * @fileOverview Server component for the 2026 Etsy gift card guide.
 * Handles SEO metadata and serves the client-side content.
 */

export const metadata: Metadata = {
  title: 'Free Etsy Gift Card 2026 — Get Free Etsy Shopping Credits — GameFlashX',
  description: 'Unlock your free etsy gift card in 2026. Learn how to get free etsy credits 2026 and etsy gift card codes by completing simple tasks on GameFlashX.',
  keywords: 'free etsy gift card, free etsy credits 2026, etsy gift card codes, shopping rewards',
};

export default function Page() {
  return <EtsyBlogClient />;
}
