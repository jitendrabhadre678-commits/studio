
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

// Advanced Intent Matching Data with Human-like Variations
const INTENTS = [
  {
    keywords: ['reward', 'unlock', 'gift', 'card', 'code'],
    responses: [
      "To unlock a reward:\n\n1. Select your gift card\n2. Click Unlock Reward\n3. Complete a required offer\n4. Your reward will be prepared",
      "Ready to claim? Here's the process:\n\n• Pick your favorite brand\n• Hit 'Unlock Reward'\n• Finish one quick activity\n• Your code will be released!",
      "Unlocking is easy! Just select a card, click the unlock button, and complete a sponsored task. Your digital code arrives right after verification."
    ]
  },
  {
    keywords: ['referral', 'invite', 'refer'],
    responses: [
      "You can earn by inviting others.\n\n1. Share your referral link from the dashboard\n2. When someone signs up using your link\n3. Your referral count increases",
      "Want to earn more? Share your unique referral link! Every friend who joins increases your stats and unlocks future bonuses.",
      "Invite your friends! Use the link in your dashboard. Once they sign up, you'll see your referral count grow in real-time."
    ]
  },
  {
    keywords: ['earn', 'money', 'cash', 'income'],
    responses: [
      "You can earn rewards by:\n\n• completing offers\n• using referral system\n• participating in activities",
      "Looking to make some cash? You can earn by finishing offers, referring friends, or claiming daily rewards in your dashboard.",
      "There are several ways to earn here: complete sponsored tasks, invite your gaming friends, or grab your daily bonus!"
    ]
  },
  {
    keywords: ['login', 'account', 'signup', 'sign'],
    responses: [
      "You can login using email or Google.\n\nIf signup is closed, please wait until registration opens again.",
      "Access your account via Google or Email. If you're having trouble signing up, please check if registrations are currently open.",
      "Standard login supports Email and Google. If registration isn't working, we might be at temporary capacity - try again shortly!"
    ]
  },
  {
    keywords: ['not working', 'error', 'problem', 'failed', 'issue'],
    responses: [
      "If your reward is not showing:\n\n• ensure you completed the offer correctly\n• wait a few minutes\n• try again if needed",
      "Having issues? Double-check that the offer was finished fully. Sometimes it takes 2-5 minutes for the system to sync your unlock.",
      "If things aren't working as expected, try refreshing your vault after a few minutes. Most issues are caused by incomplete offer verification."
    ]
  },
  {
    keywords: ['offer', 'task', 'complete'],
    responses: [
      "Offers are required to verify users.\n\nYou must complete at least one offer before claiming a reward.",
      "To keep rewards free, advertisers require one quick task completion. This verifies you're a real human player!",
      "Tasks are simple! Finish one sponsored activity to release your code. This is how we keep the platform free for everyone."
    ]
  },
  {
    keywords: ['withdraw', 'payment', 'paypal', 'redeem'],
    responses: [
      "Rewards are provided after successful completion of required steps.\n\nFollow instructions carefully to receive your reward.",
      "Cashing out is simple once you meet the requirements. Follow the steps in your dashboard to initiate a withdrawal.",
      "Payments are processed after verification. Make sure you've followed all instructions to avoid any delays in your reward delivery."
    ]
  },
  {
    keywords: ['time', 'delay', 'wait', 'slow'],
    responses: [
      "Some rewards may take a few minutes to process.\n\nPlease wait and refresh your dashboard.",
      "Patience is key! Some advertisers take a few minutes to send the verification signal. Refresh your vault in 5-10 minutes.",
      "Digital rewards are usually instant, but can sometimes take a short while. Keep an eye on your activity log!"
    ]
  }
];

const FALLBACK_RESPONSES = [
  "Please choose a topic or ask a clear question so I can help you better.",
  "I'm not sure I understand that. Try asking about rewards, referrals, or how to earn.",
  "I'm here to help! Could you provide more details or pick one of the quick options below?"
];

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

  const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

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

    // AI Logic with Intent Matching and Random Variations
    // Simulate thinking/typing time (1.5s to 2.5s)
    const typingTime = 1200 + Math.random() * 800;

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = getRandomElement(FALLBACK_RESPONSES);

      // Find the best intent match
      for (const intent of INTENTS) {
        if (intent.keywords.some(keyword => lowerText.includes(keyword))) {
          responseText = getRandomElement(intent.responses);
          break;
        }
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, typingTime);
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
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</span>
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
                  <div className="flex flex-col items-start max-w-[85%]">
                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest animate-pulse">Typing</span>
                      <div className="flex gap-1">
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1] }} 
                          transition={{ repeat: Infinity, duration: 0.6 }} 
                          className="w-1 h-1 bg-primary rounded-full" 
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1] }} 
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} 
                          className="w-1 h-1 bg-primary rounded-full" 
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1] }} 
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} 
                          className="w-1 h-1 bg-primary rounded-full" 
                        />
                      </div>
                    </div>
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
                  placeholder="Type a message..."
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
                Human-like Support • 24/7 Availability
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
