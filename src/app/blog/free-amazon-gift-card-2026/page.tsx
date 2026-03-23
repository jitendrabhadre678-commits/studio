import type { Metadata } from 'next';
import AmazonBlogClient from './AmazonBlogClient';

/**
 * @fileOverview Server component for the 2026 Amazon gift card guide.
 * Handles SEO metadata and serves the client-side content.
 */

export const metadata: Metadata = {
  title: 'How to Get a Free Amazon Gift Card in 2026 — GameFlashX',
  description: 'Learn the best ways to get a free amazon gift card 2026. Complete simple tasks and claim amazon gift card rewards instantly on GameFlashX.',
  keywords: 'free amazon gift card, free amazon gift card 2026, claim amazon gift card, gaming rewards',
};

export default function Page() {
  return <AmazonBlogClient />;
}
