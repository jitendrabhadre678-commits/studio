import type { Metadata } from 'next';
import SteamBlogClient from './SteamBlogClient';

/**
 * @fileOverview Server component for the 2026 Steam gift card guide.
 * Handles SEO metadata and serves the client-side content.
 */

export const metadata: Metadata = {
  title: 'Free Steam Gift Card 2026 — Unlock Free Steam Wallet Codes — GameFlashX',
  description: 'Unlock your free steam gift card in 2026. Learn how to get free steam wallet code 2026 and steam gift card codes to play free steam games today.',
  keywords: 'free steam gift card, free steam wallet code 2026, steam gift card codes, free steam games, gaming rewards',
};

export default function Page() {
  return <SteamBlogClient />;
}
