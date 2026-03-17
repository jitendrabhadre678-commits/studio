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
    keywords: ['reward', 'unlock', 'gift', 'card', 'code', 'claim'],
    responses: [
      "You're just one step away from your reward! 👍\n\nChoose your gift card, click 'Unlock', and complete the quick verification task. Once finished, you can claim it from your dashboard.",
      "It's simple to unlock! 👍\n\nPick a reward → Click Unlock → Complete the quick step. Your code will be ready in your vault immediately after."
    ],
    progressResponses: {
      1: "You're very close! Step 1 is done. 👍\n\nNow, complete the quick offer to verify your session and unlock your reward. It usually takes less than a minute.",
      2: "Nice progress 🔥 you're almost there! Once the offer is verified, your unique reward code will be revealed.",
      3: "Everything is ready! 👍\n\nYour reward is now waiting in your dashboard. Go to 'My Rewards' to claim your code now!"
    }
  },
  {
    keywords: ['real', 'legit', 'fake', 'true', 'work', 'scam'],
    responses: [
      "Yes, it's real! 👍\n\nThousands of users unlock rewards daily. You can track all your progress and claims directly in your secure dashboard.",
      "GameFlashX is 100% verified. 👍\n\nOnce you complete the partner task, the reward is released to your account. Check your dashboard to see your history."
    ]
  },
  {
    keywords: ['not working', 'receive', 'didn\'t get', 'problem', 'missing', 'failed'],
    responses: [
      "I can help with that. 👍\n\nFirst, make sure the offer was fully completed without skipping any steps. Sometimes there's a 1-minute delay—please refresh your dashboard.",
      "Don't worry! 👍\n\nEnsure you finished the task 100%. If you did, check your 'My Rewards' page in a few moments. Your reward is likely being prepared."
    ]
  },
  {
    keywords: ['earn', 'money', 'cash', 'how', 'steps'],
    responses: [
      "Earning is easy here! 👍\n\n1. Choose a reward\n2. Click Unlock\n3. Complete one quick task\n4. Claim your reward\n\nStart with a small reward to see how fast it works!",
      "You can earn free gift cards by completing simple partner offers. It's the fastest way to get rewards without spending any money."
    ]
  },
  {
    keywords: ['referral', 'invite', 'friend'],
    responses: [
      "Sharing helps you earn faster! 👍\n\nInvite your friends using your link. When they join and unlock rewards, your referral count increases automatically.",
      "Invite friends to grow your balance! 👍\n\nYou can find your unique referral link in your dashboard. It's a great way to earn extra rewards."
    ]
  }
];

const FALLBACK_RESPONSES = [
  "I'm here to guide you. 👍 Would you like to know how to unlock a reward or check your dashboard?",
  "Please tell me more. Are you looking to claim a gift card or invite friends?",
  "I'm ready to help! You can ask about rewards, earning methods, or how to claim your code."
];

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Assistant. Ready to unlock your first reward today? 👍",
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
    }, 1200 + Math.random() * 600);
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
            {/* Header */}
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
                      <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.2em]">Live Support</span>
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

              {/* Progress Line */}
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

            {/* Messages */}
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
                      "px-5 py-3.5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm",
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

            {/* Input Box */}
            <div className="shrink-0 p-6 border-t border-white/5 bg-black/40 relative">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className={cn("relative", isFullScreen && "max-w-4xl mx-auto")}
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isTyping}
                  className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-5 pr-14 focus-visible:ring-primary/50 text-white placeholder:text-white/20"
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
