'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  CheckCircle2, 
  Trophy, 
  Loader2, 
  ShieldCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'intro' | 'questions' | 'result' | 'loading' | 'final';

const QUESTIONS = [
  {
    id: 1,
    question: "Which reward do you prefer?",
    options: ["Amazon Gift Card", "PayPal Cash", "Google Play", "Netflix"],
    hint: "Choose your primary goal."
  },
  {
    id: 2,
    question: "How often do you play games?",
    options: ["Daily", "Weekly", "Rarely"],
    hint: "We tailor offers to your habits."
  },
  {
    id: 3,
    question: "What motivates you most?",
    options: ["Free rewards", "Entertainment", "Learning"],
    hint: "Helps us optimize your experience."
  },
  {
    id: 4,
    question: "Your age group?",
    options: ["Under 18", "18–25", "25+"],
    hint: "Verification requirement."
  }
];

export function QuizGame() {
  const [step, setStep] = useState<Step>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [showPreSell, setShowPreSell] = useState(false);

  const loadingMessages = [
    "Checking eligibility...",
    "Preparing your reward...",
    "Final step remaining..."
  ];

  const progress = (currentIdx / QUESTIONS.length) * 100;

  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => {
        setLoadingTextIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);

      const timer = setTimeout(() => {
        setStep('final');
      }, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [step]);

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      // Show pre-sell message after 2nd question
      if (currentIdx === 1) {
        setShowPreSell(true);
        setTimeout(() => {
          setShowPreSell(false);
          setCurrentIdx(prev => prev + 1);
        }, 2000);
      } else {
        setCurrentIdx(prev => prev + 1);
      }
    } else {
      setStep('result');
    }
  };

  const handleOpenVerification = () => {
    window.open("https://gameflashx.space/cl/i/277ood", "_blank");
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-4 h-4 text-primary fill-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">New Task Available</span>
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none">
              Play & <span className="text-primary text-glow-pomegranate">Earn Rewards</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-md mx-auto">
              Complete this quick assessment to check your eligibility for a premium digital reward.
            </p>
            <Button 
              onClick={() => setStep('questions')}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              Start Quiz <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        )}

        {step === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                  Assessment Progress
                </span>
                <span className="text-xs font-bold text-white/40">
                  {currentIdx + 1} of {QUESTIONS.length}
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ type: 'spring', damping: 20 }}
                />
              </div>
            </div>

            <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {showPreSell ? (
                  <motion.div
                    key="presell"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                      <Sparkles className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Great News!</h3>
                    <p className="text-muted-foreground text-lg italic">
                      "Based on your answers, you are eligible for a reward."
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
                        {QUESTIONS[currentIdx].question}
                      </h2>
                      <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                        {QUESTIONS[currentIdx].hint}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {QUESTIONS[currentIdx].options.map((option, i) => (
                        <button
                          key={i}
                          onClick={handleNext}
                          className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-left text-white font-bold transition-all hover:bg-primary hover:border-primary hover:scale-[1.02] active:scale-95 group flex items-center justify-between"
                        >
                          {option}
                          <div className="w-6 h-6 rounded-full border-2 border-white/10 group-hover:border-white/40 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                {currentIdx < 2 ? "Thinking..." : "Almost there!"}
              </p>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
              <div className="relative w-32 h-32 bg-primary rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12">
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                🎉 You Qualify <br />for a <span className="text-primary">Reward!</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xs mx-auto">
                Incredible! You have successfully passed the qualification stage.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border-white/10 bg-white/5 max-w-sm mx-auto">
              <p className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Status: Verified</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your session is locked. Complete the final step to release your code.
              </p>
            </div>

            <Button 
              onClick={() => setStep('loading')}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-2xl shadow-primary/30"
            >
              Unlock Reward Now
            </Button>
          </motion.div>
        )}

        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center space-y-8"
          >
            <div className="relative w-24 h-24 mx-auto">
              <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-10 h-10 text-primary/40 fill-primary/20" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-white uppercase tracking-tight animate-pulse">
                {loadingMessages[loadingTextIdx]}
              </h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
                DO NOT REFRESH OR CLOSE THIS PAGE
              </p>
            </div>
          </motion.div>
        )}

        {step === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-10"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-green-500/30">
              <ShieldCheck className="w-12 h-12 text-green-500" />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                Ready to <span className="text-primary">Claim</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                Complete a quick human verification to release your unique reward code.
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleOpenVerification}
                className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-xl rounded-2xl shadow-2xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95"
              >
                Verify & Continue <CheckCircle2 className="ml-3 w-6 h-6" />
              </Button>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                Safe & SSL Encrypted Connection
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
