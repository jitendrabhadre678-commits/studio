
'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Info, 
  ArrowRight, 
  Smartphone, 
  CheckCircle2, 
  UserCheck, 
  Mail, 
  Monitor,
  Zap,
  Loader2
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

/**
 * @fileOverview Premium Google Play Reward Opportunity Page.
 * Updated with professional redirect sequence and loading states.
 */

export default function GooglePlayPage() {
  const REDIRECT_URL = "https://www.af9m8trk.com/5EC115Y6/WE112MD7/";
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleContinue = () => {
    if (isRedirecting) return;
    
    setIsRedirecting(true);
    
    // Deliberate security delay for trust
    setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-[#00C878] selection:text-black overflow-hidden relative">
      <Header />
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#061a14] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,120,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-white/[0.01]" />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="container max-w-xl">
          
          {/* 2. MAIN CONVERSION CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-[2.5rem] p-8 md:p-12 border-[#00C878]/20 shadow-[0_0_80px_rgba(0,200,120,0.05)] relative overflow-hidden"
          >
            {/* Focal Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00C878]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="text-center space-y-8">
              {/* Visual Asset */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
              >
                <div className="absolute inset-0 bg-[#00C878]/20 blur-3xl rounded-full" />
                <Image 
                  src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png"
                  alt="Google Play Reward"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  priority
                />
              </motion.div>

              {/* Messaging Engine */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/20">
                  <Zap className="w-3 h-3 text-[#00C878]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00C878]">Regional Opportunity Active</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1] text-white">
                  $100 Google Play <br />
                  <span className="bg-gradient-to-r from-[#00C878] to-[#00E6B4] bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(0,200,120,0.2)]">Reward Opportunity</span>
                </h1>
                
                <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed max-w-md mx-auto">
                  Sign up and complete the required steps to become eligible for a $100 Google Play reward. Requirements and availability may vary depending on your region.
                </p>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-3 gap-2 py-6 border-y border-white/5">
                <div className="flex flex-col items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00C878]" />
                  <div className="text-center">
                    <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Category</p>
                    <p className="text-[10px] font-bold text-white">Email Submit</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 border-x border-white/5">
                  <Monitor className="w-4 h-4 text-[#00C878]" />
                  <div className="text-center">
                    <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Device</p>
                    <p className="text-[10px] font-bold text-white">All Devices</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878]" />
                  <div className="text-center">
                    <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Requirement</p>
                    <p className="text-[10px] font-bold text-white">Task Completion</p>
                  </div>
                </div>
              </div>

              {/* Conversion Hub */}
              <div className="space-y-6 pt-4">
                <Button 
                  onClick={handleContinue}
                  disabled={isRedirecting}
                  className="w-full h-16 md:h-20 bg-gradient-to-r from-[#00C878] to-[#00E6B4] hover:scale-[1.02] active:scale-[0.98] text-black font-black uppercase tracking-[0.2em] text-sm md:text-lg rounded-2xl transition-all shadow-[0_10px_40px_rgba(0,200,120,0.3)] border-none disabled:opacity-80"
                >
                  {isRedirecting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </div>
                  ) : (
                    <>Continue <ArrowRight className="ml-2 w-6 h-6" /></>
                  )}
                </Button>

                {isRedirecting && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-[#00C878] font-black uppercase tracking-widest animate-pulse"
                  >
                    Connecting you to secure partner...
                  </motion.p>
                )}

                <div className="flex flex-col gap-4">
                  {/* Trust Matrix */}
                  <div className="flex flex-wrap justify-center gap-6 text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00C878]/50" /> Secure Process
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-[#00C878]/50" /> Verification Required
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C878]/50" /> Eligibility Based
                    </div>
                  </div>

                  <a 
                    href={REDIRECT_URL}
                    className="text-[9px] font-bold text-white/20 uppercase hover:text-[#00C878] transition-colors"
                  >
                    If you are not redirected, click here
                  </a>
                </div>
              </div>

              {/* Compliance Block */}
              <div className="pt-8 border-t border-white/5 text-left space-y-4">
                <p className="text-[10px] text-white/40 leading-relaxed font-medium uppercase tracking-tight">
                  <span className="text-white font-bold block mb-1">Important Disclaimer:</span>
                  Users must complete promotional steps to qualify. Some offers may involve additional requirements. Reward availability and specific requirements may vary based on region and offer provider. Completion and verification are required.
                </p>
                <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                  <Info className="w-3 h-3" /> Available for users 18+ in supported regions.
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. SECONDARY TRUST INDICATORS */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <h4 className="text-xs font-black text-white uppercase mb-2">How it works</h4>
              <p className="text-[11px] text-white/40 leading-relaxed uppercase tracking-tight">
                Engage with our premium partners through simple activities. Your participation generates the value needed to provide these reward opportunities.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02] backdrop-blur-sm">
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
