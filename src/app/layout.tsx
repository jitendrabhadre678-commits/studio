import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {FirebaseClientProvider} from '@/firebase/client-provider';
import {AuthRedirectListener} from '@/components/auth/AuthRedirectListener';
import {ReferralTracker} from '@/components/referral/ReferralTracker';
import {SupportChat} from '@/components/support/SupportChat';

export const metadata: Metadata = {
  title: 'GameFlashX — Free Gift Cards & Gaming Rewards 2026',
  description: 'Unlock free gift cards for Amazon, Steam, Roblox, Xbox, PlayStation and more. Complete simple offers and claim your reward instantly. Trusted by gamers worldwide.',
  keywords: 'free gift cards 2026, free amazon gift card, free roblox gift card, free steam gift card, free xbox gift card, gaming rewards, unlock gift cards',
  robots: 'index, follow',
  openGraph: {
    title: 'GameFlashX — Free Gift Cards & Gaming Rewards 2026',
    description: 'Unlock free Amazon, Steam, Roblox gift cards. Complete one offer and claim instantly.',
    url: 'https://gameflashx.com',
    siteName: 'GameFlashX',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://gameflashx.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GameFlashX — Free Gift Cards 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameFlashX — Free Gift Cards 2026',
    description: 'Unlock free Amazon, Steam, Roblox gift cards instantly.',
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
      <body className="font-body antialiased selection:bg-primary selection:text-white" suppressHydrationWarning>
        <FirebaseClientProvider>
          <AuthRedirectListener />
          <ReferralTracker />
          {children}
          <SupportChat />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
