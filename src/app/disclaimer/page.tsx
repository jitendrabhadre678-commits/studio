import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Disclaimer() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">Disclaimer</h1>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <section className="bg-primary/10 border border-primary/20 p-6 rounded-2xl">
                <p className="text-white font-bold mb-4">Crucial Information:</p>
                <p className="text-white/90">GameFlashX does not directly provide coupon codes or gift cards. Rewards and promotional offers are made available by third-party advertisers through promotional campaigns.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Brand Partnerships</h2>
                <p>This website is not officially partnered with the brands displayed on the platform (such as Amazon, Steam, or Roblox). All brand names, logos, and trademarks belong to their respective owners and are used for identification purposes only.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">How Rewards are Earned</h2>
                <p>Users may receive rewards after successfully completing promotional offers provided by third-party advertisers. GameFlashX acts as an intermediary platform connecting users with these opportunities.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Our Track Record</h2>
                <p>Thousands of users have successfully used promotional offers on the platform and received rewards through advertiser campaigns. Similarly, thousands of advertisers have previously run promotional campaigns and distributed rewards through these promotions via our network.</p>
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
