'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageSquare, ChevronRight, ArrowLeft, Zap } from 'lucide-react';
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

  // Initial welcome messages
  useEffect(() => {
    setMessages([{
      id: 'initial',
      text: "Hello! I'm your Support Assistant. How can I help you today? 👍",
      sender: 'ai',
      timestamp: new Date()
    }]);
  }, []);

  // Event listener for external triggers (like the Help Center button)
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-support-chat', handleOpenEvent);
    
    // Lock body scroll when chat is open
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

    // Simulate AI response logic
    setTimeout(() => {
      const lowerText = trimmed.toLowerCase();
      let responseText = knowledgeData.fallback;

      // Simple keyword matching from our knowledge base
      for (const intent of knowledgeData.intents) {
        if (intent.keywords.some(k => lowerText.includes(k))) {
          // Select a random variation if available, otherwise first
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
    }, 1200);
  };

  const quickOptions = [
    "Reward not received",
    "Login issue",
    "Payment help",
    "Referral status"
  ];

  return (
    <>
      {/* Floating Toggle Button (Hidden when full-screen is active) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[50] w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-2xl bg-primary text-white hover:scale-110 active:scale-95 animate-in fade-in zoom-in duration-300"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[9999] bg-[#0f0f0f] flex flex-col"
          >
            {/* Immersive Header */}
            <header className="h-16 md:h-20 border-b border-white/5 flex items-center px-4 md:px-8 bg-black/40 backdrop-blur-xl">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full mr-4 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">Support Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Always Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-auto p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </header>

            {/* Chat Body */}
            <div className="flex-1 flex flex-col md:flex-row max-w-6xl mx-auto w-full overflow-hidden">
              {/* Sidebar: Quick Info (Visible on Desktop) */}
              <aside className="hidden lg:flex w-80 p-8 border-r border-white/5 flex-col gap-8">
                <div>
                  <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">Quick Shortcuts</h4>
                  <div className="space-y-2">
                    {quickOptions.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => submitMessage(opt)}
                        className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 text-xs font-bold text-white/60 hover:text-white transition-all group"
                      >
                        {opt}
                        <ChevronRight className="w-3 h-3 float-right opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-auto p-6 bg-primary/10 rounded-[2rem] border border-primary/20">
                  <Zap className="w-8 h-8 text-primary mb-4" />
                  <p className="text-sm font-bold text-white mb-2 uppercase tracking-tight">Need direct help?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Most reward issues are resolved automatically within 24 hours.</p>
                </div>
              </aside>

              {/* Main Messenger Area */}
              <div className="flex-1 flex flex-col min-w-0 bg-white/[0.01]">
                <ScrollArea className="flex-1 p-4 md:p-8" ref={scrollRef}>
                  <div className="max-w-3xl mx-auto space-y-6 pb-10">
                    {messages.map((msg) => (
                      <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("flex flex-col", msg.sender === 'user' ? "items-end" : "items-start")}
                      >
                        <div className={cn(
                          "max-w-[85%] md:max-w-[70%] px-5 py-4 rounded-[1.5rem] text-sm leading-relaxed",
                          msg.sender === 'user' 
                            ? "bg-primary text-white font-bold rounded-tr-none shadow-xl shadow-primary/10" 
                            : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                        )}>
                          {msg.text}
                        </div>
                        <span className="mt-2 text-[9px] font-bold text-white/20 uppercase tracking-widest px-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-3 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Assistant is thinking...</div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Messenger Input */}
                <div className="p-4 md:p-8 border-t border-white/5 bg-black/40 backdrop-blur-xl">
                  {/* Mobile Quick Options */}
                  <div className="flex lg:hidden gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    {quickOptions.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => submitMessage(opt)}
                        className="whitespace-nowrap px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase text-white/60 active:bg-primary active:text-white transition-colors"
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
                      placeholder="Type your message here..."
                      className="bg-white/5 border-white/10 h-14 md:h-16 rounded-[1.5rem] pr-16 text-white text-base focus-visible:ring-primary/50"
                    />
                    <button 
                      type="submit" 
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-all disabled:grayscale disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                  <p className="text-center mt-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
                    Encrypted secure support session active
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
