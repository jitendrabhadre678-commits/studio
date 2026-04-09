import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {FirebaseClientProvider} from '@/firebase/client-provider';
import {AuthRedirectListener} from '@/components/auth/AuthRedirectListener';
import {ReferralTracker} from '@/components/referral/ReferralTracker';
import {SupportChat} from '@/components/support/SupportChat';
import {LiveActivity} from '@/components/sections/LiveActivity';
import {GlobalFloatingBackground} from '@/components/layout/GlobalFloatingBackground';
import {CookieBanner} from '@/components/layout/CookieBanner';

export const metadata: Metadata = {
  title: 'GameFlashX — Earn Gift Card Rewards Online',
  description: 'Participate in partner offers to secure gift cards for Amazon, Steam, Roblox, Xbox, and more. Global reward network with verified session completion.',
  keywords: 'gift card rewards, earn rewards online, partner offers, roblox rewards, amazon rewards, reward catalog',
  robots: 'index, follow',
  openGraph: {
    title: 'GameFlashX — Earn Gift Card Rewards Online',
    description: 'Complete simple partner offers to unlock rewards. Verified reward opportunities for gamers and shoppers.',
    url: 'https://gameflashx.com',
    siteName: 'GameFlashX',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://gameflashx.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GameFlashX — Reward Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameFlashX — Earn Gift Card Rewards Online',
    description: 'Unlock gift card opportunities by engaging with partner offers.',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white relative bg-[#050b18]" suppressHydrationWarning>
        <FirebaseClientProvider>
          <AuthRedirectListener />
          <ReferralTracker />
          
          <GlobalFloatingBackground />
          
          <div className="relative z-10">
            {children}
          </div>
          
          <LiveActivity />
          <SupportChat />
          <CookieBanner />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
