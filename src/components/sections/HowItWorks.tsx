
"use client";

import { motion } from 'framer-motion';
import { MousePointerClick, PlayCircle, ShieldCheck, Zap } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <MousePointerClick className="w-8 h-8 text-primary" />,
      title: "Choose Reward",
      description: "Browse our extensive gallery and select your favorite gift card brand and value."
    },
    {
      icon: <PlayCircle className="w-8 h-8 text-primary" />,
      title: "Watch & Engage",
      description: "Watch short clips or complete simple activities to verify your human session."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Verify Securely",
      description: "Our encrypted system validates your session instantly once the countdown completes."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Unlock Instantly",
      description: "Receive your digital reward code immediately via our secure delivery network."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
          >
            <PlayCircle className="w-4 h-4 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">Simple 4-Step Process</span>
          </motion.div>
          <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-6">
            How GameFlash<span className="text-primary">X</span> Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlocking premium digital rewards has never been easier. Follow our simple process to start claiming your free gift cards today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2rem] border-white/5 relative group hover:border-primary/30 transition-all"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                {step.icon}
              </div>
              <div className="absolute top-8 right-8 text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
