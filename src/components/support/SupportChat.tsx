'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Zap, Bot, 
  ArrowRight, Maximize2, Minimize2, CheckCircle2,
  TrendingUp, Clock, Search
} from 'lucide-react';
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

const INTENTS = [
  {
    keywords: ['reward', 'unlock', 'gift', 'card', 'code'],
    suggestions: ['Unlock reward', 'Reward not showing', 'How to claim gift card'],
    responses: [
      "Got it 👍 you're looking to unlock a reward.\n\nHere’s how it works:\n\n• Choose your gift card\n• Click 'Unlock Reward'\n• Complete one quick step\n\nMost users start with a simple offer — it's usually quick and unlocks the reward smoothly.\n\nIf you want, I can guide you step-by-step.",
      "Ready to claim? 👍 Unlocking is designed to be simple.\n\nPick your favorite brand and follow the steps to complete one quick activity. This is how we keep the platform free for everyone.\n\nYou can try one quick task to see how it works!",
      "I see you're ready for your reward! 👍\n\nUnlocking is a secure process where you complete a quick sponsor task to release your code. It's safe and helps us verify your session.\n\nStart with a simple offer to get started."
    ],
    progressResponses: {
      1: "You're very close 👍 Step 1 is already done. Just complete one quick step and your reward will be ready. Most users finish this in under a minute.",
      2: "Nice progress 🔥 you're almost there! You've started the verification. Once confirmed, your unique code will be instantly revealed.",
      3: "Everything is ready 👍 Your reward vault is updated. Click unlock to access your digital code now!"
    }
  },
  {
    keywords: ['referral', 'invite', 'refer'],
    suggestions: ['Referral help', 'How to invite friends', 'Find my referral link'],
    responses: [
      "You can also grow faster using your referral system 👍\n\nInvite others, and your referral count increases. Some users combine this with offers to maximize rewards.\n\nLet me know if you want help with finding your link.",
      "Got it! 👍 Sharing the platform is a great way to earn. \n\nWhen your friends sign up using your link, your lifetime commission grows. It's a nice way to build up a balance over time.\n\nYou can find your unique link in your dashboard!"
    ]
  },
  {
    keywords: ['earn', 'money', 'cash', 'income'],
    suggestions: ['How to earn money', 'Earning methods', 'Daily bonus help'],
    responses: [
      "Looking to earn rewards? 👍\n\nYou can start by completing simple tasks and offers. They’re designed to be quick, and once done, your reward becomes available.\n\nMany users begin with one easy task just to see how it works.",
      "Earning is straightforward here! 👍\n\nBy engaging with our sponsors through quick offers, you unlock your favorite gift cards. It's a great way to turn a few minutes of time into real rewards.\n\nStart with a simple offer to get started.",
      "I'd love to help you earn! 👍\n\nThe most popular way is completing advertiser tasks. They are short, verified activities that add value to your account immediately.\n\nYou can try one quick task to get started."
    ]
  },
  {
    keywords: ['login', 'account', 'signup', 'sign'],
    suggestions: ['Login help', 'Account settings', 'Sign up issue'],
    responses: [
      "I understand 👍 you're checking on your account.\n\nYou can access everything using your Email or Google login. If registration is currently at capacity, just keep an eye out for when it opens up again.",
      "Got it 👍 logging in is easy.\n\nJust use the 'Login' button at the top. If you're having any specific trouble with your profile, let me know and I'll do my best to guide you."
    ]
  },
  {
    keywords: ['not working', 'error', 'problem', 'failed', 'issue'],
    suggestions: ['Reward not showing', 'Offer failed', 'Connection error'],
    responses: [
      "I understand 👍\n\nSometimes rewards take a little time. Make sure the offer was fully completed and you didn’t skip steps.\n\nIf everything looks good, try one quick task again — it usually fixes the issue.",
      "Sorry to hear there's a hiccup! 👍\n\nMost processing delays are caused by incomplete verification signals. A quick refresh or trying one more short activity usually resolves it.\n\nLet me know if you want help with the next step."
    ]
  }
];

const DEFAULT_SUGGESTIONS = ["Unlock rewards", "How to earn money", "Referral help"];
const FALLBACK_RESPONSES = [
  "Please choose a topic or ask a clear question so I can help you better.",
  "I'm not sure I understand that. Try asking about rewards, referrals, or how to earn.",
  "I'm here to help! Could you provide more details about your request?"
];

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Assistant. How can I help you unlock premium rewards today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Background scroll lock when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleStep1 = () => setProgress(prev => Math.max(prev, 1));
    const handleStep2 = () => setProgress(prev => Math.max(prev, 2));
    const handleStep3 = () => setProgress(prev => Math.max(prev, 3));
    
    window.addEventListener('reward-step-1', handleStep1);
    window.addEventListener('reward-step-2', handleStep2);
    window.addEventListener('reward-step-3', handleStep3);
    
    if (typeof window !== 'undefined' && window.location.pathname.length > 1 && !window.location.pathname.includes('dashboard') && !window.location.pathname.includes('blog')) {
      setProgress(prev => Math.max(prev, 1));
    }

    return () => {
      window.removeEventListener('reward-step-1', handleStep1);
      window.removeEventListener('reward-step-2', handleStep2);
      window.removeEventListener('reward-step-3', handleStep3);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const lowerInput = inputValue.toLowerCase().trim();
    if (!lowerInput) {
      setSuggestions([]);
      return;
    }

    let matches: string[] = [];
    for (const intent of INTENTS) {
      if (intent.keywords.some(k => k.includes(lowerInput) || lowerInput.includes(k))) {
        matches = [...matches, ...intent.suggestions];
      }
    }

    setSuggestions(matches.length > 0 ? Array.from(new Set(matches)).slice(0, 3) : DEFAULT_SUGGESTIONS);
  }, [inputValue]);

  useEffect(() => {
    const handleOpenSupport = () => setIsOpen(true);
    window.addEventListener('open-support-chat', handleOpenSupport);
    return () => window.removeEventListener('open-support-chat', handleOpenSupport);
  }, []);

  const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  const handleSend = (textInput?: string) => {
    const text = (textInput || inputValue).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setSuggestions([]);
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = getRandomElement(FALLBACK_RESPONSES);

      for (const intent of INTENTS) {
        if (intent.keywords.some(keyword => lowerText.includes(keyword))) {
          if ('progressResponses' in intent && (intent.progressResponses as any)[progress]) {
            responseText = (intent.progressResponses as any)[progress];
          } else {
            responseText = getRandomElement(intent.responses);
          }
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
    }, 1500 + Math.random() * 500);
  };

  return (
    <>
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
            ref={chatContainerRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              width: isFullScreen ? '100vw' : 'min(450px, calc(100vw - 48px))',
              height: isFullScreen ? '100vh' : 'min(700px, calc(100vh - 120px))',
              bottom: isFullScreen ? 0 : '96px',
              right: isFullScreen ? 0 : '24px',
              borderRadius: isFullScreen ? '0px' : '2.5rem',
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "fixed z-[110] bg-black/95 backdrop-blur-3xl border border-white/10 flex flex-col overflow-hidden",
              !isFullScreen && "shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
            )}
          >
            {/* Header - Fixed at Top */}
            <div className="shrink-0 p-6 border-b border-white/5 flex flex-col gap-6 bg-gradient-to-b from-primary/10 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[1.2rem] bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(250,70,22,0.2)]">
                    <Bot className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg uppercase tracking-widest leading-none mb-1">Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.2em]">Live</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-all active:scale-95"
                  >
                    {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Step Progress Line */}
              <div className="px-1">
                <div className="h-1 w-full bg-white/5 rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(250,70,22,0.6)]"
                    animate={{ width: `${(progress / 3) * 100}%` }}
                    transition={{ type: 'spring', damping: 20 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {['Select', 'Verify', 'Unlock'].map((step, i) => (
                    <span key={step} className={cn(
                      "text-[8px] font-black uppercase tracking-widest",
                      progress > i ? "text-primary" : progress === i ? "text-white animate-pulse" : "text-white/20"
                    )}>{step}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable Message Area */}
            <ScrollArea className="flex-grow p-6 h-full" ref={scrollRef}>
              <div className={cn("space-y-6 pb-4", isFullScreen && "max-w-4xl mx-auto")}>
                <div className="flex justify-center mb-8 opacity-20 grayscale">
                  <Logo className="h-6" />
                </div>

                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "px-5 py-3.5 rounded-[1.5rem] text-sm leading-relaxed",
                      msg.sender === 'user' 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-white/[0.03] text-white/90 border border-white/5 rounded-tl-none"
                    )}>
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-2 px-2">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start max-w-[85%]">
                    <div className="bg-white/[0.03] border border-white/5 px-5 py-3.5 rounded-[1.5rem] rounded-tl-none flex items-center gap-3">
                      <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">Typing</span>
                      <div className="flex gap-1">
                        {[0, 0.2, 0.4].map((d) => (
                          <motion.div key={d} animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: d }} className="w-1 h-1 bg-primary rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Box - Fixed at Bottom */}
            <div className="shrink-0 p-6 border-t border-white/5 bg-black/40 relative">
              {/* Typing Suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-6 right-6 mb-4 glass-card p-2 rounded-2xl z-[120] space-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                  >
                    <div className="px-3 py-1 flex items-center gap-2 text-primary">
                      <Search className="w-3 h-3" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">Suggestions</span>
                    </div>
                    {suggestions.map((s) => (
                      <button 
                        key={s}
                        onClick={() => handleSend(s)}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 text-white/80 hover:text-white text-xs font-bold transition-colors flex items-center justify-between group"
                      >
                        {s}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className={cn("relative", isFullScreen && "max-w-4xl mx-auto")}
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about rewards..."
                  disabled={isTyping}
                  className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-5 pr-14 focus-visible:ring-primary/50 text-white"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
