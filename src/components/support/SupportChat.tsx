'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageSquare, Loader2, Zap } from 'lucide-react';
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

  useEffect(() => {
    setMessages([{
      id: 'welcome',
      text: "Hi 👋 How can I help you?",
      sender: 'ai',
      timestamp: new Date()
    }]);

    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-support-chat', handleOpenEvent);
    return () => window.removeEventListener('open-support-chat', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    }, 1200);
  };

  const quickOptions = [
    "Reward not received",
    "Login issue",
    "How to unlock reward",
    "Verification help"
  ];

  return (
    <>
      {/* Sticky Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-[9999] w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_8px_25px_rgba(250,70,22,0.4)] cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-[84px] right-4 md:right-6 z-[9999] w-[320px] max-w-[calc(100%-24px)] h-[420px] bg-[#111] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-white/5"
          >
            {/* Header */}
            <header className="p-3 px-4 font-semibold bg-white/5 flex justify-between items-center border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white text-xs uppercase tracking-widest font-black">Support Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "p-3 px-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-primary text-white font-bold rounded-tr-none" 
                      : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="mt-1 text-[8px] font-bold text-white/20 uppercase tracking-widest px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-2 opacity-50">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Quick Replies - Only show after welcome message or certain triggers */}
              {messages.length === 1 && !isTyping && (
                <div className="grid grid-cols-1 gap-2 pt-2">
                  {quickOptions.map(opt => (
                    <button 
                      key={opt}
                      onClick={() => submitMessage(opt)}
                      className="text-left p-2.5 px-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 text-[10px] font-bold text-white/60 hover:text-white transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={(e) => { e.preventDefault(); submitMessage(inputValue); }} 
              className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-xl shrink-0 flex gap-2"
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-all disabled:grayscale disabled:opacity-50 shrink-0"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
