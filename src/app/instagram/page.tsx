import type { Metadata } from 'next';
import InstagramClient from './InstagramClient';

/**
 * @fileOverview Server component for the Instagram bio landing page.
 * Handles SEO metadata and serves the mobile-optimized client UI.
 */

export const metadata: Metadata = {
  title: 'Free Gift Cards 2026 — Claim Yours Now | GameFlashX',
  description: 'Claim free Amazon, Steam, Roblox, PayPal, Xbox and PlayStation gift cards. Complete one offer and get your reward instantly.',
};

export default function InstagramPage() {
  return <InstagramClient />;
}
