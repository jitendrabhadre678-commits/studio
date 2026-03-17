
import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {FirebaseClientProvider} from '@/firebase/client-provider';
import {AuthRedirectListener} from '@/components/auth/AuthRedirectListener';
import {ReferralTracker} from '@/components/referral/ReferralTracker';
import {SupportChat} from '@/components/support/SupportChat';

export const metadata: Metadata = {
  title: 'GameFlashX | Unlock Free Gift Cards & Premium Rewards',
  description: 'Join GameFlashX, the premium rewards platform where you can unlock digital gift cards for Steam, Amazon, Roblox, and more.',
  openGraph: {
    title: 'GameFlashX | Unlock Free Gift Cards & Premium Rewards',
    description: 'Join GameFlashX, the premium rewards platform where you can unlock digital gift cards for Steam, Amazon, Roblox, and more.',
    url: 'https://gameflashx.space',
    siteName: 'GameFlashX',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameFlashX | Unlock Free Gift Cards & Premium Rewards',
    description: 'Join GameFlashX, the premium rewards platform where you can unlock digital gift cards for Steam, Amazon, Roblox, and more.',
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white">
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
