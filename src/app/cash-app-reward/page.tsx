
'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Info, ArrowRight, Smartphone, CheckCircle2, UserCheck } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Premium Cash App Reward Opportunity Page.
 * Designed for high conversion with strict CPA/Compliance adherence.
 */

export default function CashAppRewardPage() {
  const REDIRECT_URL = "https://www.af9m8trk.com/5EC115Y6/W2412MDB/";

  const handleContinue = () => {
    window.location.href = REDIRECT_URL;
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#00FF96] selection:text-black overflow-hidden relative">
      <Header />
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a1a10] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,150,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-white/[0.01]" />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4 flex flex-col items-center">
        <div className="container max-w-2xl">
          
          {/* 2. MAIN CONVERSION CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-[2.5rem] p-8 md:p-12 border-emerald-500/20 shadow-[0_0_80px_rgba(0,255,150,0.05)] relative overflow-hidden"
          >
            {/* Specular Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#00FF96]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="text-center space-y-8">
              {/* Visual Asset */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-[16/9] max-w-[400px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                <Image 
                  src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775731469/31f3b2889d09a1192a87c3b969a99d05_1_liuneq.jpg"
                  alt="Cash App Reward Opportunity"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#00D632] flex items-center justify-center shadow-lg">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-white drop-shadow-md">Active Opportunity</span>
                </div>
              </motion.div>

              {/* Messaging Engine */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1] text-white">
                  $750 Cash App <br />
                  <span className="text-[#00FF96] [text-shadow:0_0_30px_rgba(0,255,150,0.4)]">Reward Opportunity</span>
                </h1>
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Info className="w-3.5 h-3.5 text-[#00FF96]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00FF96]">Verification Required</span>
                </div>

                <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed max-w-md mx-auto">
                  Complete partner offers to qualify for rewards after verification. Sign up and complete the required steps to become eligible for a $750 Cash App reward.
                </p>
              </div>

              {/* Conversion Hub */}
              <div className="space-y-6 pt-4">
                <Button 
                  onClick={handleContinue}
                  className="w-full h-16 md:h-20 bg-gradient-to-r from-[#00D632] to-[#00FF96] hover:scale-[1.02] active:scale-[0.98] text-black font-black uppercase tracking-[0.2em] text-sm md:text-lg rounded-2xl transition-all shadow-[0_10px_40px_rgba(0,255,150,0.3)] border-none"
                >
                  Continue <ArrowRight className="ml-2 w-6 h-6" />
                </Button>

                {/* Trust Matrix */}
                <div className="flex flex-wrap justify-center gap-6 text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00FF96]/50" /> Secure Process
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-[#00FF96]/50" /> Verification Required
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF96]/50" /> Eligibility Based
                  </div>
                </div>
              </div>

              {/* Compliance Block */}
              <div className="pt-8 border-t border-white/5 text-left space-y-4">
                <p className="text-[10px] text-white/40 leading-relaxed font-medium uppercase tracking-tight">
                  <span className="text-white font-bold block mb-1">Important Disclaimer:</span>
                  Users must complete promotional offers to qualify. Some offers may require payment or additional steps. Completion and verification are required. Reward availability and specific requirements may vary based on region and offer provider.
                </p>
                <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                  <Info className="w-3 h-3" /> Available for users 18+ in supported regions.
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. SECONDARY TRUST INDICATORS */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02]">
              <h4 className="text-xs font-black text-white uppercase mb-2">How it works</h4>
              <p className="text-[11px] text-white/40 leading-relaxed uppercase tracking-tight">
                Engage with our premium partners through simple activities. Your participation generates the value needed to provide these reward opportunities.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02]">
              <h4 className="text-xs font-black text-white uppercase mb-2">Safe & Verified</h4>
              <p className="text-[11px] text-white/40 leading-relaxed uppercase tracking-tight">
                Our platform uses 256-bit encryption to protect your data. We only partner with verified advertisers to ensure a high-trust experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
