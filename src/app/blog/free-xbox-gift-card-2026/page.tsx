import type { Metadata } from 'next';
import XboxBlogClient from './XboxBlogClient';

/**
 * @fileOverview Server component for the 2026 Xbox gift card guide.
 * Handles SEO metadata and serves the client-side content using the template.
 */

export const metadata: Metadata = {
  title: 'Free Xbox Gift Card 2026 — Get Free Xbox Game Pass Credits — GameFlashX',
  description: 'Secure your free xbox gift card in 2026. Learn how to get free xbox game pass 2026 and xbox gift card codes by completing simple tasks on GameFlashX.',
  keywords: 'free xbox gift card, free xbox game pass 2026, xbox gift card codes, free xbox codes, gaming rewards',
};

export default function Page() {
  return <XboxBlogClient />;
}
