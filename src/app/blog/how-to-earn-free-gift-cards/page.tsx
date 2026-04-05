
'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  ShieldCheck, 
  Globe, 
  Trophy, 
  ArrowRight, 
  MousePointerClick, 
  Play, 
  Gift,
  HelpCircle,
  CheckCircle2,
  Clock,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

/**
 * @fileOverview The Ultimate Guide Blog Page.
 * A high-conversion SEO landing page explaining the reward ecosystem.
 */

export default function UltimateGuidePage() {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Delivery",
      desc: "No more waiting weeks for rewards. Our digital delivery system releases codes 24/7."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Verified Secure",
      desc: "Every session is SSL encrypted. We never ask for sensitive financial information."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Support",
      desc: "Our gift cards and rewards are valid in over 150 countries across all major stores."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Premium Catalog",
      desc: "Access codes for Amazon, Steam, Roblox, Xbox, PayPal, and dozens of other brands."
    }
  ];

  const steps = [
    {
      icon: <MousePointerClick />,
      title: "Choose Your Reward",
      desc: "Visit our gallery and select the brand and denomination you want to earn."
    },
    {
      icon: <Play />,
      title: "Engage with Partners",
      desc: "Complete a quick activity like watching a clip or trying a new mobile app."
    },
    {
      icon: <ShieldCheck />,
      title: "Verify Your Session",
      desc: "Our automated node confirms your human activity to prevent bot abuse."
    },
    {
      icon: <Gift />,
      title: "Unlock Your Code",
      desc: "Your unique digital gift card is instantly revealed in your private vault."
    }
  ];

  const faqs = [
    {
      q: "Is this really free?",
      a: "Yes! Advertisers pay for your engagement and attention. We take that value and convert it into the gift cards you see in our library. It's a win-win for everyone."
    },
    {
      q: "How many rewards can I claim?",
      a: "There is no limit to the number of rewards you can unlock. However, each unique advertiser task can usually only be completed once."
    },
    {
      q: "Are the codes valid for 2026?",
      a: "Absolutely. All codes are sourced in real-time from official retailers, ensuring they are fresh and ready for immediate redemption."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0F0F0F]">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-8"
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Ultimate Guide 2026</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none"
          >
            How to Earn Free <br /><span className="text-primary text-glow">Gift Cards Online</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Learn the most reliable methods to unlock premium digital rewards and gaming currency without spending a dime.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild className="h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-xl shadow-primary/20">
              <Link href="/#trending">Start Earning Rewards</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. EXPLANATION SECTION */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="glass-card p-8 md:p-16 rounded-[3rem] border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <HelpCircle className="w-48 h-48 text-primary" />
            </div>
            <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-6">What are Digital Rewards?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                In the modern digital economy, your attention is valuable. Brands and developers are constantly seeking ways to reach new users. Instead of traditional ads, they partner with platforms like GameFlashX to provide rewards in exchange for engagement.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A digital reward is a unique code that adds a specific monetary value to your favorite accounts, such as <span className="text-white font-bold">Amazon</span>, <span className="text-white font-bold">Steam</span>, or <span className="text-white font-bold">Roblox</span>. It works exactly like cash on those platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION */}
      <section className="py-20 px-4 bg-black/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Why Choose <span className="text-primary">GameFlashX?</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We've streamlined the rewards process to be the fastest and most secure in the industry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border-white/5 flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <div className="text-primary">{b.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STEP-BY-STEP GUIDE */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Your Path to <span className="text-primary">Rewards</span></h2>
            <p className="text-muted-foreground">Follow these four simple steps to release your first code.</p>
          </div>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={i} className="glass-card p-6 md:p-8 rounded-[2rem] border-white/5 flex flex-col md:flex-row items-center gap-8 group">
                <div className="w-20 h-20 bg-white/5 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary/40 transition-all relative">
                  <span className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center font-black text-white text-xs border-4 border-black">
                    {i + 1}
                  </span>
                  <div className="text-primary w-8 h-8">{s.icon}</div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
                <div className="hidden md:block ml-auto opacity-10 group-hover:opacity-30 transition-opacity">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4">
               <HelpCircle className="w-4 h-4 text-primary" />
               <span className="text-xs font-black uppercase tracking-widest text-primary">Reward Q&A</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Common <span className="text-primary">Questions</span></h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass-card rounded-2xl border-white/5 px-6 overflow-hidden">
                <AccordionTrigger className="text-white hover:text-primary transition-colors font-bold text-left py-6 uppercase tracking-tight">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-12 md:p-20 rounded-[4rem] border-primary/20 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-64 h-64 text-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">Ready to start <br /><span className="text-primary">Earning Now?</span></h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto">
              Join thousands of active users who are already cashing out daily. Fast, secure, and verified rewards.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg rounded-2xl shadow-2xl shadow-primary/40 group/btn">
                <Link href="/#trending">
                  Browse Gallery <ArrowRight className="ml-2 w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 px-12 border-white/10 text-white font-black uppercase tracking-widest text-lg rounded-2xl hover:bg-white/5">
                <Link href="/leaderboard">View Winners</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
              <div className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-primary" /> Verified Secure</div>
              <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-primary" /> Instant Codes</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
