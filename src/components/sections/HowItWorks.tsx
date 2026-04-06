"use client";

import { motion } from 'framer-motion';
import { Gift, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview How It Works Section.
 * Content is optimized for the parent glass panel container.
 */

const steps = [
  {
    id: 1,
    icon: <Gift className="w-8 h-8 text-blue-400" />,
    title: "Choose Gift Card",
    description: "Browse our premium vault and select the reward brand and denomination you want to claim."
  },
  {
    id: 2,
    icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
    title: "Complete Verification",
    description: "Complete one quick sponsored activity to verify your human session and secure your reward."
  },
  {
    id: 3,
    icon: <Zap className="w-8 h-8 text-blue-400" />,
    title: "Unlock Reward",
    description: "Your unique digital code is instantly revealed in your private vault, ready for immediate use."
  }
];

export function HowItWorks() {
  return (
    <div id="how-it-works" className="py-24 px-6 md:px-12 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">System Protocol</span>
          </motion.div>
          <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none">
            The Reward <span className="text-blue-400 text-glow-blue">Workflow</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-medium">
            A simple, secure, and fully automated process to get your digital codes.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-6">
          
          {/* Animated Wire Flow (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] -translate-y-1/2 z-0 overflow-hidden opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
            <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent animate-data-flow" />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative z-10 flex-1 flex"
            >
              <div className={cn(
                "w-full p-8 rounded-3xl bg-white/5 border border-white/5",
                "transition-all duration-500 hover:border-blue-500/30",
                "group flex flex-col"
              )}>
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8">
                  {step.icon}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight leading-none">
                  {step.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .text-glow-blue {
          text-shadow: 0 0 30px rgba(96, 165, 250, 0.5);
        }
      `}</style>
    </div>
  );
}
