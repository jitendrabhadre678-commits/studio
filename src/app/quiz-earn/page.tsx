import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QuizGame } from '@/components/quiz/QuizGame';

/**
 * @fileOverview The main page for the Quiz & Earn feature.
 * Provides a highly engaging, gamified path to reward verification.
 */

export const metadata = {
  title: 'Quiz & Earn | GameFlashX Rewards',
  description: 'Answer a few quick questions to qualify for premium gift cards and rewards.',
};

export default function QuizEarnPage() {
  return (
    <main className="min-h-screen bg-[#000000] relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <Header />
      
      <div className="relative z-10 pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <QuizGame />
        </div>
      </div>

      <Footer />
    </main>
  );
}
