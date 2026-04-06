
'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  LayoutDashboard, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  Info
} from 'lucide-react';
import Link from 'next/link';

/**
 * @fileOverview Hidden Verification Success Page.
 * Displays a premium visual confirmation after human verification completion.
 * Set to noindex to prevent search engine discovery.
 */

export default function VerificationSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0f0c29] to-[#050505] selection:bg-primary selection:text-white">
      {/* SEO Protection */}
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>

      <Header />
      
      <div className="pt-32 pb-20 px-4 flex items-center justify-center min-h-[85vh]">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card rounded-2xl p-8 md:p-16 border-white/10 shadow-2xl relative overflow-hidden text-center bg-white/[0.03] backdrop-blur-2xl"
          >
            {/* Ambient Success Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* 1. Success Icon Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-green-500/20 rounded-[2.5rem] blur-xl animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-[2.5rem] flex items-center justify-center border-4 border-black shadow-2xl">
                <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              
              {/* Particle Sparks */}
              <motion.div
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 text-green-400"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
            </motion.div>

            {/* 2. Heading & Content */}
            <div className="space-y-4 mb-10 relative z-10">
              <h1 className="font-headline text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                Verification <br /><span className="text-green-500">Successful</span> ✅
              </h1>
              <p className="text-white/80 text-lg font-medium max-w-md mx-auto leading-relaxed">
                You have successfully completed the human verification process. Your reward has been securely added to your dashboard.
              </p>
            </div>

            {/* 3. Status Info Box */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-10 text-left space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight">Reward Secured</h4>
                  <p className="text-xs text-white/40 font-medium">Session ID: {Math.random().toString(36).substring(7).toUpperCase()}-VERIFIED</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 pt-2 border-t border-white/5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight">Processing Status</h4>
                  <p className="text-xs text-white/40 font-medium">Distribution usually takes 1-5 minutes. Please refresh your vault if not visible.</p>
                </div>
              </div>
            </motion.div>

            {/* 4. Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Button asChild className="flex-1 h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-95 group">
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 w-5 h-5" /> Go to Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 h-16 bg-white/5 border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white/10 transition-all active:scale-95">
                <Link href="/#trending">
                  Continue Earning <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Secondary Notice */}
            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
              <Info className="w-3.5 h-3.5" /> 
              Verification data purged for security
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
