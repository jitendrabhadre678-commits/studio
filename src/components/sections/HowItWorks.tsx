
"use client";

import { motion } from 'framer-motion';
import { Gift, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Redesigned "How It Works" Section.
 * Features a horizontal flow connected by an animated "Wire Flow" energy line.
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
    <section id="how-it-works" className="py-32 px-4 relative overflow-hidden bg-transparent">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
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
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] -translate-y-1/2 z-0 overflow-hidden">
            {/* Base Line */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/40 to-blue-500/20" />
            {/* Flowing Pulse */}
            <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-data-flow blur-sm" />
            <div className="absolute top-0 bottom-0 w-12 bg-white animate-data-flow" />
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
                "w-full p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10",
                "transition-all duration-500 hover:scale-[1.03] hover:bg-white/[0.05] hover:border-blue-500/30",
                "group shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col"
              )}>
                {/* Step Marker */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-blue-500 text-white font-black flex items-center justify-center text-xs shadow-lg border-2 border-[#050505] z-20 group-hover:scale-110 transition-transform">
                  0{step.id}
                </div>

                {/* Inner Glow Overlay */}
                <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[2.5rem]" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm md:text-base leading-relaxed font-medium">
                    {step.description}
                  </p>

                  {/* Icon Watermark */}
                  <div className="mt-auto pt-8 flex justify-end opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="scale-150 rotate-12">
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Hint */}
        <div className="mt-20 flex items-center justify-center gap-4 text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">
          <span>Optimized Logic</span>
          <div className="w-1 h-1 bg-blue-500/20 rounded-full" />
          <span>Secured Nodes</span>
          <div className="w-1 h-1 bg-blue-500/20 rounded-full" />
          <span>Instant Confirmation</span>
        </div>
      </div>

      <style jsx global>{`
        .text-glow-blue {
          text-shadow: 0 0 30px rgba(96, 165, 250, 0.5);
        }
      `}</style>
    </section>
  );
}
