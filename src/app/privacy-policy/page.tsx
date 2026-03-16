import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">Privacy Policy</h1>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-white mb-3">Introduction</h2>
                <p>At GameFlashX, we take your privacy seriously. This policy outlines how we collect, use, and protect your information when you use our platform.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Information We Collect</h2>
                <p>We may collect several types of information from and about users of our website, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Basic user information provided during registration or interaction.</li>
                  <li>Cookies and analytics data to understand how you interact with our site.</li>
                  <li>Offer interaction data, including which promotional campaigns you engage with.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">How We Use Your Data</h2>
                <p>The data we collect is primarily used to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Improve and personalize your user experience on our platform.</li>
                  <li>Facilitate and provide access to promotional offers from our advertiser partners.</li>
                  <li>Analyze site performance and user engagement to optimize our services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Data Protection</h2>
                <p>We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the Internet is 100% secure.</p>
              </section>

              <p className="pt-4 text-xs italic">Last updated: October 2024</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
