'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Zap, User, 
  ArrowRight, Bot, Loader2, CheckCircle2, 
  TrendingUp, Maximize2, Minimize2, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/Logo';
import { Progress } from '@/components/ui/progress';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

// Soft-Conversion Intent Matching Data with Progress Awareness
const INTENTS = [
  {
    keywords: ['reward', 'unlock', 'gift', 'card', 'code'],
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
    responses: [
      "You can also grow faster using your referral system 👍\n\nInvite others, and your referral count increases. Some users combine this with offers to maximize rewards.\n\nLet me know if you want help with finding your link.",
      "Got it! 👍 Sharing the platform is a great way to earn. \n\nWhen your friends sign up using your link, your lifetime commission grows. It's a nice way to build up a balance over time.\n\nYou can find your unique link in your dashboard!"
    ]
  },
  {
    keywords: ['earn', 'money', 'cash', 'income'],
    responses: [
      "Looking to earn rewards? 👍\n\nYou can start by completing simple tasks and offers. They’re designed to be quick, and once done, your reward becomes available.\n\nMany users begin with one easy task just to see how it works.",
      "Earning is straightforward here! 👍\n\nBy engaging with our sponsors through quick offers, you unlock your favorite gift cards. It's a great way to turn a few minutes of time into real rewards.\n\nStart with a simple offer to see how it works.",
      "I'd love to help you earn! 👍\n\nThe most popular way is completing advertiser tasks. They are short, verified activities that add value to your account immediately.\n\nYou can try one quick task to get started."
    ]
  },
  {
    keywords: ['login', 'account', 'signup', 'sign'],
    responses: [
      "I understand 👍 you're checking on your account.\n\nYou can access everything using your Email or Google login. If registration is currently at capacity, just keep an eye out for when it opens up again.",
      "Got it 👍 logging in is easy.\n\nJust use the 'Login' button at the top. If you're having any specific trouble with your profile, let me know and I'll do my best to guide you."
    ]
  },
  {
    keywords: ['not working', 'error', 'problem', 'failed', 'issue'],
    responses: [
      "I understand 👍\n\nSometimes rewards take a little time. Make sure the offer was fully completed and you didn’t skip steps.\n\nIf everything looks good, try one quick task again — it usually fixes the issue.",
      "Sorry to hear there's a hiccup! 👍\n\nMost processing delays are caused by incomplete verification signals. A quick refresh or trying one more short activity usually resolves it.\n\nLet me know if you want help with the next step."
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

const SUGGESTION_DATA = [
  { keywords: ['rew', 'gif', 'cod'], options: ["Unlock reward", "Reward not showing", "How to claim gift card"] },
  { keywords: ['mon', 'ear', 'cas'], options: ["How to earn money", "Earning guide", "Payment methods"] },
  { keywords: ['ref', 'inv'], options: ["Referral help", "Invite friends", "Referral tracking"] },
  { keywords: ['log', 'acc', 'sig'], options: ["Login help", "Account settings", "Signup assistance"] },
  { keywords: ['err', 'pro', 'not', 'fai'], options: ["Reward not working", "Offer issue", "System error"] }
];

const DEFAULT_SUGGESTIONS = ["Unlock rewards", "How to earn money", "Referral help"];

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0); // 0: Start, 1: Selected, 2: Offer Clicked, 3: Completed
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Lock scroll when full screen is active
  useEffect(() => {
    if (isFullScreen && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullScreen, isOpen]);

  // Sync Progress with Browser Events
  useEffect(() => {
    const handleStep1 = () => setProgress(prev => Math.max(prev, 1));
    const handleStep2 = () => setProgress(prev => Math.max(prev, 2));
    const handleStep3 = () => setProgress(prev => Math.max(prev, 3));
    
    window.addEventListener('reward-step-1', handleStep1);
    window.addEventListener('reward-step-2', handleStep2);
    window.addEventListener('reward-step-3', handleStep3);
    
    // Initial check: if on a reward page, step 1 is done
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
    setSuggestions([]);
    setShowSuggestions(false);
    setIsTyping(true);

    const typingTime = 1200 + Math.random() * 800;

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = getRandomElement(FALLBACK_RESPONSES);

      for (const intent of INTENTS) {
        if (intent.keywords.some(keyword => lowerText.includes(keyword))) {
          // If we have a progress-specific response, use it
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
    }, typingTime);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (val.length > 0) {
      const lowerVal = val.toLowerCase();
      const matched = SUGGESTION_DATA.find(s => s.keywords.some(k => lowerVal.includes(k)));
      if (matched) {
        setSuggestions(matched.options);
      } else {
        setSuggestions(DEFAULT_SUGGESTIONS);
      }
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const progressPercent = (progress / 3) * 100;

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
              width: isFullScreen ? '100vw' : 'min(400px, calc(100vw - 48px))',
              height: isFullScreen ? '100vh' : 'min(650px, calc(100vh - 120px))',
              bottom: isFullScreen ? 0 : '96px', // bottom-24
              right: isFullScreen ? 0 : '24px', // right-6
              borderRadius: isFullScreen ? '0px' : '2.5rem',
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "fixed z-[110] bg-black/95 backdrop-blur-3xl border border-white/10 flex flex-col overflow-hidden",
              !isFullScreen && "shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
            )}
          >
            <div className="p-6 border-b border-white/5 flex flex-col gap-4 bg-primary/5">
              <div className="flex items-center justify-between">
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
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                  >
                    {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <Logo className="h-5 opacity-40" />
                </div>
              </div>

              {/* Progress Tracking Visual */}
              <div className="space-y-2 px-1">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Unlock Progress</span>
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{Math.round(progressPercent)}% Complete</span>
                </div>
                <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_10px_rgba(250,70,22,0.5)]"
                  />
                </div>
                <div className="flex justify-between text-[8px] font-bold text-white/20 uppercase tracking-widest">
                  <span className={cn(progress >= 1 && "text-primary")}>Select</span>
                  <span className={cn(progress >= 2 && "text-primary")}>Verify</span>
                  <span className={cn(progress >= 3 && "text-primary")}>Unlock</span>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-grow p-6" ref={scrollRef}>
              <div className={cn("space-y-6", isFullScreen && "max-w-3xl mx-auto")}>
                {/* Soft Urgency Prompt */}
                {progress < 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-3"
                  >
                    <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-tight">
                      Rewards are currently in high demand. Secure your session soon!
                    </p>
                  </motion.div>
                )}

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
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start max-w-[85%]"
                  >
                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-3">
                      <span className="text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse">Assistant is typing</span>
                      <div className="flex gap-1.5 pt-0.5">
                        <motion.div 
                          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} 
                          transition={{ repeat: Infinity, duration: 0.8 }} 
                          className="w-1.5 h-1.5 bg-primary rounded-full" 
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} 
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} 
                          className="w-1.5 h-1.5 bg-primary rounded-full" 
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} 
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} 
                          className="w-1.5 h-1.5 bg-primary rounded-full" 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-white/5 bg-black/40 relative">
              {/* Typing Suggestions UI */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={cn(
                      "absolute bottom-full left-6 right-6 mb-4 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-[120]",
                      isFullScreen && "max-w-xl mx-auto left-0 right-0"
                    )}
                  >
                    <div className="p-2 flex flex-col gap-1">
                      <div className="px-3 py-1.5 text-[8px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5 mb-1 flex items-center gap-2">
                        <Search className="w-2.5 h-2.5" /> Suggestions
                      </div>
                      {suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary text-xs font-bold text-white/60 transition-all flex items-center justify-between group"
                        >
                          {suggestion}
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={cn("mb-4", isFullScreen && "max-w-3xl mx-auto flex flex-wrap gap-2")}>
                {!isFullScreen && (
                  <div className="flex flex-wrap gap-2">
                    {QUICK_OPTIONS.map((opt) => (
                      <button
                        key={opt.keyword}
                        onClick={() => handleSend(opt.label)}
                        disabled={isTyping}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-white/60 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all uppercase tracking-widest disabled:opacity-50"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
                {isFullScreen && QUICK_OPTIONS.map((opt) => (
                  <button
                    key={opt.keyword}
                    onClick={() => handleSend(opt.label)}
                    disabled={isTyping}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-black text-white/60 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all uppercase tracking-widest disabled:opacity-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className={cn("relative group", isFullScreen && "max-w-3xl mx-auto")}
              >
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  disabled={isTyping}
                  className="bg-white/5 border-white/10 h-14 rounded-2xl pr-14 focus-visible:ring-primary/50 text-white font-medium disabled:opacity-50"
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

const handleSuggestionClick = (suggestion: string) => {
  // Logic is now inline in the component
}
