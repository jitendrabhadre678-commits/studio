'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Zap, Bot, 
  Maximize2, Minimize2
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

// Trained Intent clusters with randomized variations
const INTENTS = [
  {
    keywords: ['reward', 'gift', 'card', 'unlock', 'code', 'claim'],
    responses: [
      "Got it 👍 you're trying to unlock a reward.\n\nHere’s how it works:\n\n• Choose your gift card\n• Click 'Unlock Reward'\n• Complete one quick step\n• Your reward will be prepared\n\nMost users start with a simple task — it’s quick and works smoothly.",
      "Alright 👍 let me guide you. To unlock your gift card:\n\n• Select a reward\n• Click unlock\n• Complete a required step\n\nMost users finish this quickly. Just complete the task to reveal your code!",
      "Ready for your reward? 😊 It's a simple process:\n\nPick your card → Click Unlock → Complete one quick task. Your unique digital code will be ready right after that. Most people find the simple offers are the fastest way to get verified."
    ]
  },
  {
    keywords: ['earn', 'money', 'cash', 'income'],
    responses: [
      "Looking to earn rewards? 👍\n\nYou can start by:\n\n• completing simple offers\n• using your referral code\n• participating in activities\n\nMost users begin with one quick task to see how it works.",
      "Alright! 🔥 Earning is easy here. Just complete a few offers or share your referral link. Most beginners start with a small task to get the hang of it. You'll see your balance grow in your dashboard!",
      "You've come to the right place! 🔥 You can earn by finishing partner tasks or inviting friends. Why not try one quick offer? They are designed to be fast and helpful for new users."
    ]
  },
  {
    keywords: ['referral', 'refer', 'invite', 'code'],
    responses: [
      "You can grow faster using your referral code 👍\n\nWhen someone signs up using your code, your referral count increases. Many users combine referrals with offers for better results.",
      "Want to invite friends? 🔥 Your referral link is in your dashboard. When they join, your balance grows. It's a great way to earn while helping others get rewards too!",
      "Sharing is earning! 😊 Invite others with your unique link found in your profile. It's one of the fastest ways our top users grow their total earnings without completing daily tasks."
    ]
  },
  {
    keywords: ['login', 'signup', 'account', 'sign'],
    responses: [
      "Alright, let me help with your account 👍\n\nYou can log in using your email or Google account. If signup is currently closed, please check back soon as we open spots daily.",
      "Need help signing in? 😊 You can use Google for instant access. If you're having trouble creating a new account, we might be at temporary capacity—try again in a few hours!",
      "I understand 👍 Accessing your account is quick! Use Google or your Email. If registration isn't working right now, it's likely we've hit our daily limit for new users."
    ]
  },
  {
    keywords: ['offer', 'task', 'complete'],
    responses: [
      "I understand, you're asking about tasks 👍\n\nOffers help verify users and unlock rewards. You need to complete at least one step before claiming your gift card. It ensures the platform stays free for everyone.",
      "Tasks are part of our verification process. 👍 They ensure you're a real human user. Once you finish one, your reward becomes available immediately. Most users find them quite simple!",
      "Alright! 🔥 To get your reward, just complete one quick task from the list. It's the only requirement to verify your session and release the digital code instantly."
    ]
  },
  {
    keywords: ['problem', 'error', 'not working', 'failed'],
    responses: [
      "I understand 👍 that can happen sometimes. Let’s check quickly:\n\n• make sure the offer is completed\n• refresh the page\n• wait a few minutes\n\nLet me know if you're still stuck.",
      "Sorry to hear that! 😊 Usually, a quick refresh or double-checking the offer steps fixes it. Sometimes there's a small delay in the signal, so check your dashboard in a few minutes.",
      "I'm here to help! 👍 If something isn't working, make sure the task was finished 100%. Most issues are fixed by just trying one more quick offer to trigger the verification system."
    ]
  },
  {
    keywords: ['time', 'delay', 'wait'],
    responses: [
      "Hang tight! 👍 Some rewards take a few minutes to process. Please wait a bit and refresh your dashboard to see your updated status.",
      "Almost there! 😊 High demand can sometimes cause a slight delay. Just wait 60 seconds and give your 'My Rewards' page a quick refresh. Your code should appear soon.",
      "I understand the wait 👍 Verification signals usually arrive within a minute. If it's taking longer, try refreshing the page or checking your dashboard activity log."
    ]
  }
];

const FALLBACK_RESPONSE = "I'm here to help 👍\nCould you tell me a bit more about your question? You can ask about rewards, earning, referral, or your account.";

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: "Hello! I'm your Assistant. Ready to unlock your first reward today? 👍",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Background Scroll Lock logic
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Progress Tracking Events
  useEffect(() => {
    const handleStep1 = () => setProgress(prev => Math.max(prev, 1));
    const handleStep2 = () => setProgress(prev => Math.max(prev, 2));
    const handleStep3 = () => setProgress(prev => Math.max(prev, 3));
    
    window.addEventListener('reward-step-1', handleStep1);
    window.addEventListener('reward-step-2', handleStep2);
    window.addEventListener('reward-step-3', handleStep3);
    
    // Auto-detect step 1 if on a specific reward page
    if (typeof window !== 'undefined' && window.location.pathname.length > 1 && !['/dashboard', '/blog', '/leaderboard'].some(p => window.location.pathname.includes(p))) {
      setProgress(prev => Math.max(prev, 1));
    }

    return () => {
      window.removeEventListener('reward-step-1', handleStep1);
      window.removeEventListener('reward-step-2', handleStep2);
      window.removeEventListener('reward-step-3', handleStep3);
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // External trigger support
  useEffect(() => {
    const handleOpenSupport = () => setIsOpen(true);
    window.addEventListener('open-support-chat', handleOpenSupport);
    return () => window.removeEventListener('open-support-chat', handleOpenSupport);
  }, []);

  const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (!text || isTyping) return;

    // 1. Add User Message Instantly
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // 2. Delayed Human-like AI Response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = FALLBACK_RESPONSE;

      // Intent logic with randomized variations
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
    }, 1200 + Math.random() * 800); // Random delay between 1.2s and 2s
  };

  return (
    <>
      {/* Floating Trigger */}
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
            {/* Fixed Header */}
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
                      <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.2em]">Online Now</span>
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
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-all active:scale-95 lg:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress System */}
              <div className="px-1">
                <div className="h-1 w-full bg-white/5 rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(250,70,22,0.6)]"
                    animate={{ width: `${(progress / 3) * 100}%` }}
                    transition={{ type: 'spring', damping: 20 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {[
                    { label: 'Select', step: 1 },
                    { label: 'Verify', step: 2 },
                    { label: 'Unlock', step: 3 }
                  ].map((s) => (
                    <span key={s.label} className={cn(
                      "text-[8px] font-black uppercase tracking-widest transition-colors",
                      progress >= s.step ? "text-primary" : progress === s.step - 1 ? "text-white animate-pulse" : "text-white/20"
                    )}>
                      {progress >= s.step ? `✓ ${s.label}` : progress === s.step - 1 ? `→ ${s.label}` : s.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable Message Area */}
            <ScrollArea className="flex-grow p-6 h-full" ref={scrollRef}>
              <div className={cn("space-y-6 pb-4", isFullScreen && "max-w-4xl mx-auto")}>
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
                
                {/* Typing Animation */}
                {isTyping && (
                  <div className="flex items-start max-w-[85%]">
                    <div className="bg-white/[0.03] border border-white/5 px-5 py-3.5 rounded-[1.5rem] rounded-tl-none flex items-center gap-3">
                      <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">Assistant Typing</span>
                      <div className="flex gap-1">
                        {[0, 0.2, 0.4].map((d) => (
                          <motion.div 
                            key={d} 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} 
                            transition={{ repeat: Infinity, duration: 0.8, delay: d }} 
                            className="w-1 h-1 bg-primary rounded-full" 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Fixed Input Area */}
            <div className="shrink-0 p-6 border-t border-white/5 bg-black/40 relative">
              <form 
                onSubmit={handleSend}
                className={cn("relative", isFullScreen && "max-w-4xl mx-auto")}
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question about rewards..."
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
              <div className="mt-4 flex justify-center">
                <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.3em]">GameFlashX High-Demand Rewards Port</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
