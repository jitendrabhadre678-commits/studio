import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CookiePolicy() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">Cookie Policy</h1>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-white mb-3">What are Cookies?</h2>
                <p>Cookies are small text files stored on your device that help us improve your experience on our website.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">How We Use Cookies</h2>
                <p>We use cookies for the following purposes:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong>Analytics:</strong> To understand how users move around our site and which sections are most popular.</li>
                  <li><strong>Performance:</strong> To ensure the site loads quickly and functions correctly across different devices.</li>
                  <li><strong>UX Improvement:</strong> To remember your preferences and provide a more personalized experience.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">Managing Cookies</h2>
                <p>Most web browsers allow you to control cookies through their settings. However, disabling cookies may limit your ability to use certain features of the GameFlashX platform.</p>
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
