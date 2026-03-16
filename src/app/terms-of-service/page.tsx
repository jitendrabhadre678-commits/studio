import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsOfService() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">Terms of Service</h1>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-white mb-3">Agreement to Terms</h2>
                <p>By accessing or using GameFlashX, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">User Conduct</h2>
                <p>Users must follow all platform guidelines. Any attempt to manipulate the system, use automated bots, or engage in fraudulent activity is strictly prohibited.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Promotional Offers</h2>
                <p>Offers and rewards displayed on GameFlashX are provided by third-party advertisers. Reward availability may vary based on regional requirements and advertiser criteria. Completion of an offer does not guarantee a reward if the advertiser determines the interaction was invalid.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Platform Restrictions</h2>
                <p>Misuse of the platform, including but not limited to multiple account creation or bypass of verification steps, may result in immediate account restriction and forfeiture of potential rewards.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Limitation of Liability</h2>
                <p>GameFlashX is not liable for any issues arising from third-party advertiser platforms or the failure of external reward delivery systems.</p>
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
