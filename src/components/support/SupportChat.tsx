'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, Loader2, Sparkles } from 'lucide-react';
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
    // Persona-driven welcome message
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        text: "Hi there! 👋 I'm your GameFlashX Assistant. Ready to unlock your first reward? Just ask me how!",
        sender: 'ai',
        timestamp: new Date()
      }]);
    }

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

    // AI thinking simulation
    setTimeout(() => {
      const lowerText = trimmed.toLowerCase();
      let responseText = knowledgeData.fallback;

      // Intent matching logic
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
    }, 1000);
  };

  const quickOptions = [
    "How to unlock a reward?",
    "Is this real?",
    "How to earn faster?",
    "I have a problem"
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-[9999] w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_8px_30px_rgba(250,70,22,0.4)] cursor-pointer border-none outline-none group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 fill-white" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 border-2 border-black">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed z-[9999] flex flex-col overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
              "bottom-20 right-4 w-[340px] max-w-[90%] h-[480px] rounded-[24px]",
              "max-[480px]:bottom-20 max-[480px]:right-3 max-[480px]:w-[calc(100%-24px)] max-[480px]:h-[65vh]"
            )}
          >
            {/* Persona Header */}
            <header className="bg-black p-4 text-white flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                <Sparkles className="w-5 h-5 text-primary fill-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black uppercase tracking-tight leading-none">Support Assistant</h4>
                <p className="text-[9px] text-primary font-bold uppercase tracking-widest mt-1">Live & Online</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" ref={scrollRef}>
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
                    msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "p-3.5 px-4 rounded-[18px] text-[13px] leading-relaxed shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-primary text-white font-bold rounded-tr-none" 
                      : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="mt-1 text-[8px] font-bold text-gray-400 uppercase tracking-widest px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-2 bg-white p-2 px-4 rounded-full border border-gray-100 w-fit">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Action Suggestions */}
              {messages.length <= 1 && !isTyping && (
                <div className="grid grid-cols-1 gap-2 pt-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Common Questions</p>
                  {quickOptions.map(opt => (
                    <button 
                      key={opt}
                      onClick={() => submitMessage(opt)}
                      className="text-left p-3 px-4 rounded-xl bg-white border border-gray-100 hover:border-primary hover:text-primary text-[11px] font-bold text-gray-600 transition-all shadow-sm active:scale-95"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Input Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); submitMessage(inputValue); }} 
              className="p-4 border-t border-gray-100 bg-white shrink-0 flex gap-2"
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-[13px] focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-all disabled:opacity-50 shrink-0 shadow-lg shadow-primary/20"
              >
                <Send className="w-4 h-4 fill-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}