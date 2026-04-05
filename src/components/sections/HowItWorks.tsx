
"use client";

import { motion } from 'framer-motion';
import { Gift, ShieldCheck, Zap, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Redesigned How It Works section.
 * Features a central vertical energy conduit with alternating glass cards.
 */

const steps = [
  {
    id: 1,
    icon: <Gift className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
    title: "Choose Gift Card",
    description: "Browse our premium vault and select the reward brand and denomination you want to claim.",
    align: "left"
  },
  {
    id: 2,
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
    title: "Complete Verification",
    description: "Complete one quick sponsored activity to verify your human session and secure your reward.",
    align: "right"
  },
  {
    id: 3,
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
    title: "Unlock Reward",
    description: "Your unique digital code is instantly revealed in your private vault, ready for immediate use.",
    align: "left"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-4 relative overflow-hidden bg-black/20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
          >
            <Circle className="w-2 h-2 fill-primary text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Reward Protocol</span>
          </motion.div>
          <h2 className="font-headline text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">
            The Path To <span className="text-primary text-glow">Rewards</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Follow our verified three-step process to unlock premium digital keys instantly.
          </p>
        </div>

        {/* Timeline Content */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary to-transparent opacity-20 hidden md:block" />
          
          <div className="space-y-16 md:space-y-0">
            {steps.map((step, idx) => (
              <div key={step.id} className="relative md:min-h-[300px] flex items-center">
                
                {/* Timeline Dot (Desktop) */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:block">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 rounded-full bg-black border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(250,70,22,0.4)]"
                  >
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </motion.div>
                </div>

                {/* Card Container */}
                <div className={cn(
                  "w-full md:w-[45%] flex",
                  step.align === 'left' ? "md:mr-auto justify-end" : "md:ml-auto justify-start"
                )}>
                  <motion.div
                    initial={{ opacity: 0, x: step.align === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full glass-card p-8 md:p-10 rounded-2xl border-white/10 relative group bg-white/[0.02] backdrop-blur-xl shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -left-4 md:top-8 md:-right-4 bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-xl z-10 border-2 border-black">
                      {step.id}
                    </div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 group-hover:border-primary/40 transition-all">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight leading-none group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Decorative Corner Accents */}
                    <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
                      {step.icon}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Overlay Hint */}
        <div className="mt-24 text-center">
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-4">
            Secured By 256-bit AES Encryption
          </p>
          <div className="flex justify-center gap-8 items-center opacity-20">
            <div className="h-px bg-white/20 flex-grow max-w-[100px]" />
            <ShieldCheck className="w-6 h-6 text-white" />
            <div className="h-px bg-white/20 flex-grow max-w-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
