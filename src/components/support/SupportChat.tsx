'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageSquare, ChevronRight, ArrowLeft, Zap, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import knowledgeData from '@/lib/knowledge.json';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message after mount to avoid hydration mismatch
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      text: "Hi 👋 I'm your GameFlashX Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }]);
  }, []);

  // Event listener for external triggers
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-support-chat', handleOpenEvent);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('open-support-chat', handleOpenEvent);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, isTyping]);

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
    setIsTyping(true);

    // AI Processing Logic
    setTimeout(() => {
      const lowerText = trimmed.toLowerCase();
      let responseText = knowledgeData.fallback;

      for (const intent of knowledgeData.intents) {
        if (intent.keywords.some(k => lowerText.includes(k))) {
          const variations = intent.responses;
          responseText = variations[Math.floor(Math.random() * variations.length)];
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
    }, 1500);
  };

  const quickOptions = [
    "How to unlock reward",
    "Reward not received",
    "Login issue",
    "Referral help"
  ];

  return (
    <>
      {/* Sticky Floating Trigger */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(250,70,22,0.4)] border-2 border-white/10"
        >
          <MessageSquare className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[10000] bg-[#0f0f0f] flex flex-col"
          >
            {/* Header */}
            <header className="h-16 md:h-20 border-b border-white/5 flex items-center px-4 md:px-8 bg-black/40 backdrop-blur-xl shrink-0">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-xl mr-4 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">Support Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-auto p-2 hover:bg-white/5 rounded-xl text-white/40 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </header>

            {/* Content Area */}
            <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full overflow-hidden">
              {/* Sidebar - Desktop Only */}
              <aside className="hidden lg:flex w-80 p-8 border-r border-white/5 flex-col gap-8">
                <div>
                  <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-6">Common Questions</h4>
                  <div className="space-y-2">
                    {quickOptions.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => submitMessage(opt)}
                        className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 text-xs font-bold text-white/60 hover:text-white transition-all group"
                      >
                        {opt}
                        <ChevronRight className="w-3.5 h-3.5 float-right opacity-0 group-hover:opacity-100 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-auto p-6 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
                  <Zap className="w-8 h-8 text-primary mb-4" />
                  <p className="text-sm font-black text-white mb-2 uppercase tracking-tight">Real-Time Sync</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Your support session is secured and synchronized with your reward vault.</p>
                </div>
              </aside>

              {/* Chat Interface */}
              <div className="flex-1 flex flex-col min-w-0">
                <ScrollArea className="flex-1 p-4 md:p-10" ref={scrollRef}>
                  <div className="max-w-3xl mx-auto space-y-8 pb-10">
                    {messages.map((msg) => (
                      <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("flex flex-col", msg.sender === 'user' ? "items-end" : "items-start")}
                      >
                        <div className={cn(
                          "max-w-[90%] md:max-w-[80%] px-6 py-4 rounded-[1.5rem] text-sm md:text-base leading-relaxed whitespace-pre-wrap",
                          msg.sender === 'user' 
                            ? "bg-primary text-white font-bold rounded-tr-none shadow-xl shadow-primary/20" 
                            : "glass-card border-white/10 text-white/90 rounded-tl-none"
                        )}>
                          {msg.text}
                        </div>
                        <span className="mt-2 text-[9px] font-black text-white/20 uppercase tracking-widest px-2">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-3 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Assistant is typing...</div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 md:p-8 border-t border-white/5 bg-black/40 backdrop-blur-xl shrink-0">
                  {/* Quick Options - Mobile Scroll */}
                  <div className="flex lg:hidden gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    {quickOptions.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => submitMessage(opt)}
                        className="whitespace-nowrap px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase text-white/60 active:bg-primary active:text-white transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <form 
                    onSubmit={(e) => { e.preventDefault(); submitMessage(inputValue); }} 
                    className="relative max-w-3xl mx-auto"
                  >
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your question..."
                      className="bg-white/5 border-white/10 h-14 md:h-16 rounded-2xl pr-16 text-white text-base focus-visible:ring-primary/50"
                    />
                    <button 
                      type="submit" 
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-all disabled:grayscale disabled:opacity-50"
                    >
                      {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                  </form>
                  <p className="text-center mt-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
                    End-to-End Encrypted Support Session
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
