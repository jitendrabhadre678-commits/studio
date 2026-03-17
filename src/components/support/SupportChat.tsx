'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Zap, Bot, 
  Maximize2, Minimize2, Search, ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { giftCards } from '@/lib/gift-cards';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

/**
 * Trained Intent clusters with randomized variations.
 * Now expanded to cover every feature of the GameFlashX platform.
 */
const INTENTS = [
  {
    keywords: ['reward', 'gift', 'card', 'unlock', 'code', 'claim', 'amazon', 'google', 'play', 'roblox', 'netflix', 'steam', 'itunes', 'xbox', 'nintendo', 'fortnite', 'paypal', 'visa', 'vanilla', 'uber', 'starbucks', 'mcdonald', 'target', 'walmart', 'best buy', 'ebay', 'doordash'],
    responses: [
      "Got it 👍 you're trying to unlock a reward.\n\nHere’s how it works:\n• Choose your gift card\n• Click 'Unlock Reward'\n• Complete one quick verification step\n\nMost users start with a simple task — it’s quick and works smoothly. By the way, many users also use our Referral system to unlock rewards even faster!",
      "Alright 👍 let me guide you. To unlock your gift card:\n• Select a reward from the gallery\n• Click the unlock button\n• Complete the required step\n\nOnce done, your unique code will be ready in your vault. You should also check out our Creator Program if you want to earn more for your activity!",
      "Ready for your reward? 😊 It's a simple process:\n\nPick your card → Click Unlock → Complete one quick task. Your digital code will be prepared instantly. Many of our top earners also follow our Blog for the latest reward-claiming tips!"
    ]
  },
  {
    keywords: ['earn', 'money', 'cash', 'income'],
    responses: [
      "Looking to earn rewards? 👍\n\nYou can start by completing simple offers. They're designed to be quick, and once done, your reward becomes available immediately. \n\nAlso, check out the 'Clip & Earn' Creator Program—you can get paid just for posting videos about us!",
      "Alright! 🔥 Earning is easy here. Just complete partner offers or use your referral link. Most beginners start with a small task to get the hang of it. \n\nDon't forget to check the Leaderboard to see how much our top users are making daily!",
      "You've come to the right place! 🔥 You can earn by finishing tasks, inviting friends, or joining our Whop community. Why not try one quick offer? It's the fastest way to get verified and start claiming codes."
    ]
  },
  {
    keywords: ['creator', 'whop', 'clip', 'video', 'reels', 'shorts', 'tiktok'],
    responses: [
      "Interested in the Creator Program? 🎥\n\nYou can earn real cash by posting Reels, Shorts, or TikToks about GameFlashX. We pay based on your video views!\n\nJoin our community on Whop to get your unique tracking links and start earning today.",
      "Our 'Clip & Earn' program is great for creators! 🚀\n\nSimply share your results or tutorials on social media. The more views you get, the more you earn. Head over to the Creator Program section or join us on Whop to get started.",
      "Yes! You can turn your content into cash. 💰\n\nBy joining the GameFlashX Creator Program on Whop, you get paid for every view your promotional videos generate. It's a perfect way to scale your earnings alongside daily tasks!"
    ]
  },
  {
    keywords: ['referral', 'refer', 'invite', 'code'],
    responses: [
      "You can grow faster using your referral code 👍\n\nWhen someone joins using your link, your referral count increases and you earn a lifetime commission. Check your Dashboard for your unique link!",
      "Want to invite friends? 🔥 Your referral link is in your Dashboard. When they join, your balance grows. It's a great way to earn while helping others get rewards too!",
      "Sharing is earning! 😊 Invite others with your unique link found in your Dashboard. It's one of the fastest ways our top users grow their earnings without completing daily tasks."
    ]
  },
  {
    keywords: ['blog', 'guide', 'article', 'tip'],
    responses: [
      "Our Blog is packed with helpful info! 📚\n\nYou'll find guides on how to unlock specific gift cards, tips for faster earning, and platform updates. It's the best place to become a pro at GameFlashX.",
      "Need some tips? Check out our Blog section. 💡\n\nWe post regular articles about the best ways to earn and how to make the most of your gift cards. It's a great resource for new players!",
      "I recommend checking our Blog for the latest strategies. 👍\n\nIt covers everything from maximizing your referral earnings to staying safe online while claiming rewards."
    ]
  },
  {
    keywords: ['leaderboard', 'top', 'winner', 'rank'],
    responses: [
      "The Leaderboard shows our top earners for the month! 🏆\n\nIt's updated in real-time. If you want to see your name there, start completing offers and referring friends today. Competition is high!",
      "Check out the Leaderboard to see who's winning! 🥇\n\nThese players are cashing out rewards every single day. It's a great way to see what's possible when you stay active on the platform.",
      "Want to be #1? 👑\n\nThe Leaderboard tracks the most active users across the globe. Keep completing tasks and growing your referral network to climb the ranks!"
    ]
  },
  {
    keywords: ['social', 'instagram', 'youtube', 'discord', 'follow', 'community'],
    responses: [
      "Stay connected with our community! 🌐\n\nFollow us on Instagram, YouTube, and Discord for live updates, winner proof, and exclusive tips. You can find all the links at the bottom of the page.",
      "We love our community! 😊\n\nJoin our Discord to chat with other users, or follow us on Instagram for the latest reward drops. It's the best way to stay in the loop with GameFlashX.",
      "Don't miss out! 🔥\n\nFollow our social channels for announcements and earning guides. Our YouTube channel has great tutorials to help you unlock rewards faster."
    ]
  },
  {
    keywords: ['dashboard', 'stats', 'progress', 'balance', 'vault'],
    responses: [
      "Your Dashboard is your control center. 📊\n\nYou can track your earnings, see your referral count, and manage your unlocked codes in the Reward Vault. It's all secured and updated live.",
      "Everything you need is in your Dashboard. 👍\n\nCheck your balance, see your activity log, and find your referral link all in one place. Make sure you're logged in to see your latest stats!",
      "I recommend keeping an eye on your Dashboard. 😊\n\nIt shows your progress through the reward levels and holds all your unlocked digital keys in the Reward Vault section."
    ]
  },
  {
    keywords: ['login', 'signup', 'account', 'sign'],
    responses: [
      "Accessing your account is quick! 👍\n\nYou can log in using your email or Google account. If signup is currently closed, please wait a bit as we open new spots daily to maintain quality.",
      "Need help signing in? 😊 You can use Google for instant access. If you're having trouble creating a new account, we might be at temporary capacity—try again in a few hours!",
      "I understand 👍 Accessing your account is simple! Use Google or your Email. If registration isn't working right now, it's likely we've hit our daily limit for new users."
    ]
  },
  {
    keywords: ['offer', 'task', 'complete'],
    responses: [
      "Tasks are part of our verification process. 👍\n\nThey ensure you're a real human user. Once you finish one, your reward becomes available immediately. Most users find them quite simple!",
      "Offers help verify users and unlock rewards. 👍\n\nYou need to complete at least one step before claiming your gift card. It ensures the platform stays free for everyone.",
      "Alright! 🔥 To get your reward, just complete one quick task from the list. It's the only requirement to verify your session and release the digital code instantly."
    ]
  },
  {
    keywords: ['problem', 'error', 'not working', 'failed', 'issue'],
    responses: [
      "I understand 👍 that can happen sometimes. Let’s check quickly:\n• Make sure the offer was fully completed\n• Try refreshing the page\n• Wait a few minutes for the signal\n\nMost issues are fixed by trying one more quick offer to trigger the system.",
      "Sorry to hear that! 😊 Usually, a quick refresh or double-checking the offer steps fixes it. Sometimes there's a small delay, so check your Dashboard in a few minutes.",
      "I'm here to help! 👍 If something isn't working, ensure you didn't skip any steps in the offer. Most people find that trying a different simple offer fixes the verification signal instantly."
    ]
  },
  {
    keywords: ['time', 'delay', 'wait', 'slow'],
    responses: [
      "Hang tight! 👍 Some rewards take a few minutes to process. Please wait a bit and refresh your Dashboard to see your updated status. We're currently in high demand!",
      "Almost there! 😊 High demand can sometimes cause a slight delay. Just wait 60 seconds and give your Dashboard a quick refresh. Your code should appear soon.",
      "I understand the wait 👍 Verification signals usually arrive within a minute. If it's taking longer, try refreshing the page or checking your Dashboard activity log."
    ]
  },
  {
    keywords: ['real', 'fake', 'legit', 'work'],
    responses: [
      "I understand your concern 👍 GameFlashX is a trusted platform. Thousands of users successfully redeem rewards daily. You can track every step and reward in your secure Dashboard.",
      "It's definitely real! 😊 Our partners sponsor these rewards. Once you complete a quick verification task, your code is released. You'll see it in your Dashboard instantly.",
      "Yes, it works! 🔥 We've delivered thousands of gift cards. The offers you complete generate the value needed to provide these rewards for free. Check the Leaderboard to see today's winners!"
    ]
  }
];

const FALLBACK_RESPONSE = "I'm here to help with GameFlashX related questions 👍\nYou can ask about rewards, earning, referral, the creator program, or your account.";

const DEFAULT_SUGGESTIONS = [
  "How to unlock rewards",
  "How to earn money",
  "Join Creator Program",
  "Referral help"
];

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    
    if (typeof window !== 'undefined' && window.location.pathname.length > 1 && !['/dashboard', '/blog', '/leaderboard'].some(p => window.location.pathname.includes(p))) {
      setProgress(prev => Math.max(prev, 1));
    }

    return () => {
      window.removeEventListener('reward-step-1', handleStep1);
      window.removeEventListener('reward-step-2', handleStep2);
      window.removeEventListener('reward-step-3', handleStep3);
    };
  }, []);

  // Smart Search Suggestions Logic
  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestions(DEFAULT_SUGGESTIONS);
      return;
    }

    const query = inputValue.toLowerCase();
    const matchedCards = giftCards.filter(card => 
      card.brand.toLowerCase().includes(query) || 
      card.category.toLowerCase().includes(query)
    );

    if (matchedCards.length > 0) {
      const newSuggestions: string[] = [];
      matchedCards.forEach(card => {
        newSuggestions.push(`${card.brand} Gift Card`);
        newSuggestions.push(`How to unlock ${card.brand} reward`);
        newSuggestions.push(`${card.brand} reward not working`);
      });
      const uniqueSuggestions = Array.from(new Set(newSuggestions)).slice(0, 5);
      setSuggestions(uniqueSuggestions);
    } else {
      setSuggestions(DEFAULT_SUGGESTIONS);
    }
  }, [inputValue]);

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

  const submitMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = trimmed.toLowerCase();
      let responseText = FALLBACK_RESPONSE;

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
    }, 1200 + Math.random() * 800);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    submitMessage(suggestion);
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
                      <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.2em]">Platform Guide Online</span>
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
                      "px-5 py-3.5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                      msg.sender === 'user' 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-white/[0.03] text-white/90 border border-white/5 rounded-tl-none"
                    )}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-2 px-2">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                ))}
                
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

            <div className="shrink-0 p-6 border-t border-white/5 bg-black/40 relative">
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-6 right-6 mb-4 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-[120]"
                  >
                    <div className="p-3 border-b border-white/5 bg-white/5">
                      <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                        <Search className="w-3 h-3" /> Smart Navigation
                      </div>
                    </div>
                    <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
                      {suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-5 py-3.5 text-sm text-white/70 hover:text-white hover:bg-primary/10 transition-all flex items-center justify-between group border-b border-white/5 last:border-0"
                        >
                          <span className="font-medium">{suggestion}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form 
                onSubmit={handleSend}
                className={cn("relative", isFullScreen && "max-w-4xl mx-auto")}
              >
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Ask about rewards, whop, leaderboard..."
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
                <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.3em]">GameFlashX 24/7 Global Intelligence</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
