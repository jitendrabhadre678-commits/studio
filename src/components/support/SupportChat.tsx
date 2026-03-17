'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Zap, Bot, 
  ArrowRight, Maximize2, Minimize2, CheckCircle2,
  TrendingUp, Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

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
      "Earning is straightforward here! 👍\n\nBy engaging with our sponsors through quick offers, you unlock your favorite gift cards. It's a great way to turn a few minutes of time into real rewards.\n\nStart with a simple offer to get started.",
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
  "I'm here to help! Could you provide more details about your request?"
];

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0); // 0: Start, 1: Selected, 2: Offer Clicked, 3: Completed
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

  const handleSend = () => {
    const text = inputValue.trim();
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

  const progressPercent = (progress / 3) * 100;

  const steps = [
    { label: "Select Reward", index: 1 },
    { label: "Complete Offer", index: 2 },
    { label: "Unlock Reward", index: 3 }
  ];

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
              width: isFullScreen ? '100vw' : 'min(700px, calc(100vw - 48px))',
              height: isFullScreen ? '100vh' : 'min(85vh, calc(100vh - 120px))',
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
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex flex-col gap-6 bg-gradient-to-b from-primary/10 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[1.2rem] bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(250,70,22,0.2)]">
                    <Bot className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg uppercase tracking-widest">GameFlashX Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">Active Session</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-all active:scale-95"
                  title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                >
                  {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
              </div>

              {/* Enhanced Step Progress */}
              <div className="space-y-4 px-1">
                <div className="flex items-center justify-between gap-4">
                  {steps.map((step) => {
                    const isDone = progress >= step.index;
                    const isCurrent = progress + 1 === step.index;
                    
                    return (
                      <div key={step.index} className="flex-1 flex flex-col items-center gap-2">
                        <div className={cn(
                          "w-full h-1.5 rounded-full transition-all duration-700 relative",
                          isDone ? "bg-primary shadow-[0_0_15px_rgba(250,70,22,0.4)]" : "bg-white/5"
                        )}>
                          {isCurrent && (
                            <motion.div 
                              layoutId="active-step-glow"
                              className="absolute inset-0 bg-primary/40 blur-md rounded-full" 
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isDone ? (
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                          ) : isCurrent ? (
                            <ArrowRight className="w-3 h-3 text-white/60 animate-pulse" />
                          ) : (
                            <div className="w-3 h-3" />
                          )}
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest transition-colors",
                            isDone || isCurrent ? "text-white" : "text-white/20"
                          )}>
                            {step.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <ScrollArea className="flex-grow p-8" ref={scrollRef}>
              <div className={cn("space-y-8", isFullScreen && "max-w-4xl mx-auto")}>
                {/* Visual Context Prompt */}
                {progress < 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80 font-bold uppercase tracking-wider mb-1">Status Update</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Rewards are processed in real-time. Complete your verification step to secure the current value.
                      </p>
                    </div>
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
                      "px-6 py-4 rounded-[1.5rem] text-sm leading-relaxed shadow-2xl",
                      msg.sender === 'user' 
                        ? "bg-primary text-white rounded-tr-none border border-white/10" 
                        : "bg-white/[0.03] text-white/90 border border-white/5 rounded-tl-none"
                    )}>
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2 px-2">
                      <Clock className="w-2.5 h-2.5 text-white/20" />
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start max-w-[85%]"
                  >
                    <div className="bg-white/[0.03] border border-white/5 px-6 py-4 rounded-[1.5rem] rounded-tl-none flex items-center gap-4">
                      <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Processing Query</span>
                      <div className="flex gap-1.5">
                        {[0, 0.2, 0.4].map((delay) => (
                          <motion.div 
                            key={delay}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} 
                            transition={{ repeat: Infinity, duration: 0.8, delay }} 
                            className="w-1.5 h-1.5 bg-primary rounded-full" 
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <div className="p-8 border-t border-white/5 bg-black/40">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className={cn("relative group", isFullScreen && "max-w-4xl mx-auto")}
              >
                <div className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about rewards, referrals, or tasks..."
                  disabled={isTyping}
                  className="bg-white/[0.03] border-white/10 h-16 rounded-[1.2rem] px-6 pr-16 focus-visible:ring-primary/50 text-white font-medium disabled:opacity-50 text-base"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-center text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mt-6">
                GameFlashX Automated Support • 24/7 Availability
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
