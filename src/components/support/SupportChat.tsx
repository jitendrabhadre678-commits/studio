
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Zap, User, ArrowRight, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/Logo';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const RESPONSES = {
  reward: "To unlock rewards:\n1. Choose your favorite brand.\n2. Click the 'Reveal Code' button.\n3. Complete 1 quick advertiser activity.\n4. Your code will be instantly revealed in your Reward Vault!",
  referral: "Referral System Guide:\n1. Go to your Dashboard.\n2. Copy your unique referral link.\n3. Share it with friends.\n4. You earn a 10% lifetime commission on every reward they unlock!",
  login: "Account Help:\n- Use the 'Login' or 'Sign Up' buttons in the header.\n- We support Google and Email authentication.\n- If using email, please verify your inbox (check spam folder) to unlock all features.",
  earn: "Ways to Earn:\n- Complete sponsored tasks in the Reward Gallery.\n- Claim your Daily Bonus in the Dashboard.\n- Refer friends to earn passive commissions.",
  offer: "Offer Completion Tips:\n- Turn off all Ad-Blockers before starting.\n- Use accurate information during verification.\n- Most offers verify within 1-5 minutes of completion.",
  fallback: "Please select a topic below or ask a clear question about rewards, referrals, or your account. I'm here to help!"
};

const QUICK_OPTIONS = [
  { label: "Unlock Rewards", keyword: "reward" },
  { label: "Referral Help", keyword: "referral" },
  { label: "Earning Guide", keyword: "earn" },
  { label: "Account Help", keyword: "login" }
];

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the GameFlashX Assistant. How can I help you unlock premium rewards today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Listen for global custom event to open chat
  useEffect(() => {
    const handleOpenSupport = () => setIsOpen(true);
    window.addEventListener('open-support-chat', handleOpenSupport);
    return () => window.removeEventListener('open-support-chat', handleOpenSupport);
  }, []);

  const handleSend = (textOverride?: string) => {
    const text = textOverride || inputValue.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Logic
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = RESPONSES.fallback;

      if (lowerText.includes('reward')) responseText = RESPONSES.reward;
      else if (lowerText.includes('referral')) responseText = RESPONSES.referral;
      else if (lowerText.includes('login') || lowerText.includes('account')) responseText = RESPONSES.login;
      else if (lowerText.includes('earn')) responseText = RESPONSES.earn;
      else if (lowerText.includes('offer')) responseText = RESPONSES.offer;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl active:scale-90",
          isOpen ? "bg-white text-black rotate-90" : "bg-primary text-white hover:shadow-[0_0_30px_rgba(250,70,22,0.4)]"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-[100] w-[calc(100vw-48px)] sm:w-[400px] h-[600px] max-h-[calc(100vh-120px)] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-wider">Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active Support</span>
                  </div>
                </div>
              </div>
              <Logo className="h-5 opacity-40" />
            </div>

            {/* Chat Body */}
            <ScrollArea className="flex-grow p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.sender === 'ai' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.sender === 'user' 
                        ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10" 
                        : "bg-white/5 text-white/90 border border-white/10 rounded-tl-none"
                    )}>
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-white/20 uppercase mt-1.5 px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="flex items-center gap-2 text-white/40 italic text-xs px-2">
                    <Loader2 className="w-3 h-3 animate-spin" /> assistant is writing...
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer / Input */}
            <div className="p-6 border-t border-white/5 bg-black/40">
              {/* Quick Options */}
              <div className="flex flex-wrap gap-2 mb-4">
                {QUICK_OPTIONS.map((opt) => (
                  <button
                    key={opt.keyword}
                    onClick={() => handleSend(opt.label)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-white/60 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all uppercase tracking-widest"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative group"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="bg-white/5 border-white/10 h-14 rounded-2xl pr-14 focus-visible:ring-primary/50 text-white font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center transition-all hover:bg-primary/90 disabled:opacity-50 disabled:grayscale"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-center text-[9px] text-white/20 font-bold uppercase tracking-[0.2em] mt-4">
                Automated Support Hub • Instant Help
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
