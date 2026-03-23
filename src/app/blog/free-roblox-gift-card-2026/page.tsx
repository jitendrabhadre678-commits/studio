import type { Metadata } from 'next';
import RobloxBlogClient from './RobloxBlogClient';

/**
 * @fileOverview Server component for the 2026 Roblox gift card guide.
 * Handles SEO metadata and serves the client-side content using the new template.
 */

export const metadata: Metadata = {
  title: 'Free Roblox Gift Card 2026 — Get Free Robux Instantly — GameFlashX',
  description: 'Unlock your free roblox gift card in 2026. Learn how to get free robux 2026 and roblox gift card codes by completing simple tasks on GameFlashX.',
  keywords: 'free roblox gift card, free robux 2026, roblox gift card codes, free roblox codes, gaming rewards',
};

export default function Page() {
  return <RobloxBlogClient />;
}
