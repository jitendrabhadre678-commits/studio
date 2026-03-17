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

// Soft-Conversion Intent Matching Data
const INTENTS = [
  {
    keywords: ['reward', 'unlock', 'gift', 'card', 'code'],
    responses: [
      "Got it 👍 you're looking to unlock a reward.\n\nHere’s how it works:\n\n• Choose your gift card\n• Click 'Unlock Reward'\n• Complete one quick step\n\nMost users start with a simple offer — it's usually quick and unlocks the reward smoothly.\n\nIf you want, I can guide you step-by-step.",
      "Ready to claim? 👍 Unlocking is designed to be simple.\n\nPick your favorite brand and follow the steps to complete one quick activity. This is how we keep the platform free for everyone.\n\nYou can try one quick task to see how it works!",
      "I see you're ready for your reward! 👍\n\nUnlocking is a secure process where you complete a quick sponsor task to release your code. It's safe and helps us verify your session.\n\nStart with a simple offer to get started."
    ]
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
  },
  {
    keywords: ['offer', 'task', 'complete'],
    responses: [
      "Got it! 👍 Offers are how we keep things moving.\n\nThey verify you're a real human player and help sponsors reach active users. Once one is finished, your reward path opens up.\n\nYou can try one quick task to get started.",
      "Offers are the key to unlocking! 👍\n\nJust follow the instructions on the sponsor's page. Most only take a minute or two to finish.\n\nStart with a simple offer to see how it works."
    ]
  },
  {
    keywords: ['withdraw', 'payment', 'paypal', 'redeem'],
    responses: [
      "I understand! 👍 You're ready to redeem your hard work.\n\nCashing out is available once you reach the minimum balance. Just follow the steps in your wallet to initiate the process.\n\nLet me know if you want help with the next step.",
      "Ready for your payout? 👍\n\nFollow the simple redemption guide in your dashboard. Most payments are processed within a short verification window.\n\nYou can try one quick task to reach your goal faster!"
    ]
  },
  {
    keywords: ['time', 'delay', 'wait', 'slow'],
    responses: [
      "I understand 👍\n\nSometimes verification signals take a few minutes to sync. Your patience helps ensure everything is secure.\n\nTry refreshing your dashboard in a few minutes to see your progress.",
      "Got it 👍 processing can sometimes be a bit slower during peak times. \n\nJust hang tight, and once the system confirms your activity, your reward will be ready."
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
    setIsTyping(true);

    const typingTime = 1200 + Math.random() * 800;

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = getRandomElement(FALLBACK_RESPONSES);

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

            <div className="p-6 border-t border-white/5 bg-black/40">
              <div className="flex flex-wrap gap-2 mb-4">
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

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative group"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
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
